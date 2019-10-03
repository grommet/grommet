import React, { useReducer, useRef, useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Calendar, Drop, Heading, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

const OverflowDrop = () => {
  const targetRef = useRef(null);

  const inputRef = useRef(null);

  const [date, setDate] = useState(undefined);
  const [showCalendar, setShowCalendar] = useState(false);

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    forceUpdate();
  }, []);

  const onSelect = nextDate => {
    setDate(nextDate !== date ? nextDate : undefined);
    setShowCalendar(false);
  };

  return (
    <Grommet theme={grommet} full>
      <Box fill align="center" justify="center">
        <Box
          background="dark-3"
          pad="medium"
          align="center"
          justify="start"
          ref={targetRef}
        >
          Target
        </Box>
        {targetRef.current && (
          <Drop
            overflow="unset"
            align={{ top: 'bottom', left: 'left' }}
            target={targetRef.current}
            onClose={() => setShowCalendar(false)}
          >
            <Box height="small">
              <Heading level={4}>Select Start Date</Heading>
              <div style={{ position: 'relative' }}>
                <TextInput
                  ref={inputRef}
                  value={date || ''}
                  placeholder="Focus on me"
                  onFocus={() => setShowCalendar(false)}
                />
                {showCalendar && (
                  <div style={{ position: 'absolute', background: '#eee' }}>
                    <Calendar date={date} onSelect={onSelect} size="small" />
                  </div>
                )}
              </div>
            </Box>
          </Drop>
        )}
      </Box>
    </Grommet>
  );
};

storiesOf('Drop', module).add('Overflow', () => <OverflowDrop />);
