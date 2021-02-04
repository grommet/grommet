## WorldMap
A map of the world, or a continent.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Visualizations-WorldMap&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/worldmap&module=%2Fsrc%2FWorldMap.js)
## Usage

```javascript
import { WorldMap } from 'grommet';
<WorldMap />
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

**color**

Color when hovering over places while selecting.

```
string
{
  dark: string,
  light: string
}
```

**continents**

Continent details.

```
[{
  color: 
    string
    {
      dark: string,
      light: string
    },
  name: 
    Africa
    Asia
    Australia
    Europe
    North America
    South America,
  onClick: function,
  onHover: function
}]
```

**fill**

Whether the width and/or height should fill the container.

```
horizontal
vertical
boolean
```

**onSelectPlace**

Called when the user clicks on a place.
        It is passed the location.

```
function
```

**places**

Place details. location is an array of two numeric values that indicates
       the latitude and longitude of the specified location.

```
[{
  color: 
    string
    {
      dark: string,
      light: string
    },
  name: string,
  location: [number],
  onClick: function,
  onHover: function
}]
```

**hoverColor**

Color when hovering over places while selecting.

```
string
{
  dark: string,
  light: string
}
```
  
## Intrinsic element

```
svg
```
## Theme
  
**worldMap.color**

The color for each individual dot when a color is not passed as a prop Expects `string`.

Defaults to

```
light-3
```

**worldMap.continent.active**

The size of the visual dots belonging to a continent when the
continent is being hovered. Expects `string`.

Defaults to

```
8px
```

**worldMap.continent.base**

The size of the visual dots belonging to a continent that is
not being hovered. Expects `string`.

Defaults to

```
6px
```

**worldMap.hover.color**

The color for an individual dot when it is being hovered Expects `string`.

Defaults to

```
light-4
```

**worldMap.place.active**

The size of a visual dot for an individual place in the map 
when it is being hovered. Expects `string`.

Defaults to

```
20px
```

**worldMap.place.base**

The size of the visual dot representing an individual place 
in the map when it is not being hovered. Expects `string`.

Defaults to

```
8px
```

**worldMap.extend**

Any additional style for the WorldMap. Expects `string | (props) => {}`.

Defaults to

```
undefined
```
