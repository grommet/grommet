import React from 'react';

import { Box, ToggleButtonGroup, Heading } from 'grommet';
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
      <Box align="center" direction="row">
        <Bold /> Bold
      </Box>
    ),
    value: 'bold',
  },
  {
    label: (
      <Box align="center" direction="row">
        <Italic /> Italic
      </Box>
    ),
    value: 'italic',
  },
  {
    label: (
      <Box align="center" direction="row">
        <Underline /> Underline
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

export const Simple = () => (
  <Box gap="large" pad="large">
    <Heading margin="none" level={3}>
      Default type is Multiple
    </Heading>
    <Box direction="row" gap="medium">
      <ToggleButtonGroup options={['button1', 'button2', 'button3']} />
      <ToggleButtonGroup options={optionsIcons} />
      <ToggleButtonGroup options={optionsObjects} />
    </Box>
    <Box direction="row" gap="medium">
      <ToggleButtonGroup
        exclusive
        options={['button1', 'button2', 'button3']}
      />
      <ToggleButtonGroup exclusive options={optionsIcons} />
      <ToggleButtonGroup exclusive options={optionsObjects} />
    </Box>
  </Box>
);

export default {
  title: 'Input/ToggleButtonGroup/Simple',
};
