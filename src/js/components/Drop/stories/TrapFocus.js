import React, { useRef, useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, grommet, Box, Button, Drop, Nav, Text } from 'grommet';
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
          plain
          align={{ left: 'right' }}
          target={ref.current}
          margin={{ horizontal: 'small' }}
          // trapFocus set to false allows tabbing through the buttons
          trapFocus={false}
        >
          <Box pad="small" background="brand">
            <Text color="white">{name}</Text>
          </Box>
        </Drop>
      )}
    </Box>
  );
};

const Tooltip = () => {
  return (
    <Grommet theme={grommet}>
      <Nav align="center" pad="large">
        <TooltipButton icon={<Calculator />} name="Calculator" />
        <TooltipButton icon={<Bug />} name="Bug" />
        <TooltipButton icon={<Achievement />} name="Achievement" />
      </Nav>
    </Grommet>
  );
};

storiesOf('Drop', module).add('trapFocus', () => <Tooltip />, {
  chromatic: { disable: true },
});
