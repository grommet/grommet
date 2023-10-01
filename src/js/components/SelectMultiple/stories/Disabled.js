import React, { useState } from 'react';

import { Box, Grommet, Text } from 'grommet';
import { SelectMultiple } from '../SelectMultiple';
import { CheckBox } from '../../CheckBox';

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
  const [disabledInput, setDisabledInput] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [valueMultiple, setValueMultiple] = useState([
    'Chocolate Chip Cookies',
    'Strawberry Shortcake',
  ]);

  // When the value is boolean the entire component is disabled not just options
  const disabledValue = disabledInput
    ? true
    : ['Chocolate Chip Cookies', 'Pineapple Upside-Down Cake'];

  return (
    <Grommet
      theme={{ global: { control: { disabled: { cursor: 'not-allowed' } } } }}
    >
      <Box fill align="center" pad="large" gap="large">
        <Text>SelectMultiple Disabled</Text>

        <CheckBox
          checked={disabledInput}
          label="Disable Input"
          onChange={(event) => setDisabledInput(event.target.checked)}
        />

        <SelectMultiple
          width="medium"
          dropProps={{
            width: 'medium',
          }}
          // icon={<CaretDown />}
          // icon={false}
          disabled={disabledValue}
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
    </Grommet>
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
