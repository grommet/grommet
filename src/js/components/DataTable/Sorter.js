import React from 'react';
import { FormUp, FormDown } from 'grommet-icons';

import { Button } from '../Button';
import { Box } from '../Box';

const Sorter = ({ align, children, onSort, property, sort }) => {
  let icon;
  if (sort && sort.property === property) {
    icon = sort.ascending ? <FormDown /> : <FormUp />;
  }
  let content = (
    <Box
      pad={{ horizontal: 'small', vertical: 'xsmall' }}
      direction='row'
      justify={align}
      align='center'
      gap='xsmall'
    >
      {children}
      {icon}
    </Box>
  );
  if (onSort) {
    content = (
      <Button fill={true} hoverIndicator={true} onClick={onSort(property)}>
        {content}
      </Button>
    );
  }

  return content;
};

export default Sorter;
