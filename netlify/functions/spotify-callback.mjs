// OAuth return URL for re-authorising the Spotify widget: https://dilithdinesh.com/callback
// (already registered as a redirect URI in the Spotify app). Start the flow with
// `node scripts/get-spotify-token.mjs`, which builds the authorise link.
//
// The `state` parameter must equal SPOTIFY_AUTH_STATE (a secret in Netlify env and the
// local .env). Without that check, anyone could authorise their own Spotify account here
// and replace the token, so the Now page would show their music. The refresh token is
// stored straight into Netlify Blobs and never shown in the response.
import { timingSafeEqual } from 'node:crypto';
import { exchangeCode } from '../lib/spotify.mjs';

const text = (body, status = 200) =>
  new Response(body, { status, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } });

function stateMatches(given) {
  const expected = process.env.SPOTIFY_AUTH_STATE || '';
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export default async (req) => {
  const url = new URL(req.url);
  if (url.searchParams.get('error')) return text('Spotify authorisation was cancelled.', 400);
  if (!stateMatches(url.searchParams.get('state'))) return text('Not found.', 404);

  const code = url.searchParams.get('code');
  if (!code) return text('Missing code.', 400);

  try {
    await exchangeCode(code);
    return text('Spotify connected. The Now page widget will pick it up on its next poll. You can close this tab.');
  } catch (err) {
    console.error('spotify-callback:', err.message);
    return text('Could not connect Spotify. Check the function logs.', 500);
  }
};

export const config = { path: '/callback' };
