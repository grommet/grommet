# Grommet publishing capability

## Purpose

Coordinate the package release lifecycle for Grommet-like libraries and package distributions, including preflight validation, release-note generation, release artifact creation, final publish steps, and post-release verification.

The goal is to automate the repeatable mechanics of a package release while preserving the human approval gates that protect production shipping.

## Scope

This capability covers:

- repository and branch validation
- dependency and build validation
- version validation and release candidate setup
- release note generation
- GitHub release draft creation and asset upload
- npm publish from an approved candidate
- post-release verification and smoke checks

## When to use this capability

Use this capability when a package needs a controlled release workflow with a validated candidate, release-note generation, and a guarded final publish step.

This is appropriate for library or package releases where the repo already has a release-note generator, preflight validation, package metadata checks, and a GitHub/npm release process.

## Inputs

- package name
- target ref or branch
- requested version
- release type or release intent
- whether a GitHub release should be created
- whether npm publish should occur

## Required outputs

- repo readiness summary
- validated version and metadata summary
- candidate artifact summary
- release notes draft
- GitHub release status
- npm publish status
- post-release verification summary

## Approval gates

The capability must stop for human approval at the following points:

1. final version selection
2. release-note review and editing
3. completion of required browser and visual QA
4. final publish authorization
5. any blocker discovered during candidate validation or smoke tests

## Automation boundary

### Automate

- repo clean-check
- target ref validation
- dependency installation validation
- build and package validation
- artifact generation and metadata checks
- changelog or release-note generation
- GitHub draft release creation
- registry verification after publish

### Require human decisions

- whether the package is actually ready to ship
- whether the release scope is correct
- whether the release notes are editorially acceptable
- whether the final publish should proceed

### Human-only steps

- browser QA across supported browsers
- manual review of final release content
- all decisions that affect release risk or timing

## Working reference model

The hpe-design-tokens release flow is the operational reference model for this capability. It demonstrates the practical release structure that should be generalized:

- build a validated candidate
- verify artifact integrity and metadata
- only publish from an approved candidate
- verify the published package in the registry after publish
- require explicit release gates before shipping

## Reusable automation primitives

Use repo-native automation where it already exists, especially:

- release-note generation flow in `tools/generate-release-notes.js`
- workflow automation in `.github/workflows/generate-release-notes.yml`

These should be treated as the canonical automation primitives to reuse within the broader publishing capability.

## Operational guidance

- Keep the workflow modular and reusable.
- Route to this capability from a thin `.github` prompt or instruction.
- Fail closed at release gates instead of forcing a publish.
- Treat every publish as a human-approved action, not as an unattended automation step.
