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
            htmlFor="textinput1-id"
            name="example1"
            label="Field Label"
            help="Some helpful descriptive text"
            error="Message to show on error"
            info="Additional contextual information"
          >
            <TextInput
              id="textinput1-id"
              name="example1"
              placeholder="Placeholder input prompt"
            />
          </FormField>
          <FormField
            htmlFor="radiobutton2-id"
            name="example2"
            label="Field Label for Grouped Input"
            help="Choose your favorite"
          >
            <RadioButtonGroup
              id="radiobutton2-id"
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
              htmlFor="textinput3-id"
              name="example3"
              label="Field Label"
              help="Some helpful descriptive text"
              error="Message to show on error"
              info="Additional contextual information"
            >
              <TextInput
                id="textinput3-id"
                name="example3"
                placeholder="Placeholder input prompt"
              />
            </FormField>
            <FormField
              htmlFor="radiobutton4-id"
              name="example4"
              label="Field Label for Grouped Input"
              help="Choose your favorite"
            >
              <RadioButtonGroup
                id="radiobutton4-id"
                name="example4"
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
              htmlFor="textinput5-id"
              name="example5"
              label="Field Label"
              help="Some helpful descriptive text"
              error="Message to show on error"
              info="Additional contextual information"
            >
              <TextInput
                id="textinput5-id"
                name="example5"
                placeholder="Placeholder input prompt"
              />
            </FormField>
            <FormField
              htmlFor="radiobutton6-id"
              name="example6"
              label="Field Label for Grouped Input"
              help="Choose your favorite"
            >
              <RadioButtonGroup
                id="radiobutton6-id"
                name="example6"
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
              htmlFor="textinput7-id"
              name="example7"
              label="Field Label"
              help="Some helpful descriptive text"
              error="Message to show on error"
              info="Additional contextual information"
            >
              <TextInput
                id="textinput7-id"
                name="example7"
                placeholder="Placeholder input prompt"
              />
            </FormField>
            <FormField
              htmlFor="radiobutton8-id"
              name="example8"
              label="Field Label for Grouped Input"
              help="Choose your favorite"
            >
              <RadioButtonGroup
                id="radiobutton8-id"
                name="example8"
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
              htmlFor="textinput9-id"
              name="example9"
              label="Field Label"
              help="Some helpful descriptive text"
              error="Message to show on error"
              info="Additional contextual information"
              pad
            >
              <TextInput
                id="textinput9-id"
                name="example9"
                placeholder="Placeholder input prompt"
              />
            </FormField>
            <FormField
              htmlFor="radiobutton10-id"
              name="example10"
              label="Field Label for Grouped Input"
              help="Choose your favorite"
            >
              <RadioButtonGroup
                id="radiobutton10-id"
                name="example10"
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
