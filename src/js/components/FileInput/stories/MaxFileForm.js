import React from 'react';

import { Box, Button, Grommet, FileInput, Form, FormField } from 'grommet';
import { grommet } from 'grommet/themes';

export const MaxFileForm = () => (
  <Grommet full theme={grommet}>
    <Box fill align="center" justify="start" pad="large">
      <Box width="medium">
        <Form validate="submit">
          <FormField
            name="fileInput"
            htmlFor="fileInput"
            required
            help="8 Files Max"
          >
            <FileInput
              name="fileInput"
              id="fileInput"
              multiple={{
                max: 8,
              }}
            />
          </FormField>
          <Button label="Submit" primary type="submit" />
        </Form>
      </Box>
    </Box>
  </Grommet>
);

export default {
  title: 'Input/FileInput/Max File Form',
};
