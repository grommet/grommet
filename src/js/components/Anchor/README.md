## Anchor
A text link. We have a separate component from the browser
base so we can style it. You can either set the icon and/or label properties
or just use children.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Anchor&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=anchor&module=%2Fsrc%2FAnchor.js)
## Usage

```javascript
import { Anchor } from 'grommet';
<Anchor href={location} label='Label' />
```

## Properties

**a11yTitle**

Custom title to be used by screen readers.

```
string
```

**href**

Hyperlink reference to place in the anchor.

```
string
```

**icon**

Icon element to place in the anchor.

```
element
```

**label**

Label text to place in the anchor.

```
node
```

**onClick**

Click handler. It can be used, for example, 
    to add analytics and track who clicked in the anchor.

```
function
```

**primary**

Whether this is a primary anchor.

```
boolean
```

**reverse**

Whether an icon and label should be reversed so that the icon is at the end of the anchor.

```
boolean
```
  