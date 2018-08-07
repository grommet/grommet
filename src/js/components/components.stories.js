import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Grommet from './Grommet/Grommet';
import Accordion from './Accordion/Accordion';
import AccordionPanel from './Accordion/AccordionPanel';
import Anchor from './Anchor/Anchor';
import Box from './Box/Box';
import Button from './Button/Button';
import Calendar from './Calendar/Calendar';
import Chart from './Chart/Chart';
import CheckBox from './CheckBox/CheckBox';
import Clock from './Clock/Clock';
import DataTable from './DataTable/DataTable';
import Diagram from './Diagram/Diagram';
import Distribution from './Distribution/Distribution';
import FormField from './FormField/FormField';
import Grid from './Grid/Grid';
import Heading from './Heading/Heading';
import Menu from './Menu/Menu';
import Meter from './Meter/Meter';
import Paragraph from './Paragraph/Paragraph';
import RadioButton from './RadioButton/RadioButton';
import RangeInput from './RangeInput/RangeInput';
import RangeSelector from './RangeSelector/RangeSelector';
import Select from './Select/Select';
import Stack from './Stack/Stack';
import Tab from './Tabs/Tab';
import Tabs from './Tabs/Tabs';
import Text from './Text/Text';
import TextArea from './TextArea/TextArea';
import TextInput from './TextInput/TextInput';
import Video from './Video/Video';
import { grommet } from '../themes';
import { generate } from '../themes/base';
import { deepMerge } from '../utils';

const Node = ({ id, ...rest }) => (
  <Box
    id={id}
    basis='xxsmall'
    margin='small'
    pad='medium'
    round='small'
    background='light-4'
    {...rest}
  />
);

const connection = (fromTarget, toTarget, { color, ...rest } = {}) => ({
  fromTarget,
  toTarget,
  color: (color || 'accent-1'),
  thickness: 'xsmall',
  round: true,
  type: 'rectilinear',
  ...rest,
});

class Components extends Component {
  state = { baseSize: 24, checkBox: true, radioButton: true, rangeSelector: [1, 2] }

  render() {
    const { baseSize, checkBox, radioButton, rangeSelector, tabIndex } = this.state;
    const theme = deepMerge(generate(baseSize), grommet);

    const content = [
      <Box key='type' align='start'>
        <Heading margin={{ top: 'none' }}>Heading</Heading>
        <Paragraph>Paragraph</Paragraph>
        <Text>Text</Text>
        <Anchor href=''>Anchor</Anchor>
        <Menu
          label='Menu'
          items={[{ label: 'One', onClick: () => {} }, { label: 'Two' }]}
        />
        <Button label='Button' onClick={() => {}} />
      </Box>,
      <Box key='input' gap='small'>
        <Select placeholder='Select' options={['One', 'Two']} onChange={() => {}} />
        <CheckBox
          checked={checkBox}
          label='CheckBox'
          onChange={event => this.setState({ checkBox: event.target.checked })}
        />
        <CheckBox
          toggle={true}
          checked={checkBox}
          label='CheckBox toggle'
          onChange={event => this.setState({ checkBox: event.target.checked })}
        />
        <RadioButton
          checked={radioButton}
          label='RadioButton'
          onChange={event => this.setState({ radioButton: event.target.checked })}
        />
        <TextInput placeholder='TextInput' />
        <TextArea placeholder='TextArea' />
        <RangeInput value={24} onChange={() => {}} />
        <Stack>
          <Box direction='row' justify='between'>
            {[0, 1, 2, 3].map(value => (
              <Box key={value} pad='small' border={false}>
                <Text style={{ fontFamily: 'monospace' }}>{value}</Text>
              </Box>
            ))}
          </Box>
          <RangeSelector
            direction='horizontal'
            invert={false}
            min={0}
            max={3}
            size='full'
            round='small'
            values={rangeSelector}
            onChange={values => this.setState({ rangeSelector: values })}
          />
        </Stack>
        <FormField label='FormField'>
          <TextInput placeholder='TextInput' />
        </FormField>
      </Box>,
      <Box key='time' gap='medium'>
        <Calendar size='small' />
        <Clock type='digital' />
        <Clock />
      </Box>,
      <Box key='measure' gap='medium'>
        <Chart
          type='bar'
          round={true}
          size='small'
          values={[{ value: [10, 20] }, { value: [20, 30] }, { value: [30, 15] }]}
        />
        <Meter
          type='bar'
          round={true}
          size='small'
          background='light-3'
          values={[{ value: 30 }]}
        />
      </Box>,
      <Box key='visualize' gap='small'>
        <Distribution
          basis='small'
          values={[
            { value: 50, color: 'light-3' },
            { value: 30, color: 'accent-1' },
            { value: 20, color: 'light-4' },
            { value: 10, color: 'light-3' },
            { value: 5, color: 'light-4' },
          ]}
        >
          {value => (
            <Box pad='xsmall' background={value.color} fill={true}>
              <Text size='large'>{value.value}</Text>
            </Box>
          )}
        </Distribution>
        <Stack>
          <Box>
            <Box direction='row'>
              {[1, 2].map(id => (
                <Node key={id} id={id} />
              ))}
            </Box>
            <Box direction='row'>
              {[3, 4].map(id => (
                <Node key={id} id={id} />
              ))}
            </Box>
          </Box>
          <Diagram
            connections={[connection('1', '4')]}
          />
        </Stack>
      </Box>,
      <Box key='dataTable' alignSelf='start'>
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
          sortable={true}
        />
      </Box>,
      <Box key='accordion'>
        <Accordion>
          <AccordionPanel label='Accordion Panel 1'>
            <Box pad='small'>
              <Text>Accordion panel 1 content</Text>
            </Box>
          </AccordionPanel>
          <AccordionPanel label='Accordion Panel 2'>
            <Box pad='small'>
              <Text>Accordion panel 2 content</Text>
            </Box>
          </AccordionPanel>
        </Accordion>
      </Box>,
      <Box key='tabs'>
        <Tabs
          activeIndex={tabIndex}
          onActive={index => this.setState({ tabIndex: index })}
        >
          <Tab title='Tab 1'>
            <Box pad='small'>
              <Text>Tab 1 content</Text>
            </Box>
          </Tab>
          <Tab title='Tab 2'>
            <Box pad='small'>
              <Text>Tab 2 content</Text>
            </Box>
          </Tab>
        </Tabs>
      </Box>,
      <Box key='video' alignSelf='start'>
        <Video>
          <source src='http://techslides.com/demos/sample-videos/small.webm' type='video/webm' />
          <source src='http://techslides.com/demos/sample-videos/small.ogv' type='video/ogg' />
          <source src='http://techslides.com/demos/sample-videos/small.mp4' type='video/mp4' />
          <source src='http://techslides.com/demos/sample-videos/small.3gp' type='video/3gp' />
        </Video>
      </Box>,
    ];

    return (
      <React.Fragment>
        <Grommet theme={grommet}>
          <Box
            direction='row-responsive'
            gap='medium'
            justify='end'
            align='center'
            margin='small'
          >
            <Box basis='small'>
              <RangeInput
                min={16}
                max={36}
                step={2}
                value={baseSize}
                onChange={event => this.setState({ baseSize: parseInt(event.target.value, 10) })}
              />
            </Box>
            <Text>{baseSize}px base spacing</Text>
          </Box>
        </Grommet>
        <Grommet theme={theme}>
          <Box pad='medium' background='white'>
            {Grid.available ? (
              <Grid fill={true} columns='small' gap='medium'>
                {content}
              </Grid>
            ) : (
              <Box direction='row' wrap={true} align='start' gap='large'>
                {content}
              </Box>
            )}
          </Box>
        </Grommet>
      </React.Fragment>
    );
  }
}

storiesOf('Components', module)
  .add('All', () => <Components />);
