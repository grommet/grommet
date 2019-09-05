## Tabs
A container with controls to show one Tab at a time.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Tabs&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=tabs&module=%2Fsrc%2FTabs.js)
## Usage

```javascript
import { Tabs, Tab } from 'grommet';
<Tabs>
  <Tab title='Tab 1'>...</Tab>
  <Tab title='Tab 2'>...</Tab>
</Tabs>
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

**activeIndex**

Active tab index. If specified, Tabs will be a controlled component.
This means that future tab changes will not work unless you subscribe to
onActive function and update activeIndex accordingly.

```
number
```

**children**

Required. Array of Tab.

```
node
```

**flex**

Whether flex-grow and/or flex-shrink is true.

```
grow
shrink
boolean
```

**justify**

How to align the tabs along the main axis. Defaults to `center`.

```
start
center
end
```

**messages**

Custom messages for Tabs. Used for accessibility by screen readers. Defaults to `{
  "tabContents": "Tab Contents"
}`.

```
{
  tabContents: string
}
```

**onActive**

Function that will be called with the active tab index when the
currently active tab changes.

```
function
```
  
## Intrinsic element

```
div
```
## Theme
  
**global.borderSize**

The size of the border. Expects `string`.

Defaults to

```
{
      xsmall: '1px',
      small: '2px',
      medium: '4px',
      large: '12px',
      xlarge: '24px,
    }
```

**global.colors.border**

The color of tabs border. Expects `string | { dark: string, light: string }`.

Defaults to

```
{ dark: rgba(255, 255, 255, 0.33), light: rgba(0, 0, 0, 0.33) }
```

**global.edgeSize.small**

The possible sizes for margin, pad and gap. Expects `string`.

Defaults to

```
6px
```

**tabs.background**

background styling of Tabs. Expects `string | object`.

Defaults to

```
undefined
```

**tabs.extend**

Any additional style for Tabs. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**tabs.gap**

The gap size between the Tabs. Expects `string`.

Defaults to

```
undefined
```

**tabs.header.background**

The background styles of Tabs header. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**tabs.header.extend**

Any additional style for Tabs header. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**tabs.panel.extend**

Any additional style for Tabs panel. Expects `string | (props) => {}`.

Defaults to

```
undefined
```
