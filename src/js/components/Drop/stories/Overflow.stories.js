import React, { useEffect, useRef, useState } from 'react';

import { Box, Calendar, Drop, Heading, TextInput } from 'grommet';

const align = { top: 'bottom', left: 'left' };

const OverflowDrop = () => {
  const targetRef = useRef();
  const inputRef = useRef();

  const [date, setDate] = useState(undefined);
  const [showCalendar, setShowCalendar] = useState(false);

  const onSelect = (nextDate) => {
    setDate(nextDate !== date ? nextDate : undefined);
    setShowCalendar(false);
  };

  const [, setShowDrop] = useState(false);
  useEffect(() => setShowDrop(true), []);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box fill align="center" justify="center">
      <Box
        background="dark-2"
        pad="medium"
        align="center"
        justify="start"
        ref={targetRef}
      >
        Target
      </Box>
      {targetRef.current && (
        <Drop
          responsive={false}
          overflow="unset"
          align={align}
          target={targetRef.current}
          onClose={() => setShowCalendar(false)}
        >
          <Box pad="small" height="small">
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
    // </Grommet>
  );
};

export const Overflow = () => <OverflowDrop />;
Overflow.parameters = {
  chromatic: { disable: true },
};
Overflow.args = {
  full: true,
};

export default {
  title: 'Controls/Drop/Overflow',
};
