import React from 'react';

import {
  Box,
  Text,
  Grid,
  NameValueList,
  NameValuePair,
  SelectorGroup,
  Selector,
} from 'grommet';
import { Home, Organization, TreeOption, User } from 'grommet-icons';
import { SelectorIndicator } from '../../SelectorIndicator';

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

// template to put into DS site
const SelectorContainerIcon = () => {
  return (
    <Selector>
      {({ selected }) => {
        return (
          <Box
            border={{
              color: selected ? 'brand' : 'border',
            }}
            overflow="hidden"
            round="xsmall"
            width="medium"
          >
            <Box pad="small" direction="row" gap="small">
              <User height="medium" />
              <Box gap="xsmall">
                <Text weight={500}>Composed header</Text>
                <Text size="small">This is a description.</Text>
              </Box>
            </Box>
            <Box pad="small" border={{ style: 'dashed' }}>
              My custom content
            </Box>
          </Box>
        );
      }}
    </Selector>
  );
};

// template to put into DS site
const SelectorContainer = ({ title, icon }) => {
  return (
    <Selector>
      {({ selected }) => {
        return (
          <Box
            border={{
              color: selected ? 'brand' : 'border',
            }}
            overflow="hidden"
            round="xsmall"
            width="medium"
          >
            <Box pad="small">{icon}</Box>
            <Box pad="small">
              <Text weight={500}>{title}</Text>
            </Box>
          </Box>
        );
      }}
    </Selector>
  );
};

// template to put into DS site
const SelectorContainerPlans = ({ title, desc, children }) => {
  return (
    <Selector>
      {({ selected }) => {
        return (
          <Box
            border={{
              color: selected ? 'brand' : 'border',
            }}
            overflow="hidden"
            round="xsmall"
            width="medium"
          >
            <Box
              direction="row"
              justify="between"
              pad="small"
              background={{ color: 'background-back' }}
            >
              <Box>
                <Text>{title}</Text>
                <Text size="small">{desc}</Text>
              </Box>
              <SelectorIndicator />
            </Box>
            {children}
          </Box>
        );
      }}
    </Selector>
  );
};

export const Composed = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="large" gap="large">
    <SelectorGroup multiple>
      <Box>
        <SelectorContainerIcon />
      </Box>
    </SelectorGroup>
    <SelectorGroup multiple>
      <Grid columns="small" gap="small" role="group">
        <SelectorContainer title="House" icon={<Home size="large" />} />
        <SelectorContainer
          title="Apartment"
          icon={<Organization size="large" />}
        />
        <SelectorContainer title="Cabin" icon={<TreeOption size="large" />} />
      </Grid>
    </SelectorGroup>
    <SelectorGroup>
      <Grid
        columns={{
          count: 3,
          size: ['auto', 'medium'],
        }}
        gap="small"
        role="group"
      >
        <SelectorContainerPlans title="Premium" desc="4k + HDR">
          <Box pad="small">
            <PlanInfo price={22.99} quality="Best" resolution="4k" />
          </Box>
        </SelectorContainerPlans>
        <SelectorContainerPlans title="Standard" desc="1080p">
          <Box pad="small">
            <PlanInfo price={15.49} quality="Good" resolution="1080p" />
          </Box>
        </SelectorContainerPlans>
        <SelectorContainerPlans
          title="Standard with ads"
          desc="Standard with ads"
        >
          <Box pad="small">
            <PlanInfo price={6.99} quality="Good" resolution="1080p" />
          </Box>
        </SelectorContainerPlans>
      </Grid>
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
