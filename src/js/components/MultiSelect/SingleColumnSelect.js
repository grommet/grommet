import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';

import { InfiniteScroll } from '../InfiniteScroll';
import { Text } from '../Text';

import { OptionBox, OptionsBox, SelectOption } from './StyledMultiSelect';
import { OptionWithCheckControl } from './OptionWithCheckControl';
import { OptionChips } from './OptionChips';
import { ControlButton } from './ControlButton';

const SingleColumnSelect = ({
  options,
  value,
  isSelected,
  isDisabled,
  selectOption,
  onMore,
  replace,
  activeIndex,
  onActiveOption,
  optionLabel,
  onCancel,
  onUpdate,
  setValues,
  width,
  emptySearchMessage,
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const selectOptionsStyle = {
    ...theme.select.options.box,
    ...theme.select.options.container,
  };

  const allSelected =
    options.every(item => value.includes(item)) &&
    options.every(item => value.includes(item));

  return (
    <>
      <OptionsBox role="menubar" tabIndex="-1">
        {options.length > 0 ? (
          <InfiniteScroll
            items={options}
            step={theme.select.step}
            onMore={onMore}
            replace={replace}
            show={activeIndex !== -1 ? activeIndex : undefined}
          >
            {(option, index, optionRef) => {
              const optionDisabled = isDisabled(index);
              const optionSelected = isSelected(index);
              const optionActive = activeIndex === index;
              return (
                <>
                  {index === 0 && (
                    <SelectOption
                      // eslint-disable-next-line react/no-array-index-key
                      key={`${index}_select_all`}
                      tabIndex="-1"
                      role="menuitem"
                      hoverIndicator="light-5"
                      selected={allSelected}
                      plain
                      onClick={() => setValues(allSelected ? [] : options)}
                    >
                      <OptionWithCheckControl
                        selected={allSelected}
                        label="Select All"
                      />
                    </SelectOption>
                  )}
                  <SelectOption
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    ref={optionRef}
                    tabIndex="-1"
                    role="menuitem"
                    hoverIndicator="light-5"
                    disabled={optionDisabled || undefined}
                    active={optionActive}
                    selected={optionSelected}
                    option={option}
                    plain
                    onMouseOver={
                      !optionDisabled ? onActiveOption(index) : undefined
                    }
                    onClick={!optionDisabled ? selectOption(index) : undefined}
                  >
                    <OptionWithCheckControl
                      selected={optionSelected}
                      label={optionLabel(index)}
                    />
                  </SelectOption>
                </>
              );
            }}
          </InfiniteScroll>
        ) : (
            <SelectOption
              key="search_empty"
              tabIndex="-1"
              role="menuitem"
              hoverIndicator="background"
              disabled
              option="No values available"
            >
              <OptionBox {...selectOptionsStyle}>
                <Text {...theme.select.container.text}>
                  {emptySearchMessage || 'No values available'}
                </Text>
              </OptionBox>
            </SelectOption>
          )}
      </OptionsBox>
      <OptionChips
        width={width}
        options={options}
        value={value}
        isSelected={isSelected}
        optionLabel={optionLabel}
        selectOption={selectOption}
        clearAll={setValues}
      />
      <ControlButton onUpdate={onUpdate} onCancel={onCancel} />
    </>
  );
}

export { SingleColumnSelect };
