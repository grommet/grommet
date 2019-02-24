import * as React from 'react';
import Tabs from '../Tabs';
import Tab from '../../Tab/Tab';
import Box from '../../Box/Box/Box';

export default (
  <Tabs uxpId="tabs0">
    <Tab title="tab 1" uxpId="tab0">
      <Box pad="medium" uxpId="contenttab0">One</Box>
    </Tab>
    <Tab title="tab 2" uxpId="tab1">
      <Box pad="medium" uxpId="contenttab1">Two</Box>
    </Tab>
  </Tabs>
);
