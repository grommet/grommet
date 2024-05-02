import React from 'react';

import {
  Box,
  Text,
  Selector,
  SelectorGroup,
  SelectorBody,
  SelectorHeader,
} from 'grommet';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="large" gap="large">
    <SelectorGroup>
      <Selector>
        <SelectorHeader title="Require service assignments" />
        <SelectorBody>
          <Text size="large">24</Text>
        </SelectorBody>
      </Selector>
      <Selector>
        <SelectorHeader title="Expired subscriptions" />
        <SelectorBody>
          <Text size="large">18</Text>
        </SelectorBody>
      </Selector>
      <Selector>
        <SelectorHeader title="Needs attention" />
        <SelectorBody>
          <Text size="large">9</Text>
        </SelectorBody>
      </Selector>
    </SelectorGroup>
    <SelectorGroup multiple>
      <Selector>
        <SelectorHeader title="Require service assignments" />
        <SelectorBody>
          <Text size="large">24</Text>
        </SelectorBody>
      </Selector>
      <Selector>
        <SelectorHeader title="Expired subscriptions" />
        <SelectorBody>
          <Text size="large">18</Text>
        </SelectorBody>
      </Selector>
      <Selector>
        <SelectorHeader title="Needs attention" />
        <SelectorBody>
          <Text size="large">9</Text>
        </SelectorBody>
      </Selector>
    </SelectorGroup>
  </Box>
  // </Grommet>
);

Simple.args = {
  full: true,
};

export default {
  title: 'Controls/SelectorGroup/Simple',
};
