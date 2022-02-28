import React from 'react';
import {
  Page,
  Header,
  Heading,
  Paragraph,
  Grid,
  Card,
  PageContent,
} from 'grommet';

export const Narrow = () => (
  <Page kind="narrow" plain background="dark-4">
    <PageContent background={{ fill: 'horizontal', color: 'white' }}>
      <Header>
        <Heading>Narrow Page</Heading>
      </Header>
    </PageContent>
    <PageContent background="light-2">
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
);

export default {
  title: 'Layout/Page/Narrow',
};
