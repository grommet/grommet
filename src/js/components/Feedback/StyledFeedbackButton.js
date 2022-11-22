import styled from 'styled-components';
import { Box } from '../Box';

const PositionedFeedbackBox = styled(Box)`
  bottom: 0px;
  right: 0px;
  position: ${(props) => props.theme.feedback?.button?.position};
  border-radius: ${(props) => props.theme.feedback?.button?.borderRadius};
  z-index: ${(props) => props.theme.feedback?.button?.zIndex};
`;

export { PositionedFeedbackBox };
