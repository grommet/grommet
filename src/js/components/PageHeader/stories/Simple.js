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
    label: 'Primary Action',
  },
  {
    label: 'Some Action',
  },
  {
    label: 'Other Action',
  },
  {
    label: 'Another Action',
  },
];

export const Simple = () => {
  const size = useContext(ResponsiveContext);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Page>
      <PageContent>
        <PageHeader
          title="Page title that is really long so we can test the wrapping 
          behavior."
          subtitle="The theme is setting the min-width for the columns at 
          various breakpoints. This gives the caller control about what gets 
          layout priority. In this case, we never want to let the 
          title/subtitle get below a certain width."
          actions={
            <Box direction="row" gap="small" align="center">
              {size !== 'small' ? (
                actions.map((action) => (
                  <Button
                    {...action}
                    primary={action.label === 'Primary Action'}
                    secondary={action.label !== 'Primary Action'}
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
          context={<Anchor label="Parent Page" />}
        />
      </PageContent>
    </Page>
    // </Grommet>
  );
};

export default {
  title: 'Layout/PageHeader/Simple',
};
