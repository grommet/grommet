import React from 'react';

import { Button } from '../Button';
import { Box } from '../Box';

const Sorter = ({ align, children, onSort, property, sort, theme }) => {
  let icon;
  if (sort && sort.property === property) {
    const Icon = theme.dataTable.icons[sort.ascending ? 'ascending' : 'descending'];
    icon = <Icon />;
  }
  let content = (
    <Box
      flex={true}
      direction='row'
      justify={align}
      align='center'
      gap='xsmall'
      style={{ height: '100%' }}
      {...theme.dataTable.header}
      border={undefined}
      background={undefined}
    >
      {children}
      {icon}
    </Box>
  );
  if (onSort) {
    content = (
      <Button
        fill={true}
        hoverIndicator={true}
        onClick={onSort(property)}
        style={{ flexShrink: 1 }}
      >
        {content}
      </Button>
    );
  }

  return content;
};

export default Sorter;
