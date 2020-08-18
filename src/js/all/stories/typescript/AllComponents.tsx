import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';

import {
  Grommet,
  Accordion,
  AccordionPanel,
  Anchor,
  Box,
  Button,
  Calendar,
  Chart,
  CheckBox,
  Clock,
  DataTable,
  Distribution,
  FormField,
  Grid,
  Heading,
  MaskedInput,
  Menu,
  Meter,
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
  Video,
} from 'grommet';
import { dark, generate, grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { hpe } from 'grommet-theme-hpe';
import { aruba } from 'grommet-theme-aruba';
import { hp } from 'grommet-theme-hp';
import { dxc } from 'grommet-theme-dxc';
import { v1 } from 'grommet-theme-v1';

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
  grommet,
  hpe,
  aruba,
  hp,
  dxc,
  v1,
};

const daysInMonth = (month: number) => new Date(2019, month, 0).getDate();

const Components = () => {
  const [baseSize, setBaseSize] = useState(24);
  const [checkBox, setCheckBox] = useState(true);
  const [radioButton, setRadioButton] = useState('RadioButton 1');
  const [rangeSelector, setRangeSelector] = useState([1, 2]);
  const [themeName] = useState('grommet');
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
        onChange={event => setRangeInputValue(parseInt(event.target.value, 10))}
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
          size="full"
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
    <Box key="measure" gap="medium">
      <Chart
        type="bar"
        round
        size="small"
        values={[{ value: [10, 20] }, { value: [20, 30] }, { value: [30, 15] }]}
      />
      <Meter
        type="bar"
        round
        size="small"
        background="light-3"
        values={[{ value: 30 }]}
      />
    </Box>,
    <Box key="visualize" gap="small">
      <Distribution
        basis="small"
        values={[
          { value: 50, color: 'light-3' },
          { value: 30, color: 'accent-1' },
          { value: 20, color: 'light-4' },
          { value: 10, color: 'light-3' },
          { value: 5, color: 'light-4' },
        ]}
      >
        {value => (
          <Box pad="xsmall" background={value.color} fill>
            <Text size="large">{value.value}</Text>
          </Box>
        )}
      </Distribution>
      <Stack>
        <Box>
          <Box direction="row">
            {[1, 2].map(id => (
              <Node key={id} id={id} />
            ))}
          </Box>
          <Box direction="row">
            {[3, 4].map(id => (
              <Node key={id} id={id} />
            ))}
          </Box>
        </Box>
        {/* <Diagram connections={[connection('1', '4')]} /> */}
      </Stack>
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
    <Box key="video" alignSelf="start">
      <Video>
        <source src="small.mp4" type="video/mp4" />
        <source
          src="http://techslides.com/demos/sample-videos/small.webm"
          type="video/webm"
        />
        <source
          src="http://techslides.com/demos/sample-videos/small.ogv"
          type="video/ogg"
        />
        <source
          src="http://techslides.com/demos/sample-videos/small.3gp"
          type="video/3gp"
        />
      </Video>
    </Box>,
  ];

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Grommet theme={grommet} style={{ flex: '0 0 auto' }}>
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
              options={['grommet', 'dark', 'hpe', 'aruba', 'hp', 'dxc', 'v1']}
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
      </Grommet>
      <Grommet theme={theme} style={{ flex: '1 1' }}>
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
      </Grommet>
    </div>
  );
};

if (!isChromatic()) {
  storiesOf('TypeScript/All', module).add('All', () => <Components />);
}
