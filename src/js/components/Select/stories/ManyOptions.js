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

const dummyOptions2 = Array(81)
  .fill()
  .map((_, i) => `option ${i}`)
  .sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
  );

const ManyOptions = () => {
  const [selected] = React.useState([]);
  const [options] = React.useState(dummyOptions);
  const [options2] = React.useState(dummyOptions2);

  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large" direction="row">
        <Select
          multiple
          closeOnChange={false}
          placeholder="select an option..."
          options={options}
          dropHeight="medium"
        >
          {(option, index) => (
            <Option value={option} selected={selected.indexOf(index) !== -1} />
          )}
        </Select>
        <Select
          multiple
          closeOnChange={false}
          placeholder="select an option..."
          options={options2}
          dropHeight="medium"
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
