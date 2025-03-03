import React from 'react';

import { Anchor, Box, Grommet, Paragraph, Text } from 'grommet';

const customTheme = {
  global: {
    colors: {
      // Overriding existing colors
      brand: '#4D4CDB',
      'accent-1': '#6FFFB0',
      'accent-2': '#7FFFB0',
      'accent-3': '#8FFFB0',
      'accent-4': '#9FFFB0',
      'neutral-1': '#10873D',
      'neutral-2': '#20873D',
      'neutral-3': '#30873D',
      'neutral-4': '#40873D',
      focus: '#000',
      // Setting new colors
      blue: '#00C8FF',
      green: '#17EBA0',
      teal: '#82FFF2',
      purple: '#694b75',
      red: '#914049',
      orange: '#FFBC44',
      yellow: '#faf6d4',
      // you can also point to existing grommet colors
      brightGreen: 'accent-1',
      dark: 'dark-1',
      // Changing default text color,
      // all colors could be either a string or a dark and light object
      text: {
        dark: 'teal',
        light: 'purple',
      },
    },
  },
};

export const Colors = () => (
  <Grommet theme={customTheme}>
    <Box background="yellow" gap="medium" pad="small">
      <Text>Custom color purple</Text>
      <Text color="dark">Inline custom dark color</Text>
      <Paragraph color="red">
        Wrapping your application with the Grommet component that is pointing to
        your customTheme object as shown on the example, will allow you full
        access to your custom colors across your application. You can override
        any Grommet color that is mentioned in the docs in a similar fashion.
      </Paragraph>
      <Anchor href="https://github.com/grommet/grommet/wiki/Color-Properties">
        Click here to read more about Grommet Colors
      </Anchor>
    </Box>
  </Grommet>
);

export default {
  title: 'Utilities/Theme/Colors',
};
