import React from 'react';
import {
  Page,
  Box,
  Header,
  Heading,
  Paragraph,
  Grid,
  Card,
  PageSection,
  Text,
} from 'grommet';

export const Narrow = () => (
  <>
    <Box background="#35bd55">
      <Heading>Global Header</Heading>
    </Box>
    <Page kind="narrow">
      <PageSection fill={false} border>
        <Header direction="column">
          <Heading>Heading</Heading>
          <Text>PageSection with `fill` set to false.</Text>
        </Header>
      </PageSection>
      <PageSection fullBackground="pink">
        Background goes all the way across regardless of Page kind (wide,
        narrow, or full). This is accomplished by setting the `fullBackground`
        prop on PageContent.
      </PageSection>
      <PageSection fullBackground="url(//v2.grommet.io/assets/IMG_4245.jpg)">
        <Text color="white">`fullBackground` prop set with an image.</Text>
      </PageSection>
      <PageSection
        fullBackground="url(//v2.grommet.io/assets/IMG_4245.jpg)"
        background="pink"
      >
        `fullBackground` prop set with an image and `background` prop set to
        pink.
      </PageSection>
      <PageSection>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan
          nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis
          bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim
          faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt.
        </Paragraph>
      </PageSection>
      <PageSection background="orange">
        Background width is restricted by Page kind (wide, narrow, or full).
        <Grid
          rows="small"
          columns={{ count: 'fit', size: 'small' }}
          gap="small"
        >
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan
          nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis
          bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim
          faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt.
        </Paragraph>
      </PageSection>
    </Page>
    <Box background="#35bd55">
      <Heading>Global Footer</Heading>
    </Box>
  </>
);

export default {
  title: 'Layout/Page/Narrow',
};
