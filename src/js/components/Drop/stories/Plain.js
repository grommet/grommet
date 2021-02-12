import React, { useEffect, useRef, useState } from 'react';

import { Box, Drop, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const PlainDrop = () => {
  const targetRef = useRef();

  const [, setShowDrop] = useState(false);
  useEffect(() => setShowDrop(true), []);
  return (
    <Grommet theme={grommet} full>
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
    </Grommet>
  );
};

export const Plain = () => <PlainDrop />;
Plain.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Drop/Plain',
};
