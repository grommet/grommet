import React from 'react';

import {
  Anchor,
  Button,
  NameValueList,
  NameValuePair,
  PageHeader,
  Page,
  PageContent,
  Text,
} from 'grommet';

export const Children = () => (
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
        parent={<Anchor label="Open Source" />}
      >
        <ContextualInfo />
      </PageHeader>
    </PageContent>
  </Page>
  // </Grommet>
);

const ContextualInfo = () => (
  <NameValueList
    layout="grid"
    pairProps={{ direction: 'column' }}
    valueProps={{ width: 'small' }}
    pad={{ vertical: 'small' }}
  >
    <NameValuePair name={<Text size="small">Latest Version</Text>}>
      2.22.0
    </NameValuePair>
    <NameValuePair name={<Text size="small">Published</Text>}>
      25 days ago
    </NameValuePair>
  </NameValueList>
);

export default {
  title: 'Layout/PageHeader/Children',
};
