import React, { useState } from 'react';

import {
  Anchor,
  Form,
  FormField,
  PageHeader,
  Page,
  PageContent,
  Select,
} from 'grommet';

export const Size = () => {
  const [size, setSize] = useState('medium');
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Page>
      <PageContent>
        <PageHeader
          title="Grommet"
          subtitle={`Grommet helps you build responsive and accessible 
          mobile-first projects for the web with an easy to use component 
          library.`}
          actions={
            <Form>
              <FormField
                label="Choose PageHeader size"
                htmlFor="size-select"
                name="size-select"
              >
                <Select
                  id="size-select__input"
                  name="size-select"
                  options={['small', 'medium', 'large']}
                  value={size}
                  onChange={({ option }) => setSize(option)}
                />
              </FormField>
            </Form>
          }
          parent={<Anchor label="Parent Page" />}
          size={size}
        />
      </PageContent>
    </Page>
    // </Grommet>
  );
};

export default {
  title: 'Layout/PageHeader/Size',
};
