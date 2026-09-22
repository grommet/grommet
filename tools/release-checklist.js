// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-await-in-loop, no-continue */
/* eslint-disable no-plusplus, no-restricted-syntax */

/**
 * Pre-release checklist helper for Grommet.
 *
 * Cross-references merged PRs since the last release tag to surface manual
 * QA work called out in the release wiki
 * (github.com/grommet/grommet/wiki/Release):
 *   - Which components changed, so they can be manually exercised in Storybook.
 *   - Which merged PRs touched component source without touching a test file.
 *   - A suggested semver bump (major/minor/patch) based on PR content.
 *   - PRs that look like new components/props, as a reminder to update
 *     grommet-designer.
 *   - A local git sanity check (clean tree, on master, in sync with origin).
 *
 * Usage:
 *   yarn release-checklist -- --from v2.55.0 --to HEAD
 *   yarn release-checklist -- --from v2.55.0
 *     # to defaults to HEAD
 *   yarn release-checklist
 *     # auto-detects --from from the latest tag
 *
 * Options:
 *   --from <tag>   Starting tag (exclusive). Auto-detected from latest
 *                  tag if omitted.
 *   --to   <ref>   Ending tag or branch (inclusive). Defaults to HEAD / master.
 *   --token <token> GitHub token (falls back to GH_TOKEN env var).
 *
 * Required GitHub token scopes: public_repo (or repo for private repos).
 */

import { execSync } from 'child_process';

const OWNER = 'grommet';
const REPO = 'grommet';
const API = `https://api.github.com/repos/${OWNER}/${REPO}`;
const GH_PR_URL = `https://github.com/${OWNER}/${REPO}/pull`;

/** PRs with any of these labels don't require manual QA or test coverage. */
const NON_CODE_LABELS = new Set([
  'dependencies',
  'chore',
  'ci',
  'documentation',
]);

// ── GitHub API helpers ───────────────────────────────────────────────────────

function parseArgs() {
  const argv = process.argv.slice(2);
  const args = { from: null, to: null, token: process.env.GH_TOKEN || null };
  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i];
    if (flag === '--from') args.from = argv[++i];
    else if (flag === '--to') args.to = argv[++i];
    else if (flag === '--token') args.token = argv[++i];
    else if (!flag.startsWith('--') && !args.from) args.from = flag;
    else if (!flag.startsWith('--') && !args.to) args.to = flag;
  }
  return args;
}

function getRequestHeaders(token) {
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

async function ghGet(url, token) {
  const res = await fetch(url, { headers: getRequestHeaders(token) });
  if (!res.ok) {
    const body = await res.text();
    if (res.status === 403 && body.includes('API rate limit exceeded')) {
      throw new Error(
        'GitHub API rate limit exceeded. Set GH_TOKEN or pass --token.',
      );
    }
    throw new Error(`GitHub API ${res.status} at ${url}:\n${body}`);
  }
  return res.json();
}

async function resolveRef(ref, token) {
  if (!ref || ref === 'HEAD') {
    const repo = await ghGet(`${API}`, token);
    const branch = await ghGet(`${API}/branches/${repo.default_branch}`, token);
    return {
      sha: branch.commit.sha,
      date: branch.commit.commit.committer.date,
    };
  }

  try {
    const tagRef = await ghGet(`${API}/git/refs/tags/${ref}`, token);
    let { sha } = tagRef.object;
    if (tagRef.object.type === 'tag') {
      const tagObj = await ghGet(`${API}/git/tags/${sha}`, token);
      sha = tagObj.object.sha;
    }
    const commit = await ghGet(`${API}/commits/${sha}`, token);
    return { sha, date: commit.commit.committer.date };
  } catch {
    const commit = await ghGet(`${API}/commits/${ref}`, token);
    return { sha: commit.sha, date: commit.commit.committer.date };
  }
}

async function getLatestTag(token) {
  const tags = await ghGet(`${API}/tags?per_page=5`, token);
  if (!tags.length) throw new Error('No tags found in repository.');
  return tags[0].name;
}

/** Fetch every changed file for a PR, following pagination. */
async function getPrFiles(number, token) {
  const files = [];
  let page = 1;
  for (;;) {
    const batch = await ghGet(
      `${API}/pulls/${number}/files?per_page=100&page=${page}`,
      token,
    );
    files.push(...batch);
    if (batch.length < 100) break;
    page++;
  }
  return files;
}

// ── File classification ──────────────────────────────────────────────────────

const TEST_FILE_PATTERN = /(^|\/)__tests__\/|[-.]test\.[jt]sx?$/i;
const STORY_FILE_PATTERN = /\.stories\.[jt]sx?$|(^|\/)stories\//i;
const COMPONENT_FILE_PATTERN = /^src\/js\/components\/([^/]+)\//;
const NON_CODE_ONLY_PATTERN =
  /\.(md|snap)$|\.d\.ts$|^(package\.json|yarn\.lock)$/i;

// A PR touching more components than this is treated as a repo-wide
// sweep/codemod (e.g. lint fix, license header pass) rather than a set of
// components needing individual manual QA.
const SWEEP_COMPONENT_THRESHOLD = 8;

function classifyPrFiles(files) {
  const touchedComponents = new Set();
  let hasTestChange = false;
  let hasCodeChange = false;

  for (const file of files) {
    const { filename } = file;
    if (TEST_FILE_PATTERN.test(filename)) {
      hasTestChange = true;
      continue;
    }
    if (STORY_FILE_PATTERN.test(filename)) continue;
    if (!NON_CODE_ONLY_PATTERN.test(filename)) hasCodeChange = true;

    const match = filename.match(COMPONENT_FILE_PATTERN);
    if (match) touchedComponents.add(match[1]);
  }

  return { touchedComponents, hasTestChange, hasCodeChange };
}

// ── Semver + designer heuristics ────────────────────────────────────────────

/**
 * Check the PR body's answer to the "Is this change backwards compatible or
 * is it a breaking change?" template question. The template question text
 * itself contains "breaking change", so we must read the answer written
 * after it rather than just search the whole body for that phrase.
 */
function isMarkedBreaking(body) {
  if (!body) return false;
  const lower = body.toLowerCase();
  const marker =
    'is this change backwards compatible or is it a breaking change?';
  const idx = lower.indexOf(marker);
  if (idx === -1) return false;

  const after = body.slice(idx + marker.length);
  const nextSection = after.indexOf('####');
  const answer = (nextSection === -1 ? after : after.slice(0, nextSection))
    .trim()
    .toLowerCase();

  return /breaking/.test(answer) && !/backwards compatible/.test(answer);
}

function suggestBump(prs) {
  const majorPrs = prs.filter(
    (pr) =>
      pr.labels.some((l) => /^(major|breaking)/i.test(l.name)) ||
      isMarkedBreaking(pr.body),
  );
  if (majorPrs.length > 0) {
    return {
      level: 'MAJOR',
      reason: 'a breaking-change label or note was found on:',
      prs: majorPrs,
    };
  }

  const minorPrs = prs.filter(
    (pr) =>
      pr.labels.some((l) => /^(minor|feature|new component)/i.test(l.name)) ||
      /^feat(\(|:)/i.test(pr.title || '') ||
      /new component/i.test(pr.title || ''),
  );
  if (minorPrs.length > 0) {
    return {
      level: 'MINOR',
      reason: 'new, notable, backwards-compatible features found on:',
      prs: minorPrs,
    };
  }

  return {
    level: 'PATCH',
    reason: 'only fixes/minor enhancements detected (verify manually).',
    prs: [],
  };
}

function findDesignerCandidates(prs) {
  return prs.filter(
    (pr) =>
      /new component/i.test(pr.title) ||
      /^feat(\(|:)/i.test(pr.title) ||
      pr.labels.some((l) => /^(new component|feature)$/i.test(l.name)),
  );
}

// ── Local git sanity checks ──────────────────────────────────────────────────

function checkGitStatus() {
  const warnings = [];
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD')
      .toString()
      .trim();
    if (branch !== 'master') {
      warnings.push(`Not on master (currently on "${branch}").`);
    }

    const dirty = execSync('git status --porcelain').toString().trim();
    if (dirty) {
      warnings.push('Working tree has local/uncommitted changes.');
    }

    execSync('git fetch origin master --quiet');
    const local = execSync('git rev-parse master').toString().trim();
    const remote = execSync('git rev-parse origin/master').toString().trim();
    if (local !== remote) {
      warnings.push(
        'Local master is not in sync with origin/master (run `git pull`).',
      );
    }
  } catch (error) {
    warnings.push(`Unable to fully verify git state: ${error.message}`);
  }
  return warnings;
}

// ── Main ─────────────────────────────────────────────────────────────────────

const args = parseArgs();

(async () => {
  console.log('── Git sanity check ──────────────────────────────────────\n');
  const gitWarnings = checkGitStatus();
  if (gitWarnings.length === 0) {
    console.log('OK: on master, clean tree, in sync with origin.\n');
  } else {
    gitWarnings.forEach((w) => console.log(`WARNING: ${w}`));
    console.log('');
  }

  let fromTag = args.from;
  if (!fromTag) {
    fromTag = await getLatestTag(args.token);
    console.log(`Auto-detected --from: ${fromTag}`);
  }
  const toValue = args.to || 'HEAD';
  console.log(`Comparing ${fromTag} → ${toValue}\n`);

  const fromRef = await resolveRef(fromTag, args.token);
  const toRef = await resolveRef(toValue, args.token);

  const compare = await ghGet(
    `${API}/compare/${fromRef.sha}...${toRef.sha}`,
    args.token,
  );
  if (compare.total_commits > compare.commits.length) {
    throw new Error(
      `Compare API returned only ${compare.commits.length} of ` +
        `${compare.total_commits} commits. Choose a smaller range.`,
    );
  }

  const prNumbers = new Set();
  for (const c of compare.commits) {
    const matches = c.commit.message.matchAll(/#(\d+)/g);
    for (const m of matches) prNumbers.add(Number(m[1]));
  }

  if (prNumbers.size === 0) {
    console.log('No PR references found in commits between these refs.');
    return;
  }

  // Fetch PR details with limited concurrency.
  const CONCURRENCY = 5;
  const numbers = Array.from(prNumbers);
  const prs = [];
  for (let i = 0; i < numbers.length; i += CONCURRENCY) {
    const batch = numbers.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      batch.map((n) =>
        ghGet(`${API}/pulls/${n}`, args.token).catch(() => null),
      ),
    );
    prs.push(...results.filter(Boolean));
  }

  const codePrs = prs.filter(
    (pr) => !pr.labels.some((l) => NON_CODE_LABELS.has(l.name)),
  );

  // Fetch changed files per PR, with limited concurrency.
  const prFiles = new Map();
  for (let i = 0; i < codePrs.length; i += CONCURRENCY) {
    const batch = codePrs.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      batch.map((pr) =>
        getPrFiles(pr.number, args.token)
          .then((files) => ({ number: pr.number, files }))
          .catch(() => ({ number: pr.number, files: [] })),
      ),
    );
    results.forEach(({ number, files }) => prFiles.set(number, files));
  }

  const touchedComponents = new Set();
  const missingTestsPrs = [];
  const sweepPrs = [];

  for (const pr of codePrs) {
    const files = prFiles.get(pr.number) || [];
    const {
      touchedComponents: prComponents,
      hasTestChange,
      hasCodeChange,
    } = classifyPrFiles(files);

    if (prComponents.size > SWEEP_COMPONENT_THRESHOLD) {
      sweepPrs.push({ pr, count: prComponents.size });
    } else {
      prComponents.forEach((c) => touchedComponents.add(c));
    }

    if (hasCodeChange && !hasTestChange) {
      missingTestsPrs.push(pr);
    }
  }

  console.log('── Components touched (manually verify in Storybook) ────\n');
  if (touchedComponents.size === 0) {
    console.log('No component source changes found.');
  } else {
    Array.from(touchedComponents)
      .sort()
      .forEach((c) => console.log(`[ ] ${c}`));
  }
  console.log(
    '\nInteract with each above in Storybook across Firefox, Safari, ' +
      'and Chrome.\n',
  );

  console.log('── Bulk/sweep PRs (spot-check only) ──────────────────────\n');
  if (sweepPrs.length === 0) {
    console.log('None found.');
  } else {
    sweepPrs.forEach(({ pr, count }) =>
      console.log(
        `[ ] #${pr.number} ${pr.title} — touched ${count} components ` +
          `(${GH_PR_URL}/${pr.number})`,
      ),
    );
    console.log(
      '\nThese touch many components at once (likely a codemod/lint/' +
        'formatting pass) and were excluded from the per-component list ' +
        'above. Spot-check a couple of affected components instead of ' +
        'testing all of them individually.',
    );
  }
  console.log('');

  console.log('── PRs missing jest test changes ─────────────────────────\n');
  if (missingTestsPrs.length === 0) {
    console.log('None found — every code PR touched a test file.');
  } else {
    missingTestsPrs.forEach((pr) =>
      console.log(`[ ] #${pr.number} ${pr.title} (${GH_PR_URL}/${pr.number})`),
    );
  }
  console.log('');

  console.log('── Suggested semver bump ──────────────────────────────────\n');
  const bump = suggestBump(codePrs);
  console.log(`${bump.level} — ${bump.reason}`);
  bump.prs.forEach((pr) =>
    console.log(`  #${pr.number} ${pr.title} (${GH_PR_URL}/${pr.number})`),
  );
  console.log('');

  console.log('── grommet-designer update candidates ────────────────────\n');
  const designerCandidates = findDesignerCandidates(codePrs);
  if (designerCandidates.length === 0) {
    console.log('None found.');
  } else {
    designerCandidates.forEach((pr) =>
      console.log(`[ ] #${pr.number} ${pr.title} (${GH_PR_URL}/${pr.number})`),
    );
  }
  console.log('');
})().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
