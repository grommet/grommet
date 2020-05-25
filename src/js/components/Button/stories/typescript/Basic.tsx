import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { Box, Button } from 'mnet-ui-base';

const BasicButtons = props => (
  <>
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
  </>
);

if (!isChromatic()) {
  storiesOf('TypeScript/Button', module).add('Basic', () => <BasicButtons />);
}
