import styled from 'styled-components';
import { defaultProps } from '../../default-props';

// TODO get height from jens
const StyledAudio = styled.audio`
  max-width: 100%;

  ${props => props.theme.audio && props.theme.audio.extend};
`;

StyledAudio.defaultProps = {};
Object.setPrototypeOf(StyledAudio.defaultProps, defaultProps);

// TODO check if width in necessary
const StyledAudioContainer = styled.div`
  position: relative;

  width: ${props => props.theme.global.size.medium};
`;

StyledAudioContainer.defaultProps = {};
Object.setPrototypeOf(StyledAudioContainer.defaultProps, defaultProps);

const StyledAudioControls = styled.div`
  transition: opacity 0.3s;

  ${props => (props.active ? 'opacity: 1;' : 'pointer-events: none')};
`;

StyledAudioControls.defaultProps = {};
Object.setPrototypeOf(StyledAudioControls.defaultProps, defaultProps);

export { StyledAudio, StyledAudioControls, StyledAudioContainer };
