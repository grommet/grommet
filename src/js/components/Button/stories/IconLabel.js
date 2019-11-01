import React from 'react';
import { storiesOf } from '@storybook/react';
import { Add } from 'grommet-icons';

import { Box, Button, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from '../../../utils';

const customButtonIconColor = deepMerge(grommet, {
  button: {
    color: { light: 'brand', dark: 'accent-2' },
  },
});

const IconLabel = () => (
  <Grommet theme={customButtonIconColor}>
    <Box background="dark-2" align="center" pad="large">
      <Box round="full" overflow="hidden" background="neutral-1">
        <Button icon={<Add />} hoverIndicator onClick={() => {}} />
      </Box>
      <Box align="center" pad="large" gap="small">
        <Button
          color="black"
          icon={<Add />}
          label="Add"
          onClick={() => {}}
          primary
        />
        <Button
          color="white"
          icon={<Add />}
          label="Add"
          onClick={() => {}}
          primary
        />
        <Button icon={<Add />} label="Add" gap="xlarge" onClick={() => {}} />
        <Button
          icon={<Add />}
          label="500px gap"
          gap="500px"
          onClick={() => {}}
        />
      </Box>
    </Box>
  </Grommet>
);

storiesOf('Button', module).add('Icon Label', () => <IconLabel />);
