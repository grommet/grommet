/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react';

import { Box } from '../Box';
import { Select } from '../Select';

import { ColumnSelect } from './ColumnSelect';
import { ValueLabelWithNumber } from './ValueLabelWithNumber';
import { applyKey } from './utils';

const MultiSelect = ({
  width,
  height,
  options,
  value: valueProp,
  labelKey,
  valueKey,
  onValueChange,
  layout,
  onSearch,
  searchPlaceholder,
  emptySearchMessage,
  withSelectAll,
  withOptionChips,
  withUpdateCancelButtons,
  searchable,
  custom,
  withInclusionExclusion,
  isExcluded: isExcludedProp,
  onIncExcChange,
  renderEmptySelected,
  gridArea,
  validate,
  ...rest
}) => {

  const [internalValue, updateInternalValue] = useState(valueProp);
  const [
    internalIsExcluded,
    updateInternalIsExcluded,
  ] = useState(isExcludedProp);
  const [isOpen, updateIsOpen] = useState(false);
  const [search, updateSearch] = useState('');

  const isExcluded = withUpdateCancelButtons ? 
  internalIsExcluded : isExcludedProp;

  const value = withUpdateCancelButtons ? internalValue: valueProp;

  useEffect(() => {
    if (!isOpen && withUpdateCancelButtons) {
      updateInternalValue(valueProp);
    }
  }, [isOpen, valueProp, withUpdateCancelButtons]);

  const onClose = () => {
    if (withInclusionExclusion) {
      updateInternalValue(valueProp);
      updateInternalIsExcluded(isExcludedProp);
    }
    updateIsOpen(false);
  };

  const onOpen = () => {
    if (withInclusionExclusion) {
      updateInternalValue(valueProp);
      updateInternalIsExcluded(isExcludedProp);
    }
    updateIsOpen(true);
  }

  const onIncludeExclude = newValue => {
    const updater = withUpdateCancelButtons ? 
    updateInternalIsExcluded : onIncExcChange;
    updater(newValue);
  }

  const onCancelClick = () => {
    onClose();
  };

  const onOkClick = () => {
    onValueChange(value);
    if (onIncExcChange) {
      onIncExcChange(isExcluded);
    }
    updateIsOpen(false);
  }

  const getValue = (index, array, param) => applyKey(array[index], param);

  const onSearchChange = searchInput => {
    const escapedText = searchInput.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    updateSearch(escapedText);
  };

  const getOptions = useCallback(() => {
    if (!search) {
      return options;
    }
    const exp = new RegExp(search, 'i');
    return options.filter((item, index) =>
      exp.test(getValue(index, options, labelKey)),
    );
  }, [options, search])

  const getOptionsNotMatchingSearch = useCallback(() => {
    if (!search) {
      return [];
    }
    const exp = new RegExp(search, 'i');
    return options.filter((item, index) =>
      !exp.test(getValue(index, options, labelKey)),
    );
  }, [options, search])

  const onSelectValueChange = ({ value: newValue }) => {
    const valuesNotMatchingSearch = getOptionsNotMatchingSearch()
    .filter((item, index, opt) => 
    value.includes(getValue(index, opt, valueKey)))
    .map((item, index, opt)=> getValue(index, opt, valueKey));

    const updater = withUpdateCancelButtons ? 
    updateInternalValue : 
    onValueChange;
    updater([...valuesNotMatchingSearch, ...newValue]);
  };

  const renderContent = props => {
    if (['single-column', 'double-column'].includes(layout)) {
      return (
        <ColumnSelect
          layout={layout}
          width={width}
          height={height}
          onOk={onOkClick}
          onCancel={onCancelClick}
          onChange={onSelectValueChange}
          emptySearchMessage={emptySearchMessage}
          showSelectAll={withSelectAll}
          showOptionChips={withOptionChips}
          showControlButtons={withUpdateCancelButtons}
          inclusionExclusion={withInclusionExclusion}
          isExcluded={isExcluded}
          setIncExcVal={onIncludeExclude}
          renderSearch={searchable && !onSearch}
          searchPlaceholder={searchPlaceholder}
          searchValue={search}
          onSearchChange={onSearchChange}
          renderEmptySelected={renderEmptySelected}
          onValueChange={onValueChange}
          custom={custom}
          validate={validate}
          {...props}
        />
      );
    }
    return null;
  };

  const renderLabel = () => {
    const getLabel = () => {
      if (withInclusionExclusion && isExcluded) return 'Excluded';
      if (withInclusionExclusion && isExcluded === false) return 'Included';
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
    <Box width={width} gridArea={gridArea}>
      <Select
        multiple
        value={value}
        options={getOptions()}
        onChange={onSelectValueChange}
        open={isOpen}
        onOpen={onOpen}
        onClose={onClose}
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
