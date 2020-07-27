import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, CheckBox, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';

const dummyOptions = Array(2000)
  .fill()
  .map((_, i) => `option ${i}`)
  .sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
  );

const Option = ({ value, selected }) => {
  return (
    <Box direction="row" gap="small" align="center" pad="xsmall">
      <CheckBox tabIndex="-1" checked={selected} onChange={() => {}} />
      {value}
    </Box>
  );
};

const LazyLoading = () => {
  const [selected, setSelected] = React.useState([]);
  const [options, setOptions] = React.useState(dummyOptions.slice(0, 200));

  const onMore = () => {
    setTimeout(() => {
      console.log('onmore called');
      setOptions(dummyOptions.slice(0, options.length + 200));
    }, 1000);
  };

  const onClose = () => {
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
    );
  };

  const onChange = ({ selected: nextSelected }) => setSelected(nextSelected);

  return (
    <Grommet theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Select
          multiple
          closeOnChange={false}
          placeholder="select an option..."
          selected={selected}
          options={options}
          dropHeight="medium"
          onMore={onMore}
          onClose={onClose}
          onChange={onChange}
        >
          {(option, index) => (
            <Option value={option} selected={selected.indexOf(index) !== -1} />
          )}
        </Select>
      </Box>
    </Grommet>
  );
};

storiesOf('Select', module).add('Lazy Loading options', () => <LazyLoading />);
