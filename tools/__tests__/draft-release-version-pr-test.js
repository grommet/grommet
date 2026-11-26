// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import fs from 'fs';
import os from 'os';
import path from 'path';
import { spawnSync } from 'child_process';
import * as childProcess from 'child_process';
import { transformSync } from '@babel/core';
import { runInNewContext } from 'vm';
import { getDescription } from '../release-notes-utils';

const script = transformSync(
  fs.readFileSync(
    path.join(__dirname, '../draft-release-version-pr.js'),
    'utf8',
  ),
  {
    configFile: false,
    babelrc: false,
    presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
  },
).code;
const template = fs.readFileSync(
  path.join(__dirname, '../../.github/PULL_REQUEST_TEMPLATE.md'),
  'utf8',
);
const workflow = fs.readFileSync(
  path.join(
    __dirname,
    '../../.github/workflows/package-release-version-pr.yml',
  ),
  'utf8',
);
const notes =
  'General:\n\n- Added a prop. ([#1](https://example.com/1))\n\n' +
  'TypeScript:\n\n- Fixed declarations. ([#2](https://example.com/2))';
let directory;

beforeEach(() => {
  directory = fs.mkdtempSync(path.join(os.tmpdir(), 'release-draft-'));
  fs.mkdirSync(path.join(directory, '.github'));
  const files = {
    'package.json': JSON.stringify({ name: 'grommet', version: '2.57.0' }),
    'CHANGELOG.md': '# 2.57.0\n\nPrevious notes.\n',
    'RELEASE_NOTES_DRAFT.md': `${notes}\n`,
    'RELEASE_CHECKLIST.md':
      '── Suggested semver bump ───\n\nMINOR — new props\n',
    '.github/PULL_REQUEST_TEMPLATE.md': template,
  };
  Object.entries(files).forEach(([file, text]) => {
    fs.writeFileSync(path.join(directory, file), text);
  });
});

afterEach(() => fs.rmSync(directory, { recursive: true, force: true }));

const run = (env = {}) =>
  spawnSync(process.execPath, ['-e', script], {
    cwd: directory,
    encoding: 'utf8',
    env: {
      ...process.env,
      GITHUB_OUTPUT: path.join(directory, 'outputs'),
      CHECKLIST_REVIEWED: 'true',
      BUMP_OVERRIDE: 'minor',
      ...env,
    },
  });

describe('release version draft', () => {
  test.each([
    [{ CHECKLIST_REVIEWED: '' }, 'Review the release checklist'],
    [{ BUMP_OVERRIDE: 'auto' }, 'Explicitly select'],
    [{ BUMP_OVERRIDE: 'invalid' }, 'Explicitly select'],
  ])('rejects unapproved inputs %j without editing files', (env, error) => {
    const result = run(env);
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain(error);
    const pkg = JSON.parse(
      fs.readFileSync(path.join(directory, 'package.json')),
    );
    expect(pkg.version).toBe('2.57.0');
    expect(fs.readFileSync(path.join(directory, 'CHANGELOG.md'), 'utf8')).toBe(
      '# 2.57.0\n\nPrevious notes.\n',
    );
  });

  test.each([
    ['patch', '2.57.1'],
    ['minor', '2.58.0'],
    ['major', '3.0.0'],
  ])('uses the explicit %s decision', (bump, version) => {
    expect(run({ BUMP_OVERRIDE: bump }).status).toBe(0);
    const pkg = JSON.parse(
      fs.readFileSync(path.join(directory, 'package.json')),
    );
    expect(pkg.version).toBe(version);
    expect(fs.readFileSync(path.join(directory, 'CHANGELOG.md'), 'utf8')).toBe(
      `# ${version}\n\n${notes}\n\n# 2.57.0\n\nPrevious notes.\n`,
    );
    const body = fs.readFileSync(path.join(directory, 'PR_BODY.md'), 'utf8');
    const headings = template.match(/^#### .+$/gm);
    headings.forEach((heading) => expect(body).toContain(heading));
    expect(body).toContain('npm staging');
    expect(body).toContain(`v${version}`);
  });

  test('fails if the checklist has no bump suggestion', () => {
    fs.writeFileSync(
      path.join(directory, 'RELEASE_CHECKLIST.md'),
      'API failed',
    );
    expect(run().status).not.toBe(0);
  });

  test('fails on an empty release-note draft', () => {
    fs.writeFileSync(path.join(directory, 'RELEASE_NOTES_DRAFT.md'), '');
    expect(run().status).not.toBe(0);
  });
});

describe('release checklist version guidance', () => {
  const source = fs
    .readFileSync(path.join(__dirname, '../release-checklist.js'), 'utf8')
    .split('const args = parseArgs();')[0];
  const { code } = transformSync(source, {
    configFile: false,
    babelrc: false,
    presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
  });
  const suggest = (title, body = '', labels = []) =>
    runInNewContext(`${code}\nsuggestBump(prs).level`, {
      require: (name) =>
        name === './release-notes-utils' ? { getDescription } : childProcess,
      prs: [{ title, body, labels: labels.map((name) => ({ name })) }],
    });

  test.each([
    ['Added TextInput copy prop', 'MINOR'],
    ['Added Grommet options', 'MINOR'],
    ['fix(Button): retain focus', 'PATCH'],
  ])('classifies %s as %s', (title, expected) => {
    expect(suggest(title)).toBe(expected);
  });

  test('detects compatible additions in the actual description', () => {
    expect(
      suggest(
        'TextInput update',
        '#### What does this PR do?\nAdds a copy prop.\n#### Testing\nDone',
      ),
    ).toBe('MINOR');
  });

  test('does not infer a feature from testing template answers', () => {
    expect(
      suggest(
        'Button fix',
        '#### What does this PR do?\nFixed focus.\n' +
          '#### Testing\nAdds prop tests.',
      ),
    ).toBe('PATCH');
    expect(suggest('Added prop', '', ['breaking'])).toBe('MAJOR');
  });
});

describe('release workflow review gate', () => {
  const gateSection = workflow
    .split('      - name: Verify review authorization and run identity\n')[1]
    .split('      - name:')[0];
  const gate = gateSection
    .split('        run: |\n')[1]
    .split('\n')
    .map((line) => line.slice(10))
    .join('\n');

  test.each([
    [{}, true],
    [{ REVIEWED: 'false' }, false],
    [{ BUMP: 'review' }, false],
    [{ REVIEW_RUN: '1; echo unsafe' }, false],
    [{ REVIEW_SHA: 'stale' }, false],
    [{ REVIEW_CONCLUSION: 'failure' }, false],
    [{ REVIEW_WORKFLOW: '99' }, false],
    [{ REVIEW_BRANCH: 'feature' }, false],
  ])('checks authorization and review identity %j', (overrides, allowed) => {
    const commands = `
      git() { printf '%s\\n' candidate; }
      gh() {
        if [[ "$2" == */workflows/* ]]; then
          printf '%s\\n' 42
        else
          jq -n --argjson workflow "$REVIEW_WORKFLOW" \\
            --arg conclusion "$REVIEW_CONCLUSION" \\
            --arg branch "$REVIEW_BRANCH" --arg sha "$REVIEW_SHA" \\
            '{workflow_id: $workflow, conclusion: $conclusion,
              event: "workflow_dispatch", head_branch: $branch, head_sha: $sha}'
        fi
      }
    `;
    const result = spawnSync('bash', ['-e', '-c', commands + gate], {
      cwd: directory,
      encoding: 'utf8',
      env: {
        ...process.env,
        REVIEW_RUN: '123',
        REVIEWED: 'true',
        BUMP: 'minor',
        GITHUB_REPOSITORY: 'grommet/grommet',
        RUNNER_TEMP: directory,
        REVIEW_SHA: 'candidate',
        REVIEW_CONCLUSION: 'success',
        REVIEW_WORKFLOW: '42',
        REVIEW_BRANCH: 'master',
        ...overrides,
      },
    });
    expect(result.status === 0).toBe(allowed);
  });

  test('runs checklist first and gates PR mutations', () => {
    const checklist = workflow.indexOf('Run pre-release checklist');
    const drafts = workflow.indexOf('Generate release drafts');
    expect(checklist).toBeLessThan(drafts);
    workflow
      .split('      - name:')
      .filter((step) => /draft-release-version-pr.js|git push/.test(step))
      .forEach((step) => {
        expect(step).toContain("inputs.reviewed_run_id != ''");
      });
  });
});
