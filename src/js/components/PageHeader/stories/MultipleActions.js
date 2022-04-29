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
  },
  {
    label: 'Follow',
  },
  {
    label: 'File Issue',
  },
];

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
              {size !== 'small' ? (
                actions.map((action) => (
                  <Button
                    {...action}
                    primary={action.label === 'Get Started'}
                    secondary={action.label !== 'Get Started'}
                  />
                ))
              ) : (
                <Menu
                  dropAlign={{ top: 'bottom', right: 'right' }}
                  items={actions}
                  icon={<More />}
                />
              )}
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
