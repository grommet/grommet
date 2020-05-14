import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, CheckBoxGroup, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const objectOptions = [];
for (let i = 1; i <= 5; i += 1) {
  objectOptions.push({
    lab: `option ${i}`,
    val: i,
    key: `${i}`,
  });
}

const Example = () => {
  const [value, setValue] = useState([]);
  const [value2, setValue2] = useState([]);
  return (
    <Grommet theme={grommet}>
      <Box pad="medium" gap="large">
        <CheckBoxGroup
          labelKey="lab"
          valueKey="val"
          value={value}
          onChange={event => setValue(event.value)}
          options={objectOptions}
        />
        <CheckBoxGroup
          gap="xsmall"
          labelKey="label"
          valueKey="key"
          value={value2}
          onChange={event => setValue2(event.value)}
          options={[
            { label: 'Maui', key: 'M' },
            { label: 'Jerusalem', key: 'J' },
            { label: 'Wuhan', key: 'W' },
          ]}
        />
      </Box>
    </Grommet>
  );
};

storiesOf('CheckBoxGroup', module).add('Typescript', () => <Example />);
