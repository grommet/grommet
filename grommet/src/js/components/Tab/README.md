## Tab
One tab within Tabs.

## Usage

```javascript
import { Tab } from 'grommet';
<Tab />
```

## Properties

**plain**

Whether this is a plain tab with no style.

```
boolean
```

**title**

The title of the tab.

```
string
node
```
  
## Intrinsic element

```
button
```
## Theme
  
**tab.active**

styles for the active tab. Expects `object`.

Defaults to

```
{color: 'text', background: undefined }
```

**tab.background**

background styling of Tab. Expects `object`.

Defaults to

```
undefined
```

**tab.border**

border styles of the tab Expects `object`.

Defaults to

```
{
      side: 'bottom',
      size: 'small',
      color: {
        dark: 'accent-1',
        light: 'brand',
      },
      active: {
        color: {
          dark: 'white',
          light: 'black',
        },
      },
      hover: {
        color: {
          dark: 'white',
          light: 'black',
        },
        // extend: undefined,
      },
    }
```

**tab.color**

text color for the Tab. Expects `string`.

Defaults to

```
control
```

**tab.hover.background**

background style of the Tab on hover. Expects `string | object`.

Defaults to

```
undefined
```

**tab.hover.color**

text color of the tab on hover. Expects `string | { dark: string, light: string }`.

Defaults to

```
{ dark: 'white', light: 'black' }
```

**tab.hover.extend**

Any additional style for Tab hover. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**tab.margin**

The margin of Tab. Expects `string | object`.

Defaults to

```
{ vertical: 'xxsmall', horizontal: 'small' }
```

**tab.pad**

The pad of Tab. Expects `string | object`.

Defaults to

```
{ bottom: 'xsmall' }
```
