import styled from 'styled-components';

import { selectedStyle } from '../../utils';

import { Box } from '../Box';
import { Button } from '../Button';

const CheckBoxWrapper = styled(Box)`
  ${props => props.theme.multiselect.checkbox.extend};
`;

const OptionsBox = styled.div`
  position: relative;
  scroll-behavior: smooth;
  overflow: auto;
`;

const SelectOption = styled(Button)`
  display: block;
  width: 100%;
`;

const OptionBox = styled(Box)`
  ${props => props.selected && selectedStyle}
`;

export { CheckBoxWrapper, OptionsBox, SelectOption, OptionBox };
