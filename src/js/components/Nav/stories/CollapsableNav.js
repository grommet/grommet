import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Anchor,
  Box,
  Header,
  Nav,
  Menu,
  ResponsiveContext,
} from 'mnet-ui-base';

const CollapsableNav = () => (
  <>
    <Header background="dark-1" pad="medium">
      <Box direction="row" align="center" gap="small">
        Resize the page to collapse the Nav into a Menu
      </Box>
      <ResponsiveContext.Consumer>
        {responsive =>
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
  </>
);

storiesOf('ResponsiveContext', module).add('Collapsable Nav', () => (
  <CollapsableNav />
));
