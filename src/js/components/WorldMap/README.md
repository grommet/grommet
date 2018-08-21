## WorldMap
A map of the world, or a continent.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=WorldMap&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=worldmap&module=%2Fsrc%2FWorldMap.js)
## Usage

```javascript
import { WorldMap } from 'grommet';
<WorldMap />
```

## Properties

**color**

Default color

```
string
```

**continents**

Continent details.

```
[{
  color: string,
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

**onSelectPlace**

Called when the user clicks on a place.
        It is passed the location.

```
function
```

**places**

Place details.

```
[{
  color: string,
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
```
  