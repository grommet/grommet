import React, { useState } from 'react';

import { Box, Text } from 'grommet';
import { MultiSelect } from '../MultiSelect';

const objectOptions = [
  {
    label: 'Red',
    value: 1,
  },
  {
    label: 'Blue',
    value: 2,
  },
  {
    label: 'Green',
    value: 3,
  },
  {
    label: 'Purple',
    value: 4,
  },
];

export const ObjectOptions = () => {
  const [options, setOptions] = useState(objectOptions);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="start" pad="large">
      <Text>Select with Object Options</Text>
      <MultiSelect
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
        options={options}
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
