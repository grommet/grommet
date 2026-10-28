# Release preparation and review

The **Draft release version PR** workflow has two phases. Neither phase tags,
stages, or publishes a package.

## 1. Prepare a review candidate

Run the workflow from `master`, leaving `reviewed_run_id` empty and the version
choice set to `review`.

The workflow resolves the release range to commit SHAs, runs
`yarn release-checklist` before generating drafts, and uploads a
`release-notes-draft` artifact. No version/changelog PR is opened yet.

Review the workflow summary and artifact:

- Inspect components needing manual QA and PRs without test-file changes.
- Resolve or explicitly accept the findings. A changed test file does not prove
  adequate coverage, and the checklist does not perform browser QA.
- Review the release-note grouping and wording.
- Choose a version scope:
  - **Patch:** backwards-compatible bug fixes.
  - **Minor:** new compatible functionality, including components, props, and
    theme capabilities. Do not rely on a PR title having a `feat:` prefix.
  - **Major:** incompatible public API or behavior changes.

Checklist suggestions are advisory. A maintainer makes the final version choice.
API failures abort the checklist instead of silently treating PRs as covered.

## 2. Create the release PR

Run the same workflow again from `master` with:

- `reviewed_run_id`: the successful candidate review run ID.
- `checklist_reviewed`: checked after completing the review above.
- `bump_override`: explicitly `patch`, `minor`, or `major`.

The run must come from this workflow on `master`, and its candidate must still
match current `master`. If the branch advanced, prepare and review a fresh
candidate. Range inputs are used only in phase 1.

The workflow downloads the reviewed artifacts instead of regenerating the notes.
It copies the release-note body unchanged under the new changelog version heading
and fills the standard Grommet PR template. Package version, title, and branch are
derived from the same explicit version decision.

The acknowledgment is a maintainer attestation, not automated proof of readiness.
Final note edits, required CI, version approval, and browser QA remain release PR
review gates. Make editorial changes in the changelog section; the tagged release
workflow reads that exact section for GitHub Release notes. The Slack announcement
is a separate summary and does not define changelog content.

After approval, merging the release PR triggers tag creation, merge-commit CI
checks, and the build/staging workflow. Public npm publication still requires
manual approval of the staged package.
