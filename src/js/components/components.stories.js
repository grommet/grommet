import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import Grommet from './Grommet/Grommet';
import Anchor from './Anchor/Anchor';
import Box from './Box/Box';
import Button from './Button/Button';
import Calendar from './Calendar/Calendar';
import Chart from './Chart/Chart';
import CheckBox from './CheckBox/CheckBox';
import Clock from './Clock/Clock';
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
import Select from './Select/Select';
import Stack from './Stack/Stack';
import Text from './Text/Text';
import TextArea from './TextArea/TextArea';
import TextInput from './TextInput/TextInput';

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
  render() {
    return (
      <Grommet>
        <Box pad='medium' background='light-2'>
          <Grid
            fill={true}
            rows='medium'
            columns='small'
            gap='small'
          >
            <Box>
              <Heading margin={{ top: 'none' }}>Heading</Heading>
              <Paragraph>Paragraph</Paragraph>
              <Text>Text</Text>
              <Anchor href=''>Anchor</Anchor>
              <Menu label='Menu' items={['One', 'Two']} />
              <Button label='Button' onClick={() => {}} />
            </Box>
            <Box gap='small'>
              <Select label='Select' options={['One', 'Two']} onChange={() => {}} />
              <CheckBox checked={true} label='CheckBox' />
              <RadioButton checked={true} label='RadioButton' />
              <TextInput placeholder='TextInput' />
              <TextArea placeholder='TextArea' />
              <RangeInput />
              <FormField label='FormField'>
                <TextInput placeholder='TextInput' />
              </FormField>
            </Box>
            <Box gap='medium'>
              <Calendar size='small' />
              <Clock type='digital' />
              <Clock />
            </Box>
            <Box gap='medium'>
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
            </Box>
            <Box gap='small'>
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
            </Box>
          </Grid>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Components', module)
  .add('All', () => <Components />);
