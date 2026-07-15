import React from 'react';

import { Box, Tab, Tabs } from 'grommet';
import { Attraction, Car, TreeOption } from 'grommet-icons';

const ControlledTabs = () => {
  const [index, setIndex] = React.useState(0);

  // Type annotations can only be used in TypeScript files.
  // Remove ': number' if you are not using Typescript.
  const onActive = (nextIndex: number) => setIndex(nextIndex);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box align="center" pad="medium">
      <Tabs activeIndex={index} onActive={onActive} justify="start">
        <Tab title="General">
          <Box margin="small" gap="small">
            User Information
          </Box>
        </Tab>
        <Tab title="Account">
          <Box margin="small">Account Information</Box>
        </Tab>
        <Tab title="Billing">
          <Box margin="small">Billing Information</Box>
        </Tab>
        <Tab title="Notifications">
          <Box margin="small">Notifications will show here.</Box>
        </Tab>
      </Tabs>
    </Box>
    // </Grommet>
  );
};

export const Controlled = () => <ControlledTabs />;

export default {
  title: 'Controls/Tabs/Controlled',
};
