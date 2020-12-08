import React from 'react';

import { Grommet, Select } from 'grommet';

const optionsFromServer = [
  {
    id: 1,
    name: 'Value1',
  },
  {
    id: 2,
    name: 'Value2',
  },
  {
    id: 15,
    name: 'Value15',
  },
  {
    id: 21,
    name: 'Value21',
  },
  {
    id: 22,
    name: 'Value22',
  },
];

export const LazyTest = () => {
  const [value, setValue] = React.useState();
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    setTimeout(() => {
      setOptions(optionsFromServer);
    }, 500);
  }, []);

  return (
    <Grommet>
      <Select
        id="test-select-mult-lazy"
        placeholder="Select multiple lazyload options"
        multiple
        valueKey="id"
        labelKey="name"
        value={value}
        options={options}
        onChange={({ value: nextValue }) => {
          // onChange(nextValue);
          setValue(nextValue);
        }}
      />
    </Grommet>
  );
};
