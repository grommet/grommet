## Avatar
An Avatar.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Visualizations-Avatar&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/avatar&module=%2Fsrc%2FAvatar.js)
## Usage

```javascript
import { Avatar } from 'grommet';
<Avatar/>
```

## Properties

**size**

A fixed size. Defaults to `medium`.

```
xsmall
small
medium
large
xlarge
string
```

**src**

Specifies a URL string for an avatar image.

```
string
```
  
## Intrinsic element

```
div
```
## Theme
  
**avatar.extend**

Any additional style for the Avatar. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**avatar.size.xsmall**

The xsmall size of the Avatar. Expects `string`.

Defaults to

```
18px
```

**avatar.size.small**

The small size of the Avatar. Expects `string`.

Defaults to

```
24px
```

**avatar.size.medium**

The medium size of the Avatar. Expects `string`.

Defaults to

```
48px
```

**avatar.size.large**

The large size of the Avatar. Expects `string`.

Defaults to

```
72px
```

**avatar.size.xlarge**

The xlarge size of the Avatar. Expects `string`.

Defaults to

```
96px
```

**avatar.text.extend**

Any additional style for the text. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**avatar.text.fontWeight**

The font weight of the label. Expects `number`.

Defaults to

```
undefined
```

**avatar.text.size.xsmall**

The size of the text that is mapped according to 'avatar.size.xsmall'. Expects `string`.

Defaults to

```
small
```

**avatar.text.size.small**

The size of the text that is mapped according to 'avatar.size.small'. Expects `string`.

Defaults to

```
medium
```

**avatar.text.size.medium**

The size of the text that is mapped according to 'avatar.size.medium'. Expects `string`.

Defaults to

```
large
```

**avatar.text.size.large**

The size of the text that is mapped according to 'avatar.size.large'. Expects `string`.

Defaults to

```
xlarge
```

**avatar.text.size.xlarge**

The size of the text that is mapped according to 'avatar.size.xlarge'. Expects `string`.

Defaults to

```
xxlarge
```
