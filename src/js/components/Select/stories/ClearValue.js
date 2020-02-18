import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Clear } from 'grommet-icons/icons/Clear';

import { Box, Grommet, Select, Button } from 'grommet';
import { grommet } from 'grommet/themes';
import { Text } from '../../Text';

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
  const [value, setValue] = useState('');

  const onClickClearOptions = () => {
    setValue('');
  };

  return (
    <Grommet theme={grommet}>
      <Box
        pad="medium"
        direction="row"
        align="center"
        justify="center"
        gap="small"
      >
        <Box gap="small">
          <Text>Default</Text>
          <Select
            options={optionList}
            value={value}
            onChange={({ option }) => setValue(option)}
            placeholder="Select a value"
            clear
            multiple
          />
        </Box>
        <Box gap="small">
          <Text>Position Bottom</Text>
          <Select
            options={optionList}
            value={value}
            onChange={({ option }) => setValue(option)}
            placeholder="Select a value"
            multiple
            clear={{
              position: 'bottom',
              label: 'Unselect',
            }}
          />
        </Box>
        <Box gap="small">
          <Text>renderValue Function</Text>
          <Select
            options={optionList}
            value={value}
            onChange={({ option }) => setValue(option)}
            placeholder="Select multiple options"
            multiple
            clear={{
              position: 'top',
              renderValue: ({ onClear }) => (
                <Box flex={false}>
                  <Button hoverIndicator="background" onClick={onClear}>
                    <Box
                      direction="row"
                      background="background-front"
                      alignItems="center"
                      gap="small"
                      pad="small"
                    >
                      <Clear />
                      <Text>Clear items</Text>
                    </Box>
                  </Button>
                </Box>
              ),
            }}
          />
        </Box>
      </Box>
      <Box
        pad="medium"
        direction="row"
        align="center"
        justify="center"
        gap="small"
      >
        <Button
          onClick={onClickClearOptions}
          disabled={!value}
          plain
          label="Clear All"
        />
      </Box>
    </Grommet>
  );
};

storiesOf('Select', module).add('Clear Selection', () => <UnSelect />);
