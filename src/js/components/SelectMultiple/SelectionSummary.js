import React, { useCallback } from 'react';

import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';
import {
  applyKey,
  getOptionValue,
  useDisabled,
  arrayIncludes,
} from '../Select/utils';

const SelectionSummary = ({
  allOptions,
  clearRef,
  disabled,
  disabledKey,
  isSelected,
  labelKey,
  limit,
  onChange,
  onMore,
  options,
  search,
  setActiveIndex,
  showSelectedInline,
  value,
  valueKey,
}) => {
  const isDisabled = useDisabled(
    disabled,
    disabledKey,
    options,
    valueKey || labelKey,
  );

  const selectedValuesDisabled = useCallback(() => {
    let disabledSelected = 0;
    if (value) {
      for (let i = 0; i < allOptions.length; i += 1) {
        if (
          arrayIncludes(
            value,
            getOptionValue(i, options, valueKey || labelKey),
            valueKey || labelKey,
          ) &&
          isDisabled(i)
        )
          disabledSelected += 1;
      }
      if (value.length === disabledSelected) return true;
    }
    return false;
  }, [value, allOptions, options, valueKey, labelKey, isDisabled]);

  const selectedInSearch = useCallback(
    () =>
      options?.filter((option) =>
        arrayIncludes(value, option, valueKey || labelKey),
      ),
    [options, value, valueKey, labelKey],
  );

  const showSelectAll = !!(
    value?.length === 0 ||
    selectedValuesDisabled() ||
    !value ||
    selectedInSearch().length === 0
  );

  const summaryText =
    value?.length === 0 ||
    onMore ||
    !value ||
    (search !== '' && search !== undefined)
      ? `${value?.length || 0} selected`
      : `${value?.length || 0} selected of ${options.length}`;

  const summaryButtonClick = (event) => {
    if (onChange) {
      let nextSelected = options.filter((i, index) =>
        showSelectAll
          ? !isDisabled(index) || isSelected(index)
          : isDisabled(index) && isSelected(index),
      );
      if (search !== '' && search !== undefined && value) {
        if (showSelectAll) {
          nextSelected = nextSelected.concat(value);
        } else {
          value.forEach((item) => {
            if (!arrayIncludes(options, item, valueKey || labelKey)) {
              nextSelected.push(item);
            }
          });
        }
      }
      const nextValue = nextSelected.map((i) =>
        valueKey && valueKey.reduce ? applyKey(i, valueKey) : i,
      );
      onChange(event, {
        option: options,
        value: nextValue,
        selected: nextSelected,
      });
    }
    if (limit && !showSelectAll) setActiveIndex(0);
  };

  return (
    <Box
      pad={
        showSelectedInline ? { left: 'xsmall', vertical: 'xsmall' } : 'xsmall'
      }
      direction="row"
      justify="between"
      gap="small"
      fill="horizontal"
      flex={showSelectedInline}
      align="center"
      height={{ min: 'xxsmall' }}
    >
      <Text size="small">{summaryText}</Text>
      {(options.length &&
        (!limit ||
          !(!value || (value?.length === 0 && selectedValuesDisabled())))) >
        0 &&
        (!onMore || (onMore && value?.length !== 0)) && (
          <Button
            a11yTitle={
              showSelectAll
                ? `Select all ${options.length} options`
                : `${value?.length} options selected. Clear all?`
            }
            label={showSelectAll ? 'Select All' : 'Clear All'}
            onClick={(event) => summaryButtonClick(event)}
            onFocus={() => setActiveIndex(-1)}
            ref={clearRef}
          />
        )}
    </Box>
  );
};

export { SelectionSummary };
