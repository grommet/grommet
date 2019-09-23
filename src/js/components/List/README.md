## List
An ordered list of items.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=List&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=list&module=%2Fsrc%2FList.js)
## Usage

```javascript
import { List } from 'grommet';
<List data={[...]} />
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

**background**

Item background. An array value indicates that items should have
      different backgrounds, modulo the array index.

```
string
[string]
```

**border**

Item border. Defaults to `bottom`.

```
boolean
horizontal
vertical
top
bottom
left
right
{
  color: 
    string
    {
      dark: string,
      light: string
    },
  side: 
    horizontal
    vertical
    top
    bottom
    left
    right,
  size: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string
}
```

**data**

Array of data objects.

```
[{

}]
```

**onMore**

Use this to indicate that 'data' doesn't contain all that it could.
      It will be called when all of the data items have been rendered.
      This might be used when the total number of items that could be retrieved
      is more than you'd want to load into the browser. 'onMore' allows you
      to lazily fetch more from the server only when needed.

```
function
```

**onClickItem**

When supplied, this function will be called with an event object that
      include a 'datum' property containing the data value associated with
      the clicked item. You should not include interactive elements, like
      Anchor or Button inside item as that can cause confusion with
      overlapping interactive elements.

```
function
```

**pad**

Item padding. Defaults to `{
  "horizontal": "medium",
  "vertical": "small"
}`.

```
xxsmall
xsmall
small
medium
large
xlarge
string
{
  horizontal: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge,
  vertical: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge,
  top: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge,
  bottom: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge,
  left: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge,
  right: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
}
```

**primaryKey**

When supplied, indicates the property for a data object to use to
      get a unique identifier.

```
string
```

**itemProps**

Item specific background, border, and pad, keyed by data index.
      For example:
      { 27: { background: ..., border: ..., pad: ... }},
      where the background, border, and pad accept the same values as
      the same named properties on List.

```
{

}
```

**step**

How many items to render at a time. Defaults to `50`.

```
number
```
  
## Intrinsic element

```
ol
```
## Theme
  
**global.hover.background**

The background style when hovering over an interactive row. Expects `string | { color: string, opacity: string }`.

Defaults to

```
{ color: 'active', opacity: 'medium' }
```

**global.hover.color**

The text color when hovering over an interactive row. Expects `string | { dark: string, light: string }`.

Defaults to

```
{ dark: 'white', light: 'black' }
```

**list.item.hover.background**

The background color when hovering over an interactive item. Expects `string | { color: string, opacity: string }`.

Defaults to

```
undefined
```

**list.item.hover.color**

The text color when hovering over an interactive item. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```
