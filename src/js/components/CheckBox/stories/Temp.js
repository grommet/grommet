import React, { useState } from 'react';
import { Gremlin, Hpe, Sun, Moon } from 'grommet-icons';

import {
  Box,
  Button,
  CheckBox,
  CheckBoxGroup,
  FormField,
  DataTable,
  Grommet,
  Heading,
  Text,
  ThemeContext,
} from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { hpe } from 'grommet-theme-hpe';

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { columns, DATA } from '../../DataTable/stories/data';

const controlledColumns = columns.map(col => ({ ...col }));
delete controlledColumns[0].footer;
delete controlledColumns[3].footer;
delete controlledColumns[4].footer;
delete controlledColumns[4].aggregate;

const myHpeTheme = deepMerge(hpe, {
  checkBox: {
    check: {
      // hpe theme has an 'extend: `box-shadow: none`', this is to apply
      // the extend currently in the theme, but overrid `the box-shadow: none`
      // behavior. When implemented, the box-shadow: none will be
      // removed from the hpe theme.
      extend: ({ theme, checked, indeterminate }) => `
      box-shadow: undefined;
      background-color: ${
        checked || indeterminate
          ? theme.global.colors.green[theme.dark ? 'dark' : 'light']
          : theme.global.colors.background[theme.dark ? 'dark' : 'light']
      };
      ${(checked || indeterminate) && 'border: none;'}
        `,
    },
  },
});

export const Temp = () => {
  const [currentTheme, setCurrentTheme] = useState(grommet);
  const [themeMode, setThemeMode] = useState('light');
  const [title, setTitle] = useState('Grommet theme');
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked, setChecked] = useState([]);

  const onCheck = (event, value) => {
    if (event.target.checked) {
      setChecked([...checked, value]);
    } else {
      setChecked(checked.filter(item => item !== value));
    }
  };

  const onCheckAll = event =>
    setChecked(event.target.checked ? DATA.map(datum => datum.name) : []);

  return (
    <Grommet theme={grommet} themeMode={themeMode}>
      <ThemeControls
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        setTitle={setTitle}
      />
      <ThemeContext.Extend value={currentTheme}>
        <Box
          background="background"
          pad={{ vertical: 'medium', horizontal: 'large' }}
          gap="medium"
        >
          <Heading size="small">Checkboxes in {title}</Heading>
          <Box direction="row" gap="xlarge">
            <Box gap="medium" width="small">
              <Text weight="bold">Checkboxes</Text>
              <CheckBox
                checked={checked1}
                onChange={event => setChecked1(event.target.checked)}
                label="I agree"
              />
              <CheckBox
                checked={checked1}
                onChange={event => setChecked1(event.target.checked)}
                label="I agree"
                toggle
              />
              <CheckBoxGroup
                options={[
                  { value: 'Maui', label: 'Maui' },
                  { value: 'Kauai', label: 'Kauai', disabled: true },
                  { value: 'Ohau', label: 'Oahu' },
                  { value: 'Big Island', label: 'Big Island' },
                ]}
              />
            </Box>
            <Box gap="medium">
              <Text weight="bold">Checkboxes within FormField</Text>
              <FormField>
                <CheckBox
                  checked={checked2}
                  onChange={event => setChecked2(event.target.checked)}
                  label="I understand and approve"
                />
              </FormField>
              <FormField>
                <CheckBox
                  checked={checked2}
                  onChange={event => setChecked2(event.target.checked)}
                  label="I understand and approve"
                  toggle
                />
              </FormField>
              <FormField>
                <CheckBoxGroup
                  options={[
                    { value: 'Maui', label: 'Maui' },
                    { value: 'Kauai', label: 'Kauai', disabled: true },
                    { value: 'Ohau', label: 'Oahu' },
                    { value: 'Big Island', label: 'Big Island' },
                  ]}
                />
              </FormField>
            </Box>
          </Box>
          <Text weight="bold">Checkboxes within a DataTable</Text>
          <DataTable
            columns={[
              {
                property: 'checkbox',
                render: ({ name }) => (
                  <CheckBox
                    key={name}
                    checked={checked.indexOf(name) !== -1}
                    onChange={e => onCheck(e, name)}
                  />
                ),
                header: (
                  <CheckBox
                    checked={checked.length === DATA.length}
                    indeterminate={
                      checked.length > 0 && checked.length < DATA.length
                    }
                    onChange={onCheckAll}
                  />
                ),
                sortable: false,
              },
              ...controlledColumns,
            ].map(col => ({ ...col }))}
            data={DATA}
            sortable
            size="medium"
          />
        </Box>
      </ThemeContext.Extend>
    </Grommet>
  );
};

const ThemeControls = ({
  currentTheme,
  setCurrentTheme,
  themeMode,
  setThemeMode,
  setTitle,
}) => (
  <Box
    direction="row"
    gap="small"
    pad={{ horizontal: 'large', vertical: 'small' }}
    background="background-contrast"
  >
    <Button
      a11yTitle="Apply Grommet Theme"
      icon={<Gremlin />}
      onClick={() => {
        setCurrentTheme(grommet);
        setTitle('Grommet theme');
      }}
      plain={false}
      primary={currentTheme === grommet}
      tip="Apply Grommet theme"
    />
    <Button
      a11yTitle="Apply HPE Theme"
      icon={
        <Hpe
          color={
            hpe.global.colors[
              `${currentTheme === myHpeTheme ? 'white' : 'green!'}`
            ]
          }
          size="small"
        />
      }
      onClick={() => {
        setCurrentTheme(myHpeTheme);
        setTitle('HPE theme');
      }}
      plain={false}
      primary={currentTheme === myHpeTheme}
      tip="Apply HPE theme"
    />
    <Button
      a11yTitle="Apply HPE Theme"
      icon={themeMode === 'dark' ? <Sun /> : <Moon />}
      onClick={() => {
        setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
      }}
      tip={themeMode === 'dark' ? 'Light mode' : 'Dark mode'}
    />
  </Box>
);

export default {
  title: 'Input/CheckBox/Temp',
};
