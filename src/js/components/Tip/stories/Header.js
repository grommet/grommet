import React, { createRef, useState } from 'react';
import { storiesOf } from '@storybook/react';

import {
  Box,
  Button,
  grommet,
  Grommet,
  Header,
  Main,
  Text,
  Tip,
} from 'grommet';

import { Grommet as GrommetIcon, User } from 'grommet-icons';

export const Example = () => {
  const [over, setOver] = useState(false);
  const ref = createRef();

  const [overUserIcon, setOverUserIcon] = useState(false);
  const refUserIcon = createRef();

  return (
    <Grommet theme={grommet}>
      <Box>
        <Header background="light-3" pad="small">
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
                <Tip targetRef={ref.current}>
                  <Box
                    margin="small"
                    pad="small"
                    round="medium"
                    background="light-4"
                    elevation="medium"
                  >
                    the brand logo and product name
                  </Box>
                </Tip>
              </Box>
            )}
            <Box direction="row" align="center" gap="medium">
              <GrommetIcon color="brand" />
              <Box direction="row" gap="xsmall">
                <Text ref={ref} weight="bold">
                  Grommet
                </Text>
              </Box>
            </Box>
          </Button>

          {/* User icon tip */}
          <Box direction="row">
            <Button
              onMouseOver={() => setOverUserIcon(true)}
              onMouseLeave={() => setOverUserIcon(false)}
              onFocus={() => setOverUserIcon(true)}
              onBlur={() => setOverUserIcon(false)}
              ref={refUserIcon}
              icon={<User />}
            />
            {overUserIcon && (
              <Box>
                <Tip targetRef={refUserIcon.current} align={{ left: 'right' }}>
                  <Box
                    margin="small"
                    pad="small"
                    round="medium"
                    background="accent-1"
                    elevation="small"
                  >
                    Hello! welcome back
                  </Box>
                </Tip>
              </Box>
            )}
          </Box>
        </Header>
        <Main overflow="auto" flex fill background="light-4">
          Hi filler
          <Box flex />
          Shimi
        </Main>
      </Box>
    </Grommet>
  );
};
storiesOf('Tip', module).add('Header', () => <Example />, {
  chromatic: { disable: true },
});
