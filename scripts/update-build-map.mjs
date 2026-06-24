#!/usr/bin/env node
/**
 * Auto-updates commit-timeline.html with commits not yet in the PHASES data.
 * New commits land in a "Recent Updates" phase (created if absent, prepended if present).
 * Also refreshes the commit count and phase count stats in the header.
 *
 * Run directly:  node scripts/update-build-map.mjs
 * Called by:     .git/hooks/pre-push
 */
import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const HTML_PATH = join(ROOT, 'commit-timeline.html');

let html = readFileSync(HTML_PATH, 'utf-8');

// All 7-char hashes already in PHASES
const knownHashes = new Set(
  [...html.matchAll(/hash:\s*'([0-9a-f]{7})'/g)].map(m => m[1])
);

// Every commit in the repo
const gitLog = execSync(
  'git log --format="%h|||%s|||%ad" --date=format:"%b %d, %Y"',
  { encoding: 'utf-8', cwd: ROOT }
).trim().split('\n');

const newCommits = [];
for (const line of gitLog) {
  const [hash, msg, date] = line.split('|||');
  const h = hash?.trim();
  if (h && !knownHashes.has(h)) {
    newCommits.push({ hash: h, msg: msg?.trim() ?? '', date: date?.trim() ?? '' });
  }
}

if (newCommits.length === 0) {
  console.log('Build map is already up to date.');
  process.exit(0);
}

function classifyType(msg) {
  const m = msg.toLowerCase();
  if (m.startsWith('fix') || m.includes(': fix')) return 'fix';
  if (m.includes('design') || m.includes('style') || m.includes('css')) return 'design';
  if (m.includes('analytics') || m.includes('posthog') || m.includes('ga4')) return 'analytics';
  if (m.includes('egg') || m.includes('easter')) return 'egg';
  if (m.startsWith('config') || m.includes('docs:') || m.includes('build map') || m.includes('settings')) return 'config';
  if (m.startsWith('feat') || m.includes(': add ') || m.startsWith('add ')) return 'feat';
  return 'content';
}

// Oldest-first so the phase reads chronologically
const ordered = [...newCommits].reverse();
const commitsJs = ordered
  .map(c => `      { hash: '${c.hash}', msg: '${c.msg.replace(/'/g, "\\'")}', type: '${classifyType(c.msg)}' }`)
  .join(',\n');

const firstDate = ordered[0]?.date ?? '';
const lastDate  = ordered[ordered.length - 1]?.date ?? '';
const dateRange = firstDate === lastDate ? firstDate : `${firstDate} – ${lastDate}`;

if (html.includes("name: 'Recent Updates'")) {
  // Prepend into the existing Recent Updates phase
  html = html.replace(
    /(name:\s*'Recent Updates'[\s\S]*?commits:\s*\[\n)/,
    `$1${commitsJs},\n`
  );
} else {
  // Append a new Recent Updates phase before the closing ];
  const phase = `  {
    icon: '📝',
    name: 'Recent Updates',
    date: '${dateRange}',
    color: '#94a3b8',
    commits: [
${commitsJs}
    ]
  }`;
  html = html.replace(/(\s*\];\s*\nconst TYPE_LABELS)/, `,\n${phase}\n$1`);
}

// Recount totals from the updated HTML
const totalCommits = [...html.matchAll(/hash:\s*'[0-9a-f]{7}'/g)].length;
const totalPhases  = [...html.matchAll(/icon:\s*'[^']+',\s*\n\s*name:\s*'/g)].length;

// Update #count-commits
html = html.replace(
  /(<div class="stat-num" id="count-commits">)\d+(<\/div>)/,
  `$1${totalCommits}$2`
);

// Update #count-phases (id added by this script's first run; falls back to positional replace)
if (html.includes('id="count-phases"')) {
  html = html.replace(
    /(<div class="stat-num" id="count-phases">)\d+(<\/div>)/,
    `$1${totalPhases}$2`
  );
}

// Update hero paragraph count references (e.g. "85 of them, across 14 phases")
html = html.replace(
  /(\d+) of them, across (\d+) phases/,
  `${totalCommits} of them, across ${totalPhases} phases`
);

// Update footer git log line
html = html.replace(
  /git log --oneline --all \| wc -l → \d+/,
  `git log --oneline --all | wc -l → ${totalCommits}`
);

writeFileSync(HTML_PATH, html, 'utf-8');
console.log(`Build map updated: +${newCommits.length} commit(s) → ${totalCommits} total, ${totalPhases} phases.`);
