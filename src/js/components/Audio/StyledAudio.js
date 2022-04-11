import styled, { css } from 'styled-components';
import { defaultProps } from '../../default-props';
import { genericStyles } from '../../utils/styles';
import { normalizeColor } from '../../utils/colors';

const StyledAudio = styled.audio`
  position: relative;
  ${(props) => props.theme.audio && props.theme.audio.extend};
`;

StyledAudio.defaultProps = {};
Object.setPrototypeOf(StyledAudio.defaultProps, defaultProps);

const StyledAudioContainer = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  max-width: ${(props) => props.theme.global.size.medium};
  ${genericStyles};
`;

StyledAudioContainer.defaultProps = {};
Object.setPrototypeOf(StyledAudioContainer.defaultProps, defaultProps);

const StyledAudioControls = styled.div`
  ${(props) =>
    props.theme.audio &&
    props.theme.audio.controls &&
    props.theme.audio.controls.extend};
`;
StyledAudioControls.defaultProps = {};
Object.setPrototypeOf(StyledAudioControls.defaultProps, defaultProps);

const headStyle = css`
  ::after {
    content: '';
    height: 100%;
    width: ${(props) => props.theme.global.edgeSize.small};
    background: ${(props) =>
      normalizeColor(props.theme.audio.scrubber.head.color, props.theme)};
    position: absolute;
    left: ${(props) => `${props.value}%`};
  }
`;

// TODO clean up color + opacity
const StyledAudioScrubber = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  ${(props) => props.value && headStyle};
`;

StyledAudioScrubber.defaultProps = {};
Object.setPrototypeOf(StyledAudioScrubber.defaultProps, defaultProps);

export {
  StyledAudio,
  StyledAudioContainer,
  StyledAudioControls,
  StyledAudioScrubber,
};
