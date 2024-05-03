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

export const Composed = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="large" gap="large">
    <SelectorGroup multiple>
      <Box width="large" direction="row" gap="large">
        <Selector>
          <Box
            // TODO use selected to change color of border
            border={{
              color: 'border',
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
            <Box
              justify="between"
              direction="row"
              pad="small"
              border={{ style: 'dashed' }}
            >
              My custom content
              <SelectorIndicator />
            </Box>
          </Box>
        </Selector>
        <Selector>
          <Box
            // TODO use selected to change color of border
            border={{
              color: 'border',
            }}
            overflow="hidden"
            round="xsmall"
            width="medium"
            fill="vertical"
            gap="large"
            pad="small"
          >
            <Box direction="row" gap="small">
              <SelectorIndicator />
              <Text weight={500}>Config header</Text>
            </Box>
            <Box border={{ style: 'dashed' }}>My custom content</Box>
          </Box>
        </Selector>
      </Box>
    </SelectorGroup>
    <SelectorGroup multiple>
      <Grid columns="small" gap="small" role="group">
        <Selector>
          <Box
            // TODO use selected to change color of border
            border={{
              color: 'border',
            }}
            overflow="hidden"
            round="xsmall"
            fill
          >
            <Box pad="small">
              <Home size="large" />
            </Box>
            <Box pad="small">
              <Text weight={500}>House</Text>
            </Box>
          </Box>
        </Selector>
        <Selector>
          <Box
            // TODO use selected to change color of border
            border={{
              color: 'border',
            }}
            overflow="hidden"
            round="xsmall"
            fill
          >
            <Box pad="small">
              <Organization size="large" />
            </Box>
            <Box pad="small">
              <Text>Apartment</Text>
            </Box>
          </Box>
        </Selector>
        <Selector>
          <Box
            // TODO use selected to change color of border
            border={{
              color: 'border',
            }}
            overflow="hidden"
            round="xsmall"
            fill
          >
            <Box pad="small">
              <TreeOption size="large" />
            </Box>
            <Box pad="small">
              <Text>Cabin</Text>
            </Box>
          </Box>
        </Selector>
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
        <Selector>
          <Box
            // TODO use selected to change color of border
            border={{
              color: 'border',
            }}
            overflow="hidden"
            round="xsmall"
            fill
          >
            <Box
              direction="row"
              justify="between"
              pad="small"
              background={{ color: 'background-back' }}
            >
              <Box>
                <Text weight={500}>Premium</Text>
                <Text size="small">4k + HDR</Text>
              </Box>
              <SelectorIndicator />
            </Box>
            <Box pad="small">
              <PlanInfo price={22.99} quality="Best" resolution="4k" />
            </Box>
          </Box>
        </Selector>
        <Selector>
          <Box
            // TODO use selected to change color of border
            border={{
              color: 'border',
            }}
            overflow="hidden"
            round="xsmall"
            fill
          >
            <Box
              direction="row"
              justify="between"
              pad="small"
              background={{ color: 'background-back' }}
            >
              <Box>
                <Text>Standard</Text>
                <Text size="small">1080p</Text>
              </Box>
              <SelectorIndicator />
            </Box>
            <Box pad="small">
              <PlanInfo price={15.49} quality="Good" resolution="1080p" />
            </Box>
          </Box>
        </Selector>
        <Selector>
          <Box
            // TODO use selected to change color of border
            border={{
              color: 'border',
            }}
            overflow="hidden"
            round="xsmall"
            fill
          >
            <Box
              direction="row"
              justify="between"
              pad="small"
              background={{ color: 'background-back' }}
            >
              <Box>
                <Text>Standard with ads</Text>
                <Text size="small">1080p</Text>
              </Box>
              <SelectorIndicator />
            </Box>
            <Box pad="small">
              <PlanInfo price={6.99} quality="Good" resolution="1080p" />
            </Box>
          </Box>
        </Selector>
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
