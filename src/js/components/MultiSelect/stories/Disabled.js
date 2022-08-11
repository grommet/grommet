import React, { useState } from 'react';

import { Box, Text } from 'grommet';
import { MultiSelect } from '../MultiSelect';
import { CaretDown, Github, Slack } from 'grommet-icons';

// const dummyOptions = [
//   'French Vanilla Cake with Buttercream',
//   'Sweet Grilled Peaches',
//   'Chocolate Chip Cookies',
//   'Pineapple Upside-Down Cake',
//   'Peanut Butter Chocolate Fondue',
//   'Strawberry Shortcake',
//   'Peach Cobbler',
//   'German Chocolate Cake',
//   'Carrot Cake with Cream Cheese Frosting',
//   'Cinnamon Coffee Cake',
// ];

const dummyOptions = [
  { name: 'first', val: '1' },
  { name: 'second', val: '2' },
];

// const dummyOptions = [
//   'Apple',
//   'Orange',
//   'Banana',
//   'Grape',
//   'Melon',
//   'Strawberry',
//   'Kiwi',
//   'Mango',
//   'Raspberry',
//   'Rhubarb',
// ];

export const Disabled = () => {
  const [options, setOptions] = useState(dummyOptions.sort());
  // const [valueMultiple, setValueMultiple] = useState([
  //   'Chocolate Chip Cookies',
  //   'Strawberry Shortcake',
  // ]);
  const [valueMultiple, setValueMultiple] = useState([
    // '1'
    { name: 'first', val: '1' }
    // 'Chocolate Chip Cookies',
    // 'Strawberry Shortcake',
  ]);
  // const [search, setSearch] = useState();

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" pad="large" gap="large">
      <Text>Multi-Select Disabled</Text>
      <MultiSelect
        // limit={5}
        visibleSelection
        // dropProps={{
        //   background: 'pink',
        // }}
        // icon={<CaretDown />}
        // icon={false}
        // helpContent={
        //   <Box
        //     direction="row"
        //     justify="between"
        //     flex={false}
        //     pad={{ horizontal: 'xsmall', bottom: 'xsmall' }}
        //   >
        //     <Text size="small">Select up to 5</Text>
        //   </Box>
        // }
        // disabled={['Chocolate Chip Cookies', 'Pineapple Upside-Down Cake']}
        value={valueMultiple}
        valueKey={{ key: "val" }}
        labelKey="name"
        // valueLabel="name"
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
          console.log(value)
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
