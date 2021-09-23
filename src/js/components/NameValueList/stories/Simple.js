import React from 'react';

import { Box, Grommet, Heading, NameValueList } from 'grommet';
import {
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusWarningSmall,
} from 'grommet-icons';
import { grommet } from 'grommet/themes';

const data = [
  { name: 'Model type', value: 'MXQ83700F3' },
  { name: 'Last synced on', value: '34343738-3036-584D' },
  {
    name: 'Policies',
    value: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Sed eget est at turpis imperdiet blandit porttitor eu enim.
       Phasellus faucibus pharetra risus nec bibendum.`,
  },
  { name: 'Created on', value: '172.16.255.321.8' },
  {
    name: 'Policies',
    value: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Sed eget est at turpis imperdiet blandit porttitor eu enim.
       Phasellus faucibus pharetra risus nec bibendum.`,
  },
];

const dataAndIcons = [
  {
    name: 'lemon',
    value: '75',
    valueVisual: <StatusGoodSmall color="green" />,
  },
  {
    name: 'rambutan',
    value: '50',
    valueVisual: <StatusWarningSmall color="yellow" />,
  },
  {
    name: 'durian',
    value: '5',
    valueVisual: <StatusCriticalSmall color="red" />,
  },
  {
    name: 'cherimoya',
    value: '99',
    valueVisual: <StatusGoodSmall color="green" />,
  },
  {
    name: 'mangosteen',
    value: '33',
    valueVisual: <StatusWarningSmall color="yellow" />,
  },
];

const numericData = [
  { name: 'Model type', value: 'MXQ83700F3' },
  { name: 'Last synced on', value: '34343738-3036-584D' },
  {
    name: 'hello',
    value: '34343738-3036-584D',
  },
  { name: 'Created on', value: '172.16.255.321.8' },
  {
    name: 'Policies',
    value: '34343738-3036-584D',
  },
];

export const Simple = () => (
  <Grommet theme={grommet}>
    <Box align="start" pad="small" gap="medium">
      <Heading>Default Vertical Layout</Heading>
      <NameValueList layout="vertical" data={data} />
      <Heading>Numeric Data Align End</Heading>
      <NameValueList
        layout="vertical"
        align={{ value: 'end' }}
        data={numericData}
      />
      <Heading>Default Layout with icons</Heading>
      <NameValueList data={dataAndIcons} />
      <Heading>Stacked</Heading>
      <NameValueList layout="stacked" data={numericData} />
      <Heading>Horizontal</Heading>
      <NameValueList layout="horizontal" data={numericData} />
    </Box>
  </Grommet>
);

export default {
  title: 'Visualizations/NameValueList/Simple',
};
