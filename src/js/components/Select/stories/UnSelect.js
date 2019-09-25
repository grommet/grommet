import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Select, Button } from 'grommet';
import { grommet } from 'grommet/themes';
import { Trash } from 'grommet-icons';

const optionList = [
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
  const [options] = useState(optionList);
  const [value, setValue] = useState('');

  const onChange = e => {
    setValue(e.value);
  };

  const onClickClearOptions = () => {
    setValue('');
  };

  return (
    <Grommet theme={grommet}>
      <Box
        fill
        pad="medium"
        direction="row"
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
        <Button onClick={onClickClearOptions} icon={<Trash color="control" size="medium" />} />
      </Box>
    </Grommet>
  );
};

storiesOf('Select', module).add('UnSelect', () => <UnSelect />);
