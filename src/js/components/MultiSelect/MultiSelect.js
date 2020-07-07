import React, { useEffect } from 'react';

import { Box } from '../Box';
import { Select } from '../Select';

import useCustomSelectState from './useCustomSelectState';
import { ColumnSelect } from './ColumnSelect';
import { ValueLabelWithNumber } from './ValueLabelWithNumber';
import { applyKey } from './utils';

const MultiSelect = ({
  width,
  options,
  value,
  labelKey,
  valueKey,
  onValueChange,
  layout,
  onSearch,
  searchPlaceholder,
  emptySearchMessage,
  withOptionChips,
  withUpdateCancelButtons,
  searchable,
  custom,
  withInclusionExclusion,
  isExcluded,
  onIncExcChange,
  renderEmptySelected,
  ...rest
}) => {
  const {
    filteredOptions,
    previousValue,
    open,
    searchVal,
    setSelectState,
  } = useCustomSelectState(options, value);

  useEffect(() => {
    if (withInclusionExclusion && value.length === 0) onIncExcChange(null);
  }, [onIncExcChange, value, withInclusionExclusion]);

  const onCancelClick = () => {
    onValueChange(previousValue);
    setSelectState({ open: false });
  };

  const getValue = (index, array, param) => applyKey(array[index], param);

  const onSearchChange = search => {
    const escapedText = search.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    const exp = new RegExp(escapedText, 'i');
    setSelectState({
      searchVal: search,
      filteredOptions: options.filter((item, index) =>
        exp.test(getValue(index, options, labelKey)),
      ),
    });
  };

  const onSelectValueChange = selectValue => {
    if (!searchVal) onValueChange(selectValue);
    else {
      const newValue = value.slice(0);
      const nonSelected = filteredOptions.map((val, ind) =>
        getValue(ind, filteredOptions, valueKey),
      );
      selectValue.forEach(item => {
        if (nonSelected.includes(item))
          nonSelected.splice(nonSelected.indexOf(item), 1);
        if (!value.includes(item)) newValue.push(item);
      });
      onValueChange(newValue.filter(item => !nonSelected.includes(item)));
    }
  };

  const setIncExcVal = incExc => {
    onIncExcChange(incExc);
  };

  const renderContent = props => {
    if (['single-column', 'double-column'].includes(layout)) {
      return (
        <ColumnSelect
          layout={layout}
          width={width}
          onUpdate={() => setSelectState({ open: false, previousValue: value })}
          onCancel={onCancelClick}
          setValues={nextValue => onSelectValueChange(nextValue)}
          emptySearchMessage={emptySearchMessage}
          showOptionChips={withOptionChips}
          showControlButtons={withUpdateCancelButtons}
          inclusionExclusion={withInclusionExclusion}
          isExcluded={isExcluded}
          setIncExcVal={incExc => setIncExcVal(incExc)}
          renderSearch={searchable && !onSearch}
          searchPlaceholder={searchPlaceholder}
          searchValue={searchVal || ''}
          onSearchChange={search => onSearchChange(search)}
          renderEmptySelected={renderEmptySelected}
          onValueChange={onValueChange}
          custom={custom}
          {...props}
        />
      );
    }
    return null;
  };

  const renderLabel = () => {
    const getLabel = () => {
      if (withInclusionExclusion) return isExcluded ? 'Excluded' : 'Included';
      return 'Selected';
    };

    return (
      <ValueLabelWithNumber
        value={getLabel()}
        number={value.length}
        color="brand"
      />
    );
  };

  return (
    <Box width={width}>
      <Select
        multiple
        value={value}
        options={filteredOptions}
        onChange={({ value: nextValue }) => onSelectValueChange(nextValue)}
        open={open}
        onOpen={() => setSelectState({ open: true })}
        onClose={
          withUpdateCancelButtons
            ? () => onValueChange(previousValue)
            : undefined
        }
        closeOnChange={false}
        renderCustomContent={
          ['single-column', 'double-column'].includes(layout)
            ? props => renderContent(props)
            : undefined
        }
        valueLabel={renderLabel()}
        labelKey={labelKey}
        valueKey={valueKey}
        onSearch={onSearch}
        searchPlaceholder={searchPlaceholder}
        emptySearchMessage={emptySearchMessage}
        {...rest}
      />
    </Box>
  );
};

MultiSelect.displayName = 'MultiSelect';

let MultiSelectDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  MultiSelectDoc = require('./doc').doc(MultiSelect);
}
const MultiSelectWrapper = MultiSelectDoc || MultiSelect;

export { MultiSelectWrapper as MultiSelect };
