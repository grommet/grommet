import React, { useRef, useState } from 'react';

import { Grommet, grommet, Box, Button, Drop, Text } from 'grommet';
import { Calculator, Bug, Achievement } from 'grommet-icons';

const TooltipButton = ({ icon, name }) => {
  const [over, setOver] = useState(false);
  const ref = useRef();

  return (
    <Box>
      <Button
        ref={ref}
        onMouseOver={() => setOver(true)}
        onMouseLeave={() => setOver(false)}
        onFocus={() => setOver(true)}
        onBlur={() => setOver(false)}
        plain
      >
        <Box pad={{ vertical: 'small' }} align="center">
          {icon}
        </Box>
      </Button>
      {ref.current && over && (
        <Drop
          align={{ left: 'right' }}
          target={ref.current}
          plain
          // trapFocus set to false allows tabbing through
          trapFocus={false}
        >
          <Box pad="small" background="pink">
            <Text color="white">{name}</Text>
          </Box>
        </Drop>
      )}
    </Box>
  );
};

const TooltipDrop = () => {
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <TooltipButton icon={<Calculator />} name="Calculator" />
        <TooltipButton icon={<Bug />} name="Bug" />
        <TooltipButton icon={<Achievement />} name="Achievement" />
      </Box>
    </Grommet>
  );
};

export const Tooltip = () => <TooltipDrop />;
Tooltip.story = {
  parameters: {
    chromatic: { disable: true },
  },
};
