import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';

import { InfiniteScroll } from '../InfiniteScroll';
import { Text } from '../Text';

import { OptionBox, OptionsBox, SelectOption } from './StyledMultiSelect';
import { OptionWithCheckControl } from './OptionWithCheckControl';
import { OptionChips } from './OptionChips';
import { ControlButton } from './ControlButton';
import { Searchbox } from './Searchbox';

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
  optionValue,
  onCancel,
  onUpdate,
  setValues,
  width,
  emptySearchMessage,
  showOptionChips,
  showControlButtons,
  renderSearch,
  searchPlaceholder,
  searchValue,
  onSearchChange,
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const selectOptionsStyle = {
    ...theme.select.options.box,
    ...theme.select.options.container,
  };

  const allSelected = options.every((item, index) => isSelected(index));

  return (
    <>
      {renderSearch && (
        <Searchbox
          placeholder={searchPlaceholder}
          value={searchValue}
          onValueChange={onSearchChange}
        />
      )}
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
                      onClick={() => setValues(allSelected ?
                        [] : options.map((item, ind) => optionValue(ind)))
                      }
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
      {showOptionChips && (
        <OptionChips
          width={width}
          options={options}
          value={value}
          isSelected={isSelected}
          optionLabel={optionLabel}
          selectOption={selectOption}
          clearAll={setValues}
        />
      )}
      {showControlButtons && (
        <ControlButton onUpdate={onUpdate} onCancel={onCancel} />
      )}
    </>
  );
}

export { SingleColumnSelect };
