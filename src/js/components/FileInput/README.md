## FileInput
A control to input one or more files.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=FileInput&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=fileinput&module=%2Fsrc%2FFileInput.js)
## Usage

```javascript
import { FileInput } from 'grommet';
<FileInput id='file' name='file' />
```

## Properties

**id**

The id attribute of the input.

```
string
```

**messages**

Custom messages for FileInput. Used for accessibility by screen
        readers. Defaults to `{
  "browse": "browse",
  "dropPrompt": "Drop file here or",
  "dropPromptMultiple": "Drop files here or",
  "files": "files",
  "remove": "remove",
  "removeAll": "remove all"
}`.

```
{
  browse: string,
  dropPrompt: string,
  dropPromptMultiple: string,
  files: string,
  remove: string,
  removeAll: string
}
```

**name**

The name attribute of the input.

```
string
```

**onChange**

Function that will be called when one or more files are added the
      input.

```
function
```
  
## Intrinsic element

```
input
```
## Theme
  
**global.input.weight**

The font weight of the text entered. Expects `number`.

Defaults to

```
600
```

**global.input.padding**

The padding of the text. Expects `string`.

Defaults to

```
12px
```
