import React, { useState } from 'react';

import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';

const objectOptions = [];
for (let i = 1; i <= 200; i += 1) {
  objectOptions.push({
    lab: `option ${i}`,
    val: i,
    dis: i % 5 === 0,
  });
}

export const ObjectMultiple = () => {
  const [options, setOptions] = useState(objectOptions);
  const [value, setValue] = useState([1, 2]);

  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Select
          size="medium"
          placeholder="Select"
          multiple
          closeOnChange={false}
          disabledKey="dis"
          labelKey="lab"
          valueKey={{ key: 'val', reduce: true }}
          value={value}
          options={options}
          onChange={({ value: nextValue }) => setValue(nextValue)}
          onClose={() => setOptions(objectOptions)}
          onSearch={text => {
            // The line below escapes regular expression special characters:
            // [ \ ^ $ . | ? * + ( )
            const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

            // Create the regular expression with modified value which
            // handles escaping special characters. Without escaping special
            // characters, errors will appear in the console
            const exp = new RegExp(escapedText, 'i');
            setOptions(objectOptions.filter(o => exp.test(o.lab)));
          }}
        />
      </Box>
    </Grommet>
  );
};

ObjectMultiple.storyName = 'Object multiple';
