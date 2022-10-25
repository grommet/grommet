import React from 'react';
import {
  Box,
  Button,
  Keyboard,
  Text,
  Calendar,
  MaskedInput,
  DropButton,
} from 'grommet';
import { Schedule } from 'grommet-icons';

const DropContent = ({ date: initialDate, time: initialTime, onClose }) => {
  const [date, setDate] = React.useState();
  const [time, setTime] = React.useState();

  const close = () => onClose(date || initialDate, time || initialTime);

  return (
    <Box align="center">
      <Calendar
        animate={false}
        date={date || initialDate}
        onSelect={setDate}
        showAdjacentDays={false}
      />
      <Box flex={false} pad="medium" gap="medium">
        <Keyboard
          onEnter={(event) => {
            event.preventDefault(); // so drop doesn't re-open
            close();
          }}
        >
          <MaskedInput
            mask={[
              {
                length: [1, 2],
                options: [
                  '1',
                  '2',
                  '3',
                  '4',
                  '5',
                  '6',
                  '7',
                  '8',
                  '9',
                  '10',
                  '11',
                  '12',
                ],
                regexp: /^1[1-2]$|^[0-9]$/,
                placeholder: 'hh',
              },
              { fixed: ':' },
              {
                length: 2,
                options: ['00', '15', '30', '45'],
                regexp: /^[0-5][0-9]$|^[0-9]$/,
                placeholder: 'mm',
              },
              { fixed: ' ' },
              {
                length: 2,
                options: ['am', 'pm'],
                regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
                placeholder: 'ap',
              },
            ]}
            value={time || initialTime}
            name="maskedInput"
            onChange={(event) => setTime(event.target.value)}
          />
        </Keyboard>
        <Box flex={false}>
          <Button label="Done" onClick={close} />
        </Box>
      </Box>
    </Box>
  );
};

export const DateTimeDropButton = () => {
  const [date, setDate] = React.useState();
  const [time, setTime] = React.useState('');
  const [open, setOpen] = React.useState();

  const onClose = (nextDate, nextTime) => {
    setDate(nextDate);
    setTime(nextTime);
    setOpen(false);
    setTimeout(() => setOpen(undefined), 1);
  };

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box align="center" pad="large">
      <DropButton
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        dropContent={<DropContent date={date} time={time} onClose={onClose} />}
      >
        <Box direction="row" gap="medium" align="center" pad="small">
          <Text color={date ? undefined : 'dark-2'}>
            {date
              ? `${new Date(date).toLocaleDateString()} ${time}`
              : 'Select date & time'}
          </Text>
          <Schedule />
        </Box>
      </DropButton>
    </Box>
    // </Grommet>
  );
};

DateTimeDropButton.storyName = 'Date time drop';

export default {
  title: 'Input/MaskedInput/Date time drop',
};
