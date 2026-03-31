import React from 'react';

import { Anchor, Button, PageHeader, Page, PageContent } from 'grommet';

export const Responsive = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Page>
    <PageContent>
      <PageHeader
        title="Grommet"
        subtitle={`Responsive allows PageHeader layout to switch to a 
        single column at responsive breakpoints specified in the theme.`}
        actions={<Button label="Get Started" primary />}
        parent={<Anchor label="Parent Page" />}
        responsive
      />
    </PageContent>
  </Page>
  // </Grommet>
);

export default {
  title: 'Layout/PageHeader/Responsive',
};
