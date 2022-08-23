import React, { useCallback, useEffect, useState } from 'react';

import { Box } from '../Box';
import { Button } from '../Button';
import { CheckBox } from '../CheckBox';

import {
  applyKey,
  getOptionLabel,
  getOptionValue,
  checkDisabled,
  SelectOption,
} from '../Select/utils';

const MultiSelectValue = ({
  allOptions,
  children,
  disabled,
  disabledKey,
  dropButtonRef,
  labelKey,
  onRequestOpen,
  onSelectChange,
  value,
  valueKey,
}) => {
  const [showA11yDiv, setShowA11yDiv] = useState(false);

  const visibleValue = useCallback(
    (i) => {
      const iValue = valueKey && valueKey.reduce ? applyKey(i, valueKey) : i;
      const indexOptions = allOptions.indexOf(i);
      const iLabel = getOptionLabel(indexOptions, allOptions, labelKey);
      const iDisabled = checkDisabled(
        indexOptions,
        disabled,
        disabledKey,
        allOptions,
        valueKey,
      );
      if (value.indexOf(iValue) < 5) {
        let child;
        if (children) {
          child = children(i, indexOptions, allOptions, {
            active: false,
            disabled: iDisabled,
            selected: true,
          });
        }

        return (
          <SelectOption
            role="option"
            a11yTitle={
              value.includes(iValue)
                ? `${iLabel} selected`
                : `${iLabel} not selected`
            }
            aria-setsize={value.length}
            aria-posinset={value.indexOf(iValue) + 1}
            aria-selected={value.includes(iValue)}
            aria-disabled={iDisabled}
            plain
            hoverIndicator
            fill="horizontal"
            tabIndex="0"
            onClick={(event) => {
              if (!iDisabled) {
                const intermediate = [...value];
                const index = value.indexOf(iValue);
                if (intermediate.includes(iValue)) {
                  onSelectChange(event, {
                    option: iValue,
                    value: intermediate.filter((v) => v !== iValue),
                  });
                  if (index !== intermediate.length - 1) {
                    setTimeout(() => {
                      const nextFocus = document.getElementById(
                        `selected-${intermediate[index + 1]}`,
                      );
                      if (nextFocus) nextFocus.focus();
                      const result = allOptions.find(
                        (obj, j) =>
                          getOptionValue(j, allOptions, valueKey) ===
                          intermediate[index + 1],
                      );
                      setShowA11yDiv(
                        `Unselected ${iLabel}. 
                        Focus moved to ${getOptionLabel(
                          allOptions.indexOf(result),
                          allOptions,
                          labelKey,
                        )}`,
                      );
                    }, 200);
                  } else if (intermediate.length !== 1) {
                    setTimeout(() => {
                      const nextFocus = document.getElementById(
                        `selected-${intermediate[index - 1]}`,
                      );
                      if (nextFocus) nextFocus.focus();
                      const result = allOptions.find(
                        (obj, j) =>
                          getOptionValue(j, allOptions, valueKey) ===
                          intermediate[index - 1],
                      );
                      setShowA11yDiv(
                        `Unselected ${iLabel}. Focus moved to 
                          ${getOptionLabel(
                            allOptions.indexOf(result),
                            allOptions,
                            labelKey,
                          )}`,
                      );
                    }, 200);
                  } else if (dropButtonRef.current)
                    dropButtonRef.current.focus();
                }
              }
            }}
            key={iLabel}
            id={`selected-${iValue}`}
          >
            {children && child ? (
              child
            ) : (
              <CheckBox
                disabled={iDisabled}
                label={
                  <Box alignSelf="center" align="start">
                    {iLabel}
                  </Box>
                }
                key={iLabel}
                pad="xsmall"
                tabIndex="-1"
                checked={value.includes(iValue)}
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
      disabled,
      disabledKey,
      dropButtonRef,
      labelKey,
      onSelectChange,
      value,
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
      {value && value.length > 5 && (
        <Box alignSelf="start">
          <Button
            onClick={onRequestOpen}
            size="small"
            label={`+ ${value.length - 5} more`}
          />
        </Box>
      )}
    </>
  );
};

export { MultiSelectValue };
