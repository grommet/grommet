import React, { createRef, Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Calendar, Drop, Heading, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

class OverflowDrop extends Component {
  targetRef = createRef();

  inputRef = createRef();

  state = {
    date: undefined,
    showCalendar: false,
  };

  componentDidMount() {
    this.forceUpdate();
  }

  onSelect = nextDate => {
    const { date } = this.state;
    this.setState({
      date: nextDate !== date ? nextDate : undefined,
      showCalendar: false,
    });
  };

  render() {
    const { date, showCalendar } = this.state;
    return (
      <Grommet theme={grommet} full>
        <Box fill align="center" justify="center">
          <Box
            background="dark-3"
            pad="medium"
            align="center"
            justify="start"
            ref={this.targetRef}
          >
            Target
          </Box>
          {this.targetRef.current && (
            <Drop
              overflow="unset"
              align={{ top: 'bottom', left: 'left' }}
              target={this.targetRef.current}
              onClose={() => this.setState({ showCalendar: false })}
            >
              <Box height="small">
                <Heading level={4}>Select Start Date</Heading>
                <div style={{ position: 'relative' }}>
                  <TextInput
                    ref={this.inputRef}
                    value={date || ''}
                    placeholder="Focus on me"
                    onFocus={() => this.setState({ showCalendar: true })}
                  />
                  {showCalendar && (
                    <div style={{ position: 'absolute', background: '#eee' }}>
                      <Calendar
                        date={date}
                        onSelect={this.onSelect}
                        size="small"
                      />
                    </div>
                  )}
                </div>
              </Box>
            </Drop>
          )}
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Drop', module).add('Overflow', () => <OverflowDrop />);
