import React from 'react';

import { Anchor, Box, Header, Menu, Nav, ResponsiveContext } from 'grommet';

const CollapsableNav = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Header background="dark-1" pad="medium">
    <Box direction="row" align="center" gap="small">
      Resize the page to collapse the Nav into a Menu
    </Box>
    <ResponsiveContext.Consumer>
      {(responsive) =>
        responsive === 'small' ? (
          <Menu
            label="Click me"
            items={[
              { label: 'This is', onClick: () => {} },
              { label: 'The Menu', onClick: () => {} },
              { label: 'Component', onClick: () => {} },
            ]}
          />
        ) : (
          <Nav direction="row">
            <Anchor href="#" label="This is" />
            <Anchor href="#" label="The Nav" />
            <Anchor href="#" label="Component" />
          </Nav>
        )
      }
    </ResponsiveContext.Consumer>
  </Header>
  // </Grommet>
);

export const Collapsable = () => <CollapsableNav />;

export default {
  title: 'Controls/Nav/Collapsable',
};
