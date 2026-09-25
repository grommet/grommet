---
name: grommet-release-publishing
description: 'Run a controlled package release workflow with preflight validation, candidate packaging, release-note generation, approval gates, and post-release verification. Use when preparing a release for a package, validating a release candidate, or publishing an approved version.'
argument-hint: "Describe the release target, version, and package (for example: 'Prepare a patch release for hpe-design-tokens at 2.3.1')"
---

# Grommet release publishing skill

## Use when

- preparing a package release
- generating release notes for an approved version
- validating a release candidate before publish
- creating GitHub release artifacts
- publishing a version to npm with approval gates
- verifying a package after publish

## Canonical reference

Use the capability at `.github/knowledge/capabilities/grommet-publishing.md` as the source of truth for the workflow and approval boundaries.

## Core workflow

1. Confirm the release intent

   - package name
   - target ref or branch
   - version to publish
   - release type
   - whether this is GitHub-only or npm publish

2. Run preflight checks

   - repo is clean
   - target branch is correct
   - CI is green
   - package metadata and version are valid
   - build and artifact generation succeed

3. Create a release candidate

   - generate the package artifact
   - validate metadata and package integrity
   - bind the candidate to the specific version and commit SHA

4. Generate release notes

   - use the repo-native release-note generator
   - review for grouping, wording, and scope
   - stop for human approval before continuing

5. Prepare the GitHub release

   - create or update the draft release
   - attach package artifacts
   - ensure the title and notes match the approved version

6. Enforce approval gates

   - do not publish without explicit human approval
   - stop if artifact validation fails or browser QA is incomplete
   - stop if the version or release scope is unclear

7. Publish the approved candidate

   - run the npm publish flow only after approval
   - verify the package appears in the registry at the expected version

8. Verify post-release state
   - confirm the package is consumable from npm
   - verify GitHub release state and assets
   - run a smoke install or import check

## Non-negotiable rules

- Never publish automatically without final human approval.
- Treat the token-release workflow as the human-validated reference model.
- Prefer repo-native automation over ad hoc scripts when a canonical workflow already exists.
- Keep the workflow modular and reusable.
- Stop the flow on any blocking validation error.

## Example release flow

- Validate repo state and target ref.
- Validate version and package metadata.
- Build and package the candidate artifact.
- Generate changelog or release notes.
- Review the draft with approval gates.
- Publish only after approved candidate validation.
- Verify the published package and release metadata.

## Relevant repo references

- `.github/knowledge/capabilities/grommet-publishing.md`
- `.github/prompts/release-publishing.prompt.md`
- `tools/generate-release-notes.js`
- `.github/workflows/generate-release-notes.yml`
