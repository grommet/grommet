import React from 'react';
import {
  Page,
  PageContent,
  Header,
  Heading,
  Paragraph,
  Grid,
  Card,
} from 'grommet';

export const MultipleContent = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Page kind="narrow">
    <PageContent background={{ fill: 'horizontal', color: 'white' }}>
      <Header>
        <Heading>Page Header</Heading>
      </Header>
    </PageContent>
    <PageContent>
      <Heading level={2}>Narrow Page</Heading>
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

MultipleContent.storyName = 'Multiple content';

export default {
  title: 'Layout/Page/Multiple content',
};
