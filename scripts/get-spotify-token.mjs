/**
 * Re-authorise the Spotify Now Playing widget. Only needed if the token was revoked
 * (for example, access removed at spotify.com/account/apps). Normal rotation is automatic:
 * see netlify/lib/spotify.mjs.
 *
 * Usage:  node scripts/get-spotify-token.mjs
 *
 * Reads SPOTIFY_CLIENT_ID and SPOTIFY_AUTH_STATE from .env, then opens Spotify's authorise
 * page. After you approve, Spotify redirects to https://dilithdinesh.com/callback, which
 * stores the new refresh token in Netlify Blobs. Nothing to copy or paste.
 *
 * Prerequisite: https://dilithdinesh.com/callback is a Redirect URI in the Spotify app
 * (it is), and SPOTIFY_AUTH_STATE has the same value locally and in Netlify env.
 */

import { readFileSync } from 'fs';
import { exec } from 'child_process';

function readEnv() {
  const env = {};
  try {
    for (const line of readFileSync(new URL('../.env', import.meta.url), 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  } catch { /* no .env, fall back to process.env */ }
  return { ...env, ...process.env };
}

const env = readEnv();
const CLIENT_ID = env.SPOTIFY_CLIENT_ID;
const STATE     = env.SPOTIFY_AUTH_STATE;
if (!CLIENT_ID || !STATE) {
  console.error('Set SPOTIFY_CLIENT_ID and SPOTIFY_AUTH_STATE in .env first.');
  process.exit(1);
}

const authUrl = 'https://accounts.spotify.com/authorize?' + new URLSearchParams({
  client_id: CLIENT_ID,
  response_type: 'code',
  redirect_uri: 'https://dilithdinesh.com/callback',
  scope: 'user-read-currently-playing user-read-recently-played',
  state: STATE,
  show_dialog: 'true',
});

console.log('\nOpening Spotify. Approve access, then wait for "Spotify connected".\n');
console.log('If the browser does not open, paste this URL:\n' + authUrl + '\n');

const cmd = process.platform === 'win32' ? `start "" "${authUrl}"`
          : process.platform === 'darwin' ? `open "${authUrl}"`
          : `xdg-open "${authUrl}"`;
exec(cmd);
