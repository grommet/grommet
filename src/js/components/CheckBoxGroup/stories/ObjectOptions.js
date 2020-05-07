import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, CheckBoxGroup, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const objectOptions = [];
for (let i = 1; i <= 5; i += 1) {
  objectOptions.push({
    label: `option ${i}`,
    val: i,
  });
}

const Example = () => {
  return (
    <Grommet theme={grommet}>
      <Box pad="medium">
        <CheckBoxGroup
          labelKey="label"
          valueKey="val"
          options={objectOptions}
        />
      </Box>
    </Grommet>
  );
};

storiesOf('CheckBoxGroup', module).add('Object options', () => <Example />);
