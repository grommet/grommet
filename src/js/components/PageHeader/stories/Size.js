import React from 'react';

import { Anchor, Button, PageHeader, Page, PageContent } from 'grommet';

export const Size = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Page>
    <PageContent>
      <PageHeader
        title="Small PageHeader"
        subtitle={`Grommet helps you build responsive and accessible 
          mobile-first projects for the web with an easy to use component 
          library.`}
        actions={<Button label="Page-level action" />}
        parent={<Anchor label="Parent Page" />}
        size="small"
        level="1"
      />
      <PageHeader
        title="Medium PageHeader (default)"
        subtitle={`Grommet helps you build responsive and accessible 
          mobile-first projects for the web with an easy to use component 
          library.`}
        actions={<Button label="Page-level action" />}
        parent={<Anchor label="Parent Page" />}
        level="1"
      />
      <PageHeader
        title="Large PageHeader"
        subtitle={`Grommet helps you build responsive and accessible 
          mobile-first projects for the web with an easy to use component 
          library.`}
        actions={<Button label="Page-level action" />}
        parent={<Anchor label="Parent Page" />}
        size="large"
        level="1"
      />
    </PageContent>
  </Page>
  // </Grommet>
);

export default {
  title: 'Layout/PageHeader/Size',
};
