import React from 'react';

import {
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
    areas: [
      ['title', 'context'],
      ['subtitle', 'empty'],
      ['actions', 'blank'],
    ],
  },
});

export const Custom = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  <Grommet theme={customTheme}>
    <Page>
      <PageContent>
        <PageHeader
          title="Page title"
          subtitle="This is the subtitle"
          actions={<Button label="Add Item" primary />}
          context={<Button icon={<FormPrevious />} label="Settings" />}
        />
      </PageContent>
    </Page>
  </Grommet>
);

export default {
  title: 'Layout/PageHeader/Custom',
};
