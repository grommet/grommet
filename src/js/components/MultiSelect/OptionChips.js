import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Close } from 'grommet-icons/icons/Close';

import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';

const OptionChips = ({
  options,
  value,
  isSelected,
  optionLabel,
  selectOption,
  clearAll,
  width,
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const OptionWrapper = styled(Box)`
    ${props => props.theme.multiselect.chips.wrapper.extend};
  `;

  const getSelectedOption = () =>
    options.reduce((acc, item, index) => {
      if (isSelected(index)) acc.push(index);
      return acc;
    }, []);

  return(
    <>
      {Array.isArray(value) && value.length > 0 && (
        <OptionWrapper
          width={width}
          {...theme.multiselect.chips.wrapper}
          wrap
        >
          {getSelectedOption().map(item => (
            <Box key={item} {...theme.multiselect.chips.option}>
              <Text {...theme.multiselect.chips.label}>
                {optionLabel(item)}
              </Text>
              <Close
                onClick={selectOption(item)}
                {...theme.multiselect.chips.icon}
              />
            </Box>
          ))}
          <Button focusIndicator={false} onClick={() => clearAll([])} plain>
            <Box
              border={{
                side: 'bottom',
                color: theme.multiselect.chips.clear.color,
              }}
            >
              <Text {...theme.multiselect.chips.clear}>CLEAR ALL</Text>
            </Box>
          </Button>
        </OptionWrapper>
      )}
    </>
  )
}

export { OptionChips };
