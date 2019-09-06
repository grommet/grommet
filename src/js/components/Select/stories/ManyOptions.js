import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, CheckBox, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';

class Option extends PureComponent {
  render() {
    const { value, selected } = this.props;
    return (
      <Box direction="row" gap="small" align="center" pad="xsmall">
        <CheckBox tabIndex="-1" checked={selected} onChange={() => {}} />
        {value}
      </Box>
    );
  }
}

const dummyOptions = Array(2000)
  .fill()
  .map((_, i) => `option ${i}`)
  .sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
  );

const ManyOptions = () => {
  const [selected, setSelected] = React.useState([]);
  const [options, setOptions] = React.useState(dummyOptions);

  return (
    <Grommet full theme={grommet}>
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
    </Grommet>
  );
};

storiesOf('Select', module).add('Lots of options', () => <ManyOptions />);
