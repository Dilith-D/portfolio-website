/**
 * One-time script to get your Spotify refresh_token.
 * Run once, paste the token into Netlify env vars — never run again.
 *
 * Usage:
 *   node scripts/get-spotify-token.mjs
 *
 * Prerequisites:
 *   1. Go to https://developer.spotify.com/dashboard
 *   2. Create an app (any name)
 *   3. In app settings → Redirect URIs → add: http://localhost:3042/callback
 *   4. Copy Client ID and Client Secret
 *   5. Paste them below (or set as env vars SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET)
 */

import http from 'http';
import { exec } from 'child_process';

const CLIENT_ID     = process.env.SPOTIFY_CLIENT_ID     || 'PASTE_CLIENT_ID_HERE';
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || 'PASTE_CLIENT_SECRET_HERE';
const REDIRECT_URI  = 'http://localhost:3042/callback';
const PORT          = 3042;

const SCOPES = [
  'user-read-currently-playing',
  'user-read-recently-played',
].join(' ');

const authUrl =
  `https://accounts.spotify.com/authorize` +
  `?client_id=${CLIENT_ID}` +
  `&response_type=code` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&scope=${encodeURIComponent(SCOPES)}`;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  if (url.pathname !== '/callback') return;

  const code = url.searchParams.get('code');
  if (!code) {
    res.end('Missing code param');
    return;
  }

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type:   'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const data = await tokenRes.json();

  if (data.refresh_token) {
    console.log('\n✅ Got your refresh token:\n');
    console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
    console.log('Add these three env vars to Netlify → Site settings → Environment variables:\n');
    console.log(`  SPOTIFY_CLIENT_ID     = ${CLIENT_ID}`);
    console.log(`  SPOTIFY_CLIENT_SECRET = ${CLIENT_SECRET}`);
    console.log(`  SPOTIFY_REFRESH_TOKEN = ${data.refresh_token}`);
    res.end('<h2>Done — check your terminal for the token. You can close this tab.</h2>');
  } else {
    console.error('Error:', data);
    res.end(`<pre>${JSON.stringify(data, null, 2)}</pre>`);
  }

  server.close();
});

server.listen(PORT, () => {
  console.log(`\nOpening Spotify login...\n${authUrl}\n`);
  // Try to open the browser automatically
  const open =
    process.platform === 'win32'  ? `start "${authUrl}"` :
    process.platform === 'darwin' ? `open "${authUrl}"` :
    `xdg-open "${authUrl}"`;
  exec(open);
});
