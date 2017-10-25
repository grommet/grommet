import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export default (Video) => {
  const DocumentedVideo = describe(Video)
    .availableAt(getAvailableAtBadge('Video'))
    .description('A video player.')
    .usage(
      `import { Video } from 'grommet';
<Video />`
    );

  DocumentedVideo.propTypes = {
    autoPlay: PropTypes.bool.description(
      'Enables automatic playback of the video as soon as it is loaded.'
    ),
    controls: PropTypes.oneOf([false, 'over', 'below']).description(
      'Whether to show playback controls and where to place them.'
    ).defaultValue('over'),
    fit: PropTypes.oneOf(['cover', 'contain']).description(
      'How the image fills its container.'
    ),
    loop: PropTypes.bool.description(
      'Enables continuous video looping.'
    ),
    mute: PropTypes.bool.description(
      'Enables video muting. This option is best used with the autoPlay flag'
    ),
  };

  return DocumentedVideo;
};
