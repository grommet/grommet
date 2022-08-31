import React, { useContext } from 'react';

import {
  Anchor,
  Box,
  Button,
  Menu,
  PageHeader,
  Page,
  PageContent,
  ResponsiveContext,
} from 'grommet';
import { More } from 'grommet-icons';

const actions = [
  {
    label: 'Get Started',
    primary: true,
  },
  {
    label: 'Follow',
    secondary: true,
  },
  {
    label: 'File Issue',
    secondary: true,
  },
];

const controls = {
  small: (
    <Menu
      dropAlign={{ top: 'bottom', right: 'right' }}
      items={actions.map((action) => ({ label: action.label }))}
      icon={<More />}
    />
  ),
  medium: (
    <>
      <Button {...actions[0]} />
      <Menu
        dropAlign={{ top: 'bottom', right: 'right' }}
        items={actions.slice(1)}
        icon={<More />}
      />
    </>
  ),
  large: actions.map((action) => <Button {...action} />),
};

export const MultipleActions = () => {
  const size = useContext(ResponsiveContext);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Page>
      <PageContent>
        <PageHeader
          title="Grommet"
          subtitle={`Grommet helps you build responsive and accessible 
          mobile-first projects for the web with an easy to use component 
          library.`}
          actions={
            <Box direction="row" gap="small" align="center">
              {controls[size]}
            </Box>
          }
          parent={<Anchor label="Parent Page" />}
        />
      </PageContent>
    </Page>
    // </Grommet>
  );
};

MultipleActions.storyName = 'Multiple Actions';

export default {
  title: 'Layout/PageHeader/Multiple Actions',
};
