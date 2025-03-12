import React from 'react';

import { Box, Button, Collapsible, Text } from 'grommet';

export const Default = (props) => {
  const [open, setOpen] = React.useState(false);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
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
    // </Grommet>
  );
};

Default.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Utilities/Collapsible/Default',
};
