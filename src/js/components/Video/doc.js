import { describe, PropTypes } from 'react-desc';

export default (Video) => {
  const DocumentedVideo = describe(Video).description('A video player.').usage(
    `import { Video } from 'grommet';
    <Video/>`
  );

  DocumentedVideo.propTypes = {
    autoPlay: PropTypes.bool.description(
      'Enables automatic playback of the video as soon as it is loaded. Defaults to false.'
    ),
    controls: PropTypes.oneOf([false, 'over', 'below']).description(
      'Whether to show playback controls and where to place them. Defaults to "over".'
    ),
    fit: PropTypes.oneOf(['cover', 'contain']).description(
      'How the image fills its container.'
    ),
    loop: PropTypes.bool.description(
      'Enables continuous video looping. Defaults to false.'
    ),
    mute: PropTypes.bool.description(
      'Enables video muting. This option is best used with the autoPlay flag'
    ),
  };

  return DocumentedVideo;
};
