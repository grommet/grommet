import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Header, Anchor, Box, ResponsiveContext, Menu } from 'grommet';
import { Grommet as GrommetIcon, Menu as MenuIcon } from 'grommet-icons';
import { grommet } from 'grommet/themes';

const Responsive = () => (
  <Grommet theme={grommet}>
    <Header background="light-4" height="xsmall">
      <Anchor
        margin={{ left: 'medium', vertical: 'xsmall' }}
        href="https://tools.grommet.io/"
        icon={<GrommetIcon color="brand" />}
        label="Grommet Tools"
      />
      <ResponsiveContext.Consumer>
        {size =>
          size === 'small' ? (
            <Box alignSelf="end" margin="large">
              <Menu
                a11yTitle="Navigation Menu"
                justifyContent="end"
                dropProps={{ align: { top: 'bottom', right: 'right' } }}
                icon={<MenuIcon color="brand" />}
                items={[
                  {
                    label: <Box pad="small">Grommet Tools </Box>,
                    href: 'https://tools.grommet.io/',
                  },
                  {
                    label: <Box pad="small">Grommet.io</Box>,
                    href: 'https://v2.grommet.io/',
                  },
                  {
                    label: <Box pad="small">Feedback</Box>,
                    href: 'https://github.com/grommet/grommet/issues',
                  },
                ]}
              />
            </Box>
          ) : (
            <Box
              margin={{ right: 'large' }}
              justify="end"
              direction="row"
              gap="medium"
            >
              <Anchor href="https://v2.grommet.io/" label="Grommet.io" />
              <Anchor
                href="https://github.com/grommet/grommet/issues"
                label="Feedback"
              />
            </Box>
          )
        }
      </ResponsiveContext.Consumer>
    </Header>
  </Grommet>
);

storiesOf('Header', module).add('Responsive', () => <Responsive />);
