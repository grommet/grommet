// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
/**
 * Suggests a patch/minor/major version bump (sourced from
 * release-checklist.js's PR-label/breaking-change analysis, written to
 * RELEASE_CHECKLIST.md) and updates package.json + CHANGELOG.md with the
 * release-notes draft (RELEASE_NOTES_DRAFT.md, produced by
 * generate-release-notes.js).
 *
 * This only proposes a change for human review in a PR — it never tags,
 * publishes, or merges anything itself.
 *
 * Env vars:
 *   BUMP_OVERRIDE  'patch' | 'minor' | 'major' (explicit decision required)
 *   CHECKLIST_REVIEWED 'true' after a maintainer reviews the candidate
 *
 * Writes GitHub Actions outputs: version, bump.
 */
import { readFileSync, writeFileSync, appendFileSync } from 'fs';

const NOTES_PATH = 'RELEASE_NOTES_DRAFT.md';
const CHECKLIST_PATH = 'RELEASE_CHECKLIST.md';
const PACKAGE_PATH = 'package.json';
const CHANGELOG_PATH = 'CHANGELOG.md';

function suggestBump(checklist) {
  // release-checklist.js prints a "MAJOR/MINOR/PATCH — <reason>" line
  // right after this heading; defer to its PR-label/breaking-change-note
  // analysis rather than re-deriving a weaker heuristic here.
  const match = checklist.match(
    /── Suggested semver bump ─+\n\n(MAJOR|MINOR|PATCH)\b/,
  );
  if (!match) {
    throw new Error(
      'Could not find a suggested semver bump in RELEASE_CHECKLIST.md',
    );
  }
  return match[1].toLowerCase();
}

function bumpVersion(current, bump) {
  const [major, minor, patch] = current.split('.').map(Number);
  if (bump === 'major') return `${major + 1}.0.0`;
  if (bump === 'minor') return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

function setGithubOutput(name, value) {
  const outputFile = process.env.GITHUB_OUTPUT;
  if (outputFile) appendFileSync(outputFile, `${name}=${value}\n`);
}

const notes = readFileSync(NOTES_PATH, 'utf8').trim();
const checklist = readFileSync(CHECKLIST_PATH, 'utf8');
const bump = process.env.BUMP_OVERRIDE;
if (process.env.CHECKLIST_REVIEWED !== 'true') {
  throw new Error('Review the release checklist before creating a release PR.');
}
if (!['patch', 'minor', 'major'].includes(bump)) {
  throw new Error('Explicitly select patch, minor, or major after review.');
}
const suggested = suggestBump(checklist);
if (!notes || !/^[-*] /m.test(notes)) {
  throw new Error('Release notes must contain reviewed change entries.');
}

const pkg = JSON.parse(readFileSync(PACKAGE_PATH, 'utf8'));
if (!/^\d+\.\d+\.\d+$/.test(pkg.version)) {
  throw new Error('Expected a stable package version in package.json.');
}
const nextVersion = bumpVersion(pkg.version, bump);
pkg.version = nextVersion;
writeFileSync(PACKAGE_PATH, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8');

const changelog = readFileSync(CHANGELOG_PATH, 'utf8');
const entry = `# ${nextVersion}\n\n${notes}\n\n`;
writeFileSync(CHANGELOG_PATH, entry + changelog, 'utf8');

console.log(
  `Checklist suggestion: ${suggested}; selected: ${bump} -> v${nextVersion}`,
);
setGithubOutput('version', nextVersion);
setGithubOutput('bump', bump);

// Fill the repository's actual PR template so new sections stay visible.
const template = readFileSync('.github/PULL_REQUEST_TEMPLATE.md', 'utf8');
const answers = {
  'What does this PR do?':
    `Prepares Grommet v${nextVersion} ` +
    `with a maintainer-selected ${bump} bump.\n\n` +
    'Copies the reviewed release-note draft unchanged into CHANGELOG.md.',
  'Where should the reviewer start?':
    'Review package.json and the new CHANGELOG.md section.\n\n' +
    `Checklist suggestion: **${suggested}**; selected bump: **${bump}**.\n\n` +
    '- Patch: backwards-compatible bug fixes.\n' +
    '- Minor: new components, props, or compatible functionality.\n' +
    '- Major: incompatible public API or behavior changes.\n\n' +
    'Confirm the version, PR title/branch, and changelog heading agree.',
  'What testing has been done on this PR?':
    'The release checklist completed for the reviewed commit. Its findings ' +
    'were acknowledged before creating this PR. ' +
    'This is not a test coverage guarantee.\n\n' +
    'Review PR CI results separately; no build or browser QA is claimed here.',
  'How should this be manually tested?':
    '- [ ] Confirm version scope and release-note wording.\n' +
    '- [ ] Resolve or explicitly accept missing-test findings.\n' +
    '- [ ] Complete the listed component QA in Chrome, Firefox, and Safari.\n' +
    '- [ ] Wait for required CI checks before merging.',
  'Do Jest tests follow these best practices?':
    'Not applicable to this version/changelog PR; template checklist follows.',
  'Any background context you want to provide?':
    'Merging triggers tag creation after merge-commit CI, then package build ' +
    'and npm staging. Public npm publication requires manual approval.\n\n' +
    '<details><summary>Reviewed release checklist</summary>\n\n' +
    `\`\`\`text\n${checklist.trim()}\n\`\`\`\n\n</details>`,
  'What are the relevant issues?': 'See the linked PRs in the release notes.',
  'Screenshots (if appropriate)': 'Not applicable.',
  'Do the grommet docs need to be updated?':
    'Review documentation requirements for the included changes.',
  'Should this PR be mentioned in the release notes?':
    'No. This PR only prepares the version and changelog.',
  'Is this change backwards compatible or is it a breaking change?':
    bump === 'major'
      ? 'Major release selected; review the documented breaking changes.'
      : 'Backwards-compatible release selected; confirm during final review.',
};
const body = template.replace(/^#### (.+)$/gm, (heading, question) =>
  answers[question] ? `${heading}\n\n${answers[question]}` : heading,
);
writeFileSync('PR_BODY.md', body, 'utf8');
