import React from 'react';

import { Anchor, Button, PageHeader, Page, PageContent } from 'grommet';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Page>
    <PageContent>
      <PageHeader
        title="Grommet"
        subtitle={`Grommet helps you build responsive and accessible 
          mobile-first projects for the web with an easy to use component 
          library.`}
        actions={<Button label="Get Started" primary />}
        parent={<Anchor label="Parent Page" />}
      />
    </PageContent>
  </Page>
  // </Grommet>
);

export default {
  title: 'Layout/PageHeader/Simple',
};
