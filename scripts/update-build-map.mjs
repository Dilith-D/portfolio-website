#!/usr/bin/env node
/**
 * Keeps public/build-map.html in step with git.
 *
 * The first 14 phases in PHASES are hand-curated and never touched. Everything after them,
 * between the AUTO-PHASES markers, is regenerated from `git log` on every run: one phase
 * per calendar month, oldest first, with real date ranges. The header stats (entries,
 * stages, days on-site, date range) are recomputed too.
 *
 * Why regenerate instead of append: the old version prepended every new commit into one
 * "Recent Updates" phase whose date was never updated, so from Jun 2026 to Nov 2026 the
 * page claimed nothing had happened after Jun 24.
 *
 * "Build map: auto-update commit log" commits are left out: they are the hook's own
 * bookkeeping, not site work.
 *
 * Run directly:  node scripts/update-build-map.mjs
 * Called by:     scripts/hooks/pre-push
 */
import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const HTML_PATH = join(ROOT, 'public', 'build-map.html');
const SITE_START = new Date('2026-03-08T00:00:00');

// Optional names for generated months. Months not listed get "Ongoing Works".
const MONTH_NAMES = {
  '2026-06': 'Clean Redesign and SEO',
  '2026-07': 'Delphi, Hardening and the VoiceStack Move',
  '2026-08': 'Hero Rebuild',
  '2026-10': 'AI PM Reframe and Reeve',
  '2026-11': 'Winledger and a Site the Agent Can Drive',
};

const START = '  // AUTO-PHASES:START';
const END = '  // AUTO-PHASES:END';

// Also runs as `prebuild` on Netlify so the deployed page is never one push behind the
// hook's own commit. A shallow clone would drop history from the generated phases, so in
// that case (or with no git at all) leave the committed file exactly as it is.
try {
  const shallow = execSync('git rev-parse --is-shallow-repository', { encoding: 'utf-8', cwd: ROOT }).trim();
  if (shallow === 'true') {
    console.log('build-map: shallow clone, keeping the committed build map.');
    process.exit(0);
  }
} catch {
  console.log('build-map: git unavailable, keeping the committed build map.');
  process.exit(0);
}

let html = readFileSync(HTML_PATH, 'utf-8');
const startIdx = html.indexOf(START);
const endIdx = html.indexOf(END);
if (startIdx === -1 || endIdx === -1) {
  console.error('build-map: AUTO-PHASES markers not found; nothing updated.');
  process.exit(0); // never block a push
}
const startLineEnd = html.indexOf('\n', startIdx);

// Hashes in the curated phases (everything before the generated block)
const curated = new Set([...html.slice(0, startIdx).matchAll(/hash:\s*'([0-9a-f]{7})'/g)].map(m => m[1]));

const log = execSync('git log --no-merges --format=%h%x1f%s%x1f%ad --date=format:%Y-%m-%d', {
  encoding: 'utf-8', cwd: ROOT,
}).trim().split('\n').filter(Boolean);

const all = log.map(line => {
  const [hash, msg, date] = line.split('\x1f');
  return { hash: hash.slice(0, 7), msg, date };
});

const fresh = all
  .filter(c => !curated.has(c.hash) && !/^Build map: auto-update/.test(c.msg))
  .reverse(); // oldest first

function classifyType(msg) {
  const m = msg.toLowerCase();
  if (m.startsWith('fix') || m.includes(': fix')) return 'fix';
  if (m.includes('design') || m.includes('style') || m.includes('css') || m.includes('hero')) return 'design';
  if (m.includes('analytics') || m.includes('posthog') || m.includes('ga4')) return 'analytics';
  if (m.includes('egg') || m.includes('easter')) return 'egg';
  if (m.startsWith('config') || m.startsWith('context') || m.includes('docs:') || m.startsWith('build map') || m.includes('settings') || m.includes('hook')) return 'config';
  if (m.startsWith('feat') || m.includes(': add ') || m.startsWith('add ')) return 'feat';
  return 'content';
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fmt = iso => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};
const range = (a, b) => {
  if (a === b) return fmt(a);
  if (a.slice(0, 4) === b.slice(0, 4)) return `${fmt(a).replace(/, \d{4}$/, '')} – ${fmt(b)}`;
  return `${fmt(a)} – ${fmt(b)}`;
};

// JS single-quoted string, also safe for the innerHTML the page renders it into
const lit = s => "'" + s
  .replace(/\\/g, '\\\\').replace(/'/g, "\\'")
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/\$\{/g, '$\\{') + "'";

const byMonth = new Map();
for (const c of fresh) {
  const key = c.date.slice(0, 7);
  if (!byMonth.has(key)) byMonth.set(key, []);
  byMonth.get(key).push(c);
}

const blocks = [...byMonth.entries()].map(([key, commits]) => {
  const name = MONTH_NAMES[key] ?? 'Ongoing Works';
  const rows = commits
    .map(c => `      { hash: '${c.hash}', msg: ${lit(c.msg)}, type: '${classifyType(c.msg)}' },`)
    .join('\n');
  return `  {
    icon: '',
    name: ${lit(name)},
    stage: 'Ongoing Works',
    date: '${range(commits[0].date, commits[commits.length - 1].date)}',
    commits: [
${rows}
    ]
  },`;
});

html = html.slice(0, startLineEnd + 1) + (blocks.length ? blocks.join('\n') + '\n' : '') + html.slice(endIdx);

// Header stats
const totalCommits = [...html.matchAll(/hash:\s*'[0-9a-f]{7}'/g)].length;
const totalPhases = [...html.matchAll(/^\s{4}name:\s*'/gm)].length;
const lastDate = all[0]?.date ?? '2026-03-08';
const days = Math.max(1, Math.round((new Date(`${lastDate}T00:00:00`) - SITE_START) / 86400000) + 1);
const sameYear = lastDate.startsWith('2026');
const eyebrowRange = sameYear ? `Mar 8 – ${fmt(lastDate)}` : `Mar 8, 2026 – ${fmt(lastDate)}`;

html = html
  .replace(/(<div class="stat-num" id="count-commits">)\d+(<\/div>)/, `$1${totalCommits}$2`)
  .replace(/(<div class="stat-num" id="count-phases">)\d+(<\/div>)/, `$1${totalPhases}$2`)
  .replace(/(<div class="stat-num" id="count-days">)\d+(<\/div>)/, `$1${days}$2`)
  .replace(/(Construction Log &nbsp;·&nbsp; )[^<]+(<\/div>)/, `$1${eyebrowRange}$2`)
  .replace(/\d+ commits\. \d+ build stages\. \d+ days on-site\./, `${totalCommits} commits. ${totalPhases} build stages. ${days} days on-site.`)
  .replace(/# site diary · \d+ entries, \d+ days on-site/, `# site diary · ${totalCommits} entries, ${days} days on-site`);

const before = readFileSync(HTML_PATH, 'utf-8');
if (before === html) {
  console.log('Build map is already up to date.');
} else {
  writeFileSync(HTML_PATH, html, 'utf-8');
  console.log(`Build map updated: ${totalCommits} entries, ${totalPhases} stages, ${days} days, through ${fmt(lastDate)}.`);
}
