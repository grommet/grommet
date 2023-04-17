import React, { useCallback, useEffect, useState } from 'react';

import { Box } from '../Box';
import { Button } from '../Button';
import { CheckBox } from '../CheckBox';
import { SelectOption } from '../Select/StyledSelect';
import {
  applyKey,
  getOptionLabel,
  useDisabled,
  arrayIncludes,
  getOptionIndex,
} from '../Select/utils';

const SelectMultipleValue = ({
  allOptions,
  children,
  disabled,
  disabledKey,
  dropButtonRef,
  labelKey,
  onRequestOpen,
  onSelectChange,
  theme,
  value,
  valueKey,
}) => {
  const [showA11yDiv, setShowA11yDiv] = useState(false);
  const isDisabled = useDisabled(
    disabled,
    disabledKey,
    allOptions,
    valueKey || labelKey,
  );

  const visibleValue = useCallback(
    (i) => {
      const optionValue =
        valueKey && valueKey.reduce ? applyKey(i, valueKey) : i;
      const optionSelected = arrayIncludes(
        value,
        optionValue,
        valueKey || labelKey,
      );
      const indexOptions = getOptionIndex(allOptions, i, valueKey || labelKey);
      const optionLabel = getOptionLabel(
        indexOptions,
        allOptions,
        labelKey || valueKey,
      );
      const optionDisabled = isDisabled(indexOptions);
      const valueIndex = getOptionIndex(
        value,
        optionValue,
        valueKey || labelKey,
      );

      if (valueIndex < theme.selectMultiple.maxInline) {
        let child;
        if (children) {
          child = children(i, indexOptions, allOptions, {
            active: false,
            disabled: optionDisabled,
            selected: true,
          });
        }

        return (
          <SelectOption
            role="option"
            a11yTitle={
              optionSelected
                ? `${optionLabel} selected`
                : `${optionLabel} not selected`
            }
            aria-setsize={value.length}
            aria-posinset={valueIndex + 1}
            aria-selected={optionSelected}
            aria-disabled={optionDisabled}
            plain
            hoverIndicator={!optionDisabled}
            fill="horizontal"
            tabIndex="0"
            onClick={(event) => {
              if (!optionDisabled) {
                const intermediate = [...value];
                if (
                  arrayIncludes(intermediate, optionValue, valueKey || labelKey)
                ) {
                  onSelectChange(event, {
                    option: optionValue,
                    value: intermediate.filter((v) =>
                      typeof v === 'object'
                        ? applyKey(v, valueKey || labelKey) !==
                          applyKey(optionValue, valueKey || labelKey)
                        : v !== optionValue,
                    ),
                  });
                  if (valueIndex !== intermediate.length - 1) {
                    setTimeout(() => {
                      const nextFocus = document.getElementById(
                        `selected-${intermediate[valueIndex + 1]}`,
                      );
                      if (nextFocus) nextFocus.focus();
                      const result = intermediate[valueIndex + 1];
                      setShowA11yDiv(
                        `Unselected ${optionLabel}. 
                        Focus moved to ${getOptionLabel(
                          getOptionIndex(
                            allOptions,
                            result,
                            valueKey || labelKey,
                          ),
                          allOptions,
                          labelKey || valueKey,
                        )}`,
                      );
                    }, 200); // Timeout needed to allow screen reader
                    // time to announce and next item to display on
                    // screen. Based on testing, 200ms is enough time
                  } else if (intermediate.length !== 1) {
                    setTimeout(() => {
                      const nextFocus = document.getElementById(
                        `selected-${intermediate[valueIndex - 1]}`,
                      );
                      if (nextFocus) nextFocus.focus();
                      const result = intermediate[valueIndex - 1];
                      setShowA11yDiv(
                        `Unselected ${optionLabel}. Focus moved to 
                          ${getOptionLabel(
                            getOptionIndex(
                              allOptions,
                              result,
                              valueKey || labelKey,
                            ),
                            allOptions,
                            labelKey || valueKey,
                          )}`,
                      );
                    }, 200); // Timeout needed to allow screen reader
                    // time to announce and next item to display on
                    // screen. Based on testing, 200ms is enough time
                  } else if (dropButtonRef.current)
                    dropButtonRef.current.focus();
                }
              }
            }}
            key={optionLabel}
            id={`selected-${optionValue}`}
          >
            {child || (
              <CheckBox
                disabled={optionDisabled}
                label={
                  <Box alignSelf="center" align="start">
                    {optionLabel}
                  </Box>
                }
                key={optionLabel}
                pad="xsmall"
                tabIndex="-1"
                checked={optionSelected}
              />
            )}
          </SelectOption>
        );
      }
      return undefined;
    },
    [
      valueKey,
      allOptions,
      children,
      dropButtonRef,
      isDisabled,
      labelKey,
      onSelectChange,
      value,
      theme.selectMultiple.maxInline,
    ],
  );

  // After announcing set showA11yDiv to undefined so it won't
  // be read out again
  useEffect(() => {
    if (showA11yDiv !== undefined) {
      setTimeout(() => {
        setShowA11yDiv(undefined);
      }, 1000);
    }
  }, [showA11yDiv]);

  return (
    <>
      <Box
        width="100%"
        role="listbox"
        aria-multiselectable
        a11yTitle="Selected Options"
      >
        {value &&
          allOptions
            .filter((i) =>
              arrayIncludes(
                value,
                valueKey && valueKey.reduce ? applyKey(i, valueKey) : i,
                valueKey || labelKey,
              ),
            )
            /* eslint-disable-next-line array-callback-return, 
                consistent-return */
            .map((i) => visibleValue(i))}
        {showA11yDiv && (
          <Box
            height="0px"
            width="0px"
            overflow="hidden"
            // announce when an item is removed from selected options
            aria-live="assertive"
            role="alert"
          >
            {showA11yDiv}
          </Box>
        )}
      </Box>
      {value && value.length > theme.selectMultiple.maxInline && (
        <Box
          pad={{ horizontal: 'small', bottom: 'small', top: 'xsmall' }}
          alignSelf="start"
        >
          <Button
            onClick={onRequestOpen}
            size="small"
            label={`+ ${value.length - theme.selectMultiple.maxInline} more`}
          />
        </Box>
      )}
    </>
  );
};

export { SelectMultipleValue };
