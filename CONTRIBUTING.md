# Contributing

Thank you for reaching the contribution page and showing the true gremlin in you!
In Grommet we do believe that the more the merrier, and we are welcoming you for making this step of joining our contribution community and helping us make Grommet the best way to streamline the way you develop apps.
You came to the right place to start your contribution, follow the guidlines and let us know if we can help with anything else.

## Grommet projects

Grommet is divided into a several projects; the following are notable:

- [grommet](https://github.com/grommet/grommet) - the primary
  Grommet 2.X project is actively developped and contributing is more than welcome! Be sure to check the [good first issues](https://github.com/grommet/grommet/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
- [grommet-icons](https://github.com/grommet/grommet-icons) -
  Iconography for Grommet and React.js
- [react-desc](https://github.com/grommet/react-desc)
  Add a schema to your React components based on React PropTypes
- [design-kit](https://github.com/grommet/design-kit)
  The Grommet Design Kit provides a set of sticker sheets and templates to help bootstrap your design process.

## YOU can Become a Contributor

Quick steps and ideas of how you can become a contributor!

1.  Code Code Code (and file Pull Request)
2.  Create design assets or style guide revsions
3.  Submit updates and improvements to the documentation.
4.  Submit articles and guides which are also part of the documentation.
5.  Join the Slack to help and interact with grommet users
6.  Help a Grommet designer or developer by answering questions on
    StackOverflow, Slack and GitHub.
7.  Report bugs and proposing new features by filing issues on Github or ask in our Slack community
8.  Share with us exciting projects using grommet on Slack

## Contributing

The best way to collaborate with the project contributors is through the Grommet
organization on GitHub: <https://github.com/grommet>.

You are invited to contribute new features, fixes, or updates, large or small; we
are always thrilled to receive pull requests, and do our best to process them as
fast as we can.

Before you start to code, we recommend discussing your plans through a GitHub
issue, especially for more ambitious contributions. This gives other contributors
a chance to point you in the right direction, give you feedback on your design,
and help you find out if someone else is working on the same thing.

- If you want to contribute design assets or style guide revisions,
  please open a [GitHub pull
  request](https://github.com/grommet/design-kit/pulls) or open a
  [GitHub issue](https://github.com/grommet/design-kit/issues) against the
  design-kit project.
- If you want to raise an issue such as a defect or an enhancement
  request please open a GitHub issue for the appropriate project. Please
  keep the following in mind:
  - Try to reduce your code to the bare minimum required to
    reproduce the issue.
  - If we can't reproduce the issue, we can't fix it. Please list
    the exact steps required to reproduce the issue.

We review issues and pull requests on a weekly basis (sometimes more frequent).
When we require more information from you, we'll ask. In order to keep the
issue and pull request clean, we ask that you respond within **one week** or we'll
close the issue pending your response.

After an issue is created or a pull request is submitted, contributors and/or
maintainers will offer feedback. If the pull request passes review, a maintainer
will accept it with a comment.

When a pull request for code contributions fails testing, the author is
expected to update the pull request to address the failure until it
passes testing and the pull request merges successfully.

At least one review from a maintainer is required for all patches.

### Developer's Certificate of Origin

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

### Sign your work

To accept the DCO, simply add this line to each commit message with your
name and email address (git commit -s will do this for you):

    Signed-off-by: Jane Example <jane@example.com>

For legal reasons, no anonymous or pseudonymous contributions are
accepted.

## Design Contributions

The Grommet community values contributions on the design side of the
project. The Grommet style guide and designer assets are open for
contributions just as the development platform. You may either submit an
issue on GitHub with a detailed recommendation, or open a pull request
with the updated assets.
Please open a [GitHub pull request](https://github.com/grommet/grommet-design/pulls)or open a [GitHub issue](https://github.com/grommet/grommet-design/issues) against the grommet-design project.

## Submitting Code Pull Requests

We encourage and support contributions from the community. No fix is too
small. We strive to process all pull requests as soon as possible and
with constructive feedback. If your pull request is not accepted at
first, please try again after addressing the feedback you received.

To make a pull request you will need a GitHub account. For help, see
GitHub's documentation on forking and pull requests.

Development happens on the `master` branch. In order for you to get
started you should:

- First fork the grommet repository
- clone it `git clone https://github.com/<your-username>/grommet.git`
- install dependencies using `yarn install`

The components code is living in `src/js/components`. The structure of the
project is a bit particular since it is using lots of internal tooling to try and
and produce up to date documentation and minimise bugs. A few gotchas while you
contribute might be:

- the readme files in the components are auto-generated. You won't need to update
  them. A big chunk of the documentation and prop-type validation is happening on the `doc.js` files.
- code coverage and unit-testing is an important process of the development. A
  pre-commit hook exists that runs jest tests. To manually run them you should run
  `yarn test`. If you need to update snapshots then run `yarn test-update`
- we are actively working on providing a seamless Typescript experience.
  Don't forget to update the corresponding `index.d.ts` files.
- for code syntax alignment on your pull request, use 'prettier'.
- pull requests with code should include tests that validate your change.

We review issues and pull requests on a weekly basis (sometimes more frequent). If you feel we missed yours don't hesitate to ping us on slack!

## Contributing to the documentation

Grommet uses an internal tool for most of its documentation. If you are looking
to modify component to documentation then you only need to have a look at the
`doc.js` files.

These files are used to generate the documentation on the grommet website. That
code lives at the [grommet-site](https://github.com/grommet/grommet-site repository).

## Need more help?

Watch this [video](https://vimeo.com/129681048) to learn how to contribute to Grommet. The Github
contribution workflow is somehow complex and we want to make sure we
don't lose your contributions because of that.
Note that the video is outdated and points to contributing on Grommet 1.X, but it may still be helpful for new users.

## References

This contribution guide was inspired by the contribution guides for
[Grunt](http://gruntjs.com/contributing),
[CloudSlang](http://www.cloudslang.io/#/docs#contributing-code), and
[Docker Library](https://github.com/docker-library/docs/tree/master/node).

Found an error in the documentation? [File an
issue](https://github.com/grommet/grommet-docs/issues).
