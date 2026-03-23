import React from 'react';

import { Box, FileInput, Form, FormField, Grommet, Heading } from 'grommet';

const messageBundle = {
  'form.required': '必填项目',
  'fileInput.browse': '浏览',
};

const customMessages = {
  messages: {
    form: {
      required: 'necesario',
    },
    fileInput: {
      browse: 'navegar',
    },
  },
};

export const Messages = () => (
  <>
    <Grommet messages={customMessages}>
      <Heading level={2}>Custom messages</Heading>
      <Box width="medium">
        <Form validate="blur">
          <FormField
            name="name"
            label="Name"
            aria-label="form field"
            required
          />
          <FileInput aria-label="file input" />
        </Form>
      </Box>
    </Grommet>
    <Grommet
      messages={{
        format: (options) => messageBundle[options.id],
      }}
    >
      <Heading level={2}>Message function</Heading>
      <Box width="medium">
        <Form validate="blur">
          <FormField
            name="name"
            label="Name"
            aria-label="form field"
            required
          />
          <FileInput aria-label="file input" />
        </Form>
      </Box>
    </Grommet>
  </>
);

export default {
  title: 'Utilities/Grommet/Messages',
};
