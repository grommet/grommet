import React from 'react';

import { SubtractCircle, AddCircle } from 'grommet-icons';

import { Accordion, AccordionPanel, Box, Grommet, Text } from 'grommet';

const meta = {
  title: 'Controls/Accordion/Custom Themed/Custom',
  component: Accordion,
  argTypes: {
    animate: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

export const Custom = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';

import { SubtractCircle, AddCircle } from 'grommet-icons';

import { Accordion, AccordionPanel, Box, Grommet, Text } from 'grommet';

export const Custom = () => {
  const customAccordionTheme = {
    global: {
      font: {
        family: \`-apple-system,
       BlinkMacSystemFont,
       "Segoe UI",
       Roboto\`,
      },
    },
    accordion: {
      heading: {
        level: 3,
        margin: { vertical: '6px', horizontal: '24px' },
      },
      hover: {
        heading: {
          color: 'accent-2',
        },
        background: 'background-contrast',
      },
      icons: {
        collapse: SubtractCircle,
        expand: AddCircle,
        color: 'hotpink',
      },
      border: undefined,
    },
  };

  return (
    <Grommet theme={customAccordionTheme}>
      <Box pad="large" align="center" justify="center">
        <Accordion multiple>
          <AccordionPanel
            label={<Text size="large">Panel 1 - uses large Text size</Text>}
          >
            <Box background="light-2" height="small">
              Important Info
            </Box>
          </AccordionPanel>
          <AccordionPanel
            label={
              <Text size="xlarge" margin="vertical">
                Panel 2 - uses xlarge Text size
              </Text>
            }
          >
            <Box background="light-2" height="xsmall">
              <Text size="small">Important Info</Text>
            </Box>
          </AccordionPanel>
          <AccordionPanel 
            label="Panel 3 - uses custom theme heading level for sizing"
          >
            <Box background="light-2" height="xsmall">
              <Text size="small">Important Info</Text>
            </Box>
          </AccordionPanel>
        </Accordion>
      </Box>
    </Grommet>
  );
};`,
      },
    },
  },
  render: () => {
    const customAccordionTheme = {
      global: {
        font: {
          family: `-apple-system,
         BlinkMacSystemFont,
         "Segoe UI",
         Roboto`,
        },
      },
      accordion: {
        heading: {
          level: 3,
          margin: { vertical: '6px', horizontal: '24px' },
        },
        hover: {
          heading: {
            color: 'accent-2',
          },
          background: 'background-contrast',
        },
        icons: {
          collapse: SubtractCircle,
          expand: AddCircle,
          color: 'hotpink',
        },
        border: undefined,
      },
    };

    return (
      <Grommet theme={customAccordionTheme}>
        <Box pad="large" align="center" justify="center">
          <Accordion animate multiple>
            <AccordionPanel
              label={<Text size="large">Panel 1 - uses large Text size</Text>}
            >
              <Box background="light-2" height="small">
                Important Info
              </Box>
            </AccordionPanel>
            <AccordionPanel
              label={
                <Text size="xlarge" margin="vertical">
                  Panel 2 - uses xlarge Text size
                </Text>
              }
            >
              <Box background="light-2" height="xsmall">
                <Text size="small">Important Info</Text>
              </Box>
            </AccordionPanel>
            {/* eslint-disable-next-line max-len */}
            <AccordionPanel label="Panel 3 - uses custom theme heading level for sizing">
              <Box background="light-2" height="xsmall">
                <Text size="small">Important Info</Text>
              </Box>
            </AccordionPanel>
          </Accordion>
        </Box>
      </Grommet>
    );
  },
};
