import React from 'react';

import {
  Box,
  Button,
  Grommet,
  FileInput,
  Form,
  FormField,
  Layer,
} from 'grommet';
import { grommet } from 'grommet/themes';

export const ConfirmRemove = () => (
  <Grommet full theme={grommet}>
    <Box fill align="center" justify="start" pad="large">
      <Box width="medium">
        <Form onSubmit={({ value }) => console.log(value)}>
          <FormField label="FileInput" name="file-input" htmlFor="file-input">
            <FileInput
              name="file-input"
              id="file-input"
              onChange={(event, { files }) => {
                const fileList = files;
                for (let i = 0; i < fileList.length; i += 1) {
                  const file = fileList[i];
                  console.log(file.name);
                }
              }}
              confirmRemove={({ onConfirm, onCancel }) => (
                <Layer onClickOutside={onCancel} onEsc={onCancel}>
                  <Box pad="medium" gap="medium">
                    Are you sure you want to delete this file?
                    <Box
                      direction="row"
                      align="center"
                      justify="end"
                      gap="small"
                    >
                      <Button label="Cancel" onClick={onCancel} />
                      <Button label="Delete file" onClick={onConfirm} primary />
                    </Box>
                  </Box>
                </Layer>
              )}
              multiple
            />
          </FormField>
          <Button label="Submit" type="submit" />
        </Form>
      </Box>
    </Box>
  </Grommet>
);

ConfirmRemove.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/FileInput/Confirm Remove',
};
