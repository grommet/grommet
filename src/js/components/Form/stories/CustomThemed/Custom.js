import React from 'react';

import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Grommet,
  MaskedInput,
  RadioButtonGroup,
  RangeInput,
  Select,
  TextArea,
  TextInput,
} from 'grommet';
import { grommet } from 'grommet/themes';
import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

const customTheme = deepMerge(hpe, {
  checkBox: {
    hover: {
      border: {
        color: undefined,
      },
      background: {
        color: 'background-contrast',
      },
    },
    color: 'background',
    border: {
      color: 'border',
      width: '1px',
    },
    check: {
      radius: '2px',
      extend: ({ theme, checked, indeterminate }) => `
      background-color: ${
        checked || indeterminate
          ? theme.global.colors.green[theme.dark ? 'dark' : 'light']
          : theme.global.colors.background[theme.dark ? 'dark' : 'light']
      };
      ${(checked || indeterminate) && 'border: none;'}
        `,
    },
    icon: {
      extend: ({ theme }) => `stroke-width: 2px;
      stroke: ${
        theme.global.colors['text-strong'][theme.dark ? 'dark' : 'light']
      }`,
    },
    gap: 'small',
    label: {
      align: 'start',
    },
    extend: ({ disabled, theme }) => `
    ${
      !disabled &&
      `:hover {
      background-color: ${
        theme.global.colors['background-contrast'][
          theme.dark ? 'dark' : 'light'
        ]
      };
    }`
    }
    font-weight: 500;
    width: auto;
  };
  `,
  },
  formField: {
    checkBox: {
      pad: {
        vertical: 'xsmall',
        horizontal: 'small',
      },
    },
    content: {
      margin: { vertical: 'xsmall' },
      pad: undefined,
    },
    border: {
      error: {
        color: 'border-strong',
      },
      color: 'border',
      side: 'all',
    },
    disabled: {
      background: {
        color: undefined,
      },
      border: {
        color: 'border-weak',
      },
      label: {
        color: 'text-xweak',
      },
    },
    focus: {
      border: {
        color: 'border-strong',
      },
    },
    help: {
      size: 'xsmall',
      color: 'text',
      margin: 'none',
    },
    info: {
      size: 'xsmall',
      color: 'text',
      margin: {
        bottom: 'xsmall',
        top: 'none',
        horizontal: 'none',
      },
    },
    label: {
      size: 'xsmall',
      color: 'text',
      margin: {
        bottom: 'none',
        top: 'xsmall',
        horizontal: 'none',
      },
      requiredIndicator: true,
      weight: 500,
    },
    margin: {
      bottom: 'none',
    },
    round: '4px',
  },
});

export const Custom = () => (
  <Grommet full theme={deepMerge(grommet, customTheme)}>
    <Box fill align="center" justify="center">
      <Box width="medium">
        <Form
          onReset={(event) => console.log(event)}
          onSubmit={({ value }) => console.log('Submit', value)}
        >
          <FormField label="Name" name="name" required>
            <TextInput name="name" />
          </FormField>
          <FormField label="Email" name="email" required>
            <MaskedInput
              name="email"
              mask={[
                { regexp: /^[\w\-_.]+$/, placeholder: 'example' },
                { fixed: '@' },
                { regexp: /^[\w]+$/, placeholder: 'my' },
                { fixed: '.' },
                { regexp: /^[\w]+$/, placeholder: 'com' },
              ]}
            />
          </FormField>
          <FormField name="subscribe">
            <CheckBox name="subscribe" label="Subscribe?" />
          </FormField>
          <FormField name="ampm">
            <RadioButtonGroup name="ampm" options={['morning', 'evening']} />
          </FormField>
          <FormField label="Size" name="size">
            <Select name="size" options={['small', 'medium', 'large']} />
          </FormField>
          <Select name="size" options={['small', 'medium', 'large']} />
          <FormField label="Comments" name="comments" disabled>
            <TextArea name="comments" disabled />
          </FormField>
          <FormField label="Age" name="age">
            <RangeInput name="age" min={15} max={75} />
          </FormField>
          <FormField name="haveAlias">
            <CheckBox name="haveAlias" label="alias?" />
          </FormField>
          <CheckBox name="haveAlias" label="alias?" />
          <Box direction="row" justify="between" margin={{ top: 'medium' }}>
            <Button label="Cancel" />
            <Button type="reset" label="Reset" />
            <Button type="submit" label="Update" primary />
          </Box>
        </Form>
      </Box>
    </Box>
  </Grommet>
);

export default {
  title: 'Input/Form/Custom Themed/Custom',
};
