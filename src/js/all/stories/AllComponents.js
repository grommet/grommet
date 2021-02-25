import React, { useMemo, useState } from 'react';
import { storiesOf } from '@storybook/react';

import {
  Accordion,
  AccordionPanel,
  Anchor,
  Box,
  Button,
  Calendar,
  CheckBox,
  Clock,
  DataTable,
  FormField,
  Grid,
  Heading,
  Menu,
  Paragraph,
  RadioButtonGroup,
  RangeInput,
  RangeSelector,
  Select,
  Stack,
  Tab,
  Tabs,
  Text,
  TextArea,
  TextInput,
  MnetUIBase,
} from 'mnet-ui-base';
import { mnet, dark } from 'mnet-ui-base/themes';
import { generate } from 'mnet-ui-base/themes/base';
import { deepMerge } from 'mnet-ui-base/utils';
// import { neo } from 'mnet-ui-base-theme-neo';
// import { hb } from 'mnet-ui-base-theme-hb';
// import { cdp } from 'mnet-ui-base-theme-cdp';

const themes = {
  // hb,
  // neo,
  // cdp,
  dark,
};

const Components = () => {
  const [baseSize, setBaseSize] = useState(16);
  const [checkBox, setCheckBox] = useState(true);
  const [radioButton, setRadioButton] = useState('RadioButton 1');
  const [rangeSelector, setRangeSelector] = useState([1, 2]);
  const [themeMode, setThemeMode] = useState();
  const [themeName, setThemeName] = useState('mnet');
  const [background, setBackground] = useState(undefined);
  const [tabIndex, setTabIndex] = useState(0);

  const theme = useMemo(
    () => deepMerge(generate(baseSize), themes[themeName]),
    [baseSize, themeName],
  );

  const themeCanMode = useMemo(
    () =>
      theme &&
      theme.global.colors.background &&
      theme.global.colors.background.dark,
    [theme],
  );

  const content = [
    <Box key="type" align="start" gap="small">
      <Heading margin={{ top: 'none' }}>Heading</Heading>
      <Paragraph>Paragraph</Paragraph>
      <Text>Text</Text>
      <Anchor href="">Anchor</Anchor>
      <Menu
        label="Menu"
        items={[{ label: 'One', onClick: () => {} }, { label: 'Two' }]}
      />
      <Button label="Button" onClick={() => {}} />
      <Button plain onClick={() => {}}>
        <Text>plain button</Text>
      </Button>
    </Box>,
    <Box key="input" gap="small">
      <Select
        placeholder="Select"
        options={['One', 'Two']}
        onChange={() => {}}
      />
      <CheckBox
        name="check"
        checked={checkBox}
        label="CheckBox"
        onChange={event => setCheckBox(event.target.checked)}
      />
      <CheckBox
        name="toggle"
        toggle
        checked={checkBox}
        label="CheckBox toggle"
        onChange={event => setCheckBox(event.target.checked)}
      />
      <RadioButtonGroup
        name="radio"
        options={['RadioButton 1', 'RadioButton 2']}
        value={radioButton}
        onChange={event => setRadioButton(event.target.value)}
      />
      <TextInput placeholder="TextInput" />
      <TextArea placeholder="TextArea" />
      <RangeInput value={24} onChange={() => {}} />
      <Stack>
        <Box direction="row" justify="between">
          {[0, 1, 2, 3].map(value => (
            <Box key={value} pad="small">
              <Text style={{ fontFamily: 'monospace' }}>{value}</Text>
            </Box>
          ))}
        </Box>
        <RangeSelector
          direction="horizontal"
          invert={false}
          min={0}
          max={3}
          size="style={{ width: '100vw', height: '100vh', overflow: 'auto' }}"
          round="small"
          values={rangeSelector}
          onChange={values => setRangeSelector(values)}
        />
      </Stack>
      <FormField label="FormField">
        <TextInput placeholder="TextInput" />
      </FormField>
    </Box>,
    <Box key="time" gap="medium">
      <Calendar size="small" />
      <Clock type="digital" className="chromatic-ignore" />
      <Clock className="chromatic-ignore" />
    </Box>,
    <Box key="dataTable" alignSelf="start">
      <DataTable
        columns={[
          { property: 'name', header: 'Name' },
          { property: 'color', header: 'Color' },
        ]}
        data={[
          { name: 'Alan', color: 'blue' },
          { name: 'Chris', color: 'purple' },
          { name: 'Eric', color: 'orange' },
        ]}
        sortable
      />
    </Box>,
    <Box key="accordion">
      <Accordion>
        <AccordionPanel label="Accordion Panel 1">
          <Box pad="small">
            <Text>Accordion panel 1 content</Text>
          </Box>
        </AccordionPanel>
        <AccordionPanel label="Accordion Panel 2">
          <Box pad="small">
            <Text>Accordion panel 2 content</Text>
          </Box>
        </AccordionPanel>
      </Accordion>
    </Box>,
    <Box key="tabs">
      <Tabs activeIndex={tabIndex} onActive={index => setTabIndex(index)}>
        <Tab title="Tab 1">
          <Box pad="small">
            <Text>Tab 1 content</Text>
          </Box>
        </Tab>
        <Tab title="Tab 2">
          <Box pad="small">
            <Text>Tab 2 content</Text>
          </Box>
        </Tab>
      </Tabs>
    </Box>,
  ];

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MnetUIBase theme={mnet} style={{ flex: '0 0 auto' }}>
        <Box
          direction="row-responsive"
          gap="medium"
          justify="end"
          align="center"
          margin="small"
        >
          <Box basis="small">
            <Select
              plain
              size="small"
              options={Object.keys(themes).map(val => val.toUpperCase())}
              value={themeName}
              onChange={event => setThemeName(event.option.toLowerCase())}
            />
          </Box>
          {themeCanMode && (
            <CheckBox
              label="dark"
              checked={themeMode === 'dark'}
              onChange={() =>
                setThemeMode(themeMode === 'dark' ? 'light' : 'dark')
              }
            />
          )}
          {!themeCanMode && (
            <Box basis="small">
              <Select
                plain
                placeholder="background"
                size="small"
                options={['default', 'dark-1', 'light-1']}
                value={background}
                onChange={event => setBackground(event.option)}
              />
            </Box>
          )}
          <Box basis="small">
            <RangeInput
              min={16}
              max={36}
              step={2}
              value={baseSize}
              onChange={event => setBaseSize(parseInt(event.target.value, 10))}
            />
          </Box>
          <Text size="small">{`${baseSize}px base spacing`}</Text>
        </Box>
      </MnetUIBase>
      <MnetUIBase theme={theme} themeMode={themeMode} style={{ flex: '1 1' }}>
        <Box
          fill
          pad="medium"
          background={background || theme.global.colors.background}
          overflow="auto"
        >
          {Grid.available ? (
            <Grid columns="small" gap="medium">
              {content}
            </Grid>
          ) : (
            <Box direction="row" wrap align="start" gap="large">
              {content}
            </Box>
          )}
        </Box>
      </MnetUIBase>
    </div>
  );
};

storiesOf('All', module).add('All', () => <Components />);
