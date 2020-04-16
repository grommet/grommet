import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, CheckBox, FormField, Form, Button } from 'grommet';
import { grommet } from 'grommet/themes';
import { normalizeColor, deepMerge } from 'grommet/utils';

import { FormCheckmark } from 'grommet-icons';

const customCheckBoxTheme = {
  formField: {
    border: {
      error: {
        color: 'text-xweak',
      },
    },
    error: {
      background: {
        color: { light: '#FF40404D', dark: '#FF404066' },
      },
    },
  },
  checkBox: {
    box: {
      extend: () => `
        background-color: white;
        border-radius: 4px;
      `,
    },
    border: {
      color: {
        light: 'accent-2',
      },
      // width: 'xsmall',
      radius: '2px',
    },
    check: {
      extend: ({ theme, checked }) => `
        ${checked && `background-color: ${normalizeColor('neutral-1', theme)};`}
        `,
    },
    color: 'neutral-3',
    gap: 'xsmall',
    hover: {
      border: {
        color: undefined,
      },
    },
    icon: {
      size: '18px',
      extend: 'stroke: white;',
    },
    icons: {
      checked: FormCheckmark,
    },
    size: '18px',
    extend: `
    color: #9C9C9C;
  `,
  },
};

const ThemedCheckBox = props => {
  const [checked, setChecked] = useState(false);

  return (
    <Grommet theme={deepMerge(grommet, customCheckBoxTheme)}>
      <Box align="center" pad="large">
        <FormField label="label" required>
          <CheckBox
            {...props}
            label="Choice"
            checked={checked}
            onChange={event => setChecked(event.target.checked)}
          />
        </FormField>
      </Box>
      <Box gap="medium">
        <Form>
          <FormField required label="Validation">
            <CheckBox
              {...props}
              label="Choice"
              checked={checked}
              onChange={event => setChecked(event.target.checked)}
            />
          </FormField>
          <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
            <Button label="Sign up" primary type="submit" />
          </Box>
        </Form>
      </Box>
    </Grommet>
  );
};

storiesOf('CheckBox', module).add('Custom', () => <ThemedCheckBox />);
