import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Close } from 'grommet-icons/icons/Close';

import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';

import {
  OptionsBox,
  OptionWrapper,
  OptionText,
  OptionLabel,
} from './StyledMultiSelect';

const OptionChips = ({
  options,
  value,
  isSelected,
  optionLabel,
  selectOption,
  clearAll,
  width,
  inclusionExclusion,
  isExcluded,
  renderEmptySelected,
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const renderClearButton = () => (
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
  );

  const getSelectedOption = () =>
    options.reduce((acc, item, index) => {
      if (isSelected(index)) acc.push(index);
      return acc;
    }, []);

  return (
    <OptionsBox>
      {Array.isArray(value) && value.length > 0 && (
        <>
          {inclusionExclusion && isExcluded !== null && (
            <Box {...theme.multiselect.rightPanel.incExcHeader.box}>
              <Text {...theme.multiselect.rightPanel.incExcHeader.text}>
                {isExcluded ? 'Excluded' : 'Included'} List
              </Text>
              {renderClearButton()}
            </Box>
          )}
          <OptionWrapper
            inclusionExclusion={inclusionExclusion}
            width={width}
            {...theme.multiselect.chips.wrapper}
            wrap
          >
            {getSelectedOption().map(item => (
              <OptionText
                key={item}
                incExcVal={![null, undefined].includes(isExcluded)}
                {...theme.multiselect.chips.option}
              >
                <OptionLabel
                  isExcluded={isExcluded}
                  {...theme.multiselect.chips.label}
                >
                  {optionLabel(item)}
                </OptionLabel>
                <Close
                  onClick={selectOption(item)}
                  {...theme.multiselect.chips.icon}
                />
              </OptionText>
            ))}
            {!inclusionExclusion && renderClearButton()}
          </OptionWrapper>
        </>
      )}
      {(!Array.isArray(value) || !value.length) && renderEmptySelected}
    </OptionsBox>
  );
};

export { OptionChips };
