import React from 'react';
import PropTypes from 'prop-types';
import { Video as VideoM } from '../Video';

function Video(props) {
  const { videoSrc, videoCCSrc, videoCCLabel, videoCCsrcLang, videoCCkind } = props;

  return (
    <VideoM {...props}>
      <source key="video" src={videoSrc} type="video/mp4" />
      <track
        key="cc"
        label={videoCCLabel}
        kind={videoCCkind}
        srcLang={videoCCsrcLang}
        src={videoCCSrc}
        default
      />
    </VideoM>
  );
}

Video.propTypes = {
  videoSrc: PropTypes.string,
  videoCCSrc: PropTypes.string,
  videoCCLabel: PropTypes.string,
  videoCCsrcLang: PropTypes.string,
  videoCCkind: PropTypes.string,
  a11yTitle: PropTypes.string,
  alignSelf: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
  gridArea: PropTypes.string,
  margin: PropTypes.oneOf([
    'none',
    'xxsmall',
    'xsmall',
    'small',
    'medium',
    'large',
    'xlarge',
  ]),
  autoPlay: PropTypes.bool,
  controls: PropTypes.oneOf(['false', 'over', 'below']),
  fit: PropTypes.oneOf(['cover', 'contain']),
  loop: PropTypes.bool,
  mute: PropTypes.bool,
};

export default Video;