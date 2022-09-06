import React, { useCallback } from 'react';

import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';
import { applyKey, getOptionValue, useDisabled } from '../Select/utils';

const SelectionSummary = ({
  allOptions,
  clearRef,
  disabled,
  disabledKey,
  isSelected,
  labelKey,
  limit,
  onChange,
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
    for (let i = 0; i < allOptions.length; i += 1) {
      if (
        value.includes(getOptionValue(i, options, valueKey || labelKey)) &&
        isDisabled(i)
      )
        disabledSelected += 1;
    }
    if (value.length === disabledSelected) return true;
    return false;
  }, [value, allOptions, options, valueKey, labelKey, isDisabled]);

  if (search === '' || search === undefined)
    return (
      <Box
        pad={showSelectedInline ? { vertical: 'xsmall' } : 'small'}
        direction="row"
        justify="between"
        gap="small"
        fill="horizontal"
        flex
      >
        <Box alignSelf="center">
          <Text size="small">
            {value.length === 0
              ? `0 selected`
              : `${value.length} selected of ${options.length}`}
          </Text>
        </Box>
        {(options.length &&
          (!limit || !(value.length === 0 && selectedValuesDisabled()))) >
          0 && (
          <Button
            a11yTitle={
              value.length === 0 || selectedValuesDisabled()
                ? `Select all ${options.length} options`
                : `${value.length} options selected. Clear all?`
            }
            label={
              value.length === 0 || selectedValuesDisabled()
                ? 'Select All'
                : 'Clear All'
            }
            onClick={(event) => {
              const selectAll = value.length === 0 || selectedValuesDisabled();
              if (onChange) {
                const nextSelected = options.filter((i, index) =>
                  selectAll
                    ? !isDisabled(index) || isSelected(index)
                    : isDisabled(index) && isSelected(index),
                );
                const nextValue = nextSelected.map((i) =>
                  valueKey && valueKey.reduce ? applyKey(i, valueKey) : i,
                );
                onChange(event, {
                  option: options,
                  value: nextValue,
                  selected: nextSelected,
                });
              }
              if (limit && !selectAll) setActiveIndex(0);
            }}
            onFocus={() => setActiveIndex(-1)}
            ref={clearRef}
          />
        )}
      </Box>
    );
  return <Text size="small">{`${value.length} selected`}</Text>;
};

export { SelectionSummary };
