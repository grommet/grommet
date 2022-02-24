import React from 'react';
import { Page, Heading, Paragraph, Grid, Card, PageSection } from 'grommet';

export const Simple = () => (
  <Page kind="wide">
    <PageSection>
      <Heading>Wide Page</Heading>
    </PageSection>
    <PageSection fullBackground="dark-3">
      Background goes all the way across regardless of Page kind (wide, narrow,
      or full). This is accomplished by setting the `fullBackground` prop on
      PageContent.
    </PageSection>
    <PageSection>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo
        gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi
        dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum
        leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus
        nunc porta egestas. Fusce dapibus lobortis tincidunt.
      </Paragraph>
    </PageSection>
    <PageSection background="light-4">
      Background width is restricted by Page kind (wide, narrow, or full).
      <Grid rows="small" columns={{ count: 'fit', size: 'small' }} gap="small">
        <Card background="white" pad="large">
          Card
        </Card>
        <Card background="white" pad="large">
          Card
        </Card>
      </Grid>
    </PageSection>
    <PageSection>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo
        gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi
        dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum
        leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus
        nunc porta egestas. Fusce dapibus lobortis tincidunt.
      </Paragraph>
    </PageSection>
  </Page>
);

export default {
  title: 'Layout/Page/Simple',
};
