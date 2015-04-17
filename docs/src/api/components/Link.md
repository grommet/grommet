---
label: Link
id: grommet-link
categorySlug: grommet-api
categoryLabel: API

Link
====

A `<Link>` component is a Grommet version of an `<a>` element. Its key function is to handle routing between internal locations, managing browser history.


Props
-----

###  `href`

The path to link to.

NOTE: This may change to allow route names.

###   `className`

Any additional classes that should be applied to the `a` tag.

Example
-------

```xml
<Link href="/a/b/c">{"Name"}</Link>
<!-- becomes -->
<a href="/a/b/c">Name</a>
```
