## Video
A video player.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Video&full=0&addons=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/video&module=%2Fsrc%2FVideo.js)
## Usage

```javascript
import { Video } from 'grommet';
<Video />
```

## Properties

**a11yTitle**

Custom label to be used by screen readers. When provided, an aria-label will
   be added to the element.

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
  end: 
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
  start: 
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

Enables automatic playback of the video as soon as it is loaded.

```
boolean
```

**controls**

Whether to show playback controls and where to place them. Defaults to `over`.

```
false
over
below
```

**fit**

How the image fills its container.

```
cover
contain
```

**loop**

Enables continuous video looping.

```
boolean
```

**mute**

Enables video muting. This option is best used with the autoPlay flag.

```
boolean
```

**messages**

Custom messages. Used for accessibility by screen readers. Defaults to `{
  "closeMenu": "close menu",
  "fullScreen": "full screen",
  "progressMeter": "video progress",
  "scrubber": "scrubber",
  "openMenu": "open menu",
  "pauseButton": "pause",
  "playButton": "play",
  "volumeDown": "volume down",
  "volumeUp": "volume up"
}`.

```
{
  closeMenu: string,
  fullScreen: string,
  progressMeter: string,
  openMenu: string,
  pauseButton: string,
  playButton: string,
  scrubber: string,
  volumeDown: string,
  volumeUp: string
}
```
  
## Intrinsic element

```
video
```
## Theme
  
**global.edgeSize.responsiveBreakpoint**

The actual breakpoint to trigger changes in the video component layout. Expects `string`.

Defaults to

```
small
```

**global.edgeSize.xsmall**

The width of the video scrubber. Expects `object`.

Defaults to

```
6px
```

**video.captions.background**

The caption background color of the video  Expects `string`.

Defaults to

```
rgba(0, 0, 0, 0.7)
```

**video.icons.closedCaption**

The icon to use for the caption. Expects `React.Element`.

Defaults to

```
<ClosedCaption />
```

**video.icons.configure**

The icon to use for the configuration action. Expects `React.Element`.

Defaults to

```
<Actions />
```

**video.icons.fullScreen**

The icon to use for viewing the video in full screen. Expects `React.Element`.

Defaults to

```
<Expand />
```

**video.icons.pause**

The icon to use for pausing the video. Expects `React.Element`.

Defaults to

```
<Pause />
```

**video.icons.play**

The icon to use for playing the video. Expects `React.Element`.

Defaults to

```
<Play />
```

**video.icons.reduceVolume**

The icon to use for the action of lowering the volume. Expects `React.Element`.

Defaults to

```
<VolumeLow />
```

**video.icons.volume**

The icon to use for the action of raising the volume. Expects `React.Element`.

Defaults to

```
<Volume />
```

**video.scrubber.color**

The background color of the video scrubber. Expects `string`.

Defaults to

```
light-4
```

**video.extend**

Any additional style for Video. Expects `string | (props) => {}`.

Defaults to

```
undefined
```
