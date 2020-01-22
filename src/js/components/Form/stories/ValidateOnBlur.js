import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, Grommet, Form, FormField } from 'grommet';
import { grommet } from 'grommet/themes';

const Example = () => (
  <Grommet full theme={grommet}>
    <Box fill align="center" justify="center">
      <Box width="medium">
        <Form
          validate="blur"
          onReset={event => console.log(event)}
          onSubmit={({ value }) => console.log('Submit', value)}
        >
          <FormField
            label="Name"
            name="name"
            required
            validate={[
              { regexp: /^[a-z]/i },
              name => {
                if (name && name.length === 1) return 'must be >1 character';
                return undefined;
              },
            ]}
          />
          <FormField label="Email" name="email" type="email" required />
          <Box direction="row" justify="between" margin={{ top: 'medium' }}>
            <Button label="Cancel" />
            <Button type="reset" label="Reset" />
            <Button type="submit" label="Update" primary />
          </Box>
        </Form>
      </Box>
    </Box>
  </Grommet>
);

storiesOf('Form', module).add('Validate on blur', () => <Example />);
