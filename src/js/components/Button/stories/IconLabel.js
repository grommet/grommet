import React from 'react';
import { storiesOf } from '@storybook/react';
import { Add } from 'grommet-icons';

import { Box, Button, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const IconLabel = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Box round="full" overflow="hidden" background="neutral-1">
        <Button icon={<Add />} hoverIndicator onClick={() => {}} />
      </Box>
      <Box align="center" pad="large" gap="small">
        <Button icon={<Add />} label="Add" onClick={() => {}} primary />
        <Button icon={<Add />} label="Add" onClick={() => {}} />
      </Box>
    </Box>
  </Grommet>
);

storiesOf('Button', module).add('Icon Label', () => <IconLabel />);
