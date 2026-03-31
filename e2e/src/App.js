import React from 'react';
import {
  Box,
  Button,
  DateInput,
  Form,
  FormField,
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
        <Box width="medium">
          <Form validate="blur">
            <FormField label="Enter a date" name="date-field" required>
              <DateInput
                name="date-field"
                calendarProps={{ reference: '2023-01-01' }}
                format="mm/dd/yyyy-mm/dd/yyyy"
              />
            </FormField>
            <Button type="submit" label="Submit" primary />
          </Form>
        </Box>
      </PageContent>
    </Page>
  </Grommet>
);

export default App;
