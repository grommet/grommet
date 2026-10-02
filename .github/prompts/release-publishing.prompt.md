# Release publishing workflow

Use the canonical Grommet publishing capability for package release workflows.

## Goal

Coordinate a safe package release, including preflight validation, release-note generation, GitHub release preparation, npm publish, and post-release verification.

## When to use this capability

Use this workflow when:

- a package release is being prepared
- a version bump is required
- a candidate build or package artifact needs validation
- release notes or a GitHub draft release are being prepared
- a publish to npm needs a controlled, approval-gated workflow

## Required inputs

- package name
- target ref or branch
- exact version to publish
- optional release-note range (`from_tag` and `to_tag`)
- release intent or type
- whether a GitHub release should be created
- whether npm publish is intended

## Failure conditions

Stop the flow and ask for approval or remediation when any of the following are true:

- the working tree is dirty
- the target ref is not approved
- CI is not green
- the version is invalid or inconsistent with the intended release scope
- artifact validation fails
- release-note review is not approved
- the final publish decision has not been explicitly approved

## Required workflow

1. Validate repo state.

   - Ensure the working tree is clean.
   - Confirm the target branch and ref are correct.
   - Confirm CI is green before continuing.

2. Validate package and version.

   - Confirm the package version is valid.
   - Confirm the requested version matches the intended release scope.
   - Confirm the candidate is tied to the correct commit SHA.

3. Build the release candidate.

   - Install dependencies.
   - Run the package preflight checks.
   - Generate the release artifacts.
   - Validate artifact metadata and integrity.

4. Generate release notes.

   - Use the repo-native release-note generation logic.
   - Supply the appropriate `from_tag`/`to_tag` range when generating notes.
   - Review the draft for grouping, wording, and scope.
   - Stop for human approval before continuing.

5. Prepare the GitHub release.

   - Create or update the draft release.
   - Attach release artifacts.
   - Ensure the release title and notes match the version and approved content.

6. Require explicit approval before publishing.

   - Do not publish to npm without final human approval.
   - Confirm the package version, commit SHA, and artifact are still correct.

7. Publish to npm.

   - Run the approved publish flow only from the validated candidate.
   - Verify the package is available from the registry.

8. Verify post-release state.
   - Confirm the registry is serving the correct version.
   - Confirm the GitHub release is published.
   - Run a smoke consumer install check.

## Approval gates

Stop and ask for approval before continuing at these points:

- version decision
- release-note review
- final publish approval
- any discovered blocker from QA or artifact validation

## Important guardrails

- Treat the token-release workflow as the operational reference model.
- Treat the Grommet release-note tooling as the canonical automation primitive.
- Preserve human approval for final release decisions.
- Never publish automatically without a final explicit approval.
- Keep the workflow modular and reusable across package release scenarios.

## Canonical capability

Route to the canonical Grommet publishing capability in the knowledge base rather than hard-coding all release logic into this prompt.
