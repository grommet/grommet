import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { Attraction, Car, TreeOption } from 'grommet-icons';
import { Box, Tab, Tabs } from 'mnet-ui-base';

const UncontrolledTabs = ({ plain = false }) => (
  <div style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
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
  </div>
);

UncontrolledTabs.propTypes = {
  plain: PropTypes.bool, // eslint-disable-line react/require-default-props
};

storiesOf('Tabs', module)
  .add('Uncontrolled', () => <UncontrolledTabs />)
  .add('Plain', () => <UncontrolledTabs plain />);
