import React from 'react';

import { Box } from '../Box';
import { Select } from '../Select';

import useCustomSelectState from './useCustomSelectState';
import { SingleColumnSelect } from './SingleColumnSelect';
import { ValueLabelWithNumber } from './ValueLabelWithNumber';

const MultiSelect = ({
  width,
  options,
  value,
  onValueChange,
  layout,
  emptySearchMessage,
  withOptionChips,
  withUpdateCancelButtons,
  ...rest
}) => {
  const {
    previousValue,
    open,
    setSelectState,
  } = useCustomSelectState(value);

  const onCancelClick = () => {
    onValueChange(previousValue);
    setSelectState({ open: false });
  }

  const renderContent = (props) => {
    if (layout === 'single-column') {
      return (
        <SingleColumnSelect
          width={width}
          onUpdate={() =>
            setSelectState({ open: false, previousValue: value })
          }
          onCancel={onCancelClick}
          setValues={(nextValue) => onValueChange(nextValue)}
          emptySearchMessage={emptySearchMessage}
          showOptionChips={withOptionChips}
          showControlButtons={withUpdateCancelButtons}
          {...props}
        />
      );
    }
    return null;
  }

  const renderLabel = () => {
    return (
      <ValueLabelWithNumber
        value="Selected"
        number={value.length}
        color="brand"
      />
    );
  }

  return (
    <Box width={width}>
      <Select
        multiple
        value={value}
        options={options}
        onChange={({ value: nextValue }) => onValueChange(nextValue)}
        open={open}
        onOpen={() => setSelectState({ open: true })}
        onClose={
          withUpdateCancelButtons ?
          () => onValueChange(previousValue) : undefined
        }
        closeOnChange={false}
        renderCustomContent={
          ['single-column', 'double-column'].includes(layout) ?
            (props) => renderContent(props) : undefined
        }
        valueLabel={renderLabel()}
        {...rest}
      />
    </Box>
  );
}

MultiSelect.displayName = 'MultiSelect';

let MultiSelectDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  MultiSelectDoc = require('./doc').doc(MultiSelect);
}
const MultiSelectWrapper = MultiSelectDoc || MultiSelect;

export { MultiSelectWrapper as MultiSelect };