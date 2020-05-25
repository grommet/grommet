import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import {
  MnetUIBase,
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
  MaskedInput,
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
} from 'mnet-ui-base';
import { dark, generate, mnet } from 'mnet-ui-base/themes';
import { deepMerge } from 'mnet-ui-base/utils';

const Node = ({ id, ...rest }) => (
  <Box
    id={id}
    basis="xxsmall"
    margin="small"
    pad="medium"
    round="small"
    background="light-4"
    {...rest}
  />
);

const themes = {
  dark,
  mnet,
};

const daysInMonth = (month: number) => new Date(2019, month, 0).getDate();

const Components = () => {
  const [baseSize, setBaseSize] = useState(24);
  const [checkBox, setCheckBox] = useState(true);
  const [radioButton, setRadioButton] = useState('RadioButton 1');
  const [rangeSelector, setRangeSelector] = useState([1, 2]);
  const [themeName] = useState('mnet');
  const [background] = useState(undefined);
  const [tabIndex, setTabIndex] = useState(0);
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [rangeInputValue, setRangeInputValue] = useState(24);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [textInputValue, setTextInputValue] = useState('');

  const theme = deepMerge(generate(baseSize), themes[themeName]);

  const content = [
    <Box key="type" align="start">
      <Heading margin={{ top: 'none' }}>Heading</Heading>
      <Paragraph>Paragraph</Paragraph>
      <Text>Text</Text>
      <Anchor href="">Anchor</Anchor>
      <Menu
        label="Menu"
        items={[{ label: 'One', onClick: () => {} }, { label: 'Two' }]}
      />
      <Button label="Button" onClick={() => {}} />
    </Box>,
    <Box key="input" gap="small">
      <Select
        placeholder="Select"
        options={['One', 'Two']}
        value={value}
        onChange={event => setValue(event.option)}
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
      <TextInput
        placeholder="TextInput"
        value={textInputValue}
        onChange={event => setTextInputValue(event.target.value)}
      />
      <TextArea
        placeholder="TextArea"
        value={textAreaValue}
        onChange={event => setTextAreaValue(event.target.value)}
      />
      <MaskedInput
        mask={[
          {
            length: [1, 2],
            options: Array.from({ length: 12 }, (v, k) => k + 1),
            regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
            placeholder: 'mm',
          },
          { fixed: '/' },
          {
            length: [1, 2],
            options: Array.from(
              {
                length: daysInMonth(parseInt(date.split('/')[0], 10)),
              },
              (v, k) => k + 1,
            ),
            regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
            placeholder: 'dd',
          },
          { fixed: '/' },
          {
            length: 4,
            options: Array.from({ length: 100 }, (v, k) => 2019 - k),
            regexp: /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
            placeholder: 'yyyy',
          },
        ]}
        value={date}
        onChange={event => setDate(event.target.value)}
      />
      <RangeInput
        value={rangeInputValue}
        onChange={event => setRangeInputValue(event.target.value)}
      />
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
      <div style={{ flex: '0 0 auto' }}>
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
              options={['mnet', 'dark', 'hpe', 'aruba', 'hp', 'dxc', 'v1']}
              value={themeName}
              // onChange={event => setThemeName(event.option)}
            />
          </Box>
          <Box basis="small">
            <Select
              plain
              placeholder="background"
              size="small"
              options={['default', 'dark-1', 'light-1']}
              value={background}
              // onChange={event => setBackground(event.option)}
            />
          </Box>
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
      </div>
      <div style={{ flex: '1 1' }}>
        <Box
          fill
          pad="medium"
          background={background || theme.global.colors.background}
          overflow="auto"
        >
          {/* {Grid.available ? ( */}
          {Grid ? (
            <Grid columns="small" gap="medium">
              {content}
            </Grid>
          ) : (
            <Box direction="row" wrap align="start" gap="large">
              {content}
            </Box>
          )}
        </Box>
      </div>
    </div>
  );
};

if (!isChromatic()) {
  storiesOf('TypeScript/All', module).add('All', () => <Components />);
}
