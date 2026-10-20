// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { readFileSync } from 'fs';
import { join } from 'path';
import { runInNewContext } from 'vm';
import { transformSync } from '@babel/core';
import {
  formatReleaseSentence,
  getDescription,
  getSkipReason,
  isTypeScriptChange,
} from '../release-notes-utils';

const makePr = (overrides = {}) => ({
  title: 'Button: fix keyboard focus',
  body: 'Fixed Button focus when navigating with the keyboard.',
  labels: [],
  user: { login: 'contributor', type: 'User' },
  ...overrides,
});

describe('release note descriptions', () => {
  it('reads the PR description without including template answers', () => {
    const body = `<!-- General summary goes in the title -->
#### What does this PR do?
Fixed Button focus when navigating with the keyboard.

The focus indicator remains visible.
#### Where should the reviewer start?
Button.js
#### Should this PR be mentioned in the release notes?
No
#### Is this change backwards compatible or is it a breaking change?
Backwards compatible`;
    expect(getDescription(body)).toBe(
      'Fixed Button focus when navigating with the keyboard. ' +
        'The focus indicator remains visible.',
    );
    expect(getSkipReason(makePr({ body }))).toBeNull();
  });

  it.each(['Summary', 'Description', 'What does this PR do?'])(
    'reads a %s heading',
    (heading) => {
      const body = `## ${heading}\nFixed focus.\n## Testing\nCI`;
      expect(getDescription(body)).toBe('Fixed focus.');
    },
  );

  it('uses freeform descriptions and omits subsequent testing sections', () => {
    const body = 'Fixed focus.\n\n## Testing\nChecked in Storybook.';
    expect(getDescription(body)).toBe('Fixed focus.');
  });

  it('flattens lists and removes non-description content', () => {
    expect(
      getDescription(
        '- Fixed focus.\r\n- Added keyboard support.\r\n' +
          '- [x] Tested\n<!-- hidden -->\n```js\nexample();\n```\n' +
          '![Screenshot](image.png)',
      ),
    ).toBe('Fixed focus. Added keyboard support.');
  });

  it.each([
    null,
    '',
    '<!-- template -->',
    '#### What does this PR do?\n\n## Testing\nYes',
  ])('returns empty text for an empty description (%s)', (body) =>
    expect(getDescription(body)).toBe(''),
  );
});

describe('release note formatting', () => {
  it.each([
    ['Fixes Button focus.', 'Fixed Button focus'],
    ['This PR adds a copy control.', 'Added a copy control'],
    [
      'This pull request improves keyboard support.',
      'Enhanced keyboard support',
    ],
    ['Added `children` support.', 'Added `children` support'],
    ['Enhanced Tabs accessibility.', 'Enhanced Tabs accessibility'],
    [
      'Fixed focus. Added keyboard support.',
      'Fixed focus. Added keyboard support',
    ],
    ['Updates Button styling.', 'Enhanced Button styling'],
    [
      'Removes unused utilities.',
      'Enhanced implementation by removing unused utilities',
    ],
  ])('formats %s', (body, expected) => {
    expect(formatReleaseSentence(makePr({ body }))).toBe(expected);
  });

  it.each([
    ['fix(Button): keyboard focus', 'Fixed Button keyboard focus'],
    ['feat(TextInput): copy control', 'Added TextInput copy control'],
    [
      'TimeInput - fix keyboard direction',
      'Fixed TimeInput keyboard direction',
    ],
    ['Button styling', 'Enhanced Button styling'],
  ])('formats title fallback %s', (title, expected) => {
    expect(formatReleaseSentence(makePr({ title, body: '' }))).toBe(expected);
  });

  it.each([
    'Fixed type errors in base.d.ts',
    'Added TimeInput inline prop to types',
    'TypeScript: allow custom theme tokens',
    'Fix Button type declarations',
  ])('identifies type-only changes: %s', (title) => {
    expect(isTypeScriptChange(makePr({ title }))).toBe(true);
  });

  it('does not classify a component enhancement as type-only', () => {
    expect(
      isTypeScriptChange(
        makePr({
          title: 'Added TextInput copy control',
          body: 'Adds a copy control and updates TypeScript definitions.',
        }),
      ),
    ).toBe(false);
  });
});

describe('release note exclusions', () => {
  it.each([
    'skip-release-notes',
    'no-release-notes',
    'internal',
    'chore',
    'documentation',
  ])('does not treat %s as an opt-out', (name) =>
    expect(getSkipReason(makePr({ labels: [{ name }] }))).toBeNull(),
  );

  it.each([
    { login: 'automation', type: 'Bot' },
    { login: 'renovate[bot]', type: 'User' },
    { login: 'app/dependabot' },
  ])('excludes bot author %j', (user) => {
    expect(getSkipReason(makePr({ user }))).toBe('bot');
  });

  it.each([
    ['Dependencies', 'dependency'],
    ['Storybook', 'storybook'],
    ['CI', 'automation'],
    ['release automation', 'automation'],
  ])('excludes label %s', (name, reason) => {
    expect(getSkipReason(makePr({ labels: [{ name }] }))).toBe(reason);
  });

  it.each([
    ['Update dependencies', 'dependency'],
    ['Upgrade styled-components', 'dependency'],
    ['Bump eslint from 8.0.0 to 9.0.0', 'dependency'],
    ['chore(deps-dev): update eslint', 'dependency'],
    ['Update React to 19.0.0', 'dependency'],
    ['Button: fix Storybook example', 'storybook'],
    ['Enhance stories', 'storybook'],
    ['fix(storybook): improve controls', 'storybook'],
    ['Chromatic configuration', 'storybook'],
    ['ci: update build', 'automation'],
    ['Fix CI failures', 'automation'],
    ['Update GitHub Actions', 'automation'],
    ['Automate Grommet release', 'automation'],
    ['Enhance release workflow', 'automation'],
    ['Release v2.57.0', 'automation'],
  ])('excludes %s', (title, reason) => {
    expect(getSkipReason(makePr({ title }))).toBe(reason);
  });

  it.each([
    ['Update dependencies.', 'dependency'],
    ['Improves Storybook controls.', 'storybook'],
    ['Updates the release automation.', 'automation'],
  ])('recognizes excluded work in the description: %s', (body, reason) => {
    expect(getSkipReason(makePr({ title: 'Maintenance', body }))).toBe(reason);
  });

  it('retains component changes with incidental testing mentions', () => {
    const body = `#### What does this PR do?
Fixed Button focus and added regression coverage.
#### What testing has been done on this PR?
Updated stories in Storybook and verified CI after a dependency update.`;
    expect(getSkipReason(makePr({ body }))).toBeNull();
  });

  it('does not override an exclusion for beta components', () => {
    expect(
      getSkipReason(makePr({ title: 'Wizard Storybook enhancement' })),
    ).toBe('storybook');
  });
});

describe('release note generation', () => {
  it('generates description-based notes with a title fallback', async () => {
    const prs = [
      makePr({
        number: 1,
        title: 'Vague title',
        labels: [{ name: 'skip-release-notes' }],
        body:
          '#### What does this PR do?\nFixed keyboard focus.\n' +
          '#### Should this PR be mentioned in the release notes?\nNo',
      }),
      makePr({ number: 2, title: 'fix: missing description', body: null }),
      makePr({ number: 3, title: 'Update dependencies' }),
      makePr({ number: 4, title: 'Storybook controls' }),
      makePr({ number: 5, user: { login: 'helper', type: 'Bot' } }),
      makePr({ number: 6, title: 'Automate Grommet release' }),
      makePr({
        number: 7,
        title: 'Fixed type errors in base.d.ts',
        body: 'Fixes theme declaration errors.',
      }),
      makePr({
        number: 8,
        title: 'Added TimeInput inline prop to types',
        body: 'Adds `inline` to TimeInput type declarations.',
        labels: [{ name: 'Beta' }],
      }),
    ];
    const source = readFileSync(
      join(__dirname, '..', 'generate-release-notes.js'),
      'utf8',
    );
    const { code } = transformSync(source, {
      configFile: false,
      babelrc: false,
      presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
    });
    const write = jest.fn();
    const exit = jest.fn();
    const fetch = jest.fn(async (url) => {
      let data;
      if (url.includes('/git/refs/tags/')) {
        data = { object: { sha: url.split('/').pop(), type: 'commit' } };
      } else if (url.includes('/commits/')) {
        data = { commit: { committer: { date: '2026-10-20' } } };
      } else if (url.includes('/compare/')) {
        data = {
          total_commits: prs.length,
          commits: prs.map((pr) => ({
            commit: { message: `${pr.title} (#${pr.number})` },
          })),
        };
      } else {
        data = prs.find((pr) => url.endsWith(`/pulls/${pr.number}`));
      }
      return { ok: true, json: async () => data };
    });
    await runInNewContext(code, {
      require: (name) => {
        if (name === './release-notes-utils') {
          return { formatReleaseSentence, getSkipReason, isTypeScriptChange };
        }
        if (name === 'fs') return { existsSync: () => false };
        if (name === 'path') return { join };
        throw new Error(`Unexpected import: ${name}`);
      },
      fetch,
      console: { error: jest.fn() },
      process: {
        argv: [
          'node',
          'generate-release-notes',
          '--from',
          'v1',
          '--to',
          'v2',
          '--no-changelog',
        ],
        env: {},
        cwd: () => '/repo',
        stdout: { write },
        exit,
      },
    });
    expect(exit).not.toHaveBeenCalled();
    expect(write).toHaveBeenCalledWith(
      'General:\n\n' +
        '- Fixed keyboard focus. ' +
        '([#1](https://github.com/grommet/grommet/pull/1))\n' +
        '- Fixed missing description. ' +
        '([#2](https://github.com/grommet/grommet/pull/2))\n\n' +
        'TypeScript:\n\n' +
        '- Fixed theme declaration errors. ' +
        '([#7](https://github.com/grommet/grommet/pull/7))\n' +
        '- Added `inline` to TimeInput type declarations. ' +
        '([#8](https://github.com/grommet/grommet/pull/8))\n',
    );
  });
});
