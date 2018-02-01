## CheckBox
A checkbox toggle control.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=checkbox&module=%2Fsrc%2FCheckBox.js)
## Usage

```javascript
import { CheckBox } from 'grommet';
<CheckBox />
```

## Properties

**checked**

Same as React <input checked={} />

```
boolean
```

**defaultChecked**

Same as React <input defaultChecked={} />

```
boolean
```

**disabled**

Same as React <input disabled={} />. Also adds a hidden input element
      with the same name so form submissions work.

```
boolean
```

**id**

The DOM id attribute value to use for the underlying <input/> element.

```
string
```

**label**

Label text to place next to the control.

```
node
```

**name**

The DOM name attribute value to use for the underlying <input/> element.

```
string
```

**onChange**

Same as React <input onChange={} />

```
function
```

**reverse**

Whether to show the label in front of the checkbox.

```
boolean
```

**toggle**

Whether to visualize it as a toggle switch.

```
boolean
```
  