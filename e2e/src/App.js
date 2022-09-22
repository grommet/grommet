import React from 'react';
import {
  Grommet,
  Heading,
  Page,
  PageContent,
  Paragraph,
} from '../../src/js/components';
import { grommet } from '../../src/js/themes';

const App = () => (
  <Grommet full theme={grommet}>
    <Page>
      <PageContent>
        <Heading>Grommet Testing</Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan
          nisi dictum quis. Aenean porttitor at mi id semper.
        </Paragraph>
      </PageContent>
    </Page>
  </Grommet>
);

export default App;
