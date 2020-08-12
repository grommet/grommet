## SkipLinks
Describe a list of elements to skip to.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=SkipLinks&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/skiplinks&module=%2Fsrc%2FSkipLinks.js)
## Usage

```javascript
import { SkipLinks } from 'grommet';
<SkipLinks elements={['main', 'footer']} />
```

## Properties

**children**

Required. Array of SkipLink

```
node
```

**messages**

Custom messages for SkipLinks. Used for accessibility by screen 
readers. Defaults to `{
  "skipTo": "Skip To:"
}`.

```
{
  skipTo: string
}
```
  
## Theme
  
**skipLinks.position**

Position of the layer content once opened. Expects `string`.

Defaults to

```
top
```

**skipLinks.container**

Any valid Box prop for the SkipLinks container. Expects `object`.

Defaults to

```
{ elevation: 'large', pad: 'medium', round: 'small' }
```

**skipLinks.container.elevation**

The container shadow. Expects `string`.

Defaults to

```
large
```

**skipLinks.container.pad**

The pad used for the layer container. Expects `string | object`.

Defaults to

```
medium
```

**skipLinks.container.round**

The rounding of the later container. Expects `boolean | string | object`.

Defaults to

```
small
```

**skipLinks.label**

Any valid Text prop for the text message. Expects `object`.

Defaults to

```
{ margin: 'small', size: 'medium' }
```

**skipLinks.label.margin**

The margin size around the text message. Expects `string`.

Defaults to

```
{ bottom: medium }
```

**skipLinks.label.size**

The font size of the text label. Expects `string`.

Defaults to

```
medium
```

**text.medium.size**

The font size of the text label. Expects `string`.

Defaults to

```
18px
```
