import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

export const doc = Audio => {
  const DocumentedAudio = describe(Audio)
    .availableAt(getAvailableAtBadge('Audio'))
    .description('An Audio player.')
    .usage(
      `import { Audio } from 'grommet';
<Audio />`,
    )
    .intrinsicElement('audio');

  DocumentedAudio.propTypes = {
    ...genericProps,
    autoplay: PropTypes.bool.description(
      'Enables automatic playback of the audio as soon as it is loaded.',
    ),
    controls: PropTypes.bool
      .description('Whether to show playback controls.')
      .defaultValue('true'),
    loop: PropTypes.bool
      .description('Enables continuous audio looping.')
      .defaultValue(false),
    muted: PropTypes.bool
      .description(
        'Enables audio muting. This option is best used with the autoPlay flag.',
      )
      .defaultValue(false),
  };

  return DocumentedAudio;
};

export const themeDoc = {
  'audio.controls.background': {
    description: 'The background color of the Audio controls',
    type: 'string | { dark: string, light: string }',
    defaultValue: undefined,
  },
  'audio.controls.extend': {
    description: 'Any additional style for the Audio controls.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'audio.controls.text.color': {
    description: 'The time duration text shown on the Audio controls',
    type: 'string',
    defaultValue: 'dark-5',
  },
  'audio.extend': {
    description: 'Any additional style for Audio.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'audio.icons.color': {
    description: 'The color used for the icons',
    type: 'string',
    defaultValue: 'white',
  },
  'audio.icons.pause': {
    description: 'The icon that indicates pause mode',
    type: 'React.element',
    defaultValue: '<Pause />',
  },
  'audio.icons.play': {
    description: 'The icon that indicates play mode',
    type: 'React.element',
    defaultValue: '<Play />',
  },
  'audio.icons.volume': {
    description: 'The volume icon indicator',
    type: 'React.element',
    defaultValue: '<Volume />',
  },
  'audio.volume.background': {
    description: 'The background color of the volume bar',
    type: 'string',
    defaultValue: '',
  },
  'audio.volume.color': {
    description: 'The background color of the volume bar',
    type: 'string',
    defaultValue: 'brand',
  },
  'audio.volume.opacity': {
    description: 'The background color of the volume bar',
    type: 'string',
    defaultValue: '',
  },
  'global.size.medium': {
    description: 'The width size of the Audio container',
    type: 'string',
    defaultValue: '384px',
  },
};
