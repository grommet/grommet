import React from 'react';

import { Box, Grommet, FileInput, Form, FormField } from 'grommet';
import { grommet } from 'grommet/themes';

export const Simple = () => {
  const maxSize = 1000000;

  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <Form validate="change">
            <FormField
              label="Simple File Input"
              name="file-input"
              htmlFor="file-input"
            >
              <FileInput
                id="file-input"
                name="file-input"
                maxSize={maxSize}
                onChange={(event) => {
                  const fileList = event.target.files;
                  for (let i = 0; i < fileList.length; i += 1) {
                    const file = fileList[i];
                    console.log(file);
                  }
                  return '';
                }}
              />
            </FormField>
          </Form>
        </Box>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Input/FileInput/Simple',
};
