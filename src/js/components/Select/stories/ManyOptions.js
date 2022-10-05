import React from 'react';

import { Box, CheckBox, Select } from 'grommet';

const Option = React.memo(({ value, selected }) => (
  <Box direction="row" gap="small" align="center" pad="xsmall">
    <CheckBox tabIndex="-1" checked={selected} onChange={() => {}} />
    {value}
  </Box>
));

const dummyOptions = Array(2000)
  .fill()
  .map((_, i) => `option ${i}`)
  .sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
  );

export const ManyOptions = () => {
  const [selected, setSelected] = React.useState([]);
  const [options, setOptions] = React.useState(dummyOptions);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="start" pad="large">
      <Select
        multiple
        closeOnChange={false}
        placeholder="select an option..."
        selected={selected}
        options={options}
        dropHeight="medium"
        onClose={() =>
          setOptions(
            options.sort((p1, p2) => {
              const p1Exists = selected.includes(p1);
              const p2Exists = selected.includes(p2);

              if (!p1Exists && p2Exists) {
                return 1;
              }
              if (p1Exists && !p2Exists) {
                return -1;
              }
              return p1.localeCompare(p2, undefined, {
                numeric: true,
                sensitivity: 'base',
              });
            }),
          )
        }
        onChange={({ selected: nextSelected }) => {
          setSelected(nextSelected);
        }}
      >
        {(option, index) => (
          <Option value={option} selected={selected.indexOf(index) !== -1} />
        )}
      </Select>
    </Box>
    // </Grommet>
  );
};

ManyOptions.storyName = 'Many options';

ManyOptions.parameters = {
  chromatic: { disable: true },
};

ManyOptions.args = {
  full: true,
};

export default {
  title: 'Input/Select/Many options',
};
