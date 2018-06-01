## Tabs
A tabular view component.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=tabs&module=%2Fsrc%2FTabs.js)
## Usage

```javascript
import { Tabs, Tab } from 'grommet';
<Tabs>
  <Tab title='Tab 1'>...</Tab>
  <Tab title='Tab 2'>...</Tab>
</Tabs>
```

## Properties

**activeIndex**

Active tab index. If specified, Tabs will be a controlled component. This means that future
tab changes will not work unless you subscribe to onActive function and update activeIndex
accordingly.

```
number
```

**children**

Required. Array of Tab.

```
[new Tab(...)]
```

**justify**

How to align the tabs along the main axis. Defaults to `center`.

```
start
center
end
```

**messages**

Custom messages for Tabs. Used for accessibility by screen readers. Defaults to `{
  "tabContents": "Tab Contents"
}`.

```
{
  tabContents: string
}
```

**onActive**

Function that will be called with the active tab index when the currently active
tab changes.

```
function
```
  