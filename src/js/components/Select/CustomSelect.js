import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { FormCheckmark } from 'grommet-icons/icons/FormCheckmark';
import { Close } from 'grommet-icons/icons/Close';

import { defaultProps } from '../../default-props';
import { selectedStyle } from '../../utils';

import { Box } from '../Box';
import { InfiniteScroll } from '../InfiniteScroll';
import { Button } from '../Button';
import { Text } from '../Text';

const CheckBoxWrapper = styled(Box)`
  ${props => props.theme.select.custom.checkbox.extend};
`;

const OptionsBox = styled.div`
  position: relative;
  scroll-behavior: smooth;
  overflow: auto;
`;

const SelectOption = styled(Button)`
  display: block;
  width: 100%;
`;

const OptionBox = styled(Box)`
  ${props => props.selected && selectedStyle}
`;

function OptionWithCheckboxAtStart({ selected, label }) {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const selectOptionsStyle = {
    ...theme.select.options.box,
    ...theme.select.options.container,
  };

  return (
    <OptionBox {...selectOptionsStyle} selected={selected}>
      <Box direction="row">
        <CheckBoxWrapper {...theme.select.custom.checkbox.box}>
          <Box
            {...theme.select.custom.checkbox.check}
            background={
              selected
                ? theme.select.custom.checkbox.check.active.background
                : 'white'
            }
            border={{
              color: selected
                ? theme.select.custom.checkbox.check.active.background
                : theme.select.custom.checkbox.check.active.border,
            }}
          >
            {selected && (
              <FormCheckmark {...theme.select.custom.checkbox.checkmark} />
            )}
          </Box>
        </CheckBoxWrapper>
        <Text {...theme.select.options.text}>{label}</Text>
      </Box>
    </OptionBox>
  );
}

function SelectedChips({
  options,
  value,
  isSelected,
  optionLabel,
  selectOption,
  clearAll,
}) {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const OptionWrapper = styled(Box)`
    ${props => props.theme.select.custom.chips.wrapper.extend};
  `;

  const getSelectedOption = () =>
    options.reduce((acc, item, index) => {
      if (isSelected(index)) acc.push(index);
      return acc;
    }, []);

  return (
    <>
      {Array.isArray(value) && value.length > 0 && (
        <OptionWrapper {...theme.select.custom.chips.wrapper} wrap>
          {getSelectedOption().map(item => (
            <Box key={item} {...theme.select.custom.chips.option}>
              <Text {...theme.select.custom.chips.label}>
                {optionLabel(item)}
              </Text>
              <Close
                onClick={selectOption(item)}
                {...theme.select.custom.chips.icon}
              />
            </Box>
          ))}
          <Button focusIndicator={false} onClick={() => clearAll([])} plain>
            <Box
              border={{
                side: 'bottom',
                color: theme.select.custom.chips.clear.color,
              }}
            >
              <Text {...theme.select.custom.chips.clear}>CLEAR ALL</Text>
            </Box>
          </Button>
        </OptionWrapper>
      )}
    </>
  );
}

function ControlButtonPanel({ onCancel, onOK }) {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const ControlButtonWrapper = styled(Box)`
    ${props => props.theme.select.custom.controls.wrapper.extend};
  `;

  return (
    <ControlButtonWrapper {...theme.select.custom.controls.wrapper}>
      <Button {...theme.select.custom.controls.button} onClick={onOK} primary>
        <Text weight={600}>OK</Text>
      </Button>
      <Button
        {...theme.select.custom.controls.button}
        onClick={onCancel}
        secondary
      >
        <Text weight={600}>Cancel</Text>
      </Button>
    </ControlButtonWrapper>
  );
}

function SizeBottomPanel({
  options,
  value,
  isSelected,
  optionLabel,
  selectOption,
  clearAll,
  ...rest
}) {
  return (
    <>
      <SelectedChips
        options={options}
        value={value}
        isSelected={isSelected}
        optionLabel={optionLabel}
        selectOption={selectOption}
        clearAll={clearAll}
      />
      <ControlButtonPanel {...rest} />
    </>
  );
}

function SizeSelect({
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
  onOK,
  setValues,
}) {
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
                      tabIndex="-1"
                      role="menuitem"
                      hoverIndicator="light-5"
                      selected={allSelected}
                      plain
                      onClick={() => setValues(allSelected ? [] : options)}
                    >
                      <OptionWithCheckboxAtStart
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
                    <OptionWithCheckboxAtStart
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
              <Text {...theme.select.container.text}>No values available</Text>
            </OptionBox>
          </SelectOption>
        )}
      </OptionsBox>
      <SizeBottomPanel
        options={options}
        value={value}
        isSelected={isSelected}
        optionLabel={optionLabel}
        selectOption={selectOption}
        onCancel={onCancel}
        onOK={onOK}
        clearAll={setValues}
      />
    </>
  );
}

function ValueLabelWithNumber({ number, color }) {
  return (
    <Box direction="row" margin={{ horizontal: 'medium' }} align="center">
      <Text size="medium" weight={600}>
        Select{number ? 'ed' : ''}
      </Text>
      {number > 0 && (
        <Box
          pad="5px"
          background={color}
          round="xsmall"
          margin={{ horizontal: 'medium' }}
        >
          <Text size="10px" color="white" weight={600}>
            {number}
          </Text>
        </Box>
      )}
    </Box>
  );
}

export {
  OptionWithCheckboxAtStart,
  SelectedChips,
  ControlButtonPanel,
  SizeBottomPanel,
  SizeSelect,
  ValueLabelWithNumber,
};
