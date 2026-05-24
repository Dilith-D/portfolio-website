const TOKEN_ENDPOINT         = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT   = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

async function getAccessToken() {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  const { access_token } = await res.json();
  return access_token;
}

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

const HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache, no-store',
  'Access-Control-Allow-Origin': '*',
};

export const handler = async () => {
  try {
    const token = await getAccessToken();
    const authHeader = { Authorization: `Bearer ${token}` };

    // 1. Currently playing
    const nowRes = await fetch(NOW_PLAYING_ENDPOINT, { headers: authHeader });

    if (nowRes.status === 200) {
      const data = await nowRes.json();
      if (data?.item && data.currently_playing_type === 'track') {
        return {
          statusCode: 200,
          headers: HEADERS,
          body: JSON.stringify(trackPayload(data.item, data.is_playing)),
        };
      }
    }

    // 2. Fall back to recently played
    const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, { headers: authHeader });

    if (recentRes.status === 200) {
      const data = await recentRes.json();
      const track = data.items?.[0]?.track;
      if (track) {
        return {
          statusCode: 200,
          headers: HEADERS,
          body: JSON.stringify(trackPayload(track, false)),
        };
      }
    }

    // Nothing found
    return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ isPlaying: false, title: null }) };

  } catch (err) {
    return { statusCode: 500, headers: HEADERS, body: JSON.stringify({ error: err.message }) };
  }
};
