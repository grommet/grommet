import React, { useState } from 'react';

import { Box, DateInput, Text } from 'grommet';

const DATE = '2020-07-02';
const DATETZ = '2020-07-02T00:00:00-08:00';
const DATE_RANGE = ['2020-07-02', '2020-07-05'];
const DATE_RANGETZ = ['2020-07-02T00:00:00-08:00', '2020-07-05T00:00:00-08:00'];

export const FormatInline = () => {
  const [date, setDate] = useState();
  const [emptyDate, setEmptyDate] = useState();
  const [dateRange, setDateRange] = useState();
  const [dateNoTZ, setDateNoTZ] = useState();
  const [dateRangeNoTZ, setDateRangeNoTZ] = useState();
  const [dateNoDefault, setDateNoDefault] = useState();
  const [dateStateDefault, setDateStateDefault] = useState(DATETZ);
  const [dateStateDefaultNoTZ, setDateStateDefaultNoTZ] = useState(DATE);

  const onChangeEmpty = (event) => {
    const nextValue = event.value;
    console.log('onChange iso date:', nextValue);
    console.log('onChange utc date:', new Date(nextValue));
    setEmptyDate(nextValue);
  };

  const onChangeTZ = (event) => {
    const nextValue = event.value;
    console.log('onChange iso date:', nextValue);
    console.log('onChange utc date:', new Date(nextValue));
    setDate(nextValue);
  };

  const onChangeNoTZ = (event) => {
    const nextValue = event.value;
    console.log('onChange iso date:', nextValue);
    console.log('onChange utc date:', new Date(nextValue));
    setDateNoTZ(nextValue);
  };

  const onChangeRange = (event) => {
    const nextValue = event.value;
    console.log('onChange iso date:', nextValue);
    console.log('onChange utc date:', new Date(nextValue));
    setDateRange(nextValue);
  };

  const onChangeRangeNoTZ = (event) => {
    const nextValue = event.value;
    console.log('onChange iso date:', nextValue);
    console.log('onChange utc date:', new Date(nextValue));
    setDateRangeNoTZ(nextValue);
  };

  const onChangeNoDefault = (event) => {
    const nextValue = event.value;
    console.log('onChange iso date:', nextValue);
    console.log('onChange utc date:', new Date(nextValue));
    setDateNoDefault(nextValue);
  };

  const onChangeStateDefault = (event) => {
    const nextValue = event.value;
    console.log('onChange iso date:', nextValue);
    console.log('onChange utc date:', new Date(nextValue));
    setDateStateDefault(nextValue);
  };

  const onChangeStateDefaultNoTZ = (event) => {
    const nextValue = event.value;
    console.log('onChange iso date:', nextValue);
    console.log('onChange utc date:', new Date(nextValue));
    setDateStateDefaultNoTZ(nextValue);
  };

  return (
    <Box pad="large" gap="medium">
      <Box gap="small" align="start">
        <Text weight="bold">
          1) When defaultValue is [], everything should be local
        </Text>
        <Text>defaultValue: []</Text>
        <Text>
          Current value:{' '}
          {emptyDate ? `${emptyDate[0]} — ${emptyDate[1]}` : '--'}
        </Text>
        <DateInput
          id="item"
          name="item"
          defaultValue={[]}
          format="mm/dd/yyyy-mm/dd/yyyy"
          inline
          value={emptyDate}
          onChange={onChangeEmpty}
        />
      </Box>
      <Box gap="small" align="start">
        <Text weight="bold">
          2) When defaultValue has a timezone, everything stays in that timezone
        </Text>
        <Text>defaultValue: {DATETZ}</Text>
        <Text>Current value: {date || '--'}</Text>
        <DateInput
          format="mm/dd/yyyy"
          inline
          value={date}
          onChange={onChangeTZ}
          defaultValue={DATETZ}
          calendarProps={{
            bounds: ['2020-07-01', '2020-07-31'],
          }}
        />
      </Box>
      <Box gap="small" align="start">
        <Text weight="bold">
          3) When defaultValue has no timezone, everything is returned without a
          timezone and is assumed to be local time
        </Text>
        <Text>defaultValue: {DATE}</Text>
        <Text>Current value: {dateNoTZ || '--'}</Text>
        <DateInput
          format="mm/dd/yyyy"
          inline
          value={dateNoTZ}
          onChange={onChangeNoTZ}
          defaultValue={DATE}
        />
      </Box>
      <Box gap="small" align="start">
        <Text weight="bold">
          4) When defaultValue is a range and has a timezone, everything stays
          in that timezone
        </Text>
        <Text>defaultValue: {`${DATE_RANGETZ[0]} — ${DATE_RANGETZ[1]}`}</Text>
        <Text>
          Current value:{' '}
          {dateRange ? `${dateRange[0]} — ${dateRange[1]}` : '--'}
        </Text>
        <DateInput
          format="mm/dd/yyyy-mm/dd/yyyy"
          inline
          value={dateRange}
          onChange={onChangeRange}
          defaultValue={DATE_RANGETZ}
        />
      </Box>
      <Box gap="small" align="start">
        <Text weight="bold">
          5) When defaultValue is a range and has no timezone, everything is
          returned without a timezone and is assumed to be local time
        </Text>
        <Text>defaultValue: {`${DATE_RANGE[0]} — ${DATE_RANGE[1]}`}</Text>
        <Text>
          Current value:{' '}
          {dateRangeNoTZ ? `${dateRangeNoTZ[0]} — ${dateRangeNoTZ[1]}` : '--'}
        </Text>
        <DateInput
          format="mm/dd/yyyy-mm/dd/yyyy"
          inline
          value={dateRangeNoTZ}
          onChange={onChangeRangeNoTZ}
          defaultValue={DATE_RANGE}
        />
      </Box>
      <Box gap="small" align="start">
        <Text weight="bold">
          6) When no defaultValue, everything is in UTC relative to local
        </Text>
        <Text>defaultValue: undefined</Text>
        <Text>Current value: {dateNoDefault || '--'}</Text>
        <DateInput
          format="mm/dd/yyyy"
          inline
          value={dateNoDefault}
          onChange={onChangeNoDefault}
        />
      </Box>
      <Box gap="small" align="start">
        <Text weight="bold">
          7) When state has default value with TZ, everything everything stays
          in that timezone
        </Text>
        <Text>defaultValue: {DATETZ}</Text>
        <Text>Current value: {dateStateDefault || '--'}</Text>
        <DateInput
          format="mm/dd/yyyy"
          inline
          value={dateStateDefault}
          onChange={onChangeStateDefault}
        />
      </Box>
      <Box gap="small" align="start">
        <Text weight="bold">
          8) When state has default value w/o TZ, everything is returned without
          a timezone and is assumed to be local time
        </Text>
        <Text>defaultValue: {DATE}</Text>
        <Text>Current value: {dateStateDefaultNoTZ || '--'}</Text>
        <DateInput
          format="mm/dd/yyyy"
          inline
          value={dateStateDefaultNoTZ}
          onChange={onChangeStateDefaultNoTZ}
        />
      </Box>
    </Box>
  );
};

FormatInline.storyName = 'Format inline';

export default {
  title: 'Input/DateInput/Format inline',
};
