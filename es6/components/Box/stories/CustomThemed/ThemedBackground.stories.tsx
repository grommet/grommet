import React from 'react';

import { Grommet, Box, Grid, Text } from 'grommet';
import { ThemeType } from 'grommet/themes';

const myTheme: ThemeType = {
  global: {
    backgrounds: {
      hex: '#555555',
      themeColor: 'accent-1',
      image: `url(https://images.unsplash.com/photo-1583530015497-6cf9ef9c6f0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)`,
      'dark-light-image': {
        dark: `url(https://images.unsplash.com/photo-1620744209976-74accdabd814?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)`,
        light: `url(https://images.unsplash.com/photo-1646723504943-4b55a30ed655?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80)`,
      },
      gradient: `linear-gradient(
        80deg,
        hsl(41deg 100% 67%) 0%,
        hsl(333deg 100% 70%) 33%,
        hsl(257deg 99% 73%) 67%,
        hsl(173deg 95% 75%) 100%
      );`,
      object: {
        color: 'white',
        image: `url(https://images.unsplash.com/photo-1464820453369-31d2c0b651af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&q=80)`,
        repeat: 'repeat',
        size: '24px',
        opacity: true,
      },
      stack: {
        color: 'light-1',
        image: `url(https://v2.grommet.io/img/stak-hurrah.svg)`,
      },
    },
  },
};

const backgroundSamples = [
  {
    background: '#F8F8F8',
    label: { value: 'hex value', context: 'prop string' },
  },
  { background: 'hex', label: { value: 'hex value', context: 'theme string' } },
  {
    background: 'accent-4',
    label: { value: 'color name', context: 'prop string' },
  },
  {
    background: 'themeColor',
    label: { value: 'color name', context: 'theme string' },
  },
  {
    background: `url(https://images.unsplash.com/photo-1493552832879-f61d5dce6c9e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)`,
    label: { value: 'image', context: 'prop string' },
  },
  {
    background: 'image',
    label: { value: 'image', context: 'theme string' },
  },
  {
    background: {
      color: 'light-1',
    },
    label: { value: 'hover', context: 'over me' },
    onClick: () => {},
    hoverIndicator: 'stack',
  },
  {
    background: `linear-gradient(
      155deg,
      hsl(147deg 100% 72%) 0%,
      hsl(223deg 100% 72%) 50%,
      hsl(299deg 100% 72%) 100%
    );`,
    label: { value: 'gradient', context: 'prop string' },
  },
  {
    background: 'gradient',
    label: { value: 'gradient', context: 'theme string' },
  },
  {
    background: { dark: 'accent-2', light: 'accent-3' },
    label: { value: 'dark-light object', context: 'prop object' },
  },
  {
    background: 'dark-light-image',
    label: { value: 'dark-light object', context: 'theme object' },
  },
  {
    background: {
      image: 'dark-light-image',
      dark: true,
      color: { dark: 'black', light: 'gold' },
    },
    label: { value: 'dark-light object force dark', context: 'theme object' },
  },
  {
    background: {
      color: 'neutral-2',
      image: `url(https://images.unsplash.com/photo-1653023500770-3a3b64a1b4c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80)`,
      position: 'top-left',
    },
    label: { value: 'object', context: 'prop object' },
  },
  {
    background: 'object',
    label: { value: 'object', context: 'theme object' },
  },
  {
    background: { image: 'gradient', rotate: 180 },
    label: { value: 'rotate', context: 'prop object' },
  },
  {
    background: {
      image: 'gradient',
      rotate: -90,
      clip: 'text',
    },
    label: {
      value: <Text size="xxlarge">clip text</Text>,
      context: <Text size="medium">prop object</Text>,
    },
  },
  {
    background: {
      image: 'image',
      rotate: -90,
      clip: 'text',
    },
    label: {
      value: <Text size="xxlarge">clip text</Text>,
      context: <Text size="medium">prop object</Text>,
    },
  },
];

const Swatch = ({ label, ...rest }) => (
  <Box fill pad="medium" justify="center" round="small" {...rest}>
    <Text weight="bold" size="large">
      {label.value}
    </Text>
    <Text size="small">{label.context}</Text>
  </Box>
);

export const ThemedBackgrounds = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  <Grommet
    theme={myTheme}
    full
    background={`linear-gradient(
      155deg,
      hsl(0deg 0% 51%) 0%,
      hsl(0deg 0% 76%) 50%,
      hsl(0deg 0% 100%) 100%
    )`}
  >
    <Grid columns="small" rows="small" gap="small" pad="large">
      {backgroundSamples.map((sample, index) => (
        <Swatch
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          background={sample.background}
          label={sample.label}
          {...sample}
        />
      ))}
    </Grid>
  </Grommet>
);

ThemedBackgrounds.storyName = 'Themed Background';

export default {
  title: 'Layout/Box/Custom Themed/Themed Background',
};
