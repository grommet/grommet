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
    ${props => props.theme.select.multiselect.checkbox.extend};
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
    <OptionBox
      {...selectOptionsStyle}
      selected={selected}
    >
      <Box direction="row">
        <CheckBoxWrapper {...theme.select.multiselect.checkbox.box}>
          <Box
            {...theme.select.multiselect.checkbox.check}
            background={selected ?
              theme.select.multiselect.checkbox.check.active.background :
              'white'
            }
            border={{
              color: selected ?
                theme.select.multiselect.checkbox.check.active.background :
                theme.select.multiselect.checkbox.check.active.border,
            }}
          >
            {selected && (
              <FormCheckmark
                {...theme.select.multiselect.checkbox.checkmark}
              />
            )}
          </Box>
        </CheckBoxWrapper>
        <Text {...theme.select.options.text}>
          {label}
        </Text>
      </Box>
    </OptionBox>
  )
}

function SelectedOptionContainer({
  options,
  value,
  isSelected,
  optionLabel,
  selectOption,
}) {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const OptionWrapper = styled(Box)`
    ${props =>
      props.theme.select.multiselect.displayContainer.wrapper.extend};
  `;

  const getSelectedOption = () =>
    options.reduce((acc, item, index) => {
      if (isSelected(index)) acc.push(index);
      return acc;
    }, []);

  return (
    <>
      {Array.isArray(value) && value.length > 0 && (
        <OptionWrapper
          {...theme.select.multiselect.displayContainer.wrapper}
          wrap
        >
          {getSelectedOption().map(item => (
            <Box
              key={item}
              {...theme.select.multiselect.displayContainer.option}
            >
              <Text {...theme.select.multiselect.displayContainer.text}>
                {optionLabel(item)}
              </Text>
              <Close
                onClick={selectOption(item)}
                {...theme.select.multiselect.displayContainer.icon}
              />
            </Box>
          ))}
        </OptionWrapper>
      )}
    </>
  )
}

function ControlButtonPanel({ onCancel, onOK }) {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const ControlButtonWrapper = styled(Box)`
    ${props => props.theme.select.multiselect.controls.wrapper.extend};
  `;

  return(
    <ControlButtonWrapper
      {...theme.select.multiselect.controls.wrapper}
    >
        <Button
          {...theme.select.multiselect.controls.button}
          onClick={onOK}
          primary
        >
          <Text weight={600}>OK</Text>
        </Button>
        <Button
          {...theme.select.multiselect.controls.button}
          onClick={onCancel}
          secondary
        >
          <Text weight={600}>Cancel</Text>
        </Button>
    </ControlButtonWrapper>
  )
}

function SizeBottomPanel({
  options,
  value,
  isSelected,
  optionLabel,
  selectOption,
  ...rest
}) {
  return (
    <>
      <SelectedOptionContainer
        options={options}
        value={value}
        isSelected={isSelected}
        optionLabel={optionLabel}
        selectOption={selectOption}
      />
      <ControlButtonPanel {...rest} />
    </>
  )
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
}) {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const selectOptionsStyle = {
    ...theme.select.options.box,
    ...theme.select.options.container,
  };

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
                    !optionDisabled ? selectOption(index) : undefined
                  }
                >
                  <OptionWithCheckboxAtStart
                    selected={optionSelected}
                    label={optionLabel(index)}
                  />
                </SelectOption>
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
                  No values available
                </Text>
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
      />
    </>
  )
}

export {
  OptionWithCheckboxAtStart,
  SelectedOptionContainer,
  ControlButtonPanel,
  SizeBottomPanel,
  SizeSelect,
};