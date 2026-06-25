import styled from 'styled-components';
import { disabledStyle } from '../../utils';
import { readOnlyStyle } from '../../utils/readOnly';
import { Box } from '../Box';

export const StyledTimeInputContainer = styled(Box).withConfig({
  shouldForwardProp: (prop) => !['disabled', 'readOnlyProp'].includes(prop),
})`
  ${(props) => props.disabled && disabledStyle()}
  ${(props) => props.readOnlyProp && readOnlyStyle(props.theme)}
`;

export const StyledPickerList = styled(Box)``;

export const StyledPickerOptionBox = styled(Box).withConfig({
  shouldForwardProp: (prop) => prop !== 'optionWidth',
})`
  width: ${(props) => props.optionWidth};
  opacity: 1;
`;

export const StyledPickerDropContent = styled(Box).withConfig({
  shouldForwardProp: (prop) => prop !== 'dropHeight',
})`
  width: max-content;
  max-width: max-content;
  height: ${(props) => props.dropHeight};
  overflow: hidden;
`;
