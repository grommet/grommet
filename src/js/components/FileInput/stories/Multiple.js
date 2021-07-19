import React from 'react';

import { Box, Button, Grommet, FileInput, Form, FormField } from 'grommet';
import { grommet } from 'grommet/themes';

/*

  ! Outstanding issues:
    - Deleting a file and then adding it back does not work
    - Get maxSize error into errors object


  Notes:
    - For Eric -> building in a default message on Form
      + User able to override this message
    - END GOAL:
      + User only has to supply maxSize to FileInput
      + The check under the hood should be the near to this:
        onChange={({ fileInput }) => {                                     
              fileInput.map(({ name, size }) => {
                if (size > maxSize) {                  
                  setError(`Files must not exceed ${parseBytes(maxSize)}`);
                } else {
                  setError(null);
                }
              });
            }}
*/

export const Multiple = () => {
  const error = null;
  const maxSize = 5000000;

  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <Form>
            <FormField
              label="Multiple File Input"
              name="fileInput"
              htmlFor="fileInput"
              required
              error={error}
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
