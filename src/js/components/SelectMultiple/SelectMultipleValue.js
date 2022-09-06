import React, { useCallback, useEffect, useState } from 'react';

import { Box } from '../Box';
import { Button } from '../Button';
import { CheckBox } from '../CheckBox';
import { SelectOption } from '../Select/StyledSelect';
import {
  applyKey,
  getOptionLabel,
  getOptionValue,
  useDisabled,
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
      const indexOptions = allOptions.indexOf(i);
      const optionLabel = getOptionLabel(
        indexOptions,
        allOptions,
        labelKey || valueKey,
      );
      const optionDisabled = isDisabled(indexOptions);
      if (value.indexOf(optionValue) < theme.selectMultiple.maxInline) {
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
              value.includes(optionValue)
                ? `${optionLabel} selected`
                : `${optionLabel} not selected`
            }
            aria-setsize={value.length}
            aria-posinset={value.indexOf(optionValue) + 1}
            aria-selected={value.includes(optionValue)}
            aria-disabled={optionDisabled}
            plain
            hoverIndicator
            fill="horizontal"
            tabIndex="0"
            onClick={(event) => {
              if (!optionDisabled) {
                const intermediate = [...value];
                const index = value.indexOf(optionValue);
                if (intermediate.includes(optionValue)) {
                  onSelectChange(event, {
                    option: optionValue,
                    value: intermediate.filter((v) => v !== optionValue),
                  });
                  if (index !== intermediate.length - 1) {
                    setTimeout(() => {
                      const nextFocus = document.getElementById(
                        `selected-${intermediate[index + 1]}`,
                      );
                      if (nextFocus) nextFocus.focus();
                      const result = allOptions.find(
                        (obj, j) =>
                          getOptionValue(
                            j,
                            allOptions,
                            valueKey || labelKey,
                          ) === intermediate[index + 1],
                      );
                      setShowA11yDiv(
                        `Unselected ${optionLabel}. 
                        Focus moved to ${getOptionLabel(
                          allOptions.indexOf(result),
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
                        `selected-${intermediate[index - 1]}`,
                      );
                      if (nextFocus) nextFocus.focus();
                      const result = allOptions.find(
                        (obj, j) =>
                          getOptionValue(
                            j,
                            allOptions,
                            valueKey || labelKey,
                          ) === intermediate[index - 1],
                      );
                      setShowA11yDiv(
                        `Unselected ${optionLabel}. Focus moved to 
                          ${getOptionLabel(
                            allOptions.indexOf(result),
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
                checked={value.includes(optionValue)}
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
            .filter(
              (i) =>
                value.indexOf(
                  valueKey && valueKey.reduce ? applyKey(i, valueKey) : i,
                ) !== -1,
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
