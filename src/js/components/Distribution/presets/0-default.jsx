import * as React from 'react';
import Distribution from '../Distribution';
import Box from '../../Box/Box/Box';
import Text from '../../Text/Text';

export default (
  <Distribution
    uxpId="distribution0"
    basis="medium"
    values={[
      { value: 50, color: 'light-3' },
      { value: 30, color: 'neutral-1' },
      { value: 20, color: 'brand' },
      { value: 10, color: 'light-3' },
      { value: 5, color: 'neutral-1' },
    ]}
  >
    {value => (
      <Box pad="xsmall" background={value.color} fill={true} uxpId={`box${value}`}>
        <Text size="large" uxpId={`text${value}`}>{value.value}</Text>
      </Box>
    )}
  </Distribution>
);
