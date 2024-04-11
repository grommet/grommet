import styled from 'styled-components';
import { Button } from '../Button';
import { roundStyle, edgeStyle } from '../../utils';

export const StyledButton = styled(Button)`
  border-radius: 0;
  ${(props) => roundStyle(props.round, true, props.theme)};
  ${(props) =>
    edgeStyle(
      'padding',
      props.icon !== undefined && props.theme.toggleGroup.iconOnly?.pad
        ? props.theme.toggleGroup.iconOnly?.pad
        : props.theme.toggleGroup.button.pad,
      false,
      undefined,
      props.theme,
    )}
  border: none;
`;
