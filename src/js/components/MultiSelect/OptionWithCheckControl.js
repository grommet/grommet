import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { FormCheckmark } from 'grommet-icons/icons/FormCheckmark';

import { Box } from '../Box';
import { Text } from '../Text';

import { OptionBox, CheckBoxWrapper } from './StyledMultiSelect';

const OptionWithCheckControl = ({ selected, label }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const selectOptionsStyle = {
    ...theme.select.options.box,
    ...theme.select.options.container,
  };

  return (
    <OptionBox {...selectOptionsStyle} selected={selected}>
      <Box direction="row">
        <CheckBoxWrapper {...theme.multiselect.checkbox.box}>
          <Box
            {...theme.multiselect.checkbox.check}
            background={
              selected
                ? theme.multiselect.checkbox.check.active.background
                : 'white'
            }
            border={{
              color: selected
                ? theme.multiselect.checkbox.check.active.background
                : theme.multiselect.checkbox.check.active.border,
            }}
          >
            {selected && (
              <FormCheckmark {...theme.multiselect.checkbox.checkmark} />
            )}
          </Box>
        </CheckBoxWrapper>
        <Text {...theme.select.options.text}>{label}</Text>
      </Box>
    </OptionBox>
  );
}

export { OptionWithCheckControl };