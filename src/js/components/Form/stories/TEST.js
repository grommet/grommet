import React from 'react';
import { Box, Button, Grommet, Form, FormField, TextInput } from 'grommet';

const servers = [
  { name: 'Server-1', ipaddr: '10.10.10.10' },
  { name: 'Server-2', ipaddr: '20.20.20.20' },
];

export const Test = () => {
  const [entries, setEntries] = React.useState(servers);
  const [formValues, setFormValues] = React.useState();

  React.useEffect(() => {
    // setFormValues(entries);
  }, [entries]);

  return (
    <Grommet full>
      <Box fill align="center" justify="center">
        <Form
          value={formValues}
          validate="blur"
          onChange={nextValue => setFormValues(nextValue)}
          onSubmit={({ value }) => console.log(value)}
          onValidate={obj => console.log('obj = ', obj)}
        >
          {entries &&
            entries.map(entry => {
              return (
                <FormField
                  key={entry.name}
                  htmlFor={entry.name}
                  name={entry.name}
                  label={entry.name}
                  required
                >
                  <TextInput
                    id={entry.name}
                    name={entry.name}
                    value={entry.ipaddr}
                  />
                </FormField>
              );
            })}
          <Button
            type="button"
            label="Add"
            secondary
            onClick={() => {
              setEntries([...entries, { name: 'New server', ipaddr: '' }]);
            }}
          />
          <Button type="submit" label="Submit" primary />
        </Form>
      </Box>
    </Grommet>
  );
};
