import React, { useState } from 'react';
import { Grommet, SelectMultiple } from 'grommet';

export function WithSearch() {
  const defaultOptions = [
    'Apple',
    'Orange',
    'Banana',
    'Grape',
    'Melon',
    'Strawberry',
    'Kiwi',
    'Mango',
    'Raspberry',
    'Rhubarb',
  ];

  const [options, setOptions] = useState(defaultOptions);
  const [valueMultiple, setValueMultiple] = useState([]);
  return (
    <Grommet>
      <SelectMultiple
        options={options}
        value={valueMultiple}
        placeholder="Select"
        onSearch={(text) => {
          const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
          const exp = new RegExp(escapedText, 'i');
          setOptions(defaultOptions.filter((o) => exp.test(o)));
        }}
        onClose={() => setOptions(defaultOptions)}
        onChange={({ value }) => {
          setValueMultiple(value);
        }}
      />
    </Grommet>
  );
}

export default {
  title: 'Input/SelectMultiple/With Search',
};
