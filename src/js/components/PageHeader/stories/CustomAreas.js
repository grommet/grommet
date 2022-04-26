import React from 'react';

import {
  Anchor,
  Box,
  Button,
  grommet,
  Grommet,
  PageHeader,
  Page,
  PageContent,
} from 'grommet';
import { deepMerge } from 'grommet/utils';
import { FormPrevious } from 'grommet-icons';

const customTheme = deepMerge(grommet, {
  pageHeader: {
    medium: {
      areas: [
        ['context', 'context'],
        ['title', 'null'],
        ['subtitle', 'mull'],
        ['actions', 'actions'],
      ],
    },
  },
});

export const CustomAreas = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  <Grommet theme={customTheme}>
    <Page>
      <PageContent>
        <PageHeader
          title="Permissions"
          subtitle="View and assign permissions."
          actions={
            <Box alignSelf="start">
              <Button label="Edit" primary />
            </Box>
          }
          context={<Anchor icon={<FormPrevious />} label="Settings" />}
        />
      </PageContent>
    </Page>
  </Grommet>
);

CustomAreas.displayName = 'Custom Areas';

export default {
  title: 'Layout/PageHeader/Custom Areas',
};
