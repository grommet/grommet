import styled, { css } from 'styled-components';

import { genericStyles, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

const FIT_MAP = {
  cover: 'cover',
  contain: 'contain',
};

const fitStyle = css`
  flex: 1 1;
  min-height: 0;
  object-fit: ${props => FIT_MAP[props.fit]};
`;

const StyledVideo = styled.video`
  max-width: 100%;
  ${props => props.fit && fitStyle} ::cue {
    background: ${props => props.theme.video.captions.background};
  }

  ${props => props.theme.video && props.theme.video.extend};
`;

StyledVideo.defaultProps = {};
Object.setPrototypeOf(StyledVideo.defaultProps, defaultProps);

const StyledVideoContainer = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  ${genericStyles};
`;

StyledVideoContainer.defaultProps = {};
Object.setPrototypeOf(StyledVideoContainer.defaultProps, defaultProps);

const positionStyle = css`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

const StyledVideoControls = styled.div`
  flex: 0 0;
  ${props => props.over && positionStyle} opacity: 0;
  transition: opacity 0.3s;
  ${props => (props.active ? 'opacity: 1;' : 'pointer-events: none')};
`;

StyledVideoControls.defaultProps = {};
Object.setPrototypeOf(StyledVideoControls.defaultProps, defaultProps);

const headStyle = css`
  ::after {
    content: '';
    height: 100%;
    width: ${props => props.theme.global.edgeSize.xsmall};
    background: ${props => normalizeColor('light-5', props.theme)};
    position: absolute;
    left: ${props => `${props.value}%`};
  }
`;

const StyledVideoScrubber = styled.div`
  cursor: pointer;
  ${props => props.value && headStyle};
`;

StyledVideoScrubber.defaultProps = {};
Object.setPrototypeOf(StyledVideoScrubber.defaultProps, defaultProps);

export {
  StyledVideo,
  StyledVideoContainer,
  StyledVideoControls,
  StyledVideoScrubber,
};
