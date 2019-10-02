import React, { useState, useEffect, useRef } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Meter } from 'grommet';
import { grommet } from 'grommet/themes';

function CircleMeter() {
  const [ value, setValue ] = useState(20);
  const [ timer, setTimer ] = useRef(setInterval(() => {
    setValue(value < 100 ? value + 8 : 20);
  }, 2000));

  useEffect(() => {
    return () => {
      timer && clearInterval(timer);
    }
  }, []);

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Meter
          type="circle"
          background="light-2"
          values={[{ value, color: value > 50 ? 'accent-2' : 'accent-1' }]}
        />
      </Box>
    </Grommet>
  );
}

storiesOf('Meter', module).add('Circle', () => <CircleMeter />);
