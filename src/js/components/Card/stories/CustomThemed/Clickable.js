import React from 'react';

import { Bluetooth as Memory, Storage, Trigger } from 'grommet-icons';
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Chart,
  Grid,
  Grommet,
  Text,
} from 'grommet';

const theme = {
  themeMode: 'dark',
  global: {
    font: {
      family: `-apple-system,
           BlinkMacSystemFont,
           "Segoe UI"`,
    },
  },
  card: {
    hover: {
      container: {
        elevation: 'large',
      },
    },
    container: {
      elevation: 'medium',
      extend: `transition: all 0.2s ease-in-out;`,
    },
    footer: {
      pad: { horizontal: 'medium', vertical: 'small' },
      background: '#00000008',
    },
  },
};

const gradient = [
  { value: 28, color: 'status-ok' },
  { value: 50, color: 'status-warning' },
  { value: 80, color: 'status-critical' },
];

const data = [
  {
    icon: <Memory size="large" />,
    title: 'Memory (EEC)',
    subTitle: '8 GB @ 400Hz',
    message: 'Past 24hrs',
    type: 'bar',
  },
  {
    icon: <Storage size="large" />,
    title: 'Storage',
    subTitle: 'Sub-system and Devices',
    message: '36.8 TB available',
    type: 'line',
  },
  {
    icon: <Trigger size="large" />,
    title: 'Power (Watts)',
    subTitle: '720 Watt Service',
    message: 'Past 12hrs',
    type: 'point',
  },
];

const ChartPreview = ({ type }) => (
  <Box>
    <Chart
      type={type}
      id={type}
      dash={type === 'line'}
      round
      thickness="xsmall"
      bounds={[
        [0, 6],
        [0, 100],
      ]}
      values={[
        { value: [6, 100], label: 'one hundred' },
        { value: [5, 70], label: 'seventy' },
        { value: [4, 40], label: 'sixty' },
        { value: [3, 80], label: 'eighty' },
        { value: [2, 25], label: 'forty' },
        { value: [1, 50], label: 'thirty' },
        { value: [0, 25], label: 'sixty' },
      ]}
      aria-label="chart card"
      color={gradient}
      size={{ height: 'xsmall' }}
    />
  </Box>
);

const Identifier = ({ children, title, subTitle, size, ...rest }) => (
  <Box gap="small" align="center" direction="row" pad="small" {...rest}>
    {children}
    <Box>
      <Text size={size} weight="bold">
        {title}
      </Text>
      <Text size={size}>{subTitle}</Text>
    </Box>
  </Box>
);

export const Clickable = () => (
  <Grommet theme={theme} full>
    <Box pad="large" height="100%">
      <Grid gap="medium" columns={{ count: 'fit', size: 'small' }}>
        {data.map((value) => (
          <Card
            key={value.title}
            onClick={() => {
              // eslint-disable-next-line no-alert
              alert('Card was Clicked!');
            }}
          >
            <CardBody pad="small">
              <Identifier
                title={value.title}
                subTitle={value.subTitle}
                size="small"
              >
                {value.icon}
              </Identifier>
              <ChartPreview type={value.type} />
            </CardBody>
            <CardFooter pad={{ horizontal: 'medium', vertical: 'small' }}>
              <Text size="xsmall">{value.message}</Text>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </Box>
  </Grommet>
);

Clickable.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Layout/Card/Custom Themed/Clickable',
};
