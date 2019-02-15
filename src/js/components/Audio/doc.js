import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

export const doc = Audio => {
  const DocumentedAudio = describe(Audio)
    .availableAt(getAvailableAtBadge('Audio'))
    .description('A Audio player.')
    .usage(
      `import { Audio } from 'grommet';
<Audio />`,
    )
    .intrinsicElement('audio');

  DocumentedAudio.propTypes = {
    ...genericProps,
    autoPlay: PropTypes.bool.description(
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
