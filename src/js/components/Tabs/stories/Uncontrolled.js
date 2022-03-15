import React from 'react';
import PropTypes from 'prop-types';

import { Box, Tab, Tabs } from 'grommet';
import { Attraction, Car, TreeOption } from 'grommet-icons';

const UncontrolledTabs = ({ plain = false }) => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box fill>
    <Tabs flex>
      <Tab plain={plain} title="Tab 1">
        <Box fill pad="large" align="center" background="brand">
          <Attraction size="xlarge" />
        </Box>
      </Tab>
      <Tab plain={plain} title="Tab 2">
        <Box fill pad="large" align="center" background="light-4">
          <TreeOption size="xlarge" />
        </Box>
      </Tab>
      <Tab plain={plain} title="Tab 3">
        <Box fill pad="large" align="center" background="dark-3">
          <Car size="xlarge" />
        </Box>
      </Tab>
    </Tabs>
  </Box>
  // </Grommet>
);

UncontrolledTabs.propTypes = {
  plain: PropTypes.bool, // eslint-disable-line react/require-default-props
};
UncontrolledTabs.args = {
  full: true,
};

export const Uncontrolled = () => <UncontrolledTabs />;

export default {
  title: 'Controls/Tabs/Uncontrolled',
};
