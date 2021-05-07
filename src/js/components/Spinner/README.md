## Spinner
A Spinner.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Visualizations-Spinner&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/spinner&module=%2Fsrc%2FSpinner.js)
## Usage

```javascript
import { Spinner } from 'grommet';
<Spinner/>
```

## Properties

**size**

A fixed size. Defaults to `small`.

```
xsmall
small
medium
large
xlarge
string
```

**color**

The border color of the Spinner.

```
string
{
  dark: string,
  light: string
}
```

**message**

When message is a string, the message will be announced for 
        screen readers once the Spinner is loaded. 
        When an object, the 'start' message will be announced 
        as the Spinner appears, and the 'end' message as the spinner closes.

```
string
{
  start: string,
  end: string
}
```
  
## Theme
  
**spinner.container**

Any valid Box prop for the Spinner container. 
    Including 'color' for the spinner border color and 'size' for the default 
    size of the Spinner. Expects `object`.

Defaults to

```
[object Object]
```

**spinner.icon**

An icon or an SVG to use as the default Spinner. Expects `ReactElement | SVG`.

Defaults to

```
undefined
```

**spinner.size.xsmall**

The xsmall size of the Spinner. Expects `string`.

Defaults to

```
18px
```

**spinner.size.small**

The small size of the Spinner. Expects `string`.

Defaults to

```
24px
```

**spinner.size.medium**

The medium size of the Spinner. Expects `string`.

Defaults to

```
48px
```

**spinner.size.large**

The large size of the Spinner. Expects `string`.

Defaults to

```
72px
```

**spinner.size.xlarge**

The xlarge size of the Spinner. Expects `string`.

Defaults to

```
96px
```
