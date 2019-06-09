## Collapsible
Expand or collapse animation.

## Usage

```javascript
import { Collapsible } from 'grommet';
<Collapsible open>test</Collapsible>
```

## Properties

**open**

Whether or not the component should be open.

```
boolean
```

**direction**

Direction to animate the collapsible content. Defaults to `vertical`.

```
horizontal
vertical
```
  
## Intrinsic element

```
div
```
## Theme
  
**collapsible.minSpeed**

The minimum speed of Collapsible animation in milliseconds. Expects `number`.

Defaults to

```
200
```

**collapsible.baseline**

Default height to be used to calculate the optimal collapsible speed. Expects `number`.

Defaults to

```
500
```

**collapsible.extend**

Any additional style for Collapsible. Expects `string | (props) => {}`.

Defaults to

```
undefined
```
