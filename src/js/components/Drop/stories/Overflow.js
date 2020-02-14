import React, { useEffect, useRef, useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Calendar, Drop, Heading, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

const OverflowDrop = () => {
  const targetRef = useRef();
  const inputRef = useRef();

  const [date, setDate] = useState(undefined);
  const [showCalendar, setShowCalendar] = useState(false);

  const onSelect = nextDate => {
    setDate(nextDate !== date ? nextDate : undefined);
    setShowCalendar(false);
  };

  const [, setShowDrop] = useState(false);
  useEffect(() => setShowDrop(true), []);

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
                  onFocus={() => setShowCalendar(true)}
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
