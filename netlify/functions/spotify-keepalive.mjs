// Weekly refresh so the Spotify token stays in use and any rotated refresh token is saved,
// even in weeks when nobody opens the Now page. See netlify/lib/spotify.mjs.
import { getAccessToken } from '../lib/spotify.mjs';

export default async () => {
  try {
    await getAccessToken();
    console.log('spotify-keepalive: token refreshed');
  } catch (err) {
    // Surfaces in Netlify function logs. Fix: node scripts/get-spotify-token.mjs
    console.error('spotify-keepalive:', err.message);
  }
};

export const config = { schedule: '@weekly' };
