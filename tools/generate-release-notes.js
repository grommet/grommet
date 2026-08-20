// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-await-in-loop, no-continue */
/* eslint-disable no-plusplus, no-restricted-syntax */

/**
 * Generate Grommet release notes from merged PRs between two Git tags.
 *
 * Usage:
 *   yarn generate-release-notes -- --from v2.55.0 --to v2.56.0
 *   yarn generate-release-notes -- --from v2.55.0
 *     # to defaults to HEAD
 *   yarn generate-release-notes -- --output RELEASE_NOTES.md
 *     # auto-detects --from
 *   yarn generate-release-announcement -- --from v2.55.0 --to v2.56.0
 *
 * Options:
 *   --from <tag>      Starting tag (exclusive). Auto-detected from latest
 *                     tag if omitted.
 *   --to   <tag|ref>  Ending tag or branch (inclusive). Defaults to HEAD /
 *                     master.
 *   --format <type>   Output type: release-notes | announcement. Defaults
 *                     by script name.
 *   --output <file>   Write markdown to file instead of stdout.
 *   --token <token>   GitHub token (falls back to GH_TOKEN env var).
 *
 * Required GitHub token scopes: public_repo (or repo for private repos).
 */

import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'fs';
import { join } from 'path';

const OWNER = 'grommet';
const REPO = 'grommet';
const API = `https://api.github.com/repos/${OWNER}/${REPO}`;
const GH_PR_URL = `https://github.com/${OWNER}/${REPO}/pull`;
const GH_RELEASE_URL = `https://github.com/${OWNER}/${REPO}/releases/tag`;
const GH_COMPARE_URL = `https://github.com/${OWNER}/${REPO}/compare`;

// ── Section configuration ───────────────────────────────────────────────────

/**
 * Map a GitHub label name to its release-notes section heading.
 * Add new component labels here as they are introduced in the repo.
 */
const LABEL_SECTION_MAP = new Map([
  ['DataTable', 'DataTable'],
  ['DateInput', 'DateInput'],
  ['DateTimeInput', 'DateTimeInput'],
  ['TimeInput', 'TimeInput'],
  ['FileInput', 'FileInput'],
  ['Select', 'Select / SelectMultiple'],
  ['SelectMultiple', 'Select / SelectMultiple'],
  ['List', 'List'],
  ['RadioButton', 'RadioButton / RadioButtonGroup'],
  ['RadioButtonGroup', 'RadioButton / RadioButtonGroup'],
  ['RangeSelector', 'RangeSelector'],
  ['TypeScript', 'TypeScript'],
  ['typescript', 'TypeScript'],
  ['Beta', 'Beta'],
  ['beta', 'Beta'],
  ['Calendar', 'Calendar'],
  ['TextInput', 'TextInput'],
  ['MaskedInput', 'MaskedInput'],
  ['Notification', 'Notification'],
  ['Layer', 'Layer'],
  ['Button', 'Button'],
  ['Form', 'Form'],
  ['FormField', 'FormField'],
  ['Stepper', 'Stepper'],
  ['Wizard', 'Wizard'],
  ['Tabs', 'Tabs'],
  ['Pagination', 'Pagination'],
  ['Menu', 'Menu'],
  ['Anchor', 'Anchor'],
  ['CheckBox', 'CheckBox'],
  ['CheckBoxGroup', 'CheckBox'],
  ['Data', 'Data'],
  ['DataChart', 'Chart / DataChart'],
  ['Chart', 'Chart / DataChart'],
  ['DataFilter', 'DataFilter'],
]);

/**
 * The order sections appear in the final output.
 * Sections not in this list are appended alphabetically at the end,
 * before TypeScript and Beta which are always last.
 */
const SECTION_ORDER = [
  'General',
  'Anchor',
  'Button',
  'Calendar',
  'Chart / DataChart',
  'CheckBox',
  'Data',
  'DataFilter',
  'DataTable',
  'DateInput',
  'DateTimeInput',
  'FileInput',
  'Form',
  'FormField',
  'Layer',
  'List',
  'MaskedInput',
  'Menu',
  'Notification',
  'Pagination',
  'RadioButton / RadioButtonGroup',
  'RangeSelector',
  'Select / SelectMultiple',
  'Stepper',
  'Tabs',
  'TextInput',
  'TimeInput',
  'TypeScript',
  'Beta',
];

/** PRs with any of these labels are silently excluded from the notes. */
const SKIP_LABELS = new Set([
  'skip-release-notes',
  'no-release-notes',
  'internal',
  'dependencies',
  'chore',
  'ci',
  'documentation',
]);

/** These labels force a PR into the Beta section. */
const BETA_LABELS = new Set(['beta', 'Beta']);

/**
 * Component sections that should always be grouped under Beta.
 * We auto-detect from source and merge these defaults as a fallback.
 */
const DEFAULT_BETA_COMPONENT_SECTIONS = new Set([
  'Stepper',
  'TimeInput',
  'Wizard',
]);

/** Component sections need at least this many entries to get their own heading. */
const MIN_COMPONENT_SECTION_SIZE = 3;

const BETA_WARNING_PATTERN =
  /currently in beta[\s\S]*api is subject\s+to\s+change/i;

function getSourceBetaComponentSections() {
  const componentRoot = join(process.cwd(), 'src', 'js', 'components');
  if (!existsSync(componentRoot)) return new Set();

  const betaComponents = new Set();
  const componentDirs = readdirSync(componentRoot);

  for (const entry of componentDirs) {
    const componentDir = join(componentRoot, entry);
    if (!statSync(componentDir).isDirectory()) continue;

    const componentFile = join(componentDir, `${entry}.js`);
    if (!existsSync(componentFile)) continue;

    try {
      const content = readFileSync(componentFile, 'utf8');
      if (BETA_WARNING_PATTERN.test(content)) {
        betaComponents.add(entry);
      }
    } catch {
      // Ignore file read/parsing issues and keep scanning.
    }
  }

  return betaComponents;
}

const BETA_COMPONENT_SECTIONS = new Set([
  ...Array.from(DEFAULT_BETA_COMPONENT_SECTIONS),
  ...Array.from(getSourceBetaComponentSections()),
]);

// ── GitHub API helpers ───────────────────────────────────────────────────────

function parseArgs() {
  const argv = process.argv.slice(2);
  const scriptName = process.argv[1] || '';
  const args = {
    from: null,
    to: null,
    format: scriptName.includes('announcement')
      ? 'announcement'
      : 'release-notes',
    output: null,
    token: process.env.GH_TOKEN || null,
  };
  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i];
    if (flag === '--from') args.from = argv[++i];
    else if (flag === '--to') args.to = argv[++i];
    else if (flag === '--format') args.format = argv[++i];
    else if (flag === '--output') args.output = argv[++i];
    else if (flag === '--token') args.token = argv[++i];
    else if (!flag.startsWith('--') && !args.from) {
      // Positional: first non-flag arg is --from, second is --to
      args.from = flag;
    } else if (!flag.startsWith('--') && !args.to) {
      args.to = flag;
    }
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
  const res = await fetch(url, {
    headers: getRequestHeaders(token),
  });
  if (!res.ok) {
    const body = await res.text();
    if (res.status === 403 && body.includes('API rate limit exceeded')) {
      throw new Error(
        'GitHub API rate limit exceeded. ' +
          'Set GH_TOKEN or pass --token to generate release output.',
      );
    }
    throw new Error(`GitHub API ${res.status} at ${url}:\n${body}`);
  }
  return res.json();
}

/**
 * Resolve a tag name, branch name, or commit SHA to a commit SHA + date.
 * Handles both lightweight and annotated tags.
 */
async function resolveRef(ref, token) {
  if (!ref || ref === 'HEAD') {
    // Resolve to the default branch's tip
    const repo = await ghGet(`${API}`, token);
    const branch = await ghGet(`${API}/branches/${repo.default_branch}`, token);
    return {
      sha: branch.commit.sha,
      date: branch.commit.commit.committer.date,
    };
  }

  // Try tag ref first
  try {
    const tagRef = await ghGet(`${API}/git/refs/tags/${ref}`, token);
    let { sha } = tagRef.object;
    // Annotated tag → resolve the tag object to get the commit SHA
    if (tagRef.object.type === 'tag') {
      const tagObj = await ghGet(`${API}/git/tags/${sha}`, token);
      sha = tagObj.object.sha;
    }
    const commit = await ghGet(`${API}/commits/${sha}`, token);
    return { sha, date: commit.commit.committer.date };
  } catch {
    // Not a tag — try as a branch or bare commit SHA
    const commit = await ghGet(`${API}/commits/${ref}`, token);
    return { sha: commit.sha, date: commit.commit.committer.date };
  }
}

/** Return the name of the most recent tag in the repo. */
async function getLatestTag(token) {
  const tags = await ghGet(`${API}/tags?per_page=5`, token);
  if (!tags.length) throw new Error('No tags found in repository.');
  return tags[0].name;
}

// ── PR analysis ──────────────────────────────────────────────────────────────

/**
 * Check the PR body's answer to the release-notes template question.
 * Returns false only when the maintainer explicitly answered no.
 */
function includeByBody(body) {
  if (!body) return true;
  const lower = body.toLowerCase();
  const marker = 'should this pr be mentioned in the release notes?';
  const idx = lower.indexOf(marker);
  if (idx === -1) return true; // Pre-template PR → include

  // Extract the answer block between this heading and the next ####
  const after = body.slice(idx + marker.length);
  const nextSection = after.indexOf('####');
  const answer = (nextSection === -1 ? after : after.slice(0, nextSection))
    .trim()
    .split('\n')[0]
    .trim()
    .toLowerCase();

  if (!answer) return true;

  const negative = new Set(['no', 'n', 'n/a', 'na', '-', 'nope', 'false']);
  return !negative.has(answer);
}

function shouldSkipByContent(pr) {
  const title = (pr.title || '').toLowerCase();
  const body = (pr.body || '').toLowerCase();
  const combined = `${title}\n${body}`;

  const dependencyPatterns = [
    /\bupdate\b.*\bdependenc(y|ies)\b/,
    /\bdependenc(y|ies)\b.*\bupdate\b/,
    /\bupdate styled components\b/,
    /\bbump\b.*\b(dependency|dependencies)\b/,
    /\bupgrade\b.*\b(dependency|dependencies|styled-components)\b/,
  ];

  if (dependencyPatterns.some((pattern) => pattern.test(combined))) {
    return { skip: true, reason: 'dependency' };
  }

  const chorePatterns = [/\bchore\s*[:(]/, /^new chore\b/];

  if (chorePatterns.some((pattern) => pattern.test(title))) {
    return { skip: true, reason: 'chore' };
  }

  const storybookPatterns = [/\bstorybook\b/, /\bchromatic\b/, /\bstories\b/];

  if (storybookPatterns.some((pattern) => pattern.test(title))) {
    return { skip: true, reason: 'storybook' };
  }

  return { skip: false, reason: null };
}

/**
 * Map PR labels to a release-notes section heading.
 * Falls back to title-prefix detection, then "General".
 */
function getSection(pr) {
  const labelNames = pr.labels.map((l) => l.name);

  if (labelNames.some((l) => BETA_LABELS.has(l))) return 'Beta';
  if (labelNames.some((l) => l === 'TypeScript' || l === 'typescript'))
    return 'TypeScript';

  for (const label of labelNames) {
    const section = LABEL_SECTION_MAP.get(label);
    if (section) return section;
  }

  // Conventional commit scope heuristic: "feat(Wizard): ..."
  const scopeMatch = pr.title.match(/^[A-Za-z]+\(([^)]+)\):/);
  if (scopeMatch) {
    const scope = scopeMatch[1].trim();
    for (const [label, section] of LABEL_SECTION_MAP) {
      if (label.toLowerCase() === scope.toLowerCase()) return section;
    }
  }

  // Title-prefix heuristic for unlabelled PRs
  // Matches: "DataTable - Fix...", "DataTable: Fix...", "DataTable fix..."
  const titleLower = pr.title.toLowerCase();
  for (const [label, section] of LABEL_SECTION_MAP) {
    const prefix = label.toLowerCase();
    if (
      titleLower.startsWith(`${prefix} `) ||
      titleLower.startsWith(`${prefix}:`) ||
      titleLower.startsWith(`${prefix}-`) ||
      titleLower.startsWith(`${prefix},`)
    ) {
      return section;
    }
  }

  return 'General';
}

/**
 * Format a single PR as a release-notes bullet entry.
 * Uses the PR title directly (maintainers clean up titles before merging).
 */
function formatEntry(pr) {
  const sentence = formatReleaseSentence(pr).replace(/[.!?]+$/, '');
  return `- ${sentence}. ([${pr.title} #${pr.number}](${GH_PR_URL}/${pr.number}))`;
}

function lowerFirst(value) {
  if (!value) return value;
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function formatReleaseSentence(pr) {
  const raw = pr.title.trim().replace(/[.!?]+$/, '');
  const fixMatch = raw.match(/^fix\(([^)]+)\):\s*(.+)$/i);
  if (fixMatch) {
    const [, area, detail] = fixMatch;
    return `Fixed ${area} ${lowerFirst(detail)}`;
  }

  const featMatch = raw.match(/^feat\(([^)]+)\):\s*(.+)$/i);
  if (featMatch) {
    const [, area, detail] = featMatch;
    return `Added ${area} ${lowerFirst(detail)}`;
  }

  const updateMatch = raw.match(
    /^(enhance|enhanced|improve|improved)\(([^)]+)\):\s*(.+)$/i,
  );
  if (updateMatch) {
    const [, , area, detail] = updateMatch;
    return `Enhanced ${area} ${lowerFirst(detail)}`;
  }

  // Matches common style: "TimeInput - fix input pending"
  const dashedMatch = raw.match(
    /^([A-Za-z][A-Za-z0-9/\s-]*)\s*-\s*(fix|feat|add|improve|enhance)\s*(.+)$/i,
  );
  if (dashedMatch) {
    const [, area, verb, detail] = dashedMatch;
    if (/fix/i.test(verb)) return `Fixed ${area.trim()} ${detail.trim()}`;
    if (/feat|add/i.test(verb)) return `Added ${area.trim()} ${detail.trim()}`;
    return `Enhanced ${area.trim()} ${detail.trim()}`;
  }

  if (/^fix\b/i.test(raw)) return `Fixed ${raw.replace(/^fix\b[:\s-]*/i, '')}`;
  if (/^feat\b/i.test(raw))
    return `Added ${raw.replace(/^feat\b[:\s-]*/i, '')}`;
  if (/^(add|added)\b/i.test(raw))
    return `Added ${raw.replace(/^(add|added)\b[:\s-]*/i, '')}`;
  if (/^(improve|improved|enhance|enhanced)\b/i.test(raw))
    return `Enhanced ${raw.replace(
      /^(improve|improved|enhance|enhanced)\b[:\s-]*/i,
      '',
    )}`;

  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

function formatTitlePhrase(title) {
  const trimmed = title.trim().replace(/[.!?]+$/, '');
  return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
}

function humanJoin(items) {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

function unique(items) {
  return items.filter((item, index) => item && items.indexOf(item) === index);
}

function getAnnouncementHighlights(prs) {
  const highlightMatchers = [/^added\b/i, /^enhanced\b/i, /^improved\b/i];
  return prs
    .filter((pr) => highlightMatchers.some((matcher) => matcher.test(pr.title)))
    .slice(0, 2)
    .map((pr) => formatTitlePhrase(pr.title));
}

function getFixSummary(prs) {
  const fixSections = unique(
    prs
      .filter((pr) => /^fixed\b/i.test(pr.title))
      .map((pr) => pr.section)
      .filter(
        (section) => section && section !== 'General' && section !== 'Beta',
      ),
  );

  if (fixSections.length === 0) return null;

  const listedSections = fixSections.slice(0, 5);
  const suffix = fixSections.length > 5 ? ', and more' : '';
  return `There are also fixes across ${humanJoin(listedSections)}${suffix}.`;
}

function formatContributors(prs) {
  const contributors = unique(
    prs
      .map((pr) => pr.user?.login)
      .filter((login) => login && login !== 'app/dependabot'),
  );

  if (contributors.length === 0) return null;

  const linkedContributors = contributors.map(
    (login) => `<https://github.com/${login}|${login}>`,
  );

  return (
    'Thank you to everyone who contributed to this release ' +
    `${humanJoin(linkedContributors)}!`
  );
}

function inferNextReleaseTag(fromTag, toValue) {
  if (toValue && /^v\d+\.\d+\.\d+$/i.test(toValue)) return toValue;
  const match = (fromTag || '').match(/^v(\d+)\./i);
  if (match) return `v${match[1]}.x.x`;
  return 'v2.x.x';
}

function extractComponentName(pr) {
  const title = (pr.title || '').trim();

  const scopeMatch = title.match(/^[A-Za-z]+\(([^)]+)\):/);
  if (scopeMatch) return scopeMatch[1].trim();

  const dashedMatch = title.match(/^([A-Za-z][A-Za-z0-9]+)/);
  if (dashedMatch) return dashedMatch[1].trim();

  return null;
}

/** Look for a known component name anywhere in the PR title. */
function inferComponentFromText(pr) {
  const text = pr.title || '';
  for (const [label, section] of LABEL_SECTION_MAP) {
    if (new RegExp(`\\b${label}\\b`, 'i').test(text)) return section;
  }
  return null;
}

function resolveHighlightComponent(pr) {
  if (pr.section && pr.section !== 'General') return pr.section;
  return extractComponentName(pr) || inferComponentFromText(pr) || pr.section;
}

function getFixComponents(prs) {
  const fixed = [];
  for (const pr of prs) {
    const title = (pr.title || '').toLowerCase();
    if (!/\bfix(e[ds])?\b/.test(title)) continue;

    const component = resolveHighlightComponent(pr);
    if (!component || component === 'General' || component === 'Beta') continue;
    if (!fixed.includes(component)) fixed.push(component);
  }
  return fixed;
}

function getEnhancementComponents(prs) {
  const enhanced = [];
  for (const pr of prs) {
    const title = (pr.title || '').toLowerCase();
    if (/\bfix(e[ds])?\b/.test(title)) continue;

    const component = resolveHighlightComponent(pr);
    if (!component || component === 'General' || component === 'Beta') continue;
    if (!enhanced.includes(component)) enhanced.push(component);
  }
  return enhanced;
}

function formatBetaDescription(pr) {
  const title = (pr.title || '').trim().replace(/[.!?]+$/, '');
  const lower = title.toLowerCase();
  const component = extractComponentName(pr) || 'Component';

  if (/feat\(|\badd\b/.test(lower)) {
    return `${component} - allows you to guide users through multi-step forms.`;
  }

  if (/fix/.test(lower)) {
    return `${component} - includes important bug fixes.`;
  }

  return `${component} - includes beta updates.`;
}

function getNewBetaComponentLines(prs) {
  const betaAdds = prs.filter((pr) => {
    const title = (pr.title || '').toLowerCase();
    if (pr.section !== 'Beta') return false;
    if (title.startsWith('feat(')) return true;
    if (title.startsWith('add') && title.includes('component')) return true;
    return false;
  });

  const seen = new Set();
  const lines = [];
  for (const pr of betaAdds) {
    const component = extractComponentName(pr);
    if (!component || seen.has(component.toLowerCase())) continue;
    seen.add(component.toLowerCase());
    lines.push(
      `- **${component}** - allows you to guide users through multi-step forms.`,
    );
  }

  return lines;
}

function normalizeSection(section) {
  if (BETA_COMPONENT_SECTIONS.has(section)) return 'Beta';
  return section;
}

function mentionsBetaComponent(pr) {
  const text = `${pr.title || ''}\n${pr.body || ''}`.toLowerCase();
  return Array.from(BETA_COMPONENT_SECTIONS).some((name) =>
    text.includes(name.toLowerCase()),
  );
}

function shouldForceIncludeAsBeta(pr) {
  if (mentionsBetaComponent(pr)) return true;
  const section = normalizeSection(getSection(pr));
  return section === 'Beta';
}

function buildReleaseSections(prs) {
  const sections = new Map(SECTION_ORDER.map((s) => [s, []]));

  const counts = new Map();
  for (const pr of prs) {
    const normalizedSection = normalizeSection(pr.section);
    counts.set(normalizedSection, (counts.get(normalizedSection) || 0) + 1);
  }

  for (const pr of prs) {
    const normalizedSection = normalizeSection(pr.section);
    let targetSection = normalizedSection;

    const isCoreSection =
      normalizedSection === 'General' ||
      normalizedSection === 'Beta' ||
      normalizedSection === 'TypeScript';

    if (
      !isCoreSection &&
      (counts.get(normalizedSection) || 0) < MIN_COMPONENT_SECTION_SIZE
    ) {
      targetSection = 'General';
    }

    if (!sections.has(targetSection)) sections.set(targetSection, []);
    sections.get(targetSection).push(formatEntry(pr));
  }

  return sections;
}

// ── Output formatting ────────────────────────────────────────────────────────

function buildSectionOrder(populatedSections) {
  const known = new Set(SECTION_ORDER);
  const extra = Array.from(populatedSections.keys())
    .filter((s) => !known.has(s))
    .sort();

  // Insert extras before TypeScript and Beta (the last two)
  const ordered = [
    ...SECTION_ORDER.slice(0, -2),
    ...extra,
    ...SECTION_ORDER.slice(-2),
  ];
  return ordered;
}

function formatReleaseNotes(sections) {
  const order = buildSectionOrder(sections);
  const blocks = [];

  for (const name of order) {
    const entries = sections.get(name);
    if (!entries || entries.length === 0) continue;

    const heading = `${name}:`;

    // Only print the section heading when there are multiple sections
    // (matches the pattern: single-section releases omit headings)
    blocks.push({ heading, entries });
  }

  // Suppress headings if only one section has content
  const lines = [];
  if (blocks.length === 1 && blocks[0].heading === 'General:') {
    for (const e of blocks[0].entries) lines.push(e);
  } else {
    for (const { heading, entries } of blocks) {
      lines.push(heading);
      lines.push('');
      for (const e of entries) lines.push(e);
      lines.push('');
    }
  }

  return lines.join('\n').trim();
}

function describeHighlightGroup(components, singular, plural, article) {
  if (components.length === 0) return null;
  if (components.length === 1) {
    return `${article} ${singular} to ${components[0]}`;
  }
  return `${plural} to ${humanJoin(components)}`;
}

function formatAnnouncement(context) {
  const fixComponents = getFixComponents(context.prs);
  const enhancementComponents = getEnhancementComponents(context.prs);
  const betaLines = getNewBetaComponentLines(context.prs);

  const clauses = [
    describeHighlightGroup(fixComponents, 'fix', 'fixes', 'a'),
    describeHighlightGroup(
      enhancementComponents,
      'enhancement',
      'enhancements',
      'an',
    ),
  ].filter(Boolean);

  const summaryLine =
    clauses.length > 0
      ? `This release included ${clauses.join(
          ' as well as ',
        )}. Check out the full <${
          context.releaseUrl
        }|release notes> for details.`
      : `Check out the full <${context.releaseUrl}|release notes> for details.`;

  const lines = [
    `Grommet ${context.releaseLabel} is released`,
    '',
    summaryLine,
  ];

  if (betaLines.length > 0) {
    lines.push('');
    lines.push('**New BETA components** *(APIs are subject to change)*:');
    lines.push('');
    lines.push(...betaLines);
  }

  return lines.join('\n').trim();
}

// ── Main ─────────────────────────────────────────────────────────────────────

const args = parseArgs();

(async () => {
  // ── 1. Resolve refs ────────────────────────────────────────────────────────
  let fromTag = args.from;
  if (!fromTag) {
    fromTag = await getLatestTag(args.token);
    console.error(`Auto-detected --from: ${fromTag}`);
  }

  const toValue = args.to || 'HEAD';
  console.error(`Resolving refs: ${fromTag} → ${toValue}`);

  const fromRef = await resolveRef(fromTag, args.token);
  const toRef = await resolveRef(toValue, args.token);

  // ── 2. Get commits between the two refs ────────────────────────────────────
  console.error(`Fetching commits between ${fromTag} and ${toValue}...`);

  const compare = await ghGet(
    `${API}/compare/${fromRef.sha}...${toRef.sha}`,
    args.token,
  );

  // Extract PR numbers embedded in commit messages.
  // GitHub squash-merge format:  "PR title (#1234)"
  // GitHub merge-commit format:  "Merge pull request #1234 from ..."
  const prNumbers = new Set();
  for (const c of compare.commits) {
    const matches = c.commit.message.matchAll(/#(\d+)/g);
    for (const m of matches) prNumbers.add(Number(m[1]));
  }

  if (prNumbers.size === 0) {
    console.error('No PR references found in commits. Output will be empty.');
  } else {
    console.error(`Found ${prNumbers.size} PR reference(s) in commits.`);
  }

  // ── 3. Fetch full PR details (for labels and body) ─────────────────────────
  // Batch with a small concurrency limit to avoid rate limiting.
  const CONCURRENCY = 5;
  // Array.from (not spread) - the repo's loose-mode babel preset compiles
  // `[...set]` to `[].concat(set)`, which mishandles non-array iterables.
  const numbers = Array.from(prNumbers);
  const prs = [];
  const failedPulls = [];
  for (let i = 0; i < numbers.length; i += CONCURRENCY) {
    const batch = numbers.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      batch.map((n) =>
        ghGet(`${API}/pulls/${n}`, args.token)
          .then((pr) => ({ pr }))
          .catch((error) => ({ error, number: n })),
      ),
    );
    prs.push(
      ...results.filter((result) => result.pr).map((result) => result.pr),
    );
    failedPulls.push(
      ...results.filter((result) => result.error).map((result) => result.error),
    );
  }

  if (prs.length === 0 && failedPulls.length > 0) {
    throw failedPulls[0];
  }

  if (failedPulls.length > 0) {
    console.error(`Warning: failed to fetch ${failedPulls.length} PR(s).`);
  }

  // ── 4. Filter, classify, and group ────────────────────────────────────────
  const includedPrs = [];
  let included = 0;
  let skipped = 0;

  for (const pr of prs) {
    const labels = pr.labels.map((l) => l.name);

    if (labels.some((l) => SKIP_LABELS.has(l))) {
      console.error(`  skip [label]   #${pr.number}: ${pr.title}`);
      skipped++;
      continue;
    }
    const forceIncludeAsBeta = shouldForceIncludeAsBeta(pr);
    if (!forceIncludeAsBeta && !includeByBody(pr.body)) {
      console.error(`  skip [body]    #${pr.number}: ${pr.title}`);
      skipped++;
      continue;
    }

    const contentSkip = shouldSkipByContent(pr);
    if (contentSkip.skip) {
      console.error(
        `  skip [${contentSkip.reason}] #${pr.number}: ${pr.title}`,
      );
      skipped++;
      continue;
    }

    if (forceIncludeAsBeta && !includeByBody(pr.body)) {
      console.error(`  include [beta-override] #${pr.number}: ${pr.title}`);
    }

    const section = forceIncludeAsBeta ? 'Beta' : getSection(pr);
    console.error(`  include [${section}] #${pr.number}: ${pr.title}`);

    includedPrs.push({ ...pr, section });
    included++;
  }

  const sections = buildReleaseSections(includedPrs);

  console.error(`\nSummary: ${included} included, ${skipped} skipped.\n`);

  // ── 5. Format and output ───────────────────────────────────────────────────
  const inferredReleaseTag = inferNextReleaseTag(fromTag, toValue);
  const releaseLabel =
    toValue !== 'HEAD' && /^v\d/.test(toValue)
      ? toValue
      : inferredReleaseTag || `changes through ${toValue}`;
  const releaseUrl =
    toValue !== 'HEAD' && /^v\d/.test(toValue)
      ? `${GH_RELEASE_URL}/${toValue}`
      : `${GH_COMPARE_URL}/${fromTag}...${toRef.sha}`;
  const markdown =
    args.format === 'announcement'
      ? formatAnnouncement({
          prs: includedPrs,
          releaseLabel,
          releaseUrl,
          sections,
        })
      : formatReleaseNotes(sections);

  if (args.output) {
    writeFileSync(args.output, `${markdown}\n`, 'utf8');
    console.error(`Release notes written to ${args.output}`);
  } else {
    process.stdout.write(`${markdown}\n`);
  }
})().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
