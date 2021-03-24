## FileInput
A control to input one or more files.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Input-FileInput&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/fileinput&module=%2Fsrc%2FFileInput.js)
## Usage

```javascript
import { FileInput } from 'grommet';
<FileInput id='file' name='file' />
```

## Properties

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

Whether to allow multiple files. If an object is supplied,
        'aggregageThreshold' indicates the maximum number of individual
        files to show. Above this, only a single message describing the
        number of files will be shown.

```
boolean
{
  aggregateThreshold: number
}
```

**name**

The name attribute of the input. This is required when used within
      a Form.

```
string
```

**onChange**

Function that will be called when one or more files are added to 
      the input. The file(s) can be found in event.target.files.

```
function
```

**renderFile**

Provides custom rendering of the file. If not provided, the file's
      name will be shown. It will be passed the browser File object as
      an argument. For example: (file) => <Text>{file.name}</Text>

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

**global.input.extend**

Any additional style for an input. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**fileInput.background**

The background prop for the container. Expects `string | object`.

Defaults to

```
undefined
```

**fileInput.border**

The border prop for the container. Expects `string | object`.

Defaults to

```
[object Object]
```

**fileInput.dragOver.background**

Background to use when dragging over. Expects `string | object`.

Defaults to

```
undefined
```

**fileInput.dragOver.border**

Background to use when dragging over. Expects `string | object`.

Defaults to

```
[object Object]
```

**fileInput.dragOver.extend**

Any additional style for container when dragging over it. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**fileInput.extend**

Any additional style for container. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**fileInput.hover.background**

Background to use when hovering. Expects `string | object`.

Defaults to

```
undefined
```

**fileInput.hover.border**

Background to use when hovering. Expects `string | object`.

Defaults to

```
[object Object]
```

**fileInput.hover.extend**

Any additional style for container when hovering over it. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**fileInput.icons.remove**

The icon to use for the control to remove a chosen file. Expects `React.Element`.

Defaults to

```
FormClose
```

**fileInput.label**

The Text props to use for the file label. Expects `object`.

Defaults to

```
[object Object]
```

**fileInput.message**

The Text props to use for the message shown before a file
      has been selected. Expects `object`.

Defaults to

```
[object Object]
```

**fileInput.pad**

The pad prop for the container. Expects `string | object`.

Defaults to

```
undefined
```

**fileInput.round**

The round prop for the container. Expects `string | object`.

Defaults to

```
undefined
```
