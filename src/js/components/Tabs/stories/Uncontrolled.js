import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { Attraction, Car, TreeOption } from 'grommet-icons';
import { Box, Grommet, Tab, Tabs } from 'grommet';
import { grommet } from 'grommet/themes';

const UncontrolledTabs = ({ plain }) => (
  <Grommet theme={grommet} full>
    <Box fill>
      <Tabs flex>
        <Tab plain={plain} title="Tab 1">
          <Box fill pad="large" align="center" background="accent-1">
            <Attraction size="xlarge" />
          </Box>
        </Tab>
        <Tab plain={plain} title="Tab 2">
          <Box fill pad="large" align="center" background="accent-2">
            <TreeOption size="xlarge" />
          </Box>
        </Tab>
        <Tab plain={plain} title="Tab 3">
          <Box fill pad="large" align="center" background="accent-3">
            <Car size="xlarge" />
          </Box>
        </Tab>
      </Tabs>
    </Box>
  </Grommet>
);

UncontrolledTabs.defaultProps = {
  plain: false,
};

UncontrolledTabs.propTypes = {
  plain: PropTypes.bool,
};

storiesOf('Tabs', module).add('Uncontrolled', () => <UncontrolledTabs />);

export default UncontrolledTabs;
