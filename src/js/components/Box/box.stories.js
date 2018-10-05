import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Attraction, Car, TreeOption } from 'grommet-icons';

import { Grommet, Anchor, Box, Button, Grid, Text } from '../';
import { grommet } from '../../themes';

class SimpleBox extends Component {
  render() {
    return (
      <Grommet theme={grommet}>
        <Box
          direction='row-responsive'
          justify='center'
          align='center'
          pad='xlarge'
          background='dark-2'
        >
          <Box
            pad='xlarge'
            align='center'
            background={{ color: 'light-2', opacity: 'strong' }}
          >
            <Attraction size='xlarge' />
            <Text>Party</Text>
            <Anchor href='' label='Link' />
            <Button label='Button' onClick={() => {}} />
          </Box>
          <Box
            pad='xlarge'
            align='center'
            background={{ color: 'accent-2', opacity: 'weak' }}
          >
            <TreeOption size='xlarge' />
            <Text>Nature</Text>
            <Anchor href='' label='Link' />
            <Button label='Button' onClick={() => {}} />
          </Box>
          <Box pad='xlarge' align='center' background='dark-3'>
            <Car size='xlarge' color='light-2' />
            <Text>Travel</Text>
            <Anchor href='' label='Link' />
            <Button label='Button' onClick={() => {}} />
          </Box>
        </Box>
      </Grommet>
    );
  }
}

const customColorBox = {
  global: {
    colors: {
      'brand-gradient': 'linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)',
    },
    font: {
      family: 'Arial',
    },
  },
};

class CustomColorBox extends Component {
  render() {
    return (
      <Grommet theme={customColorBox}>
        <Box
          justify='center'
          align='center'
          pad='xlarge'
          background={{ color: 'brand-gradient', dark: true }}
          round='large'
        >
          <Text>I have a linear gradient background</Text>
        </Box>
      </Grommet>
    );
  }
}

class FixedSizesBox extends Component {
  render() {
    return (
      <Grommet theme={grommet}>
        <Box pad='small' gap='small'>
          <Box
            width='small'
            height='small'
            round='small'
            align='center'
            justify='center'
            background='brand'
          >
            Small
          </Box>
          <Box
            width='medium'
            height='medium'
            round='small'
            align='center'
            justify='center'
            background='brand'
          >
            Medium
          </Box>
          <Box
            width='large'
            height='large'
            round='small'
            align='center'
            justify='center'
            background='brand'
          >
            Large
          </Box>
        </Box>
      </Grommet>
    );
  }
}

class BorderBox extends Component {
  render() {
    return (
      <Grommet theme={grommet}>
        <Box pad='small' gap='small' align='start'>
          <Box pad='small' border={true}>
            true
          </Box>
          <Box direction='row-responsive' gap='small'>
            {['horizontal', 'vertical', 'left', 'top', 'right', 'bottom'].map(border => (
              <Box pad='small' border={border}>
                {border}
              </Box>
            ))}
          </Box>
          <Box pad='small' border={{ color: 'brand' }}>
            color
          </Box>
          <Box direction='row-responsive' gap='small' align='start'>
            {['small', 'medium', 'large'].map(size => (
              <Box pad='small' border={{ size }}>
                {size}
              </Box>
            ))}
          </Box>
        </Box>
      </Grommet>
    );
  }
}

class RoundBox extends Component {
  render() {
    return (
      <Grommet theme={grommet}>
        <Box pad='small' gap='small'>
          <Box pad='small' background='brand' round={true} alignSelf='start'>
            true
          </Box>
          <Grid columns='small' gap='small'>
            {['xsmall', 'small', 'medium', 'large', 'xlarge', 'full'].map(size => (
              <Box key={size} pad='large' background='brand' round={{ size }}>
                {size}
              </Box>
            ))}
          </Grid>
          <Grid columns='small' gap='small'>
            {['left', 'top', 'right', 'bottom',
              'top-left', 'top-right', 'bottom-left', 'bottom-right'].map(corner => (
                <Box key={corner} pad='small' background='brand' round={{ corner }}>
                  {corner}
                </Box>
            ))}
          </Grid>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Box', module)
  .add('Simple Box', () => <SimpleBox />)
  .add('Custom color', () => <CustomColorBox />)
  .add('Fixed sizes', () => <FixedSizesBox />)
  .add('Border', () => <BorderBox />)
  .add('Round', () => <RoundBox />);
