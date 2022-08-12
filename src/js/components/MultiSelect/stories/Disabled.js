import React, { useState } from 'react';

import { Box, Text } from 'grommet';
import { MultiSelect } from '../MultiSelect';

const dummyOptions = [
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
  const [options, setOptions] = useState(dummyOptions.sort());
  const [valueMultiple, setValueMultiple] = useState([
    'Chocolate Chip Cookies',
    'Strawberry Shortcake',
  ]);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" pad="large" gap="large">
      <Text>Multi-Select Disabled</Text>
      <MultiSelect
        width="medium"
        // limit={5}
        visibleSelection
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
          // setSearch(text);
          // The line below escapes regular expression special characters:
          // [ \ ^ $ . | ? * + ( )
          const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

          // Create the regular expression with modified value which
          // handles escaping special characters. Without escaping special
          // characters, errors will appear in the console
          const exp = new RegExp(escapedText, 'i');

          let next = [...valueMultiple];
          next = next.filter((o) => exp.test(o));
          let sortedOptions = dummyOptions.filter((i) => !next.includes(i));

          sortedOptions = sortedOptions.filter((o) => exp.test(o));

          const sortedAllOptions = next.concat(sortedOptions);
          setOptions(sortedAllOptions);
        }}
        onClose={() => {
          let next = [...valueMultiple];
          // loop through next selected and sort alphabetically
          next.sort();
          // remove next selected from options
          const sortedOptions = dummyOptions.filter((i) => !next.includes(i));
          next = next.filter((i) => dummyOptions.includes(i));
          // sort options alphabetically
          sortedOptions.sort();
          // concat next selected and options
          const sortedAllOptions = next.concat(sortedOptions);
          setOptions(sortedAllOptions);
        }}
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
  title: 'Input/MultiSelect/Disabled',
};
