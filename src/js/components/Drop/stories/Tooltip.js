import React, { useRef, useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, Drop, MnetUIBase } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const TooltipDrop = () => {
  const [over, setOver] = useState();
  const ref = useRef();

  return (
    <MnetUIBase theme={mnet} full>
      <Box fill align="center" justify="center">
        <Button
          label="Button"
          ref={ref}
          onMouseOver={() => setOver(true)}
          onMouseOut={() => setOver(false)}
          onFocus={() => {}}
          onBlur={() => {}}
        />

        {ref.current && over && (
          <Drop align={{ left: 'right' }} target={ref.current} plain>
            <Box
              margin="xsmall"
              pad="small"
              background="dark-3"
              round={{ size: 'medium', corner: 'left' }}
            >
              tooltip contents
            </Box>
          </Drop>
        )}
      </Box>
    </MnetUIBase>
  );
};

storiesOf('Drop', module).add('Tooltip', () => <TooltipDrop />);
