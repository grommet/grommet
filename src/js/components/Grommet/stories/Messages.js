import React from 'react';

import { Box, FileInput, Form, FormField, Grommet, Heading} from 'grommet';

const messageBundle = {
  "grommet.form.required": "必填项目",
  "grommet.fileInput.browse": "浏览",
};

const customMessages = {
  messages: {
    grommet: {
      form: {
        required: 'necesario',
      },
      fileInput: {
        browse: "navegar",
      },
    },
  },
};


export const Messages = () => (
  <>
    <Grommet messages={customMessages}>
      <Heading level={2}>Custom messages</Heading>
      <Box width="medium">
        <Form validate="blur">
          <FormField name="name" label="Name" required />
          <FileInput />
        </Form>
      </Box>
    </Grommet>
    <Grommet messages={{
      format: opts => messageBundle[opts.id],
    }}>
      <Heading level={2}>Message function</Heading>
      <Box width="medium">
        <Form validate="blur">
          <FormField name="name" label="Name" required />
          <FileInput />
        </Form>
      </Box>
    </Grommet>
  </>
);

export default {
  title: 'Utilities/Grommet/Messages',
};
