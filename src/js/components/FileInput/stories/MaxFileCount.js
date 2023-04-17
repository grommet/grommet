import React from 'react';

import { Box, Button, FileInput, Form, FormField } from 'grommet';

export const MaxFileCount = () => (
  <Box fill align="center" justify="start" pad="large">
    <Box width="medium">
      <Form validate="submit">
        <FormField name="fileInput" htmlFor="fileInput" required>
          <FileInput
            aria-label="Choose files"
            name="fileInput"
            id="fileInput"
            multiple={{
              max: 5,
            }}
          />
        </FormField>
        <Button label="Submit" primary type="submit" />
      </Form>
    </Box>
  </Box>
);

export default {
  title: 'Input/FileInput/Max File Count',
};
