import React, { useEffect } from 'react';

import { Box } from '../Box';
import { Select } from '../Select';

import useCustomSelectState from './useCustomSelectState';
import { SingleColumnSelect } from './SingleColumnSelect';
import { ValueLabelWithNumber } from './ValueLabelWithNumber';

const MultiSelect = ({
  width,
  options,
  values,
  onValueChange,
  column,
  ...rest
}) => {
  const {
    previousValue,
    open,
    setSelectState,
  } = useCustomSelectState();

  useEffect(() => {
    setSelectState({ previousValue: values });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCancelClick = () => {
    onValueChange(previousValue);
    setSelectState({ open: false });
  }

  const renderContent = (props) => {
    if (column === 'single') {
      return (
        <SingleColumnSelect
          width={width}
          onUpdate={() =>
            setSelectState({ open: false, previousValue: values })
          }
          onCancel={onCancelClick}
          setValues={(value) => onValueChange(value)}
          {...props}
        />
      )
    }
    return null;
  }

  const renderLabel = () => {
    return (
      <ValueLabelWithNumber
        value="Selected"
        number={values.length}
        color="#FC564F"
      />
    );
  }

  return (
    <Box width={width}>
      <Select
        multiple
        value={values}
        options={options}
        onChange={({ value }) => onValueChange(value)}
        open={open}
        onOpen={() => setSelectState({ open: true })}
        onClose={() => onValueChange(previousValue)}
        closeOnChange={false}
        renderCustomContent={
          ['single', 'double'].includes(column) ?
            (props) => renderContent(props) : undefined
        }
        valueLabel={renderLabel()}
        {...rest}
      />
    </Box>
  )
}

MultiSelect.displayName = 'MultiSelect';

let MultiSelectDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  MultiSelectDoc = require('./doc').doc(MultiSelect);
}
const MultiSelectWrapper = MultiSelectDoc || MultiSelect;

export { MultiSelectWrapper as MultiSelect };