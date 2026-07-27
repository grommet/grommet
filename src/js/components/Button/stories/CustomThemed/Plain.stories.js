import React from 'react';

import { Add } from 'grommet-icons';

import { Box, Button, Grommet, Text } from 'grommet';

export const Plain = () => (
  <Box pad="large" gap="large">
    <Grommet>
      {/* Out of the Box Button */}
      <Box align="center">
        <Button hoverIndicator="light-1" onClick={() => {}}>
          {/*  When Button include children, it is treated as plain */}
          <Box pad="small" direction="row" align="center" gap="small">
            <Add />
            <Text>Add</Text>
          </Box>
        </Button>
      </Box>
    </Grommet>
    {/* Kind Button */}
    <Grommet
      theme={{
        global: {
          font: {
            family: `-apple-system, BlinkMacSystemFont`,
          },
        },
        button: { default: {} }, // enabling kind button functionality
      }}
    >
      <Box align="center">
        <Button hoverIndicator="light-1" onClick={() => {}}>
          {/*  When kind Button include children, it is treated as plain */}
          <Box pad="small" direction="row" align="center" gap="small">
            <Add />
            <Text>Kind</Text>
          </Box>
        </Button>
      </Box>
    </Grommet>
  </Box>
);

export const ChildrenPlainOption = () => (
  <Box pad="large" gap="large">
    <Grommet options={{ button: { childrenPlain: false } }}>
      <Box align="center" gap="small">
        <Text size="small" color="text-weak">
          options.button.childrenPlain defaults to true. Setting it to false
          stops automatically forcing plain when Button has children.
        </Text>
        <Button hoverIndicator="light-1" onClick={() => {}}>
          <Box pad="small" direction="row" align="center" gap="small">
            <Add />
            <Text>Option false</Text>
          </Box>
        </Button>
        <Button hoverIndicator="light-1" plain onClick={() => {}}>
          <Box pad="small" direction="row" align="center" gap="small">
            <Add />
            <Text>Explicit plain</Text>
          </Box>
        </Button>
      </Box>
    </Grommet>
    <Grommet
      options={{ button: { childrenPlain: false } }}
      theme={{
        global: {
          font: {
            family: `-apple-system, BlinkMacSystemFont`,
          },
        },
        button: { default: {} },
      }}
    >
      <Box align="center" gap="small">
        <Text size="small" color="text-weak">
          Same behavior applies for kind buttons.
        </Text>
        <Button hoverIndicator="light-1" onClick={() => {}}>
          <Box pad="small" direction="row" align="center" gap="small">
            <Add />
            <Text>Kind option false</Text>
          </Box>
        </Button>
        <Button hoverIndicator="light-1" plain onClick={() => {}}>
          <Box pad="small" direction="row" align="center" gap="small">
            <Add />
            <Text>Kind explicit plain</Text>
          </Box>
        </Button>
      </Box>
    </Grommet>
  </Box>
);

ChildrenPlainOption.storyName = 'Children Plain Option';

export default {
  title: 'Controls/Button/Custom Themed/Plain',
};
