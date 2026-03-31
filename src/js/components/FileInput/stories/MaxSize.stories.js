import React from 'react';

import { Box, Button, FileInput, Form, FormField } from 'grommet';

export const MaxSize = () => {
  const maxSize = 5000000;

  return (
    <Box fill align="center" justify="start" pad="large">
      <Box width="medium">
        <Form validate="submit">
          <FormField
            label="File Input With Max Size"
            name="fileInput"
            htmlFor="fileInput"
            required
          >
            <FileInput
              name="fileInput"
              id="fileInput"
              multiple
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
  title: 'Input/FileInput/Max Size',
};
