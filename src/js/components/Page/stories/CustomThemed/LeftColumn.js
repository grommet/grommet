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
  Grommet,
} from 'grommet';

const customTheme = {
  page: {
    customKind: {
      alignSelf: 'start',
      width: {
        min: '200px',
        max: '500px',
      },
      pad: {
        small: 'medium',
        medium: 'medium',
        large: 'medium',
      },
      margin: { vertical: 'small', horizontal: 'small' },
    },
  },
};

export const LeftColumn = () => (
  <Grommet theme={customTheme}>
    <Box background="#35bd55">
      <Heading>Global Header</Heading>
    </Box>
    <Page kind="customKind">
      <PageSection>
        <Header>
          <Heading>Heading</Heading>
        </Header>
      </PageSection>
      <PageSection fullBackground="pink">
        Background goes all the way across Page width regardless of Page kind
        (wide, narrow, full, or custom). This is accomplished by setting the
        `fullBackground` prop on PageContent.
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
  </Grommet>
);

LeftColumn.storyName = 'Left Column';

export default {
  title: 'Layout/Page/Left Column',
};
