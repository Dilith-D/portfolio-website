// Shared Spotify auth for the Now page widget.
//
// Why a blob store: Spotify can rotate the refresh token on any refresh, and a token that
// is lost or revoked silently kills the widget (Nov 2026: it sat empty for weeks). The
// latest refresh token lives in Netlify Blobs (store "spotify", key "refresh_token") and
// every refresh that returns a new one saves it. SPOTIFY_REFRESH_TOKEN in the Netlify env
// is only the first-run fallback. A weekly scheduled function (spotify-keepalive) keeps
// the token in use even when nobody visits /now.
import { getStore } from '@netlify/blobs';

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
export const REDIRECT_URI = 'https://dilithdinesh.com/callback';
export const SCOPES = 'user-read-currently-playing user-read-recently-played';

const store = () => getStore('spotify');

function basicAuth() {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    throw new Error('SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET not set');
  }
  return 'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
}

async function tokenRequest(params) {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { Authorization: basicAuth(), 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(params),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) {
    throw new Error(`Spotify token request failed (${res.status}): ${data.error ?? ''} ${data.error_description ?? ''}`.trim());
  }
  return data;
}

export async function saveRefreshToken(token) {
  await store().set('refresh_token', token);
  await store().set('updated_at', new Date().toISOString());
}

/** Returns a fresh access token and persists any rotated refresh token. */
export async function getAccessToken() {
  const saved = await store().get('refresh_token').catch(() => null);
  const refreshToken = saved || process.env.SPOTIFY_REFRESH_TOKEN;
  if (!refreshToken) {
    throw new Error('No Spotify refresh token. Re-authorise: node scripts/get-spotify-token.mjs');
  }
  const data = await tokenRequest({ grant_type: 'refresh_token', refresh_token: refreshToken });
  if (data.refresh_token && data.refresh_token !== refreshToken) {
    await saveRefreshToken(data.refresh_token);
  } else if (!saved) {
    // First run on the env fallback: move it into the store so rotation works from now on.
    await saveRefreshToken(refreshToken);
  }
  return data.access_token;
}

/** Exchanges an OAuth code from /callback and stores the new refresh token. */
export async function exchangeCode(code) {
  const data = await tokenRequest({ grant_type: 'authorization_code', code, redirect_uri: REDIRECT_URI });
  if (!data.refresh_token) throw new Error('Spotify returned no refresh token');
  await saveRefreshToken(data.refresh_token);
}
