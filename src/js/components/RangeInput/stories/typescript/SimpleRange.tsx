import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { Box, RangeInput } from 'mnet-ui-base';

const SimpleRangeInput = () => {
  const [value, setValue] = React.useState(5);

  const onChange = event => setValue(event.target.value);

  return (
    <>
      <Box align="center" pad="large">
        <RangeInput value={value} onChange={onChange} />
      </Box>
    </>
  );
};

if (!isChromatic()) {
  storiesOf('TypeScript/RangeInput', module).add('Simple', () => (
    <SimpleRangeInput />
  ));
}
