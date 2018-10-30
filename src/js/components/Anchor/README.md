## Anchor

A text link. We have a separate component from the browser
base so we can style it. You can either set the icon and/or label properties
or just use children.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Anchor&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=anchor&module=%2Fsrc%2FAnchor.js)

## Usage

```javascript
import { Anchor } from 'grommet';
<Anchor href={location} label="Label" />;
```

## Properties

**a11yTitle**

Custom title to be used by screen readers.

```
string
```

**alignSelf**

How to align along the cross axis when contained in
a Box or along the column axis when contained in a Grid.

```
start
center
end
stretch
```

**gridArea**

The name of the area to place
this inside a parent Grid.

```
string
```

**margin**

The amount of margin around the component. An object can
be specified to distinguish horizontal margin, vertical margin, and
margin on a particular side.

```
none
xxsmall
xsmall
small
medium
large
xlarge
{
  bottom:
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  horizontal:
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  left:
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  right:
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  top:
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  vertical:
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string
}
string
```

**color**

      Label color and icon color, if not specified on the icon.

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

## Theme

**global.focus.border.color**

The color around the Anchor when in focus.. Defaults to `#FD6FFF`.

```
string | { dark: string, light: string }
```

**anchor.color**

Used to apply a default color to the icon and label.. Defaults to `{ light: '#1D67E3', dark: '#6194EB' }`.

```
string | { dark: string, light: string }
```

**anchor.fontWeight**

The font weight to be applied to the anchor text.. Defaults to `600`.

```
number
```

**anchor.textDecoration**

The text decoration to be applied to the anchor.. Defaults to `none`.

```
string
```

**anchor.hover.fontWeight**

The font weight to be applied to the anchor text when hovering.. Defaults to `undefined`.

```
number
```

**anchor.hover.textDecoration**

The text decoration to be applied to the anchor when hovering.. Defaults to `underline`.

```
string
```

**anchor.hover.extend**

Any additional style to be applied to the Anchor when hovering.. Defaults to `undefined`.

```
string | func
```

**anchor.extend**

Any additional style to be applied to the Anchor.. Defaults to `undefined`.

```
string | func
```
