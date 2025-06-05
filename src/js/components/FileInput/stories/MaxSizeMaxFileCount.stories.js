import React from 'react';

import { Box, Button, FileInput, Form, FormField } from 'grommet';

export const MaxSizeMaxFileCount = () => {
  const maxSize = 5000000;
  const maxFileCount = 5;

  return (
    <Box fill align="center" justify="start" pad="large">
      <Box width="medium">
        <Form validate="submit">
          <FormField
            label="File Input With Max File Size and Max File Count"
            name="fileInput"
            htmlFor="fileInput"
            required
          >
            <FileInput
              aria-label="Choose files"
              name="fileInput"
              id="fileInput"
              multiple={{
                max: maxFileCount,
              }}
              maxSize={maxSize}
            />
          </FormField>
          <Button label="Submit" primary type="submit" />
        </Form>
      </Box>
    </Box>
  );
};

export default {
  title: 'Input/FileInput/ Max Size Max File Count',
};
