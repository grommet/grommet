## Audio
A Audio player.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Audio&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=audio&module=%2Fsrc%2FAudio.js)
## Usage

```javascript
import { Audio } from 'grommet';
<Audio />
```

## Properties

**a11yTitle**

Custom title to be used by screen readers.

```
string
```

**alignSelf**

How to align along the cross axis when contained in
      a Box or along the column axis when contained in a Grid.

```
start
center
end
stretch
```

**gridArea**

The name of the area to place
    this inside a parent Grid.

```
string
```

**margin**

The amount of margin around the component. An object can
      be specified to distinguish horizontal margin, vertical margin, and
      margin on a particular side.

```
none
xxsmall
xsmall
small
medium
large
xlarge
{
  bottom: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  horizontal: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  left: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  right: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  top: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  vertical: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string
}
string
```

**autoPlay**

Enables automatic playback of the audio as soon as it is loaded.

```
boolean
```

**controls**

Whether to show playback controls. Defaults to `true`.

```
boolean
```

**loop**

Enables continuous audio looping.

```
boolean
```

**muted**

Enables audio muting. This option is best used with the autoPlay flag.

```
boolean
```
  
## Intrinsic element

```
audio
```
## Theme
  
**audio.controls.background**

The background color of the Audio controls Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**audio.controls.extend**

Any additional style for the Audio controls. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**audio.extend**

Any additional style for Audio. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**audio.icons.color**

The color used for the icons Expects `string`.

Defaults to

```
white
```

**audio.icons.pause**

The icon that indicates pause mode Expects `React.element`.

Defaults to

```
<Pause />
```

**audio.icons.play**

The icon that indicates play mode Expects `React.element`.

Defaults to

```
<Play />
```

**audio.icons.volume**

The volume icon indicator Expects `React.element`.

Defaults to

```
<Volume />
```

**global.size.medium**

The width size of the Audio container Expects `string`.

Defaults to

```
384px
```
