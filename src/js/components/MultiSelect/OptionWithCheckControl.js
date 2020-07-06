import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { FormCheckmark } from 'grommet-icons/icons/FormCheckmark';
import { FormClose } from 'grommet-icons/icons/FormClose';

import { Box } from '../Box';
import { Text } from '../Text';

import { OptionBox, CheckBoxWrapper, CheckBox } from './StyledMultiSelect';

const OptionWithCheckControl = ({
  selected,
  label,
  inclusionExclusion,
  incExcVal,
  onSelect,
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const selectOptionsStyle = {
    ...theme.select.options.box,
    ...theme.select.options.container,
  };

  const renderCheckbox = (check, type) => {
    return (
      <CheckBoxWrapper {...theme.multiselect.checkbox.box}>
        <CheckBox
          {...theme.multiselect.checkbox.check}
          active={selected || (inclusionExclusion && !incExcVal)}
          checkType={type}
          onClick={
            (inclusionExclusion && !incExcVal) ?
              (event) => onSelect(event, type) : undefined
          }
        >
          {(selected || (inclusionExclusion && !incExcVal)) && (
            <>
              {check === 'check' && (
                <FormCheckmark {...theme.multiselect.checkbox.checkmark} />
              )}
              {check === 'cross' && (
                <FormClose {...theme.multiselect.checkbox.checkmark} />
              )}
            </>
          )}
        </CheckBox>
      </CheckBoxWrapper>
    );
  };

  return (
    <OptionBox {...selectOptionsStyle} selected={selected}>
      <Box {...theme.multiselect.option}>
        <Box direction="row">
          {!inclusionExclusion && renderCheckbox('check', 'default')}
          <Text {...theme.select.options.text}>{label}</Text>
        </Box>
        {inclusionExclusion && (
          <Box direction="row">
            {
              [null, 'included'].includes(incExcVal)
              && renderCheckbox('check', 'included')
            }
            {
              [null, 'excluded'].includes(incExcVal)
              && renderCheckbox('cross', 'excluded')
            }
          </Box>
        )}
      </Box>
    </OptionBox>
  );
}

export { OptionWithCheckControl };
