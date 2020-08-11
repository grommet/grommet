import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Header, Anchor, Box, ResponsiveContext, Menu } from 'grommet';
import { Grommet as GrommetIcon, Menu as MenuIcon } from 'grommet-icons';
import { grommet } from 'grommet/themes';

const Responsive = () => (
  <Grommet theme={grommet}>
    <ResponsiveContext.Consumer>
      {responsive =>
        responsive === 'small' ? (
          <Header height="xsmall">
            <Anchor
              margin={{ left: 'medium', vertical: 'xsmall' }}
              href="#"
              icon={<GrommetIcon color="brand" />}
              label="Grommet Tools"
            />
            <Box alignSelf="end" margin="large">
              <Menu
                a11yTitle="Navigation Menu"
                justifyContent="end"
                dropProps={{ align: { top: 'bottom', right: 'right' } }}
                icon={<MenuIcon color="brand" />}
                items={[
                  {
                    label: <Box pad="small">Grommet Tools </Box>,
                    href: '#',
                  },
                  {
                    label: <Box pad="small">Grommet.io</Box>,
                    href: '#',
                  },
                  {
                    label: <Box pad="small">Feedback</Box>,
                    href: '#',
                  },
                ]}
              />
            </Box>
          </Header>
        ) : (
          <Header height="xsmall">
            <Anchor
              margin={{ left: 'medium', vertical: 'xsmall' }}
              href="#"
              icon={<GrommetIcon color="brand" />}
              label="Grommet Tools"
            />
            <Box
              margin={{ right: 'large' }}
              justify="end"
              direction="row"
              gap="medium"
            >
              <Anchor href="#" label="Grommet.io" />
              <Anchor href="#" label="Feedback" />
            </Box>
          </Header>
        )
      }
    </ResponsiveContext.Consumer>
  </Grommet>
);

storiesOf('Header', module).add('Responsive', () => <Responsive />);
