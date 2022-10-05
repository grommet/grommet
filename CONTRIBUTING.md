# Contributing

Thank you for reaching the contribution page and showing the true gremlin in
you! In Grommet we do believe that the more the merrier – Welcome! Thank you for
making this step of joining and contributing to our community, and for helping
us make Grommet the best tool for streamlining the way you develop apps. You
came to the right place to start your contribution! Follow the guidelines and
let us know if we can help with anything else.

## Grommet Projects

Grommet is divided into several projects, the following are notable:

- [grommet] – the primary Grommet 2.X project is actively developed and
  contributions are more than welcome! Be sure to check the [good first issues].
- [grommet-site] - the Grommet website. Any documentation changes should be made here.
- [grommet-icons] – iconography for Grommet and React.js.

## You can Become a Contributor

After all, that’s why you’re here, right?
Quick steps and ideas of how you can contribute to Grommet:

1. Code, code, code… (and make a Pull Request).
1. Create design assets or style guide revisions.
1. Submit updates and improvements to the documentation.
1. Submit articles and guides which are also part of the documentation.
1. Join the [Slack community] to interact with and help Grommet users.
1. Help a Grommet designer or developer by answering questions on
   [Stack Overflow], [Slack][slack community], or [GitHub][grommet issues].
1. Report bugs and propose new features by [filing issues on
   GitHub][grommet issues], or come talk to us and fellow contributors in our
   [Slack community] about your issue or idea. Please make sure to check
   open and closed pull requests and issues before filing a new one!
1. Share with us exciting projects using Grommet in our [Slack community].

## How to Contribute

The best way to collaborate with the project contributors is through the Grommet
organization on GitHub: <https://github.com/grommet>.

You are invited to contribute new features, fixes, or updates – large or small.
We are always thrilled to receive pull requests, and do our best to process them
as fast as we can.

Before you start to code, we recommend discussing your plans through a GitHub
issue, especially for more ambitious contributions. This gives other
contributors a chance to point you in the right direction, give you feedback on
your design, and help you find out if someone else is working on the same thing.

- If you want to contribute design assets or style guide revisions, please open
  a [GitHub pull request][design-kit pulls] or open a
  [GitHub issue][design-kit issues] against the `design-kit` project.
- If you want to raise an issue such as a defect or an enhancement request,
  please open a GitHub issue for the appropriate project. Please keep the
  following in mind:
  - Try to reduce your code to the bare minimum required to reproduce the issue.
  - If we can’t reproduce the issue, we can’t fix it. Please list the exact
    steps required to reproduce the issue.

We review issues and pull requests on a weekly basis (sometimes more
frequently). When we require more information from you, we’ll ask. In order to
keep the issue and pull request queue clean, we ask that you respond within
**one week** or we’ll close the issue pending your response.

After an issue is created or a pull request is submitted, contributors and/or
maintainers will offer feedback. If the pull request passes review, a maintainer
will accept it with a comment.

When a pull request for code contribution fails testing, the author is
expected to update the pull request to address the failure(s) until it
passes testing and the pull request can merge cleanly.

At least one review from a maintainer is required for all patches.

## Design Contributions

The Grommet community values contributions on the design side of the
project. The Grommet style guide and designer assets are open for
contributions just as the development platform is. You may either submit an
issue on GitHub with a detailed recommendation, or open a pull request
with the updated assets.
Please open a [GitHub pull request][grommet-design pulls] or open a
[GitHub issue][grommet-design issues] against the `grommet-design` project.

## Submitting Code Pull Requests

We encourage and support contributions from the community. No fix is too
small. We strive to process all pull requests as soon as possible and
with constructive feedback. If your pull request is not accepted at
first, please try again after addressing the feedback you receive.

To make a pull request you will need a GitHub account. For help, see
GitHub’s documentation on [forking] and [pull requests].

Development happens on the `master` branch. In order for you to get
started you should:

1. fork the `grommet` repository
1. clone it `git clone https://github.com/<your-username>/grommet.git`
1. install dependencies using: `yarn install`

The components code lives in `src/js/components`. A few gotchas you may run
into while contributing could include:

- Documentation updates need to be filled with a separate pull request on
  [grommet-site].
- Code coverage and unit-testing is an important process of development.
  A pre-commit hook exists which runs the test suite and aborts the commit if
  any fail. To manually run tests, you should run `yarn test`. If you need to
  update snapshots then run `yarn test-update`.
- If you would like to use your development branch in a local project for
  testing and debugging purposes, [this guide](https://github.com/grommet/grommet/wiki/How-to-Apply-Your-Grommet-Development-Branch-to-a-Local-Project) shares steps to
  link local projects.
- We are actively working on providing a seamless TypeScript experience. Don’t
  forget to update corresponding `index.d.ts` files.
- For code syntax alignment in your pull request, use [prettier].
- Pull requests with code should include tests that validate the changes.

We review issues and pull requests on a weekly basis (sometimes more
frequently). If you feel we missed yours don’t hesitate to ping us on
[Slack][slack community]!

## Label Usage

A guide on commonly used labels added to issues and pull requests:

- `waiting`: Applied to pull requests that have been previously reviewed and are waiting for a response or code changes from the author. This label
  can also be applied to issues that have been commented on and are waiting for a response from the author. The waiting label is usually applied
  after 1 week of no response.
- `needs attention`: Applied to pull requests that have been waiting for a response or changes for a long period of time. This label gets applied because it is
  generally something the team wants to get in and indicates that it could get handed off to get it over the finish line.
- `good first issue`: Indicates issues that are a good place start for new contributors.
- `help wanted`: A request for help from the community on a particular issue. Keep in mind this doesn't exclude feedback and collaboration on other issues that
  don't have this label on it.
- `PRty`: Used by the grommet team to flag pull requests that we want to review in the biweekly "PRty" meeting.

## Testing Your Code

**Manual Tests**

You can test your code locally along with your changes using: `yarn storybook` or `npm run storybook`. This will open the storybook in your browser.

**Automated Tests**

This project contains unit tests executed by Jest. The bulk of the component tests are written with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) to simulate end user behavior and focus on testing functionality instead of implementation.

Jest tests are run using `yarn test` or `npm run test`. When changes to functionality are made, tests should always be included covering the functionality introduced.

The following best practices should be observed when writing Jest tests with React Testing Library:

- `screen` should be used for querying.
- Ensure the correct query is being used by referring to [this list of queries](https://testing-library.com/docs/queries/about/#priority), ordered by priority. The majority of the time `getByRole` should be used.
- In most cases `userEvent` should be used in place of `fireEvent`.
- Snapshot tests should use `asFragment()` instead of `container.firstChild`.

This article, [Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library), contains more information and testing best practices.

The [Accordion tests](https://github.com/grommet/grommet/blob/master/src/js/components/Accordion/__tests__/Accordion-test.tsx) are a good reference for tests that follow React Testing Library best practices.

## Contributing to the Documentation

The documentation is stored in the [grommet-site] repository. Each component
has a documentation file under `src/screens`.

If a documentation change is related to a pull request on grommet, mention the
grommet pull request in the pull request description so that the two are
associated with each other.

Found an error in the documentation? [File an issue][grommet-site issues].

## Slack

The fastest way to interact and reach out to the grommet team is via the [Slack community][slack community]. Some channels
to get started with are:

- `#general`: All members of grommet are in this channel, say hi!
- `#announcements`: Used for grommet related updates and announcements, such as releases.
- `#help`: A place to ask for help and support about grommet.

## References

This contribution guide was inspired by the contribution guides for [Grunt],
[CloudSlang], and [Docker Library].

[cloudslang]: http://www.cloudslang.io/#/docs#contributing-code
[design-kit]: https://github.com/grommet/design-kit
[design-kit issues]: https://github.com/grommet/design-kit/issues
[design-kit pulls]: https://github.com/grommet/design-kit/pulls
[docker library]: https://github.com/docker-library/docs/tree/master/node
[forking]: https://help.github.com/en/articles/fork-a-repo
[good first issues]: https://github.com/grommet/grommet/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22
[grommet]: https://github.com/grommet/grommet
[grommet issues]: https://github.com/grommet/grommet/issues
[grommet-design issues]: https://github.com/grommet/grommet-design/issues
[grommet-design pulls]: https://github.com/grommet/grommet-design/pulls
[grommet-icons]: https://github.com/grommet/grommet-icons
[grommet-site]: https://github.com/grommet/grommet-site
[grommet-site issues]: https://github.com/grommet/grommet-site/issues
[grunt]: http://gruntjs.com/contributing
[prettier]: https://prettier.io/docs/en/editors.html
[prop-types]: https://www.npmjs.com/package/prop-types
[pull requests]: https://help.github.com/en/articles/creating-a-pull-request-from-a-fork
[slack community]: https://slack-invite.grommet.io/
[stack overflow]: https://stackoverflow.com/questions/tagged/grommet
