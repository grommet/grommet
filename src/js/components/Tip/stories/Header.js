import React, { createRef, useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, grommet, Grommet, Header, Text, Tip } from 'grommet';

import {
  Chat,
  Grommet as GrommetIcon,
  Notification,
  User,
} from 'grommet-icons';

export const Example = () => {
  const [over, setOver] = useState(false);
  const ref = createRef();
  return (
    <Grommet theme={grommet}>
      <Box>
        <Header background="light-3" pad={{ horizontal: 'large' }}>
          <Button
            onMouseOver={() => setOver(true)}
            onMouseLeave={() => setOver(false)}
            onFocus={() => setOver(true)}
            onBlur={() => setOver(false)}
            ref={ref}
            plain
          >
            {over && (
              <Box>
                <Tip
                  elevation="large"
                  targetRef={ref.current}
                  align={{ left: 'right' }}
                >
                  <Box background="red">Shimisun</Box>
                </Tip>
              </Box>
            )}
            <Box direction="row" align="center" gap="medium">
              <GrommetIcon color="brand" />
              <Box direction="row" gap="xsmall">
                {over && <Text weight="bold">Grommet</Text>}
              </Box>
            </Box>
          </Button>

          <Box direction="row">
            <Button icon={<Notification />} />
            <Button icon={<Chat />} />
            <Button icon={<User />} />
          </Box>
        </Header>
      </Box>
    </Grommet>
  );
};
storiesOf('Tip', module).add('Header', () => <Example />);
