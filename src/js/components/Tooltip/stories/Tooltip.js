import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button } from 'mnet-ui-base';
import { Tooltip } from '../Tooltip';

const TooltipPreview = () => {
  return (
    <div>
      <Box
        direction="row"
        align="center"
        pad="large"
        justify="center"
        height="100vh"
      >
        <Tooltip message="Left Side" position="left" margin="large">
          <Button label="Left" />
        </Tooltip>
        <Tooltip message="Up Side" position="up" margin="large">
          <Button label="UP" />
        </Tooltip>
        <Tooltip message="Down Side" position="down" margin="large">
          <Button label="Down" />
        </Tooltip>
        <Tooltip
          message="Enabling this allows bidders to drop pixels or scripts to sync cookies in order to match their cookies with DSP’s cookies. They do this since some DSPs are most likely to bid on."
          position="right"
          margin="large"
        >
          <Button label="Right" />
        </Tooltip>
      </Box>
    </div>
  );
};

storiesOf('Tooltip', module).add('Tooltip', () => <TooltipPreview />);
