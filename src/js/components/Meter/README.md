## Meter
A graphical meter.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Meter&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/meter&module=%2Fsrc%2FMeter.js)
## Usage

```javascript
import { Meter } from 'grommet';
<Meter />
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

**background**

Background color Defaults to `{
  "color": "light-2",
  "opacity": "medium"
}`.

```
string
{
  color: string,
  opacity: 
    weak
    medium
    strong
    number
    boolean
}
```

**max**

The maximum value for the Meter.

```
number
string
```

**round**

Whether to round the line ends

```
boolean
```

**size**

The size of the Meter. Defaults to `medium`.

```
xsmall
small
medium
large
xlarge
full
string
```

**thickness**

The size of the Meter. Defaults to `medium`.

```
xsmall
small
medium
large
xlarge
string
```

**type**

The visual type of meter. Defaults to `bar`.

```
bar
circle
```

**values**

Array of value objects describing the data.
      'value' is the actual numeric value.
      'label' is a text string describing it.
      'color' indicates the color name to use. If not specified a default one
      will be chosen.
      'onClick' will be called when the user clicks on it.
      Set 'highlight' to call attention to it.
      'onHover' will be called with a boolean argument indicating when the
      user hovers onto or away from it.

```
[{
  color: string,
  highlight: boolean,
  label: string,
  onClick: function,
  onHover: function,
  value: number
}]
```
  
## Theme
  
**global.colors**

Color options. Expects `object`.

Defaults to

```
{
      "accent-1": "#6FFFB0",
      "graph-0": "accent-1",
      ...
    }
```

**global.edgeSize**

The border-radius of the styled Meter. thickness, height and 
    width of the Bar Meter, height of the Circle Meter. Expects `object`.

Defaults to

```
{
        none: '0px',
        hair: '1px',
        xxsmall: '3px',
        xsmall: '6px',
        small: '12px',
        medium: '24px',
        large: '48px',
        xlarge: '96px',
        responsiveBreakpoint: 'small',
    }
```

**global.opacity.medium**

The opacity value used on the Meter color. Expects `number`.

Defaults to

```
0.4
```

**global.size**

The possible sizes for Circle Meter width. Expects `object`.

Defaults to

```
{
      xxsmall: '48px',
      xsmall: '96px',
      small: '192px',
      medium: '384px',
      large: '768px',
      xlarge: '1152px',
      xxlarge: '1536px',
      full: '100%',
    }
```

**meter.color**

The color used for the Meter. Expects `string`.

Defaults to

```
accent-1
```

**meter.extend**

Any additional style for Meter. Expects `string | (props) => {}`.

Defaults to

```
undefined
```
