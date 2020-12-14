import React from 'react';

import { Box } from '../Box';
import { Text } from '../Text';

const ValueLabelWithNumber = ({ value, number, color }) => {
  return (
    <Box direction="row" margin={{ horizontal: 'medium' }} align="center">
      <Text aria-label="Selected Label Value" size="medium" weight={600}>
        {number ? value : 'Select'}
      </Text>
      {number > 0 && (
        <Box
          pad="5px"
          background={color}
          round="xsmall"
          margin={{ horizontal: 'medium' }}
        >
          <Text
            aria-label="Selected Label Count"
            size="10px"
            color="white"
            weight={600}
          >
            {number}
          </Text>
        </Box>
      )}
    </Box>
  );
}

export { ValueLabelWithNumber };
