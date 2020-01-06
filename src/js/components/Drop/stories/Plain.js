import React, { useEffect, useRef, useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Drop, MnetUIBase } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const PlainDrop = () => {
  const targetRef = useRef();

  const [, setShowDrop] = useState(false);
  useEffect(() => setShowDrop(true), []);
  return (
    <MnetUIBase theme={mnet} full>
      <Box background="brand" fill align="center" justify="center">
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
            plain
            align={{ top: 'bottom', left: 'left' }}
            target={targetRef.current}
          >
            <Box pad="large">No background no shadow</Box>
          </Drop>
        )}
      </Box>
    </MnetUIBase>
  );
};

storiesOf('Drop', module).add('Plain', () => <PlainDrop />);
