// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
/** Only work categories exclude PRs; release-note opt-outs are ignored. */
const EXCLUDED_LABELS = new Map([
  ['dependencies', 'dependency'],
  ['dependency', 'dependency'],
  ['storybook', 'storybook'],
  ['chromatic', 'storybook'],
  ['ci', 'automation'],
  ['ci/cd', 'automation'],
  ['automation', 'automation'],
  ['release automation', 'automation'],
]);

/** Extract the description without testing instructions or template answers. */
export function getDescription(body) {
  const cleaned = (body || '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\r\n/g, '\n')
    .trim();
  const sections = cleaned.split(/^#{1,6}\s+(.+?)\s*#*\s*$/m);
  let description = sections[0];
  for (let i = 1; i < sections.length; i += 2) {
    if (
      /^(what does this pr do\??|summary|description)\s*$/i.test(sections[i])
    ) {
      description = sections[i + 1];
      break;
    }
  }

  return description
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .split('\n')
    .filter((line) => !/^\s*[-*]\s+\[[ x]\]/i.test(line))
    .map((line) => line.replace(/^\s*(?:[-*+]\s+|\d+\.\s+)/, '').trim())
    .filter(Boolean)
    .join(' ')
    .trim();
}

/** Identify type-only work without reclassifying mixed component changes. */
export function isTypeScriptChange(pr) {
  if ((pr.labels || []).some((label) => /^typescript$/i.test(label.name))) {
    return true;
  }

  const title = pr.title || '';
  return (
    /\b(?:typescript|type declarations?|type definitions?|type errors?|typings)\b|\b[\w-]+\.d\.ts\b/i.test(
      title,
    ) || /\b(?:add(?:ed)?|fix(?:ed)?|update(?:d)?)\b.*\btypes\b/i.test(title)
  );
}

/** Normalize the opening verb while retaining the description's detail. */
export function formatReleaseSentence(pr) {
  let text = (getDescription(pr.body) || pr.title || '')
    .trim()
    .replace(/[.!?]+$/, '');

  // Keep component names from conventional scopes when the title is needed.
  text = text.replace(
    /^(fix|feat|add|enhance|improve)\(([^)]+)\):\s*(.+)$/i,
    '$1 $2 $3',
  );
  text = text
    .replace(/^\[(?:fix|feat|enhancement)\]\s*/i, '')
    .replace(/^this (?:pr|pull request)\s+/i, '')
    .replace(
      /^([A-Z][A-Za-z0-9]*)\s*[:-]\s*(fix(?:es|ed)?|add(?:s|ed)?|enhance(?:s|d)?|improve(?:s|d)?)\s+/i,
      '$2 $1 ',
    );

  const verbGroups = [
    [
      'Fixed',
      /^(?:fix(?:es|ed)?|correct(?:s|ed)?|resolv(?:e|es|ed)|prevent(?:s|ed)?)\b[:\s-]*/i,
    ],
    ['Added', /^(?:add(?:s|ed)?|feat|introduc(?:e|es|ed))\b[:\s-]*/i],
    [
      'Enhanced',
      /^(?:enhance(?:s|d)?|improv(?:e|es|ed)|updat(?:e|es|ed)|refactor(?:s|ed)?|simplif(?:y|ies|ied)|remove(?:s|d)?)\b[:\s-]*/i,
    ],
  ];
  const opening = verbGroups.find(([, pattern]) => pattern.test(text));
  if (opening) {
    if (/^remove(?:s|d)?\b/i.test(text)) {
      return `Enhanced implementation by removing ${text.replace(
        opening[1],
        '',
      )}`;
    }
    return `${opening[0]} ${text.replace(opening[1], '')}`;
  }

  const title = pr.title || '';
  let verb = 'Enhanced';
  if (/\bfix(?:es|ed)?\b|\bbug\b/i.test(title)) verb = 'Fixed';
  else if (/\b(?:feat|add(?:ed)?|introduc(?:e|es|ed))\b/i.test(title)) {
    verb = 'Added';
  }
  return `${verb} ${text}`;
}

export function getSkipReason(pr) {
  const author = pr.user || {};
  if (
    author.type === 'Bot' ||
    /\[bot\]$/i.test(author.login || '') ||
    /^app\//i.test(author.login || '')
  ) {
    return 'bot';
  }

  const labels = (pr.labels || []).map((label) => label.name.toLowerCase());
  const excludedLabel = labels.find((label) => EXCLUDED_LABELS.has(label));
  if (excludedLabel) return EXCLUDED_LABELS.get(excludedLabel);

  // Inspect the stated purpose, not template boilerplate or incidental mentions
  // of stories, dependencies, or CI in testing/background sections.
  const purpose = [pr.title || '', getDescription(pr.body)];
  const dependencyPatterns = [
    /\b(?:update|upgrade|bump)\b.*\b(?:dependenc(?:y|ies)|styled[- ]components)\b/i,
    /\bdependenc(?:y|ies)\b.*\b(?:update|upgrade|bump)\b/i,
    /^(?:chore(?:\([^)]*\))?:\s*)?bump\s+\S+\s+from\s+\S+\s+to\s+/i,
    /^(?:build|chore)\(deps(?:-dev)?\):/i,
    /^(?:update|upgrade|bump)\s+\S+\s+(?:to\s+)?(?:v|\^|~)?\d+\.\d+/i,
  ];
  if (purpose.some((text) => dependencyPatterns.some((p) => p.test(text)))) {
    return 'dependency';
  }

  const storybookPattern =
    /^(?:(?:fix|feat|chore|docs|build)\((?:storybook|stories|chromatic)\):|(?:storybook|stories|chromatic)\b|(?:fix(?:ed|es)?|update[sd]?|improve[sd]?|enhance[sd]?|add(?:ed|s)?|upgrade[sd]?)\s+(?:the\s+)?(?:storybook|stories|chromatic)\b)/i;
  if (
    /\b(?:storybook|stories|chromatic)\b/i.test(pr.title || '') ||
    storybookPattern.test(purpose[1])
  ) {
    return 'storybook';
  }

  const automationPatterns = [
    /^(?:ci(?:\([^)]*\))?:|(?:build|chore|fix|feat)\((?:ci|release|automation|github-actions)\):)/i,
    /\b(?:ci|continuous integration|github actions?|release automation|release workflow|release pipeline|automated releases?)\b/i,
    /^(?:automate|automating)\b.*\brelease\b/i,
    /^release\s+v?\d+\.\d+\.\d+\b/i,
  ];
  if (purpose.some((text) => automationPatterns.some((p) => p.test(text)))) {
    return 'automation';
  }

  return null;
}
