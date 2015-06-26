Contribution Guide
==================

Grommet is divided into a few projects.

-   [grommet](https://github.com/HewlettPackard/grommet) - the primary
    Grommet project
-   [grommet-bower](https://github.com/HewlettPackard/grommet-bower) -
    the Bower distribution of Grommet
-   [html-jsx-loader](https://github.com/HewlettPackard/html-jsx-loader) -
    a html loader module to convert HTML to JSX for Webpack used as part
    of the documentation

Contributing
------------

The best way to collaborate with the project contributors is through
GitHub: <https://github.com/HewlettPackard/grommet>.

-   If you want to contribute design assets or style guide revisions,
    please open a [GitHub pull
    request](https://github.com/HewlettPackard/grommet/pulls) or open a
    [GitHub issue](https://github.com/HewlettPackard/grommet/issues).
-   If you want to contribute code by either fixing a problem or
    creating a new feature, please open a [GitHub pull
    request](https://github.com/HewlettPackard/grommet/pulls).
-   If you want to raise an issue such as a defect or an enhancement
    request please open a [GitHub
    issue](https://github.com/HewlettPackard/grommet/issues) while
    keeping the following in mind:
    -   Try to reduce your code to the bare minimum required to
        reproduce the issue.
    -   If we can't reproduce the issue, we can't fix it. Please list
        the exact steps required to reproduce the issue. Include
        versions of your OS, browser, Node.js, etc. Include relevant
        logs or sample code.

Note that all patches from all contributors get reviewed.

After a pull request is made, other contributors will offer feedback. If
the patch passes review, a maintainer will accept it with a comment.

When a pull request for code contributions fails testing, the author is
expected to update the pull request to address the failure until it
passes testing and the pull request merges successfully.

At least one review from a maintainer is required for all patches (even
patches from maintainers).

### Developer's Certificate of Origin

All contributions must include acceptance of the DCO:

Developer Certificate of Origin Version 1.1

Copyright (C) 2004, 2006 The Linux Foundation and its contributors. 660
York Street, Suite 102, San Francisco, CA 94110 USA

Everyone is permitted to copy and distribute verbatim copies of this
license document, but changing it is not allowed.

Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

\(a) The contribution was created in whole or in part by me and I have
the right to submit it under the open source license indicated in the
file; or

\(b) The contribution is based upon previous work that, to the best of my
knowledge, is covered under an appropriate open source license and I
have the right under that license to submit that work with
modifications, whether created in whole or in part by me, under the same
open source license (unless I am permitted to submit under a different
license), as indicated in the file; or

\(c) The contribution was provided directly to me by some other person
who certified (a), (b) or (c) and I have not modified it.

\(d) I understand and agree that this project and the contribution are
public and that a record of the contribution (including all personal
information I submit with it, including my sign-off) is maintained
indefinitely and may be redistributed consistent with this project or
the open source license(s) involved.

### Sign your work

To accept the DCO, simply add this line to each commit message with your
name and email address (git commit -s will do this for you):

    Signed-off-by: Jane Example <jane@example.com>

For legal reasons, no anonymous or pseudonymous contributions are
accepted.

Design Contributions
--------------------

The Grommet community values contributions on the design side of the
project. The Grommet style guide and designer assets are open for
contributions just as the development platform. You may either submit an
issue on GitHub with a detailed recommendation, or open a pull request
with the updated assets.

Other Ways to Contribute
------------------------

If you don't feel like creating design assets or writing code, you can
still contribute to the project!

1.  You may submit updates and improvements to the documentation.
2.  Submit articles and guides which are also part of the documentation.
3.  Help a Grommet designer or developer by answering questions on
    StackOverflow, Slack and GitHub.

Submitting Code Pull Requests
-----------------------------

We encourage and support contributions from the community. No fix is too
small. We strive to process all pull requests as soon as possible and
with constructive feedback. If your pull request is not accepted at
first, please try again after addressing the feedback you received.

To make a pull request you will need a GitHub account. For help, see
GitHub's documentation on forking and pull requests.

All pull requests with code should include tests that validate your
change.

Code Syntax
-----------

1.  Two space indents. Don't use tabs anywhere. Use \\t if you need a
    tab character in a string.
2.  No trailing whitespace, except in markdown files where a line break
    must be forced.
3.  Don't go overboard with the whitespace.
4.  No more than one assignment per var statement.
5.  Delimit strings with single-quotes ', not double-quotes ".
6.  Prefer if and else to "clever" uses of ? : conditional or ||, &&
    logical operators.
7.  Use a multi-line /\* \*/ comment block early in a file as needed to
    describe the design of the module. Use inline // comments elsewhere
    as needed to clarify implementation details.
8.  When in doubt, follow the conventions you see used in the
    source already.

How to Contribute to Grommet
----------------------------

What the video below to learn how to contribute to Grommet. The Github
contribution workflow is somehow complex and we want to make sure we
don't loose your contributions because of that.

References
----------

This contribution guide was inspired by the contribution guides for the
[Grunt](http://gruntjs.com/contributing) and
[CloudSlang](http://www.cloudslang.io/#/docs#contributing-code)
projects.

Found an error in the documentation? [File an
issue](https://github.com/HewlettPackard/grommet/issues).
