import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { mnet, Box, Button, MnetUIBase } from 'mnet-ui-base';

const BasicButtons = props => (
  <MnetUIBase theme={mnet}>
    <Box align="center" pad="medium">
      <Button label="Default" onClick={() => {}} {...props} />
    </Box>
    <Box align="center" pad="medium">
      <Button label="Anchor" href="#" />
    </Box>
    <Box align="center" pad="medium">
      <Button disabled label="Disabled" onClick={() => {}} {...props} />
    </Box>
    <Box align="center" pad="medium">
      <Button primary label="Primary" onClick={() => {}} {...props} />
    </Box>
  </MnetUIBase>
);

if (!isChromatic()) {
  storiesOf('TypeScript/Button', module).add('Basic', () => <BasicButtons />);
}
