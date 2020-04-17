import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, CheckBox, Form, FormField, Button } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { normalizeColor, deepMerge } from 'grommet/utils';

const customCheckBoxTheme = {
  checkBox: {
    box: {
      extend: () => `
        background-color: white;
        border-radius: 4px;
      `,
    },
    border: {
      color: {
        light: 'border',
      },
      radius: '2px',
    },
    check: {
      extend: ({ theme, checked }) => `
        ${checked && `background-color: ${normalizeColor('brand', theme)};`}
        `,
    },
    color: 'brand',
    gap: 'medium',
    icon: {
      size: '18px',
      extend: 'stroke: white;',
    },
    size: '18px',
  },
};

const ValidateCheckBox = props => {
  const [checked, setChecked] = useState(false);

  return (
    <Grommet theme={deepMerge(hpe, customCheckBoxTheme)}>
      <Box background="light-2" align="center" pad="large">
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

storiesOf('CheckBox', module).add('Validation', () => <ValidateCheckBox />);
