import React, { useEffect, useRef, useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Drop, MnetUIBase } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';
import { deepMerge } from '../../../utils/object';

const customTheme = deepMerge(mnet, {
  global: {
    drop: {
      background: { dark: 'neutral-2', light: 'neutral-2' },
      border: { radius: '10px' },
      zIndex: '13',
    },
  },
});

const Custom = () => {
  const [, setShowDrop] = useState(false);
  const targetRef = useRef();

  useEffect(() => setShowDrop(true), []);
  return (
    <MnetUIBase theme={customTheme} full>
      <Box fill align="center" justify="center">
        <Box
          background="dark-3"
          pad="medium"
          align="center"
          justify="start"
          ref={targetRef}
        >
          Box
        </Box>
        {targetRef.current && (
          <Drop
            align={{ top: 'bottom', left: 'right' }}
            target={targetRef.current}
          >
            <Box pad="small">This Drop uses a custom theme</Box>
          </Drop>
        )}
      </Box>
    </MnetUIBase>
  );
};

storiesOf('Drop', module).add('Custom', () => <Custom />);
