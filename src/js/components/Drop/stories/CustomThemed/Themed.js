import React, { useEffect, useRef, useState } from 'react';

import { Box, Drop, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const customTheme = deepMerge(grommet, {
  global: {
    drop: {
      background: { dark: 'neutral-2', light: 'background-contrast' },
      border: { radius: '10px' }, // impacting 'round' behavior
      zIndex: '13',
      elevation: 'large', // impacting the elevation
      margin: 'xsmall',
      intelligentMargin: true,
    },
  },
});

const align = { top: 'bottom', left: 'right' };

const ThemedDrop = () => {
  const [, setShowDrop] = useState(false);
  const targetRef = useRef();

  useEffect(() => setShowDrop(true), []);
  return (
    <Grommet theme={customTheme} full>
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
          <Drop align={align} target={targetRef.current}>
            <Box pad="small">This Drop uses a custom theme</Box>
          </Drop>
        )}
      </Box>
    </Grommet>
  );
};

export const Themed = () => <ThemedDrop />;
Themed.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Drop/Custom Themed/Themed',
};
