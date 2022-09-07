import React from 'react';
import { Box } from '../Box';
import { Text } from '../Text';
import { SelectOption } from './StyledSelect';

export const EmptySearchOption = ({
  emptySearchMessage,
  selectOptionsStyle,
  theme,
}) => (
  <SelectOption
    key="search_empty"
    tabIndex="0"
    role="menuitem"
    hoverIndicator="background"
    disabled
    aria-live="polite"
  >
    <Box {...selectOptionsStyle}>
      <Text {...theme.select.container.text}>{emptySearchMessage}</Text>
    </Box>
  </SelectOption>
);
