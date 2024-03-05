import React, { useState } from 'react';

import { Box, ToggleButtonGroup, Select, Heading } from 'grommet';
import {
  List,
  MapLocation,
  Table,
  Bold,
  Italic,
  Underline,
} from 'grommet-icons';

const optionsObjects = [
  {
    label: (
      <Box direction="row">
        Bold <Bold />
      </Box>
    ),
    value: 'bold',
  },
  {
    label: (
      <Box direction="row">
        Italic <Italic />
      </Box>
    ),
    value: 'italic',
  },
  {
    label: (
      <Box direction="row">
        Underline <Underline />
      </Box>
    ),
    value: 'underline',
  },
];

const optionsIcons = [
  {
    label: <List />,
    value: 'list',
  },
  {
    label: <Table />,
    value: 'table',
  },
  {
    label: <MapLocation />,
    value: 'map',
  },
];

export const Simple = () => {
  const [value, setValue] = useState('single');
  return (
    <Box gap="large" pad="large">
      <Heading margin="none" level={3}>
        Default type is single which is RadioButtonGroup under the hood
      </Heading>
      <Box width="small">
        <Select
          id="select"
          name="select"
          placeholder="Select"
          value={value}
          options={['single', 'multiple']}
          onChange={({ option }) => setValue(option)}
        />
      </Box>
      <Box direction="row" gap="medium">
        <ToggleButtonGroup
          type={value}
          options={['button1', 'button2', 'button3']}
        />
        <ToggleButtonGroup type={value} options={optionsIcons} />
        <ToggleButtonGroup type={value} options={optionsObjects} />
      </Box>
    </Box>
  );
};

export default {
  title: 'Input/ToggleButtonGroup/Simple',
};
