import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import {
  grommet,
  Box,
  CheckBoxGroup,
  Form,
  FormField,
  Select,
  Grid,
  Grommet,
  RadioButtonGroup,
  RangeInput,
  Text,
  TextArea,
  TextInput,
  ThemeContext,
} from 'grommet';
import { deepMerge } from 'grommet/utils';

const allOptions = Array(3)
  .fill()
  .map((_, i) => `option ${i + 1}`);

const borderPositions = [
  {
    name: 'Default Grommet Theme',
    theme: grommet,
  },
  {
    name: 'Border Inner',
    theme: deepMerge(grommet, {
      formField: {
        border: { position: 'inner', side: 'all' },
      },
    }),
  },
  {
    name: 'Border Outer',
    theme: deepMerge(grommet, {
      formField: {
        border: { position: 'outer', side: 'all' },
      },
    }),
  },
  {
    name: 'Border None',
    theme: deepMerge(grommet, {
      formField: {
        border: { position: 'none' },
      },
    }),
  },
  {
    name: 'Border Undefined',
    theme: deepMerge(grommet, {
      formField: {
        border: undefined,
        content: { pad: 'large' },
      },
    }),
  },
];

const FormExample = ({ index, borderPosition, theme }) => {
  const [value, setValue] = useState('');

  return (
    <Box background="#F7F7F7" gap="medium" pad="medium">
      <Text weight="bold">{borderPosition}</Text>
      <ThemeContext.Extend value={theme}>
        <Form>
          <FormField
            htmlFor={`textinput-${index}`}
            name="textinput"
            label="Label"
          >
            <TextInput
              id={`textinput-${index}`}
              name="textinput"
              placeholder="placeholder text"
            />
          </FormField>
          <FormField htmlFor={`select-${index}`} name="select" label="Label">
            <Select
              id={`select-${index}`}
              name="select"
              placeholder="-- select --"
              options={allOptions}
              value={value}
              onChange={({ option }) => setValue(option)}
            />
          </FormField>
          <FormField htmlFor={`rbg-${index}`} name="rbg" label="Label">
            <RadioButtonGroup
              id={`rbg-${index}`}
              name="rbg"
              options={allOptions}
            />
          </FormField>
          <FormField htmlFor={`cbg-${index}`} name="cbg" label="Label">
            <CheckBoxGroup
              id={`cbg-${index}`}
              name="cbg"
              options={allOptions}
            />
          </FormField>
          <FormField
            htmlFor={`rangeInput-${index}`}
            name="rangeInput"
            label="Label"
          >
            <RangeInput id={`rangeInput-${index}`} name="rangeInput" />
          </FormField>
          <FormField
            htmlFor={`textArea-${index}`}
            name="textArea"
            label="Label"
          >
            <TextArea id={`textArea-${index}`} name="textArea" />
          </FormField>
        </Form>
      </ThemeContext.Extend>
    </Box>
  );
};

const FormFieldBorderPosition = () => (
  <Grommet theme={grommet}>
    <Box pad="large">
      <Grid columns={{ count: 'fit', size: ['auto', 'medium'] }} gap="medium">
        {borderPositions &&
          borderPositions.map((example, index) => {
            return (
              <FormExample
                borderPosition={example.name}
                theme={example.theme}
                index={index}
              />
            );
          })}
      </Grid>
    </Box>
  </Grommet>
);

storiesOf('Form', module).add('Field Border Positions', () => (
  <FormFieldBorderPosition />
));
