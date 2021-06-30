## Tip
Tooltip or a hint when hovering over an element. The tooltip will render 
      when hovering on top of the Tip's child node or string.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Controls-Tip&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/tip&module=%2Fsrc%2FTip.js)
## Usage

```javascript
import { Tip } from 'grommet';
<Tip />
```

## Properties

**content**

The tooltip content inside the drop.

```
node
```

**dropProps**

Any valid Drop prop to style the Tip drop container. Defaults to `{
  "trapFocus": false
}`.

```
object
```

**plain**

Whether content should have default styling from tip.content.

```
boolean
```
  
## Theme
  
**tip.content**

Any valid Box property for the Tip container. Not applicable 
    when using Tip plain prop. Expects `object`.

Defaults to

```
{ background: 'background-contrast', elevation: 'small', 
    margin: 'xsmall', pad: { vertical: 'xsmall', horizontal: 'small' }, 
    round: 'small'}
```

**tip.drop**

Any valid Drop property for the Tip. Expects `object`.

Defaults to

```
{
      align: { top: 'bottom' },   
      background: 'none',
      elevation: 'none',
      margin: 'none'
    }
```
