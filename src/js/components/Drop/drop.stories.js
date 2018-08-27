import React, { Component, Fragment } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Drop, Grommet, Text } from '../';
import { grommet } from '../../themes';
import { ThemeContext } from '../../contexts';

class SimpleDrop extends Component {
  targetRef = React.createRef()

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    return (
      <Grommet theme={grommet}>
        <Box align='start'>
          <Box
            background='dark-4'
            pad='medium'
            align='center'
            justify='start'
            ref={this.targetRef}
          >
            Target
          </Box>
          {this.targetRef.current && (
            <Drop
              align={{ top: 'bottom', left: 'left' }}
              target={this.targetRef.current}
            >
              <Box pad='large'>
                Drop Contents
              </Box>
            </Drop>
          )}
        </Box>
      </Grommet>
    );
  }
}

const OneDrop = ({ align, target }) => (
  <Drop
    align={align}
    target={target}
    stretch={false}
  >
    <Box pad='small' />
  </Drop>
);

class Set extends Component {
  targetRef = React.createRef()

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    const { aligns, label } = this.props;
    return (
      <Box border={true} pad='small'>
        <Text>{label}</Text>
        <Box
          margin='xlarge'
          background='dark-4'
          pad={{ horizontal: 'large', vertical: 'medium' }}
          align='center'
          justify='center'
          ref={this.targetRef}
        >
          &nbsp;
        </Box>
        {this.targetRef.current && (
          <Fragment>
            {aligns.map((align, index) => (
              <OneDrop
                key={`${index}`}
                align={align}
                target={this.targetRef.current}
              />
            ))}
          </Fragment>
        )}
      </Box>
    );
  }
}

class AllDrops extends Component {
  targetRef = React.createRef()

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    return (
      <Grommet theme={grommet}>
        <ThemeContext.Extend value={{ global: { drop: { background: { color: 'white', opacity: 'medium' } } } }} >
          <Box direction='row' wrap={true} pad='medium' align='center'>
            <Set
              label='left: left'
              aligns={[
                { top: 'top', left: 'left' },
                { top: 'bottom', left: 'left' },
                { bottom: 'top', left: 'left' },
                { bottom: 'bottom', left: 'left' },
              ]}
            />
            <Set
              label='left: right'
              aligns={[
                { top: 'top', left: 'right' },
                { top: 'bottom', left: 'right' },
                { bottom: 'top', left: 'right' },
                { bottom: 'bottom', left: 'right' },
              ]}
            />
            <Set
              label='(center horizontal)'
              aligns={[
                { top: 'top' },
                { top: 'bottom' },
                { bottom: 'top' },
                { bottom: 'bottom' },
              ]}
            />
            <Set
              label='right: left'
              aligns={[
                { top: 'top', right: 'left' },
                { top: 'bottom', right: 'left' },
                { bottom: 'top', right: 'left' },
                { bottom: 'bottom', right: 'left' },
              ]}
            />
            <Set
              label='right: right'
              aligns={[
                { top: 'top', right: 'right' },
                { top: 'bottom', right: 'right' },
                { bottom: 'top', right: 'right' },
                { bottom: 'bottom', right: 'right' },
              ]}
            />
            <Set
              label='top: top'
              aligns={[
                { left: 'left', top: 'top' },
                { left: 'right', top: 'top' },
                { right: 'left', top: 'top' },
                { right: 'right', top: 'top' },
              ]}
            />
            <Set
              label='top: bottom'
              aligns={[
                { left: 'left', top: 'bottom' },
                { left: 'right', top: 'bottom' },
                { right: 'left', top: 'bottom' },
                { right: 'right', top: 'bottom' },
              ]}
            />
            <Set
              label='(center vertical)'
              aligns={[
                { left: 'left' },
                { left: 'right' },
                { right: 'left' },
                { right: 'right' },
              ]}
            />
            <Set
              label='bottom: top'
              aligns={[
                { left: 'left', bottom: 'top' },
                { left: 'right', bottom: 'top' },
                { right: 'left', bottom: 'top' },
                { right: 'right', bottom: 'top' },
              ]}
            />
            <Set
              label='bottom: bottom'
              aligns={[
                { left: 'left', bottom: 'bottom' },
                { left: 'right', bottom: 'bottom' },
                { right: 'left', bottom: 'bottom' },
                { right: 'right', bottom: 'bottom' },
              ]}
            />
            <Set
              label='(center vertical and horizontal)'
              aligns={[{}]}
            />
          </Box>
        </ThemeContext.Extend>
      </Grommet>
    );
  }
}

storiesOf('Drop', module)
  .add('Simple', () => <SimpleDrop />)
  .add('All not stretch', () => <AllDrops />);
