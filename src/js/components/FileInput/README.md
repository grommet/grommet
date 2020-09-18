## undefined
A control to input one or more files.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=FileInput&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/fileinput&module=%2Fsrc%2FFileInput.js)
## Usage

```javascript
import { FileInput } from 'grommet';
<FileInput id='file' name='file' />
```

## Properties

**accept**

MIME type pattern to match against. For example: "image/*".

```
string
```

**disabled**

Whether the control is disabled.

```
boolean
```

**id**

The id attribute of the input.

```
string
```

**fileLabel**

Provides custom rendering of the file. If not provided, the file's
      name will be shown. It will be passed the browser File object as
      an argument. For example: (file) => <Text>{file.name}</Text>

```
node
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

**multiple**

Whether to allow multiple files

```
boolean
```

**name**

The name attribute of the input.

```
string
```

**onChange**

Function that will be called when one or more files are added the
      input. The file(s) can be found in event.target.files.

```
function
```
  
## Intrinsic element

```
input
```
## Theme
  
**global.input.font.height**

The line-height of the text. Expects `string`.

Defaults to

```
undefined
```

**global.input.font.size**

The size of the text. Expects `string`.

Defaults to

```
undefined
```

**global.input.font.weight**

The font-weight of the text. This value will only be 
      applied if global.input.weight is undefined. Expects `number | string`.

Defaults to

```
600
```

**global.input.weight**

This value has been deprecated and replaced by 
      global.input.font.weight. Expects `number | string`.

Defaults to

```
undefined
```

**global.input.padding**

The padding of the text. Expects `string | { top: string, bottom: string, left: string, right: 
        string, horizontal: string, vertical: string }`.

Defaults to

```
12px
```

**fileInput.background**

The Box background prop for the container. Expects `string`.

Defaults to

```
undefined
```

**fileInput.border**

The Box border prop for the container. Expects `string`.

Defaults to

```
undefined
```

**fileInput.dragOver.background**

Background to use when dragging over. Expects `string`.

Defaults to

```
undefined
```

**fileInput.dragOver.border**

Background to use when dragging over. Expects `string`.

Defaults to

```
undefined
```

**fileInput.hover.background**

Background to use when hovering. Expects `string`.

Defaults to

```
undefined
```

**fileInput.hover.border**

Background to use when hovering. Expects `string`.

Defaults to

```
undefined
```

**fileInput.icons.remove**

The icon to use for the control to remove a chosen file. Expects `string`.

Defaults to

```
undefined
```

**fileInput.label**

The Text props to use for the file label. Expects `string`.

Defaults to

```
undefined
```

**fileInput.message**

The Text props to use for the message shown before a file
      has been selected. Expects `string`.

Defaults to

```
undefined
```

**fileInput.pad**

The Box pad prop for the container. Expects `string`.

Defaults to

```
undefined
```

**fileInput.round**

The Box round prop for the container. Expects `string`.

Defaults to

```
undefined
```
