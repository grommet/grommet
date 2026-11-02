Goal: automate package publishing for hpe-design-tokens while preserving the approval gates needed for a production release.

This should be added as a canonical capability in the Grommet knowledge base and surfaced through a discoverable instruction, skill, or prompt in `.github` that routes to that capability. The goal is to generalize the working token-release process into a reusable publishing capability, not to lock the workflow to one package.

## Working reference process

The hpe-design-tokens release flow already demonstrates the strongest practical pattern for a safe package release:

- a release candidate is built and validated before publish
- the candidate is bound to a specific version and commit SHA
- the release artifact is verified before it is published
- the final publish step is gated behind workflow approval and candidate validation
- package registry verification happens after the publish step

This should be treated as the operational baseline for the new capability.

## Proposed capability

### Grommet publishing / release orchestration

The canonical capability should coordinate the full release lifecycle, including:

- preflight validation
- version validation and release candidate generation
- release note drafting
- GitHub release creation and asset upload
- npm publish
- post-release verification

The design principle is simple: automate the mechanics, but keep human approval at the actual decision points.

## Plan to evaluate the automation surface

### 1. Inventory each manual step and classify it

Review the current release process and classify each step as one of:

- fully automatable
- automatable with human approval
- human-only

Examples:

- repo clean check: automatable
- browser QA across Firefox/Safari/Chrome: human-controlled
- semantic version selection: human approval required
- GitHub release note generation: partially automatable, human review required
- npm publish: automatable only after explicit approval

### 2. Reuse existing repo automation as the canonical primitives

The release-note generation flow already exists in:

- `tools/generate-release-notes.js`
- `.github/workflows/generate-release-notes.yml`

These should be treated as the Grommet-native automation primitives that the broader capability wraps.

### 3. Create a reusable publishing model

The release workflow should be broken into sub-capabilities:

- preflight checks
- candidate generation
- release note creation
- GitHub release setup
- npm publish
- verification and smoke test

Each sub-capability should be reusable and independently testable.

### 4. Add explicit approval gates

The capability should require explicit sign-off at the release-critical gates:

- repo clean and CI green
- version selection approved
- browser QA complete
- release notes reviewed and approved
- final publish approval granted

These checkpoints should not be bypassed by the automation.

### 5. Create a discoverable entry point in `.github`

Add a thin prompt or instruction in `.github` which routes to the canonical capability in the knowledge base rather than embedding one giant release workflow in a single prompt.

Good entry points include:

- `release-publish.prompt.md`
- `release-preflight.instructions.md`
- `release-notes.instructions.md`

Each should call the shared release capability and stop at the approval gates.

### 6. Validate with dry-run and candidate workflows

Before enabling live publish, validate the capability in dry-run or candidate mode by:

- generating release notes without publishing
- validating artifacts and metadata
- creating a draft GitHub release without final publish
- validating the package tarball in a clean consumer install

This reduces release risk while keeping the actual publish step protected.

## Automation vs. human approval

### Should be automated

- repo cleanliness check
- dependency installation validation
- build checks
- version format validation
- release note generation
- draft GitHub release creation
- artifact packaging and validation
- registry verification after publish

### Requires human approval

- final version decision
- release readiness judgment
- Browser QA completion
- final release note wording and grouping
- final publish confirmation

### Should remain human-only

- deciding whether to ship despite discovered issues
- final publishing authorization
- any production release decision that affects release scope or timing

## Recommended first milestone

The first milestone should not attempt to fully automate the final publish decision. Instead, it should automate:

1. repo preflight
2. release note generation
3. candidate artifact creation
4. draft GitHub release setup
5. verification checks
6. final human approval before the actual npm publish

This is the lowest-risk, most practical release automation to start with.

## Summary

The hpe-design-tokens release flow is the right reference model because it already demonstrates the exact operational boundaries we want to preserve: validated candidate generation, artifact checks, release gates, and post-publish verification.

The right long-term solution is a generalized Grommet publishing capability that wraps those proven patterns, while leaving version, editorial, and final publish decisions under human control.

Are my goals clear, and should I proceed with a concrete capability document and discoverable `.github` prompt structure next?
