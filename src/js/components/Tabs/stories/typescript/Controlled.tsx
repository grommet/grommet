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
    <Tabs activeIndex={index} onActive={onActive}>
      <Tab title="Tab 1">
        <Box margin="small" pad="large" align="center" background="brand">
          <Attraction size="xlarge" />
        </Box>
      </Tab>
      <Tab title="Tab 2">
        <Box margin="small" pad="large" align="center" background="light-4">
          <TreeOption size="xlarge" />
        </Box>
      </Tab>
      <Tab title="Tab 3">
        <Box margin="small" pad="large" align="center" background="dark-3">
          <Car size="xlarge" />
        </Box>
      </Tab>
    </Tabs>
    // </Grommet>
  );
};

export const Controlled = () => <ControlledTabs />;

export default {
  title: 'Controls/Tabs/Controlled',
};
