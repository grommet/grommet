import React from 'react';

import { Box, Button, Grommet, FileInput, Form, FormField } from 'grommet';
import { grommet } from 'grommet/themes';

export const Multiple = () => {
  const maxSize = 5000000;

  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <Form validate="submit">
            <FormField
              label="Multiple File Input"
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
            <Button label="Create" primary type="submit" />
          </Form>
        </Box>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Input/FileInput/Multiple',
};
