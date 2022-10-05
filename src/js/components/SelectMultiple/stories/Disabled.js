import React, { useState } from 'react';

import { Box, Text } from 'grommet';
import { SelectMultiple } from '../SelectMultiple';

const defaultOptions = [
  'French Vanilla Cake with Buttercream',
  'Sweet Grilled Peaches',
  'Chocolate Chip Cookies',
  'Pineapple Upside-Down Cake',
  'Peanut Butter Chocolate Fondue',
  'Strawberry Shortcake',
  'Peach Cobbler',
  'German Chocolate Cake',
  'Carrot Cake with Cream Cheese Frosting',
  'Cinnamon Coffee Cake',
];

export const Disabled = () => {
  const [options, setOptions] = useState(defaultOptions);
  const [valueMultiple, setValueMultiple] = useState([
    'Chocolate Chip Cookies',
    'Strawberry Shortcake',
  ]);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" pad="large" gap="large">
      <Text>SelectMultiple Disabled</Text>
      <SelectMultiple
        width="medium"
        showSelectedInline
        dropProps={{
          width: 'medium',
        }}
        // icon={<CaretDown />}
        // icon={false}
        disabled={['Chocolate Chip Cookies', 'Pineapple Upside-Down Cake']}
        value={valueMultiple}
        placeholder="Select"
        options={options}
        onSearch={(text) => {
          // The line below escapes regular expression special characters:
          // [ \ ^ $ . | ? * + ( )
          const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

          // Create the regular expression with modified value which
          // handles escaping special characters. Without escaping special
          // characters, errors will appear in the console
          const exp = new RegExp(escapedText, 'i');
          setOptions(defaultOptions.filter((o) => exp.test(o)));
        }}
        onClose={() => setOptions(defaultOptions)}
        onChange={({ value }) => {
          setValueMultiple(value);
        }}
      />
    </Box>
    // </Grommet>
  );
};

Disabled.parameters = {
  chromatic: { disable: true },
};

Disabled.args = {
  full: true,
};

export default {
  title: 'Input/SelectMultiple/Disabled',
};
