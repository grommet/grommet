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
    primary: true,
  },
  {
    label: 'Some Action',
    secondary: true,
  },
  {
    label: 'Other Action',
    secondary: true,
  },
  {
    label: 'Another Action',
    secondary: true,
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
            size !== 'small' ? (
              <Box direction="row" gap="small" align="center">
                <Button label="Add Item" primary />
                <Button label="Some Action" secondary />
                <Button label="Other Action" secondary />
                <Button label="One More Action" secondary />
              </Box>
            ) : (
              <Menu items={actions} icon={<More />} />
            )
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
