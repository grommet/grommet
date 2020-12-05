## Tree
Hierarchical list structure.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Controls-Tree&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/tree&module=%2Fsrc%2FTree.js)
## Usage

```javascript
import { Tree } from 'grommet';
<Tree />
```

## Properties

**data**

The data structure provided to the tree, for nested behavior 
      an object should include a children key.

```
[object]
```

**mode**

Mode options are nested and column. 
      nested Tree results the classic nested structure of hierarchal nested 
      lists, while column mode provides to display metadata per entry 
      while showing one level at the time with a breadcrumb 
      option to the parent level. Defaults to `nested`.

```
nested
column
```

**children**

Function that can be called to render the visual representation 
        of a specific node on the Tree. 
        For example, 'datum' can be passed as an 
        argument that would then return a react element according to a 
        certain Tree node info (provided from data).
        `<Tree ...>{({ datum }) => <Text> datum.name </Text>}</Tree>

```
function
```
  
## Theme
  
**tree.nested.listProps**

Any valid List property for nested mode Tree. Expects `object`.

Defaults to

```
{ border: false }
```

**tree.column.listProps**

Any valid List property for a column mode Tree. Expects `object`.

Defaults to

```
{ border: false }
```
