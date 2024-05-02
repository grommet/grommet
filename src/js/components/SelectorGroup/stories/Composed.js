import React from 'react';

import {
  Box,
  Text,
  NameValueList,
  NameValuePair,
  SelectorBody,
  SelectorGroup,
  SelectorTitle,
  SelectorHeader,
  Selector,
} from 'grommet';
import { Home, Organization, TreeOption, User } from 'grommet-icons';

const PlanInfo = ({ price, quality, resolution }) => (
  <Box>
    <NameValueList pairProps={{ direction: 'column' }}>
      <NameValuePair name="Monthly price">
        {Intl.NumberFormat(undefined, {
          style: 'currency',
          currency: 'USD',
        }).format(price)}
      </NameValuePair>
      <NameValuePair name="Video and sound quality">{quality}</NameValuePair>
      <NameValuePair name="Resoultion">{resolution}</NameValuePair>
    </NameValueList>
  </Box>
);

export const Composed = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="large" gap="large">
    <SelectorGroup>
      <Selector>
        <SelectorHeader>
          <Box direction="row" gap="small">
            <User height="medium" />
            <Box gap="xsmall">
              <SelectorTitle>Composed header</SelectorTitle>
              {/* TO DO is there enough clarity to have
               this as a subcomponent */}
              <Text size="small">This is a description.</Text>
            </Box>
          </Box>
        </SelectorHeader>
        <SelectorBody border={{ style: 'dashed' }}>
          My custom content
        </SelectorBody>
      </Selector>
      <Selector>
        <SelectorHeader title="Config header" />
        <SelectorBody border={{ style: 'dashed' }}>
          My custom content
        </SelectorBody>
      </Selector>
    </SelectorGroup>
    <SelectorGroup columns="small" multiple>
      <Selector>
        <SelectorHeader>
          <Home size="large" />
        </SelectorHeader>
        {/* TO DO is it okay the "title" is inside the body? */}
        {/* Is this still what we would consider the title? */}
        <SelectorBody>
          <SelectorTitle>House</SelectorTitle>
        </SelectorBody>
      </Selector>
      <Selector>
        <SelectorHeader>
          <Organization size="large" />
        </SelectorHeader>
        <SelectorBody>
          <SelectorTitle>Apartment</SelectorTitle>
        </SelectorBody>
      </Selector>
      <Selector>
        <SelectorHeader>
          <TreeOption size="large" />
        </SelectorHeader>
        <SelectorBody>
          <SelectorTitle>Cabin</SelectorTitle>
        </SelectorBody>
      </Selector>
    </SelectorGroup>
    <SelectorGroup>
      <Selector>
        <SelectorHeader background={{ color: 'background-back' }}>
          <SelectorTitle>Premium</SelectorTitle>
          <Text size="small">4k + HDR</Text>
        </SelectorHeader>
        <SelectorBody>
          <PlanInfo price={22.99} quality="Best" resolution="4k" />
        </SelectorBody>
      </Selector>
      <Selector>
        <SelectorHeader background={{ color: 'background-back' }}>
          <SelectorTitle>Standard</SelectorTitle>
          <Text size="small">1080p</Text>
        </SelectorHeader>
        <SelectorBody>
          <PlanInfo price={15.49} quality="Good" resolution="1080p" />
        </SelectorBody>
      </Selector>
      <Selector>
        <SelectorHeader background={{ color: 'background-back' }}>
          <SelectorTitle>Standard with ads</SelectorTitle>
          <Text size="small">1080p</Text>
        </SelectorHeader>
        <SelectorBody>
          <PlanInfo price={6.99} quality="Good" resolution="1080p" />
        </SelectorBody>
      </Selector>
    </SelectorGroup>
  </Box>
  // </Grommet>
);

Composed.args = {
  full: true,
};

export default {
  title: 'Controls/SelectorGroup/Composed',
};
