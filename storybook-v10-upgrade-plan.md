# Storybook v10 Upgrade Plan

## Goals

- Upgrade this repository from Storybook 8.6.x to Storybook 10.
- Migrate stories to the latest CSF format (CSF3 object stories + typed meta/story where practical).
- Show authored story source in the docs/code panel by passing raw source into `parameters.docs.source.code`.
- Keep migration safe and incremental across ~530 story files.

## Current State Snapshot

- Storybook packages are currently on `8.6.17` in `package.json`.
- Storybook config lives in `storybook/main.js` and `storybook/preview.js`.
- `@storybook/addon-storysource` is currently enabled.
- There are 530 story files under `src/js/**`.
- Stories include legacy CSF patterns (`.storyName`, untyped defaults, function exports, mutation-style `Story.parameters`).

## Migration Strategy

Use an automation-first, phased migration with small PRs.

## Phase 0: Baseline + Safety Rails

1. Create a dedicated migration branch (already on `storybook-10`).
2. Capture baseline before changing dependencies:
   - `yarn storybook` launches successfully.
   - `yarn build-storybook` completes.
   - Chromatic baseline and current visual diff state.

## Phase 1: Upgrade to Storybook 10 (No Story Refactors Yet)

1. Upgrade Storybook packages and apply official automigrations:
   - `storybook`
   - `@storybook/react`
   - `@storybook/react-webpack5`
   - related add-ons in use
2. Remove/re-evaluate deprecated or redundant add-ons:
   - specifically `@storybook/addon-storysource` (likely removable once docs source panel is driven by `docs.source.code`).
3. Validate config compatibility in:
   - `storybook/main.js`
   - `storybook/preview.js`
4. Verify:
   - `yarn storybook` works.
   - `yarn build-storybook` works.
   - no blocker-level docs/runtime errors.

Deliverable: Storybook v10 is running with existing story format still intact.

## Phase 2: Build-Time Auto-Injection of Story Source for All Stories

Implement source injection at build-time so every story gets `parameters.docs.source.code` without manual per-story imports.

1. Create a Storybook source-injection transform script (for example under `tools/`):
   - input: a story file path and its source text
   - output: transformed source with `parameters.docs.source.code` injected for each exported story
   - support: `.stories.js`, `.stories.jsx`, `.stories.ts`, `.stories.tsx`
2. Use AST-based transforms (Babel parser/traverse/generator) instead of regex:
   - detect `export default` meta
   - detect named story exports (function stories and CSF3 object stories)
   - inject or merge `parameters.docs.source.code` while preserving existing parameters
3. Wire transform into Storybook webpack pipeline in `storybook/main.js`:
   - apply only to `*.stories.*` files
   - run before final compilation
   - keep original source maps where practical
4. Define source extraction policy used by injector:
   - baseline (required): inject full authored file source into each story so code panel always includes:
     - import statements
     - top-level `const`/helper variables outside render blocks
     - hook usage such as `React.useState`/`useState` inside story render functions
   - enhancement (optional, later): per-story snippet extraction by export name for multi-story files while still prepending required imports/top-level declarations
5. Add global docs settings in `storybook/preview.js` so code panel consistently prefers provided `docs.source.code`.
6. Add a debug mode toggle (env var) to inspect transformed story output during rollout.

### Source Display Requirements

The generated code shown in docs/code panel should be understandable as authored code, not a minimal runtime fragment.

1. Always include import section at the top of displayed code.
2. Include top-level declarations that story render logic depends on (for example theme objects, helper functions, constants).
3. Preserve hook-related code inside stories (for example `useState`) exactly as authored.
4. Do not strip comments that provide context in story examples.
5. Preserve formatting as much as practical when serializing transformed output.

Implementation note: to satisfy these requirements reliably across mixed CSF2/CSF3 during migration, full-file injection is the default strategy.

Deliverable: all stories render authored source in docs/code panel via build-time injected `parameters.docs.source.code`.

## Phase 3: CSF Modernization (CSF2 -> Latest CSF)

Migrate stories in batches using codemods + targeted manual cleanup.

### Target Format

- CSF3 object stories.
- `export default` typed meta where practical (`Meta`, `StoryObj`) for TS/TSX.
- Story metadata in story objects:
  - `.storyName` -> `name`
  - `Story.parameters = ...` -> inline `parameters` in story object
  - function stories converted to `render` where needed

### Rollout Order

1. Pilot folders:
   - `src/js/components/Calendar/stories`
   - `src/js/components/TextInput/stories`
2. Broad migration order:
   - `src/js/components/**/stories`
   - `src/js/contexts/**/stories`
   - `src/js/all/**/stories`
3. Keep each PR scoped to one area to reduce review risk.

### Automation

1. Run official Storybook codemods where applicable.
2. Add custom transform scripts for repository-specific patterns, including source auto-injection.
3. Reserve manual edits for edge cases only.

Deliverable: all stories in modern CSF shape compatible with Storybook v10 best practices.

## Phase 4: Validation + CI Guards

1. Validation per batch:
   - `yarn storybook`
   - `yarn build-storybook`
   - targeted test/lint runs if story typing/exports changed
   - Chromatic verification
2. Add lint/check script to prevent legacy reintroduction:
   - block `.storyName`
   - block mutation-style story metadata assignments where feasible
3. Add a CI check for source-injection coverage:
   - fail if any `*.stories.*` file is missing injected `parameters.docs.source.code` in transformed output
4. Ensure docs/code panel consistently displays code after migrations.
5. Add fixture assertions that the displayed source contains:
   - at least one import line when imports exist in input
   - top-level constants used by the story
   - `useState` tokens for stories that use state

Deliverable: stable CI + reduced chance of format regressions.

## PR Breakdown Recommendation

1. PR 1: Storybook 10 dependency/config upgrade only.
2. PR 2: Build-time source injector implementation + webpack integration + verification fixtures.
3. PR 3+: CSF migrations by folder in manageable batches (with injector active for all stories).
4. Final PR: cleanup, docs updates, and guard scripts.

## Definition of Done

- Storybook 10 fully adopted in dependencies/config.
- Story files migrated to latest CSF format.
- Code panel source is populated for all stories via build-time injected `parameters.docs.source.code`.
- Storybook dev/build pass reliably.
- Chromatic baseline updated with approved diffs.

## Risks and Mitigations

- Risk: Large-scale migration churn across ~530 files.
  - Mitigation: small, folder-scoped PRs and codemod-first approach.
- Risk: raw source import behavior differs across builders/config.
  - Mitigation: avoid runtime raw imports; inject at build-time via single transformer.
- Risk: AST transform introduces subtle story-shape regressions.
  - Mitigation: fixture tests for representative story patterns before broad rollout.
- Risk: mixed JS/TS story patterns create edge-case conversions.
  - Mitigation: typed targets where practical, manual edge-case bucket per batch.

## Suggested Immediate Next Steps

1. Run Storybook 10 upgrade command and capture generated migration changes.
2. Remove or isolate `addon-storysource` usage.
3. Implement and test the build-time source injector on fixture stories (JS, TSX, multi-export).
4. Integrate injector into Storybook webpack config for all `*.stories.*` files.
5. Start CSF migration pilot in Calendar and TextInput story folders.
