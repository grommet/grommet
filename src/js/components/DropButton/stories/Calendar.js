import React from 'react';
import { storiesOf } from '@storybook/react';
import { FormDown } from 'grommet-icons';

import { Box, Calendar, DropButton, Text } from 'mnet-ui-base';

const CalendarDropButton = () => {
  const [date, setDate] = React.useState();
  const [open, setOpen] = React.useState();

  const onSelect = selectedDate => {
    setDate(selectedDate);
    setOpen(false);
  };

  return (
    <>
      <Box align="center" pad="large">
        <DropButton
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          dropContent={<Calendar date={date} onSelect={onSelect} />}
        >
          <Box direction="row" gap="medium" align="center" pad="small">
            <Text>
              {date ? new Date(date).toLocaleDateString() : 'Select date'}
            </Text>
            <FormDown color="brand" />
          </Box>
        </DropButton>
      </Box>
    </>
  );
};

storiesOf('DropButton', module).add('Calendar', () => <CalendarDropButton />);
