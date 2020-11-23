## Accordion
An accordion containing collapsible panels.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Controls-Accordion&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/accordion&module=%2Fsrc%2FAccordion.js)
## Usage

```javascript
import { Accordion, AccordionPanel } from 'grommet';
<Accordion>
  <AccordionPanel label='Panel 1'>...</AccordionPanel>
  <AccordionPanel label='Panel 2'>...</AccordionPanel>
</Accordion>
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

**activeIndex**

Active panel index. If specified, Accordion will be a controlled 
component. This means that future panel changes will not work unless you
subscribe to onActive function and update activeIndex accordingly.

```
number
[number]
```

**animate**

Transition content in & out with a slide down animation. Defaults to `true`.

```
boolean
```

**children**

Array of AccordionPanels.

```
node
```

**onActive**

Function that will be called when the active index changes.
It will always send an array with currently active panel indexes.

```
function
```

**multiple**

Allow multiple panels to be opened at once.

```
boolean
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
  
## Intrinsic element

```
div
```