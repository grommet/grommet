import React, { createRef, useState } from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Box, Button, Grommet, Text, Tip } from 'grommet';


// TODO light and dark
// Tooltip on Charts

const Example = () => {
  const [over, setOver] = useState(false);
  const ref = createRef();
  const refHover = createRef();
  return (
    <Grommet theme={grommet}>
      <Box align="start" pad="medium" gap="large" direction="row">
        <Box>
          <Button
            onMouseOver={() => setOver(true)}
            onMouseLeave={() => setOver(false)}
            onFocus={() => setOver(true)}
            onBlur={() => setOver(false)}
            ref={ref}
            label="Primary"
            onClick={() => {}}
          />
          {over && (
            <Tip targetRef={ref.current}>
              <Box background="red">hello</Box>
            </Tip>
          )}
        </Box>
        <Box>
          <Button ref={refHover} onClick={() => {}}>
            {({ hover }) => (
              <Box>
                <Text>Primary</Text>
                {hover && (
                  <Tip targetRef={refHover.current}>
                    <Box background="red">shimi</Box>
                  </Tip>
                )}
              </Box>
            )}
          </Button>
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('Tip', module).add('Simple', () => <Example />);
