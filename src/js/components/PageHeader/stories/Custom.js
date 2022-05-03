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
        ['parent', 'parent'],
        ['title', 'null'],
        ['subtitle', 'null'],
        ['actions', 'actions'],
      ],
    },
  },
});

export const Custom = () => (
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
          parent={<Anchor icon={<FormPrevious />} label="Settings" />}
        />
      </PageContent>
    </Page>
  </Grommet>
);

export default {
  title: 'Layout/PageHeader/Custom Themed/Custom',
};
