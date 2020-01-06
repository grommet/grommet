import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { Box, Button, Collapsible, MnetUIBase, Text } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const SimpleCollapsible = props => {
  const [open, setOpen] = React.useState(false);

  return (
    <MnetUIBase theme={mnet}>
      <Box align="start" gap="small">
        <Button primary onClick={() => setOpen(!open)} label="Toggle" />
        <Collapsible open={open} {...props}>
          <Box
            background="light-2"
            round="medium"
            pad="medium"
            align="center"
            justify="center"
          >
            <Text>This is a box inside a Collapsible component</Text>
          </Box>
        </Collapsible>
        <Text>This is other content outside the Collapsible box</Text>
      </Box>
    </MnetUIBase>
  );
};
if (!isChromatic()) {
  storiesOf('TypeScript/Collapsible', module).add('Default', () => (
    <SimpleCollapsible />
  ));
}
