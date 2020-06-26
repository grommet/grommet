import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MnetUIBase, Select, Text } from 'mnet-ui-base';
// import { neo as mnet } from 'mnet-ui-base/themes/neo';
import { mnet } from 'mnet-ui-base/themes';
import { SizeSelect, SizeBottomPanel } from '../CustomSelect';
import { TextInput } from '../../TextInput';

const options = ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5'];

const Size = () => {
  const [filteredOptions, setOptions] = useState(options);
  const [selectValues, setSelectValues] = useState({
    value: [],
    previousValue: [],
    open: false,
  });

  const { value, previousValue, open } = selectValues;

  const valueUpdate = () => {
    setSelectValues({ ...selectValues, open: false, previousValue: value });
  }

  const valueCancel = () => {
    setSelectValues({ ...selectValues, open: false, value: previousValue });
  }

  return (
    <MnetUIBase full theme={mnet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
        <Select
          multiple
          open={open}
          // onOpen={setSelectValues({...selectValues, open: true})}
          // onClose={setSelectValues({...selectValues, open: false})}
          closeOnChange={false}
          value={value}
          options={filteredOptions}
          onChange={({ value: nextValue }) =>
            setSelectValues({...selectValues, value: nextValue})
          }
          renderCustomContent={(props) =>
            <SizeSelect
              onOK={valueUpdate}
              onCancel={valueCancel}
              {...props}
            />
          }
          onSearch={text => {
            const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
            const exp = new RegExp(escapedText, 'i');
            setOptions(options.filter(o => exp.test(o)));
          }}
          customSearch={({ search, onSearchChange }) => (
            <Box
              height="xxsmall"
              background="light-2"
            >
              <TextInput
                value={search || ''}
                placeholder="Search"
                onChange={onSearchChange}
                plain
              />
            </Box>
          )}
          valueLabel={
            <Box direction="row" margin={{horizontal:'medium'}} align="center">
              <Text size="medium" weight={600}>
                Select{value.length ? 'ed':''}
              </Text>
              {value.length > 0 && (
                <Box
                  pad="5px"
                  background="red"
                  round="xsmall"
                  margin={{horizontal:'medium'}}
                >
                  <Text size="10px" color="white" weight={600}>
                    {value.length}
                  </Text>
                </Box>
              )}
            </Box>
          }
        />
        </Box>
      </Box>
    </MnetUIBase>
  );
};

const CustomBottomPanel = () => {
  const [value, setValue] = useState([]);

  return (
    <MnetUIBase full theme={mnet}>
      <Box fill align="center" justify="start" pad="large">
        <Select
          placeholder="Select"
          multiple
          closeOnChange={false}
          value={value}
          options={options}
          onChange={({ value: nextValue }) => setValue(nextValue)}
          renderBottomPanel={(props) => <SizeBottomPanel {...props} />}
        />
      </Box>
    </MnetUIBase>
  );
};

storiesOf('Select', module)
  .add('External Render - Size select', () => <Size />)
  .add('External Render - Bottom', () => <CustomBottomPanel />);
