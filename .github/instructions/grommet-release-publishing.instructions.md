---
description: 'Release automation guidance for controlled package publishing. Use when preparing a package release, validating a candidate, approving a publish, or routing a release task through the canonical publishing capability.'
applyTo: '**/*'
---

# Release publishing instructions

Use the capability in `.github/knowledge/capabilities/grommet-publishing.md` as the source of truth for package release workflows.

## Core rules

- Automate the repeatable mechanics of release preparation.
- Keep human approval at the release gates.
- Never publish without explicit final approval.
- Prefer repo-native release tooling over ad hoc scripting.
- Validate artifacts before upload or publish.
- Treat the token-release flow as the operational reference model.

## Required release gate checks

Before release proceeds, confirm:

- repo is clean
- target ref is approved
- CI status is green
- version and package metadata are valid
- release notes are reviewed and accepted
- the package artifact is validated
- the final publish decision is explicitly approved

## Publish decision rules

- If validation fails, stop the workflow.
- If the release notes are not approved, stop the workflow.
- If the ref is not approved, stop the workflow.
- If the artifact differs from the approved candidate, stop the workflow.
- If publication is not approved, do not publish.

## Canonical references

- `.github/knowledge/capabilities/grommet-publishing.md`
- `.github/prompts/release-publishing.prompt.md`
- `tools/generate-release-notes.js`
- `.github/workflows/generate-release-notes.yml`

## When to delegate

Delegate to the release publishing skill when the task includes:

- release note generation
- package validation
- GitHub release draft creation
- npm publish approval
- post-release verification
