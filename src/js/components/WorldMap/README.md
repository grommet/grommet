## WorldMap
A map of the world, or a continent.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-site?initialpath=worldmap&amp;module=%2Fscreens%2FWorldMap.js)
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

**selectColor**

Color when selecting.

```
string
```
  