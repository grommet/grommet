import React from 'react';
import { Page, PageContent, Heading, Paragraph, Grid, Card } from 'grommet';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Page>
    <PageContent>
      <Heading>Wide Page</Heading>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo
        gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi
        dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum
        leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus
        nunc porta egestas. Fusce dapibus lobortis tincidunt.
      </Paragraph>
      <Grid rows="small" columns={{ count: 'fit', size: 'small' }} gap="small">
        <Card background="white" pad="large">
          Card
        </Card>
        <Card background="white" pad="large">
          Card
        </Card>
      </Grid>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo
        gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi
        dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum
        leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus
        nunc porta egestas. Fusce dapibus lobortis tincidunt.
      </Paragraph>
    </PageContent>
  </Page>
  // </Grommet>
);

export default {
  title: 'Layout/Page/Simple',
};
