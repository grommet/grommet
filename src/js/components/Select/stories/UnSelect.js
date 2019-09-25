import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Select, Button } from 'grommet';
import { grommet } from 'grommet/themes';
import { Trash } from 'grommet-icons';

const option = [
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
];

const UnSelect = () => {
  const [options] = useState(option);
  const [value, setValue] = useState('');

  const onChange = e => {
    setValue(e.value);
  };

  const onClick = () => {
    setValue('');
  };

  return (
    <Grommet theme={grommet}>
      <Box
        fill
        pad="medium"
        direction="row-responsive"
        align="center"
        justify="center"
      >
        <Select
          options={options}
          onChange={e => onChange(e)}
          value={value}
          placeholder="Select multiple options"
          multiple
        />
        <Button onClick={onClick} icon={<Trash color="control" size="medium" />} />
      </Box>
    </Grommet>
  );
};

storiesOf('Select', module).add('UnSelect', () => <UnSelect />);
