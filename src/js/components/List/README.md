## List
An ordered list of items.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Visualizations-List&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/list&module=%2Fsrc%2FList.js)
## Usage

```javascript
import { List } from 'grommet';
<List data={[...]} />
```

## Properties

**a11yTitle**

Custom label to be used by screen readers. When provided, an aria-label will
   be added to the element.

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
  end: 
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
  start: 
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

**action**

Accepts a function that allows for a custom rendering
       of a component, it should be passed with an item and
        index of an array and return a react element
      'action = ({item, index}) => <Content />'

```
function
```

**as**

The DOM tag or react component to use for the element. Defaults to `ul`.

```
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

Item border.

```
boolean
horizontal
vertical
top
bottom
left
right
start
end
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
    right
    start
    end,
  size: 
    none
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
[
  string
  {

  }
]
```

**children**

Function that will be called when each data item is rendered.
      It will be passed three arguments, the individual data item, its index,
      and an object indicating the state of the item, if any. It
      should return a react element.
      For example:
      'children={(item, index, { active }) => <Box ...>{...}</Box>}'

```
function
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
      include a 'item' property containing the data value associated with
      the clicked item and an 'index' property containing the index in 'data'
      of the clicked item. You should not include interactive elements, like
      Anchor or Button inside 'primaryKey' or 'secondaryKey' as that can
      cause confusion with overlapping interactive elements.

```
function
```

**pad**

Item padding.

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
  end: 
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
  start: 
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

**paginate**

Whether to paginate the data. If providing an object, any Box props or 
    Pagination props are valid and will be used to style the underlying 
    pagination component.

```
boolean
object
```

**primaryKey**

When a string is supplied, it indicates the property in a data item
      object to use to get the primary content. If a function is supplied, it
      will be called with the current data item object and should return
      a React element that will be rendered as the primary content.

```
string
function
```

**secondaryKey**

When a string is supplied, it indicates the property in a data item
      object to use to get the secondary content. If a function is supplied, it
      will be called with the current data item object and should return
      a React element that will be rendered as the secondary content.

```
string
function
```

**show**

If provided as a number, the index of an item to show. If using 
        paginate and provided as an object in the format of show={{ page: 2 }}, 
        the default page to show.

```
number
{
  page: number
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

The background style when hovering over an interactive item. Expects `string | { color: string, opacity: string }`.

Defaults to

```
{ color: 'active', opacity: 'medium' }
```

**global.hover.color**

The text color when hovering over an interactive item. Expects `string | { dark: string, light: string }`.

Defaults to

```
{ dark: 'white', light: 'black' }
```

**list.container**

When using paginate, any valid Box props for the container 
    surrounding the List and Pagination components. Expects `object`.

Defaults to

```
{ gap: 'small' }
```

**list.container.extend**

Any additional style for the container 
    surrounding the List and Pagination components. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**list.extend**

Any additional style for the list. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**list.item.background**

Background color for list items. Expects `string | [string]`.

Defaults to

```
undefined
```

**list.item.border**

Border for list items. Expects `boolean | string | object`.

Defaults to

```
horizontal
```

**list.item.pad**

Border for list items. Expects `boolean | string | object`.

Defaults to

```
{ horizontal: 'medium', vertical: 'small' }
```

**list.item.extend**

Any additional style for the list items. Expects `string | (props) => {}`.

Defaults to

```
undefined
```
