import React, { useState } from 'react';

import { Box, Text } from 'grommet';
import { MultiSelect } from '../MultiSelect';
const objectOptions = [
  {
    label: 'Male',
    value: 1,
  },
  {
    label: 'Female',
    value: 2,
  },
  {
    label: 'Non Binary',
    value: 3,
  },
  {
    label: 'Other',
    value: 4,
  },
];

export const ObjectOptions = () => {
  const [options, setOptions] = useState(objectOptions);
  const [value, setValue] = useState([{
    label: 'Male',
    value: 1,
  }]);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="start" pad="large">
      <Text>Select with Object Options</Text>
      <MultiSelect
        // limit={2}
        disabled={[{ label: 'Female', value: 2 }]}
        // disabled={["2"]}
        onSearch={(text) => {
          const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

          // Create the regular expression with modified value which
          // handles escaping special characters. Without escaping special
          // characters, errors will appear in the console
          const exp = new RegExp(escapedText, 'i');
          setOptions(objectOptions.filter((o) => exp.test(o.label)));
        }}
        visibleSelection
        id="select"
        name="select"
        placeholder="Select"
        labelKey="label"
        valueKey={{ key: 'value' }}
        value={value}
        options={options}
        onChange={({ value: nextValue, option }) => {
          console.log('in onChange ', nextValue, ' ', option);
          setValue(nextValue);
        }}
      />
    </Box>
    // </Grommet>
  );
};

ObjectOptions.storyName = 'Object options';

ObjectOptions.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/MultiSelect/Object options',
};
