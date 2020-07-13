import React, { useContext, useCallback } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';

import { InfiniteScroll } from '../InfiniteScroll';
import { Text } from '../Text';
import { Box } from '../Box';

import { OptionsBox, SelectOption } from './StyledMultiSelect';
import { OptionWithCheckControl } from './OptionWithCheckControl';
import { OptionChips } from './OptionChips';
import { ControlButton } from './ControlButton';
import { Searchbox } from './Searchbox';
import { CustomMultiSelect } from './CustomMultiSelect';

const ColumnSelect = ({
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
  layout,
  width,
  height,
  emptySearchMessage,
  showSelectAll,
  showOptionChips,
  showControlButtons,
  inclusionExclusion,
  isExcluded,
  setIncExcVal,
  renderSearch,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  renderEmptySelected,
  onValueChange,
  custom,
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const selectOptionsStyle = {
    ...theme.select.options.box,
    ...theme.select.options.container,
  };

  const allSelected =
    options && options.every((item, index) => isSelected(index));

  const setOption = useCallback(
    (event, type, index) => {
      setIncExcVal(type);
      if (index !== -1) selectOption(index)(event);
      else
        setValues(
          allSelected ? [] : options.map((item, i) => optionValue(i)),
        );
    },
    [allSelected, optionValue, options, selectOption, setIncExcVal, setValues],
  );

  const optionSelect = useCallback(
    (event, index) => {
      if (inclusionExclusion && value.length === 1 && isSelected(index))
        setIncExcVal(null);
      selectOption(index)(event);
    },
    [inclusionExclusion, isSelected, selectOption, setIncExcVal, value],
  );

  const setUnsetChips = useCallback(
    updatedValues => {
      if (inclusionExclusion && !updatedValues.length) setIncExcVal(null);
      setValues(updatedValues);
    },
    [inclusionExclusion, setIncExcVal, setValues],
  );

  const renderOptionChips = () => (
    <OptionChips
      width={width}
      height={height || 'small'}
      options={options}
      value={value}
      isSelected={isSelected}
      optionLabel={optionLabel}
      onRemove={optionSelect}
      clearAll={setUnsetChips}
      inclusionExclusion={inclusionExclusion}
      isExcluded={isExcluded}
      renderEmptySelected={renderEmptySelected}
      layout={layout}
    />
  );

  if (custom) {
    return (
      <CustomMultiSelect
        value={value}
        layout={layout}
        onValueChange={onValueChange}
        renderSearch={renderSearch}
        placeholder={searchPlaceholder}
        renderEmptySelected={renderEmptySelected}
        width={width}
        height={height}
        custom={custom}
        isExcluded={isExcluded}
        setIncExcVal={setIncExcVal}
        inclusionExclusion={inclusionExclusion}
      />
    );
  }

  return (
    <>
      {renderSearch && (
        <Searchbox
          placeholder={searchPlaceholder}
          value={searchValue}
          onValueChange={onSearchChange}
          layout={layout}
        />
      )}
      <Box direction="row" height={height || 'small'}>
        <Box
          width={width}
          border={[
            { side: 'bottom', color: theme.multiselect.rightPanel.border },
          ]}
        >
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
                      {index === 0 && showSelectAll && (
                        <SelectOption
                          // eslint-disable-next-line react/no-array-index-key
                          key={`${index}_select_all`}
                          tabIndex="-1"
                          role="menuitem"
                          hoverIndicator="light-5"
                          selected={allSelected}
                          plain
                          onClick={
                            !inclusionExclusion ||
                            (inclusionExclusion && isExcluded !== null)
                              ? () =>
                                  setUnsetChips(
                                    allSelected
                                      ? []
                                      : options.map((item, ind) =>
                                          optionValue(ind),
                                        ),
                                  )
                              : undefined
                          }
                        >
                          <OptionWithCheckControl
                            selected={allSelected}
                            label="Select All"
                            inclusionExclusion={inclusionExclusion}
                            isExcluded={isExcluded}
                            onSelect={(event, type) =>
                              setOption(event, type, -1)
                            }
                          />
                        </SelectOption>
                      )}
                      <SelectOption
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        ref={optionRef}
                        tabIndex="-1"
                        role="menuitem"
                        hoverIndicator={theme.select.activeColor}
                        disabled={optionDisabled || undefined}
                        active={optionActive}
                        selected={optionSelected}
                        option={option}
                        plain
                        onMouseOver={
                          !optionDisabled ? onActiveOption(index) : undefined
                        }
                        onClick={
                          (!optionDisabled && !inclusionExclusion) ||
                          (!optionDisabled &&
                            inclusionExclusion &&
                            isExcluded !== null)
                            ? event => optionSelect(event, index)
                            : undefined
                        }
                      >
                        <OptionWithCheckControl
                          selected={optionSelected}
                          label={optionLabel(index)}
                          inclusionExclusion={inclusionExclusion}
                          isExcluded={isExcluded}
                          onSelect={(event, type) =>
                            setOption(event, type, index)
                          }
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
                <Box {...selectOptionsStyle}>
                  <Text {...theme.select.container.text}>
                    {emptySearchMessage || 'No values available'}
                  </Text>
                </Box>
              </SelectOption>
            )}
          </OptionsBox>
        </Box>
        {layout === 'double-column' && (
          <Box
            width={width}
            border={[
              { side: 'left', color: theme.multiselect.rightPanel.border },
              { side: 'bottom', color: theme.multiselect.rightPanel.border },
            ]}
          >
            {renderOptionChips()}
          </Box>
        )}
      </Box>
      {showOptionChips && layout === 'single-column' && renderOptionChips()}
      {showControlButtons && (
        <ControlButton onUpdate={onUpdate} onCancel={onCancel} />
      )}
    </>
  );
};

export { ColumnSelect };
