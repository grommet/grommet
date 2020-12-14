import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Close } from 'grommet-icons/icons/Close';

import { defaultProps } from '../../default-props';
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
  onRemove,
  clearAll,
  width,
  height,
  inclusionExclusion,
  isExcluded,
  renderEmptySelected,
  layout,
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const renderClearButton = () => (
    <Button
      role="button"
      a11yTitle="Clear all selected options"
      focusIndicator={false}
      onClick={() => clearAll([])}
      plain
    >
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

  const IncExcHeader = styled(Box)`
    position: sticky;
    top: 0;
  `;

  return (
    <OptionsBox>
      {Array.isArray(value) && value.length > 0 && (
        <Box height={{ max: layout === 'single-column' ? height : 'auto' }}>
          {inclusionExclusion && isExcluded !== null && (
            <IncExcHeader {...theme.multiselect.rightPanel.incExcHeader.box}>
              <Text
                aria-label="Chip List header"
                {...theme.multiselect.rightPanel.incExcHeader.text}
              >
                {isExcluded ? 'Excluded' : 'Included'} List
              </Text>
              {renderClearButton()}
            </IncExcHeader>
          )}
          <OptionWrapper
            twoColumnLayout={layout === 'double-column'}
            width={width}
            {...theme.multiselect.chips.wrapper}
            wrap
          >
            {getSelectedOption().map(item => (
              <OptionText
                key={item}
                twoColumnLayout={layout === 'double-column'}
                {...theme.multiselect.chips.option}
              >
                <OptionLabel
                  isExcluded={isExcluded}
                  {...theme.multiselect.chips.label}
                >
                  {optionLabel(item)}
                </OptionLabel>
                <Close
                  role="button"
                  aria-label={`Remove selected chip ${optionLabel(item)}`}
                  style={{cursor: 'pointer'}}
                  onClick={event => onRemove(event, item)}
                  {...theme.multiselect.chips.icon}
                />
              </OptionText>
            ))}
            {!inclusionExclusion && renderClearButton()}
          </OptionWrapper>
        </Box>
      )}
      {(!Array.isArray(value) || !value.length) && renderEmptySelected}
    </OptionsBox>
  );
};

export { OptionChips };
