import { schema, PropTypes } from 'react-desc';

export default Video => schema(Video, {
  description: 'A video player.',
  usage: `import { Video } from 'grommet';
  <Video/>`,
  props: {
    autoPlay: [
      PropTypes.bool,
      'Enables automatic playback of the video as soon as it is loaded. Defaults to false.',
    ],
    controls: [
      PropTypes.oneOf([false, 'over', 'below']),
      'Whether to show playback controls and where to place them. Defaults to "over".',
    ],
    fit: [
      PropTypes.oneOf(['cover', 'contain']),
      'How the image fills its container.',
    ],
    loop: [
      PropTypes.bool,
      'Enables continuous video looping. Defaults to false.',
    ],
    mute: [
      PropTypes.bool,
      `Enables video muting. This option is best used with the autoPlay flag.
      Defaults to false.`,
    ],
  },
});
