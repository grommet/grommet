import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';

import { InfiniteScroll } from '../InfiniteScroll';
import { Text } from '../Text';
import { Box } from '../Box';

import { OptionBox, OptionsBox, SelectOption } from './StyledMultiSelect';
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
  emptySearchMessage,
  showOptionChips,
  showControlButtons,
  inclusionExclusion,
  incExcVal,
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

  const setOption = (event, type, index) => {
    setIncExcVal(type);
    if (index !== -1) selectOption(index)(event);
    else
      setValues(
        allSelected ? [] : options.map((item, ind) => optionValue(ind)),
      );
  };

  const renderOptionChips = () => (
    <OptionChips
      width={width}
      options={options}
      value={value}
      isSelected={isSelected}
      optionLabel={optionLabel}
      selectOption={selectOption}
      clearAll={setValues}
      inclusionExclusion={inclusionExclusion}
      incExcVal={incExcVal}
      renderEmptySelected={renderEmptySelected}
    />
  );

  if (custom) {
    return (
      <CustomMultiSelect
        value={value}
        onValueChange={onValueChange}
        renderSearch={renderSearch}
        placeholder={searchPlaceholder}
        renderEmptySelected={renderEmptySelected}
        width={width}
        custom={custom}
        incExcVal={incExcVal}
        setIncExcVal={setIncExcVal}
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
        />
      )}
      <Box direction="row">
        <Box width={width}>
          <OptionsBox role="menubar" tabIndex="-1">
            {options && options.length > 0 ? (
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
                          onClick={
                            !inclusionExclusion ||
                            (inclusionExclusion && incExcVal)
                              ? () =>
                                  setValues(
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
                            incExcVal={incExcVal}
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
                        hoverIndicator="light-5"
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
                          (!optionDisabled && inclusionExclusion && incExcVal)
                            ? selectOption(index)
                            : undefined
                        }
                      >
                        <OptionWithCheckControl
                          selected={optionSelected}
                          label={optionLabel(index)}
                          inclusionExclusion={inclusionExclusion}
                          incExcVal={incExcVal}
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
                <OptionBox {...selectOptionsStyle}>
                  <Text {...theme.select.container.text}>
                    {emptySearchMessage || 'No values available'}
                  </Text>
                </OptionBox>
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
