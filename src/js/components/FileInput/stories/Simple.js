import React from 'react';

import { Box, Grommet, FileInput, Form, FormField } from 'grommet';
import { grommet } from 'grommet/themes';

export const Simple = () => {
  const [exceeded, setExceeded] = React.useState([]);
  const maxSize = 1000000;
  const [error, setError] = React.useState('');

  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <Form
            validate="change"
            onValidate={() => {
              let message;
              if (exceeded.length > 0) message = 'Maximum File Size Exceeded';
              else message = '';
              setError(message);
              return message;
            }}
          >
            <FormField
              label="Simple File Input"
              name="file-input"
              htmlFor="file-input"
              error={error}
            >
              <FileInput
                id="file-input"
                name="file-input"
                maxSize={maxSize}
                onChange={(event) => {
                  const fileList = event.target.files;
                  for (let i = 0; i < fileList.length; i += 1) {
                    const file = fileList[i];
                    if (file.size > maxSize) {
                      return setExceeded(...exceeded, file.name);
                    }
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
