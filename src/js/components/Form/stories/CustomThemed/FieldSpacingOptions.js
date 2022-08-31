import React from 'react';

import {
  Box,
  Form,
  FormField,
  Grid,
  Grommet,
  Heading,
  RadioButtonGroup,
  TextInput,
  ThemeContext,
} from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const customTheme = deepMerge(grommet, {
  formField: {
    border: {
      side: 'all',
    },
    error: {
      size: 'xsmall',
    },
    help: {
      size: 'xsmall',
    },
    info: {
      size: 'xsmall',
    },
    label: {
      size: 'small',
    },
    round: '4px',
  },
  global: { font: { size: 'small' } },
});

const adjustedLabelMargins = {
  error: {
    margin: 'none',
  },
  help: {
    margin: 'none',
  },
  info: {
    margin: 'none',
  },
  label: {
    margin: 'none',
  },
};

export const FieldSpacingOptions = () => (
  <Grommet theme={customTheme}>
    <Grid columns={{ count: 'fit', size: 'medium' }} gap="medium">
      <Box pad={{ horizontal: 'medium' }}>
        <Form>
          <Heading level={2} size="xsmall">
            Default Spacing
          </Heading>
          <FormField
            htmlFor="example1-id"
            name="example1"
            label="Field Label"
            help="Some helpful descriptive text"
            error="Message to show on error"
            info="Additional contextual information"
          >
            <TextInput
              id="example1-id"
              name="example1"
              placeholder="Placeholder input prompt"
            />
          </FormField>
          <FormField
            htmlFor="example2-id"
            name="example2"
            label="Field Label for Grouped Input"
            help="Choose your favorite"
          >
            <RadioButtonGroup
              id="example2-id"
              name="example2"
              options={['Eenie', 'Meenie', 'Miney', 'Moe']}
            />
          </FormField>
        </Form>
      </Box>
      <Box pad={{ horizontal: 'medium' }}>
        <Form>
          <Heading level={2} size="xsmall">
            Label & Message Margins Removed
          </Heading>
          <ThemeContext.Extend
            value={{
              formField: adjustedLabelMargins,
            }}
          >
            <FormField
              htmlFor="example1-id"
              name="example1"
              label="Field Label"
              help="Some helpful descriptive text"
              error="Message to show on error"
              info="Additional contextual information"
            >
              <TextInput
                id="example1-id"
                name="example1"
                placeholder="Placeholder input prompt"
              />
            </FormField>
            <FormField
              htmlFor="example1-id"
              name="example1"
              label="Field Label for Grouped Input"
              help="Choose your favorite"
            >
              <RadioButtonGroup
                id="example1-id"
                name="example1"
                options={['Eenie', 'Meenie', 'Miney', 'Moe']}
              />
            </FormField>
          </ThemeContext.Extend>
        </Form>
      </Box>
      <Box pad={{ horizontal: 'medium' }}>
        <Form>
          <Heading level={2} size="xsmall">
            Field Margin Increased
          </Heading>
          <ThemeContext.Extend
            value={{
              formField: {
                margin: { bottom: 'large' },
                ...adjustedLabelMargins,
              },
            }}
          >
            <FormField
              htmlFor="example11-id"
              name="example11"
              label="Field Label"
              help="Some helpful descriptive text"
              error="Message to show on error"
              info="Additional contextual information"
            >
              <TextInput
                id="example11-id"
                name="example11"
                placeholder="Placeholder input prompt"
              />
            </FormField>
            <FormField
              htmlFor="example21-id"
              name="example21"
              label="Field Label for Grouped Input"
              help="Choose your favorite"
            >
              <RadioButtonGroup
                id="example21-id"
                name="example21"
                options={['Eenie', 'Meenie', 'Miney', 'Moe']}
              />
            </FormField>
          </ThemeContext.Extend>
        </Form>
      </Box>
      <Box pad={{ horizontal: 'medium' }}>
        <Form>
          <Heading level={2} size="xsmall">
            Content Margin Added
          </Heading>
          <ThemeContext.Extend
            value={{
              formField: {
                content: { margin: { top: 'medium', bottom: 'small' } },
                ...adjustedLabelMargins,
              },
            }}
          >
            <FormField
              htmlFor="example12-id"
              name="example12"
              label="Field Label"
              help="Some helpful descriptive text"
              error="Message to show on error"
              info="Additional contextual information"
            >
              <TextInput
                id="example12-id"
                name="example12"
                placeholder="Placeholder input prompt"
              />
            </FormField>
            <FormField
              htmlFor="example22-id"
              name="example22"
              label="Field Label for Grouped Input"
              help="Choose your favorite"
            >
              <RadioButtonGroup
                id="example22-id"
                name="example22"
                options={['Eenie', 'Meenie', 'Miney', 'Moe']}
              />
            </FormField>
          </ThemeContext.Extend>
        </Form>
      </Box>
      <Box pad={{ horizontal: 'medium' }}>
        <Form>
          <Heading level={2} size="xsmall">
            Content Pad Increased
          </Heading>
          <ThemeContext.Extend
            value={{
              formField: {
                content: { pad: 'medium' },
                ...adjustedLabelMargins,
              },
            }}
          >
            <FormField
              htmlFor="example13-id"
              name="example13"
              label="Field Label"
              help="Some helpful descriptive text"
              error="Message to show on error"
              info="Additional contextual information"
              pad
            >
              <TextInput
                id="example13-id"
                name="example13"
                placeholder="Placeholder input prompt"
              />
            </FormField>
            <FormField
              htmlFor="example23-id"
              name="example23"
              label="Field Label for Grouped Input"
              help="Choose your favorite"
            >
              <RadioButtonGroup
                id="example23-id"
                name="example23"
                options={['Eenie', 'Meenie', 'Miney', 'Moe']}
              />
            </FormField>
          </ThemeContext.Extend>
        </Form>
      </Box>
    </Grid>
  </Grommet>
);

FieldSpacingOptions.storyName = 'Field spacing options';

export default {
  title: 'Input/Form/Custom Themed/Field spacing options',
};
