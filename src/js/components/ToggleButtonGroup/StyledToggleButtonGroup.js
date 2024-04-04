import styled from 'styled-components';
import { Button } from '../Button';
import { roundStyle, edgeStyle } from '../../utils';

export const StyledButton = styled(Button)`
  border-radius: 0;
  ${(props) => roundStyle(props.round, true, props.theme)};
  ${(props) =>
    edgeStyle(
      'padding',
      props.theme.toggleButtonGroup.button.pad,
      false,
      undefined,
      props.theme,
    )}
  border: none;
`;
