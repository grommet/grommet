import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MnetUIBase, Select } from 'mnet-ui-base';
// import { neo as mnet } from 'mnet-ui-base/themes/neo';
import { mnet } from 'mnet-ui-base/themes';
import {
  SizeSelect,
  SizeBottomPanel,
  ValueLabelWithNumber,
} from '../CustomSelect';
import { TextInput } from '../../TextInput';
import useCustomSelectState from '../useCustomSelectState';

const options = ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5'];

const Size = () => {
  const {
    displayOptions,
    value,
    previousValue,
    open,
    setSelectState,
  } = useCustomSelectState(options);

  return (
    <MnetUIBase full theme={mnet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <Select
            multiple
            open={open}
            onOpen={() => setSelectState({ open: true })}
            onClose={() => setSelectState({ value: previousValue })}
            closeOnChange={false}
            value={value}
            options={displayOptions}
            onChange={({ value: nextValue }) =>
              setSelectState({ value: nextValue })
            }
            renderCustomContent={props => (
              <SizeSelect
                onOK={() =>
                  setSelectState({ open: false, previousValue: value })
                }
                onCancel={() =>
                  setSelectState({ open: false, value: previousValue })
                }
                setValues={nextValue => setSelectState({ value: nextValue })}
                {...props}
              />
            )}
            onSearch={text => {
              const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
              const exp = new RegExp(escapedText, 'i');
              setSelectState({
                displayOptions: options.filter(o => exp.test(o)),
              });
            }}
            customSearch={({ search, onSearchChange }) => (
              <Box height="xxsmall" background="light-2">
                <TextInput
                  value={search || ''}
                  placeholder="Search"
                  onChange={onSearchChange}
                  plain
                />
              </Box>
            )}
            valueLabel={
              <ValueLabelWithNumber number={value.length} color="#FC564F" />
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
          renderBottomPanel={props => <SizeBottomPanel {...props} />}
        />
      </Box>
    </MnetUIBase>
  );
};

storiesOf('Select', module)
  .add('External Render - Size select', () => <Size />)
  .add('External Render - Bottom', () => <CustomBottomPanel />);
