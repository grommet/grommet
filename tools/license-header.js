#!/usr/bin/env node
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
/**
 * License header tool (HPE Open Source Review Board compliance).
 *
 * Ensures every authored source file carries the canonical SPDX header below.
 * Works on raw text, so it covers .js/.jsx/.ts/.tsx/.mjs/.cjs uniformly.
 *
 * Usage:
 *   node tools/license-header.js            Insert/correct headers (fix mode).
 *   node tools/license-header.js --check    Report non-compliant files and exit
 *                                            non-zero. Used for CI gating.
 *   node tools/license-header.js [paths...] Limit to the given files/dirs.
 */

const fs = require('fs');
const path = require('path');

// Canonical header. Edit these two lines to change it everywhere.
const HEADER =
  '// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP\n' +
  '// SPDX-License-Identifier: Apache-2.0\n';

const ROOTS = ['src', 'e2e', 'storybook', 'tools'];
const EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs']);
const EXCLUDED_DIRS = new Set([
  'node_modules',
  'dist',
  'coverage',
  '.git',
  '.yarn',
  'storybook-static',
  '__snapshots__',
]);

function isIncluded(filePath) {
  if (filePath.endsWith('.snap')) return false;
  return EXTENSIONS.has(path.extname(filePath));
}

function collectFiles(target, out) {
  if (!fs.existsSync(target)) return;
  const stat = fs.statSync(target);
  if (stat.isDirectory()) {
    fs.readdirSync(target, { withFileTypes: true }).forEach((entry) => {
      if (entry.isDirectory() && EXCLUDED_DIRS.has(entry.name)) return;
      collectFiles(path.join(target, entry.name), out);
    });
  } else if (stat.isFile() && isIncluded(target)) {
    out.push(target);
  }
}

// Build the canonical content for a file: shebang (if any), header, then the
// body with any existing SPDX header lines stripped. Rebuilding (rather than
// only inserting) is what corrects drift such as a wrong identifier or spacing.
function buildExpected(content) {
  let shebang = '';
  let body = content;
  if (content.startsWith('#!')) {
    const nl = content.indexOf('\n');
    shebang = nl === -1 ? `${content}\n` : content.slice(0, nl + 1);
    body = nl === -1 ? '' : content.slice(nl + 1);
  }
  const lines = body.split('\n');
  let i = 0;
  while (i < lines.length && /^\/\/\s*SPDX-/i.test(lines[i])) i += 1;
  if (i > 0 && lines[i]?.trim() === '') i += 1;
  const rest = lines.slice(i);
  // A directive prologue ('use client' / 'use strict') must have a blank line
  // before it when comments precede it (ESLint lines-around-directive).
  // We keep one here, so the tool and ESLint agree on the canonical form.
  const needsBlank = /^\s*(['"])use [\w-]+\1;?\s*$/.test(rest[0] ?? '');
  return `${shebang}${HEADER}${needsBlank ? '\n' : ''}${rest.join('\n')}`;
}

function main() {
  const args = process.argv.slice(2);
  const checkOnly = args.includes('--check');
  const targets = args.filter((arg) => !arg.startsWith('--'));
  const roots = targets.length > 0 ? targets : ROOTS;

  const files = [];
  roots.forEach((root) => collectFiles(root, files));

  const nonCompliant = [];
  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8');
    const expected = buildExpected(content);
    if (expected === content) return;
    nonCompliant.push(file);
    if (!checkOnly) fs.writeFileSync(file, expected);
  });

  if (checkOnly) {
    if (nonCompliant.length > 0) {
      console.error(
        `License header check failed: ${nonCompliant.length} file(s) missing ` +
          'or with an incorrect SPDX header.',
      );
      nonCompliant.forEach((file) => console.error(`  ${file}`));
      console.error('\nRun "yarn license" to fix the headers.');
      process.exit(1);
    }
    console.log(`License header check passed (${files.length} file(s)).`);
    return;
  }

  if (nonCompliant.length > 0) {
    console.log(`Updated SPDX header in ${nonCompliant.length} file(s).`);
  } else {
    console.log(`All ${files.length} file(s) already compliant.`);
  }
}

main();
