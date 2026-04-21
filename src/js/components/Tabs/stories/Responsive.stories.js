import React, { useState } from 'react';

import { Box, Tab, Tabs } from 'grommet';
import { Attraction, Car, TreeOption } from 'grommet-icons';

const ResponsiveTabs = () => {
  const [index, setIndex] = useState();

  const onActive = (nextIndex) => setIndex(nextIndex);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box align="center" pad="xlarge">
      <Tabs
        justify="start"
        alignControls="start"
        activeIndex={index}
        onActive={onActive}
      >
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
        <Tab title="Tab 4">
          <Box margin="small" pad="large" align="center" background="brand">
            <Attraction size="xlarge" />
          </Box>
        </Tab>
        <Tab title="Tab 5">
          <Box margin="small" pad="large" align="center" background="light-4">
            <TreeOption size="xlarge" />
          </Box>
        </Tab>
        <Tab title="Tab 6">
          <Box margin="small" pad="large" align="center" background="dark-3">
            <Car size="xlarge" />
          </Box>
        </Tab>
        <Tab title="Tab 7">
          <Box margin="small" pad="large" align="center" background="brand">
            <Attraction size="xlarge" />
          </Box>
        </Tab>
        <Tab title="Tab 8">
          <Box margin="small" pad="large" align="center" background="light-4">
            <TreeOption size="xlarge" />
          </Box>
        </Tab>
        <Tab title="Tab 9">
          <Box margin="small" pad="large" align="center" background="dark-3">
            <Car size="xlarge" />
          </Box>
        </Tab>
        <Tab title="Tab 10">
          <Box margin="small" pad="large" align="center" background="brand">
            <Attraction size="xlarge" />
          </Box>
        </Tab>
        <Tab title="Tab 11">
          <Box margin="small" pad="large" align="center" background="light-4">
            <TreeOption size="xlarge" />
          </Box>
        </Tab>
        <Tab title="Tab 12">
          <Box margin="small" pad="large" align="center" background="dark-3">
            <Car size="xlarge" />
          </Box>
        </Tab>
      </Tabs>
    </Box>
    // </Grommet>
  );
};

export const Responsive = () => <ResponsiveTabs />;

export default {
  title: 'Controls/Tabs/Responsive',
};
