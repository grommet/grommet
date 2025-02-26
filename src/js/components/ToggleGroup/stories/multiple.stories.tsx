import React from 'react';
import { Box, ToggleGroup } from 'grommet';
import { Bold, Italic, Underline } from 'grommet-icons';

const options = [
  {
    icon: <Bold a11yTitle="Bold" />,
    value: 'bold',
  },
  {
    icon: <Italic a11yTitle="Italic" />,
    value: 'italic',
  },
  {
    icon: <Underline a11yTitle="Underline" />,
    value: 'underline',
  },
];

export const Multiple = () => (
  <Box pad="large">
    <ToggleGroup a11yTitle="Format text" options={options} multiple />
  </Box>
);

export default {
  title: 'Controls/ToggleGroup/Multiple',
};
