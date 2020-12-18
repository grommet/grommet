import React, { useState } from 'react';

import {
  Box,
  Grommet,
  Select,
  grommet,
  FormField,
  ThemeContext,
} from 'grommet';

const options = ['one', 'two', 'three'];

const ClearTop = () => {
  const [value, setValue] = useState();
  return (
    <Box fill align="center" justify="start" pad="large">
      <Select
        placeholder="Clear on top"
        multiple
        value={value}
        options={options}
        onChange={({ value: nextValue }) => setValue(nextValue)}
        clear
      />
    </Box>
  );
};

const ClearBottom = () => {
  const [value, setValue] = useState();
  return (
    <Box fill align="center" justify="start" pad="large">
      <Select
        placeholder="Clear on bottom"
        multiple
        value={value}
        options={options}
        onChange={({ value: nextValue }) => setValue(nextValue)}
        clear={{ position: 'bottom' }}
      />
    </Box>
  );
};

const ClearLabel = () => {
  const [value, setValue] = useState();
  return (
    <Box fill align="center" justify="start" pad="large">
      <Select
        placeholder="Clear with label"
        multiple
        value={value}
        options={options}
        onChange={({ value: nextValue }) => setValue(nextValue)}
        clear={{ label: 'Click me!' }}
      />
    </Box>
  );
};

const ClearCustomTheme = () => {
  const [value, setValue] = useState();
  return (
    <ThemeContext.Extend
      value={{
        select: {
          clear: {
            container: {
              background: 'accent-4',
            },
            text: {
              color: 'neutral-3',
              weight: 900,
            },
          },
        },
      }}
    >
      <Box fill align="center" justify="start" pad="large">
        <Select
          placeholder="Clear with a custom theme"
          multiple
          value={value}
          options={options}
          onChange={({ value: nextValue }) => setValue(nextValue)}
          clear
        />
      </Box>
    </ThemeContext.Extend>
  );
};

const ClearForm = () => {
  const [value, setValue] = useState();
  return (
    <Box fill align="center" justify="start" pad="large">
      <FormField label="Numbers" name="numbers">
        <Select
          name="numbers"
          placeholder="Clear within formfield"
          multiple
          options={options}
          value={value}
          clear
          onChange={({ value: nextValue }) => setValue(nextValue)}
        />
      </FormField>
    </Box>
  );
};

export const Clear = () => (
  <Grommet theme={grommet}>
    <Box direction="column" align="start">
      <Box direction="row">
        <ClearTop />
        <ClearBottom />
        <ClearLabel />
      </Box>
      <Box direction="row">
        <ClearForm />
        <ClearCustomTheme />
      </Box>
    </Box>
  </Grommet>
);

Clear.storyName = 'Clear';

Clear.parameters = {
  chromatic: { disable: true },
};
