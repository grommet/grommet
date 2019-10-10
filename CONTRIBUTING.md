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
- [grommet-icons] – iconography for Grommet and React.js.
- [react-desc] – add a schema to your React components based on React
  [`PropTypes`][prop-types].
- [design-kit] – the Grommet Design Kit provides a set of sticker sheets and
  templates to help bootstrap your design process.

## You can Become a Contributor

Afterall, that’s why you’re here, right?
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
   [Slack community] about your issue or idea.
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

### Developer’s Certificate of Origin

All contributions must include acceptance of the DCO:

> Developer Certificate of Origin Version 1.1
>
> Copyright (C) 2004, 2006 The Linux Foundation and its contributors. 660
> York Street, Suite 102, San Francisco, CA 94110 USA
>
> Everyone is permitted to copy and distribute verbatim copies of this
> license document, but changing it is not allowed.
>
> Developer's Certificate of Origin 1.1
>
> By making a contribution to this project, I certify that:
>
> \(a) The contribution was created in whole or in part by me and I have
> the right to submit it under the open source license indicated in the
> file; or
>
> \(b) The contribution is based upon previous work that, to the best of my
> knowledge, is covered under an appropriate open source license and I
> have the right under that license to submit that work with
> modifications, whether created in whole or in part by me, under the same
> open source license (unless I am permitted to submit under a different
> license), as indicated in the file; or
>
> \(c) The contribution was provided directly to me by some other person
> who certified (a), (b) or (c) and I have not modified it.
>
> \(d) I understand and agree that this project and the contribution are
> public and that a record of the contribution (including all personal
> information I submit with it, including my sign-off) is maintained
> indefinitely and may be redistributed consistent with this project or
> the open source license(s) involved.

### Sign Your Work

To accept the DCO, simply add this line to each commit message with your
name and email address (`git commit -s` will do this for you):

    Signed-off-by: Jane Example <jane@example.com>

For legal reasons, no anonymous or pseudonymous contributions are
accepted.

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

The components code lives in `src/js/components`. The structure of the
project is a bit particular since it is using lots of internal tooling to try to
produce up-to-date documentation and minimise bugs. A few gotchas you may run
into while contributing could include:

- The read-me files in the components are auto-generated. You won’t need to
  update them. A big chunk of the documentation and prop-type validation is
  happening via the `doc.js` files.
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

## Testing Your Code

- You can test your code locally along with your changes using: `yarn storybook` or `npm run storybook`. This will open the storybook in your browser .

## Contributing to the Documentation

Grommet uses an internal tool for most of its documentation. If you are looking
to modify component documentation then you only need to have a look at the
`doc.js` files.

These files are used to generate the documentation on the Grommet website. That
code lives in the [grommet-site] repository.

Found an error in the documentation? [File an issue][grommet issues].

## Need More Help?

Watch this [video] to learn how to contribute to Grommet. The GitHub
contribution workflow is a bit complex and we want to make sure we don’t lose
your valuable contributions because of that. Note that the video is outdated and
talks about contributing to Grommet 1.X, but it may still be helpful for new
users.

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
[grunt]: http://gruntjs.com/contributing
[prettier]: https://prettier.io/docs/en/editors.html
[prop-types]: https://www.npmjs.com/package/prop-types
[pull requests]: https://help.github.com/en/articles/creating-a-pull-request-from-a-fork
[react-desc]: https://github.com/grommet/react-desc
[slack community]: http://slackin.grommet.io/
[stack overflow]: https://stackoverflow.com/questions/tagged/grommet
[video]: https://vimeo.com/129681048
