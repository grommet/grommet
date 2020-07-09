import styled from 'styled-components';

import { selectedStyle } from '../../utils';

import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';

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
  background: ${props => props.active ?
    props.theme.select.activeColor : 'transparent'};
`;

const OptionBox = styled(Box)`
  ${props => props.selected && selectedStyle}
`;

const CheckBox = styled(Box)`
    ${props =>
    props.theme.multiselect.checkbox.check &&
    props.theme.multiselect.checkbox.check.extend
  };
`;

const OptionWrapper = styled(Box)`
  ${props => props.theme.multiselect.chips.wrapper.extend};
`;

const OptionText = styled(Box)`
  ${props => props.theme.multiselect.chips.option.extend};
`;

const OptionLabel = styled(Text)`
  ${props => props.theme.multiselect.chips.label.extend};
`;

const SearchWrapper = styled(Box)`
  ${props => props.theme.multiselect.searchbox.container.extend};
`;

export {
  CheckBoxWrapper,
  OptionsBox,
  SelectOption,
  OptionBox,
  CheckBox,
  OptionWrapper,
  OptionText,
  OptionLabel,
  SearchWrapper,
};
