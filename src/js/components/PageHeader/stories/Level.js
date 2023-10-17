import { Button, Page, PageContent, PageHeader } from 'grommet';
import React from 'react';

export const Level = () => (
  <Page>
    <PageContent>
      <PageHeader
        title="Welcome to Your App"
        subtitle="In this example, we showcase different levels of page headers 
        using the `level` prop. Page headers help provide hierarchy 
        and structure to your application's content."
        actions={<Button label="View Details" />}
        level={1} // Use different levels for different headers
      />
      <PageHeader
        title="Main Section"
        subtitle="This is the main section of your application where 
        you can display more detailed information about 
        a specific topic or category."
        actions={<Button label="View Details" />}
        level={2}
      />
      <PageHeader
        title="Subsection"
        subtitle="Subsections provide further organization within a page.They 
        can be used to group related content together."
        actions={<Button label="View Details" />}
        level={3}
      />
    </PageContent>
  </Page>
);

export default {
  title: 'Layout/PageHeader/Level',
};
