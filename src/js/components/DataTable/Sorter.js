import React from 'react';
import styled from 'styled-components';

import { Button } from '../Button';
import { Box } from '../Box';
import { useThemeValue } from '../../utils/useThemeValue';

const SorterButton = styled(Button)`
  flex-shrink: 1;
  height: 100%;
`;

const Sorter = ({
  align,
  children,
  fill,
  onSort,
  property,
  sort,
  themeProps,
}) => {
  const theme = useThemeValue();
  let icon;
  if (sort && sort.property === property) {
    const Icon =
      theme.dataTable.icons[sort.ascending ? 'ascending' : 'descending'];
    icon = <Icon />;
  }
  let content = (
    <Box
      {...themeProps}
      flex="shrink"
      direction="row"
      justify={align}
      align="center"
      gap="xsmall"
      fill={fill}
    >
      {children}
      {icon}
    </Box>
  );
  if (onSort) {
    content = (
      <SorterButton fill={fill} hoverIndicator onClick={onSort(property)}>
        {content}
      </SorterButton>
    );
  }

  return content;
};

Sorter.displayName = 'Sorter';

export { Sorter };
