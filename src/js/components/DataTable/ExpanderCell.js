import React from 'react';
import { FormDown, FormUp } from 'grommet-icons';

import { TableCell } from '../Table';
import { Button } from '../Button';
import { Box } from '../Box';

const ExpanderCell = ({ expanded, onToggle, ...rest }) => {
  const ExpandIcon = expanded ? FormUp : FormDown;
  if (onToggle) {
    return (
      <TableCell
        size='xxsmall'
        verticalAlign='top'
        plain={true}
      >
        <Button
          fill={true}
          a11yTitle={expanded ? 'collapse' : 'expand'}
          hoverIndicator={true}
          onClick={onToggle}
        >
          <Box {...rest} pad='xsmall'>
            <ExpandIcon color='border' />
          </Box>
        </Button>
      </TableCell>
    );
  }
  return (
    <TableCell size='xxsmall' verticalAlign='top' {...rest} />
  );
};

export default ExpanderCell;
