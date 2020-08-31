import React from 'react';
import { css } from 'styled-components';
import { storiesOf } from '@storybook/react';

import {
  grommet,
  Box,
  Form,
  FormField,
  Grommet,
  Heading,
  Text,
  TextInput,
} from 'grommet';
import { Alert, StatusInfo } from 'grommet-icons';
import { deepMerge } from '../../../utils';

const customTheme = deepMerge(grommet, {
  formField: {
    border: {
      side: 'all',
    },
    content: {
      pad: 'large',
      margin: 'medium',
    },
    error: {
      container: {
        background: 'black',
        pad: { horizontal: 'small' },
        extend: css`
          svg {
            margin-top: 10px;
          }
        `,
      },
      color: 'white',
      icon: <Alert size="small" />,
      size: 'xsmall',
    },
    help: {
      size: 'xsmall',
    },
    info: {
      size: 'xsmall',
      icon: <StatusInfo size="small" />,
      container: {
        align: 'center',
        background: 'dark-1',
        pad: { horizontal: 'small' },
        margin: { top: 'small' },
      },
    },
    label: {
      size: 'small',
    },
    round: '4px',
  },
  global: { font: { size: 'small' } },
});

const Themed = () => {
  return (
    <Grommet theme={customTheme}>
      <Box gap="medium">
        <Box border pad={{ horizontal: 'medium' }} width="medium">
          <Form>
            <Heading level={2} size="xsmall">
              Styling FormField content container with ContentProps
            </Heading>
            <Text>
              ContentProps will override any settings applied in your theme.
            </Text>
            <FormField
              htmlFor="example1-id"
              name="example1"
              label="Field Label"
              help="Some helpful descriptive text"
              error={`Message to show on error. This is a long message to 
              demonstrate custom svg alignment.`}
              info="Additional contextual information"
              contentProps={{
                background: 'lightblue',
                border: { color: 'blue', size: 'small' },
                pad: 'medium',
                overflow: 'auto',
              }}
            >
              <TextInput
                id="example1-id"
                name="example1"
                placeholder="Placeholder input prompt"
              />
            </FormField>
          </Form>
        </Box>
        <Box border pad={{ horizontal: 'medium' }} width="medium">
          <Form>
            <Heading level={2} size="xsmall">
              ContentProps + Disabled State
            </Heading>
            <FormField
              htmlFor="example2-id"
              name="example2"
              label="Field Label"
              help="Some helpful descriptive text"
              contentProps={{
                background: 'lightblue',
                border: { color: 'blue', size: 'small' },
                pad: 'medium',
                overflow: 'auto',
              }}
            >
              <TextInput
                id="example1-id"
                name="example1"
                placeholder="Placeholder input prompt"
                disabled
              />
            </FormField>
          </Form>
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('Form', module).add('Themed', () => <Themed />);
