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
 *   BUMP_OVERRIDE  'auto' | 'patch' | 'minor' | 'major' (default 'auto')
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
const override = process.env.BUMP_OVERRIDE;
const bump =
  override && override !== 'auto' ? override : suggestBump(checklist);

const pkg = JSON.parse(readFileSync(PACKAGE_PATH, 'utf8'));
const nextVersion = bumpVersion(pkg.version, bump);
pkg.version = nextVersion;
writeFileSync(PACKAGE_PATH, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8');

const changelog = readFileSync(CHANGELOG_PATH, 'utf8');
const entry = `# ${nextVersion}\n\n${notes}\n\n`;
writeFileSync(CHANGELOG_PATH, entry + changelog, 'utf8');

console.log(`Suggested bump: ${bump} -> v${nextVersion}`);
setGithubOutput('version', nextVersion);
setGithubOutput('bump', bump);
