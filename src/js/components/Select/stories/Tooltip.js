import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Select, Drop } from 'grommet';
import { grommet } from 'grommet/themes';

const options = [];
for (let i = 1; i <= 20; i += 1) {
  options.push(`option ${i}`);
}

const SimpleSelect = () => {
  const [value, setValue] = React.useState();
  const [over, setOver] = React.useState(false);
  const ref = React.useRef();
  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Select
          ref={ref}
          id="select"
          name="select"
          placeholder="Select"
          value={value}
          options={options}
          onChange={({ option }) => setValue(option)}
          onMouseOver={() => setOver(true)}
          onMouseOut={() => setOver(false)}
          onFocus={() => console.log('focus')}
          onBlur={() => console.log('blur')}
        />
        {ref.current && over && (
          <Drop align={{ left: 'right' }} target={ref.current} plain>
            <Box
              width="small"
              margin="xsmall"
              pad="small"
              background="dark-3"
              round={{ size: 'medium' }}
            >
              tooltip contents
            </Box>
          </Drop>
        )}
      </Box>
    </Grommet>
  );
};

storiesOf('Select', module).add('Tooltip', () => <SimpleSelect />);
