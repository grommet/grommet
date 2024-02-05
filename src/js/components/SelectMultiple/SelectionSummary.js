import React, { useCallback, useContext } from 'react';

import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';
import {
  applyKey,
  getOptionValue,
  useDisabled,
  arrayIncludes,
} from '../Select/utils';
import { MessageContext } from '../../contexts/MessageContext';

const SelectionSummary = ({
  allOptions,
  clearRef,
  disabled,
  disabledKey,
  isSelected,
  labelKey,
  limit,
  messages,
  onChange,
  onMore,
  options,
  search,
  setActiveIndex,
  showSelectedInline,
  value,
  valueKey,
}) => {
  const { format } = useContext(MessageContext);
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

  const messageId =
    value?.length === 0 ||
    onMore ||
    !value ||
    (search !== '' && search !== undefined)
      ? 'selectMultiple.selected'
      : 'selectMultiple.selectedOfTotal';

  const summaryText = format({
    id: messageId,
    messages,
    values: { selected: value?.length || 0, total: options.length },
  });

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
                ? format({
                    id: 'selectMultiple.selectAllA11y',
                    messages,
                    values: {
                      total: options.length,
                    },
                  })
                : format({
                    id: 'selectMultiple.clearAllA11y',
                    messages,
                    values: {
                      selected: value?.length || 0,
                    },
                  })
            }
            label={format({
              id: showSelectAll
                ? 'selectMultiple.selectAll'
                : 'selectMultiple.clearAll',
              messages,
            })}
            onClick={(event) => summaryButtonClick(event)}
            onFocus={() => setActiveIndex(-1)}
            ref={clearRef}
          />
        )}
    </Box>
  );
};

export { SelectionSummary };
