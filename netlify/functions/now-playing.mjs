// Spotify Now Playing for the Now page widget (src/components/SpotifyNowPlaying.astro).
// Served at /.netlify/functions/now-playing. Token handling lives in netlify/lib/spotify.mjs.
import { getAccessToken } from '../lib/spotify.mjs';

const NOW_PLAYING_ENDPOINT     = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

const HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache, no-store',
  'Access-Control-Allow-Origin': '*',
};

const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: HEADERS });

function trackPayload(track, isPlaying) {
  return {
    isPlaying,
    title:    track.name,
    artist:   track.artists.map(a => a.name).join(', '),
    album:    track.album.name,
    albumArt: track.album.images[1]?.url ?? track.album.images[0]?.url ?? null,
    songUrl:  track.external_urls.spotify,
  };
}

export default async () => {
  try {
    const token = await getAccessToken();
    const authHeader = { Authorization: `Bearer ${token}` };

    // 1. Currently playing (204 = nothing playing)
    const nowRes = await fetch(NOW_PLAYING_ENDPOINT, { headers: authHeader });
    if (nowRes.status === 200) {
      const data = await nowRes.json();
      if (data?.item && data.currently_playing_type === 'track') {
        return json(trackPayload(data.item, data.is_playing));
      }
    }

    // 2. Fall back to the last played track
    const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, { headers: authHeader });
    if (recentRes.status === 200) {
      const data = await recentRes.json();
      const track = data.items?.[0]?.track;
      if (track) return json(trackPayload(track, false));
    }

    // Nothing found. Log statuses so a scope or auth problem shows in function logs.
    console.warn(`now-playing: currently-playing ${nowRes.status}, recently-played ${recentRes.status}`);
    return json({ isPlaying: false, title: null });
  } catch (err) {
    console.error('now-playing:', err.message);
    return json({ error: err.message }, 500);
  }
};
