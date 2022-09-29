import React, { useState } from 'react';

import {
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
  Diagram,
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
import { FormNext } from 'grommet-icons';

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

const connection = (fromTarget, toTarget, { color, ...rest } = {}) => ({
  fromTarget,
  toTarget,
  color: color || 'graph-0',
  thickness: 'xsmall',
  round: true,
  type: 'rectilinear',
  ...rest,
});

const Components = () => {
  const [checkBox, setCheckBox] = useState(true);
  const [textInput, setTextInput] = useState('');
  const [maskedInput, setMaskedInput] = useState('');
  const [radioButton, setRadioButton] = useState('RadioButton 1');
  const [rangeSelector, setRangeSelector] = useState([1, 2]);
  const [tabIndex, setTabIndex] = useState(0);

  const content = [
    <Box key="type" align="start" gap="small">
      <Heading margin={{ top: 'none' }}>Heading</Heading>
      <Paragraph>Paragraph</Paragraph>
      <Text>Text</Text>
      <Anchor href="">Anchor</Anchor>
      <Menu
        label="Menu"
        items={[
          {
            label: 'One',
            onClick: () => {},
            icon: <FormNext />,
            reverse: true,
          },
          { label: 'Two' },
          { label: 'Thirty Three and 1/3' },
        ]}
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
        onChange={(event) => setCheckBox(event.target.checked)}
      />
      <CheckBox
        name="toggle"
        toggle
        checked={checkBox}
        label="CheckBox toggle"
        onChange={(event) => setCheckBox(event.target.checked)}
      />
      <RadioButtonGroup
        name="radio"
        options={['RadioButton 1', 'RadioButton 2']}
        value={radioButton}
        onChange={(event) => setRadioButton(event.target.value)}
      />
      <TextInput
        placeholder="TextInput"
        suggestions={['a', 'b', 'c']}
        value={textInput}
        onChange={(event) => setTextInput(event.target.value)}
        onSelect={({ suggestion }) => setTextInput(suggestion)}
      />
      <MaskedInput
        mask={[
          {
            length: [1, 4],
            options: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024],
            regexp: /^\d{1,4}$/,
            placeholder: 'nnn',
          },
          { fixed: ' ' },
          {
            length: 2,
            options: ['MB', 'GB', 'TB'],
            regexp: /^[mgt]b$|^[MGT]B$|^[mMgGtT]$/,
            placeholder: 'gb',
          },
        ]}
        value={maskedInput}
        onChange={(event) => setMaskedInput(event.target.value)}
      />
      <TextArea placeholder="TextArea" />
      <RangeInput value={24} onChange={() => {}} />
      <Stack>
        <Box direction="row" justify="between">
          {[0, 1, 2, 3].map((value) => (
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
          onChange={(values) => setRangeSelector(values)}
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
          { value: 30, color: 'graph-0' },
          { value: 20, color: 'light-4' },
          { value: 10, color: 'light-3' },
          { value: 5, color: 'light-4' },
        ]}
      >
        {(value) => (
          <Box pad="xsmall" background={value.color} fill>
            <Text size="large">{value.value}</Text>
          </Box>
        )}
      </Distribution>
      <Stack>
        <Box>
          <Box direction="row">
            {[1, 2].map((id) => (
              <Node key={id} id={id} />
            ))}
          </Box>
          <Box direction="row">
            {[3, 4].map((id) => (
              <Node key={id} id={id} />
            ))}
          </Box>
        </Box>
        <Diagram connections={[connection('1', '4')]} />
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
      <Tabs activeIndex={tabIndex} onActive={(index) => setTabIndex(index)}>
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
    <Box fill pad="medium" overflow="auto">
      <Grid columns="small" gap="medium">
        {content}
      </Grid>
    </Box>
  );
};

export const All = () => <Components />;
export default {
  title: 'All',
};
