## Number
Is a number value with optional units

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Visualizations-Number&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/number&module=%2Fsrc%2FNumber.js)
## Usage

```javascript
import { Number } from 'grommet';
<Number value={27} units="GB" />
```

## Properties

**color**

A color identifier to use for the units.

```
string
{
  dark: string,
  light: string
}
```

**size**

The size of the text. Defaults to `medium`.

```
small
medium
large
xlarge
string
```

**units**

Whether and how any units should be shown.

```
string
{
  color: 
    string
    {
      dark: string,
      light: string
    },
  label: string,
  size: 
    small
    medium
    large
    xlarge
    string,
  weight: 
    normal
    bold
    number
}
```

**weight**

The font weight of the text

```
normal
bold
number
```
  
## Theme
  
**global.colors.text**

The text color used for Number. In order for this to take 
    effect, global.colors.background needs to be defined. Expects `object | { dark: string, light: string }`.

Defaults to

```
{ dark: '#f8f8f8', light: '#444444' }
```

**text.font.family**

The font family to use for Number. Expects `string`.

Defaults to

```
undefined
```

**number.size**

The possible sizes of the text in terms of its font-size and 
line-height. Expects `object`.

Defaults to

```
{
      small: {
        size: '26px',
        height: '32px',
       },
      medium: {
        size: '34px',
        height: '40px',
      },
      large: {
        size: '50px',
        height: '56px',
      },
      xlarge: {
        size: '82px',
        height: '88px',
      },
    }
```

**number.weight**

The font weight Expects `string`.

Defaults to

```
bold
```

**number.color**

The text color Expects `string`.

Defaults to

```
undefined
```

**number.units.size**

The possible sizes of the units text, either using t-shirt
    size terms or { size, height } objects. Expects `object`.

Defaults to

```
undefined
```

**number.units.weight**

The font weight of the units text. Expects `string`.

Defaults to

```
undefined
```

**number.units.color**

The color of the units text. Expects `string`.

Defaults to

```
undefined
```
