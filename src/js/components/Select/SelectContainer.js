import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components/macro';
import { ThemeContext } from 'styled-components';

import { selectedStyle, setFocusWithoutScroll } from '../../utils';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { TextInput } from '../TextInput';

import { StyledContainer } from './StyledSelect';
import { applyKey } from './utils';

// position relative is so scroll can be managed correctly
const OptionsBox = styled.div`
  position: relative;
  scroll-behavior: smooth;
  overflow: auto;
  outline: none;
`;

const OptionBox = styled(Box)`
  ${props => props.selected && selectedStyle}
`;

const SelectOption = styled(Button)`
  display: block;
  width: 100%;
`;

const SelectContainer = forwardRef(
  (
    {
      children = null,
      disabled,
      disabledKey,
      dropHeight,
      emptySearchMessage = 'No matches found',
      id,
      labelKey,
      multiple,
      onChange,
      onKeyDown,
      onMore,
      onSearch,
      optionIndexesInValue,
      options,
      searchPlaceholder,
      selected,
      value = '',
      valueKey,
      replace = true,
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const [search, setSearch] = useState();
    const [activeIndex, setActiveIndex] = useState(-1);
    const [keyboardNavigation, setKeyboardNavigation] = useState();
    const searchRef = useRef();
    const optionsRef = useRef();

    // adjust activeIndex when options change
    useEffect(() => {
      if (activeIndex === -1 && search && optionIndexesInValue.length) {
        setActiveIndex(optionIndexesInValue[0]);
      }
    }, [activeIndex, optionIndexesInValue, search]);

    // set initial focus
    useEffect(() => {
      // need to wait for Drop to be ready
      const timer = setTimeout(() => {
        const optionsNode = optionsRef.current;
        if (onSearch) {
          const searchInput = searchRef.current;
          if (searchInput && searchInput.focus) {
            setFocusWithoutScroll(searchInput);
          }
        } else if (optionsNode) {
          setFocusWithoutScroll(optionsNode);
        }
      }, 100);
      return () => clearTimeout(timer);
    }, [onSearch]);

    // clear keyboardNavigation after a while
    useEffect(() => {
      if (keyboardNavigation) {
        // 100ms was empirically determined
        const timer = setTimeout(() => setKeyboardNavigation(false), 100);
        return () => clearTimeout(timer);
      }
      return undefined;
    }, [keyboardNavigation]);

    const optionLabel = useCallback(
      index => applyKey(options[index], labelKey),
      [labelKey, options],
    );

    const optionValue = useCallback(
      index => applyKey(options[index], valueKey),
      [options, valueKey],
    );

    const isDisabled = useCallback(
      index => {
        const option = options[index];
        let result;
        if (disabledKey) {
          result = applyKey(option, disabledKey);
        } else if (Array.isArray(disabled)) {
          if (typeof disabled[0] === 'number') {
            result = disabled.indexOf(index) !== -1;
          } else {
            const optionVal = optionValue(index);
            result = disabled.indexOf(optionVal) !== -1;
          }
        }
        return result;
      },
      [disabled, disabledKey, options, optionValue],
    );

    const isSelected = useCallback(
      index => {
        let result;
        if (selected) {
          // deprecated in favor of value
          result = selected.indexOf(index) !== -1;
        } else {
          const optionVal = optionValue(index);
          if (Array.isArray(value)) {
            if (value.length === 0) {
              result = false;
            } else if (typeof value[0] !== 'object') {
              result = value.indexOf(optionVal) !== -1;
            } else if (valueKey) {
              result = value.some(valueItem => {
                const valueValue =
                  typeof valueKey === 'function'
                    ? valueKey(valueItem)
                    : valueItem[valueKey];
                return valueValue === optionVal;
              });
            }
          } else if (valueKey && typeof value === 'object') {
            const valueValue =
              typeof valueKey === 'function'
                ? valueKey(value)
                : value[valueKey];
            result = valueValue === optionVal;
          } else {
            result = value === optionVal;
          }
        }
        return result;
      },
      [optionValue, selected, value, valueKey],
    );

    const selectOption = useCallback(
      index => event => {
        if (onChange) {
          let nextValue;
          let nextSelected;
          if (multiple) {
            const nextOptionIndexesInValue = optionIndexesInValue.slice(0);
            const valueIndex = optionIndexesInValue.indexOf(index);
            if (valueIndex === -1) {
              nextOptionIndexesInValue.push(index);
            } else {
              nextOptionIndexesInValue.splice(valueIndex, 1);
            }
            nextValue = nextOptionIndexesInValue.map(i =>
              valueKey && valueKey.reduce
                ? applyKey(options[i], valueKey)
                : options[i],
            );
            nextSelected = nextOptionIndexesInValue;
          } else {
            nextValue =
              valueKey && valueKey.reduce
                ? applyKey(options[index], valueKey)
                : options[index];
            nextSelected = index;
          }
          onChange(event, {
            option: options[index],
            value: nextValue,
            selected: nextSelected,
          });
        }
      },
      [multiple, onChange, optionIndexesInValue, options, valueKey],
    );

    const onNextOption = useCallback(
      event => {
        event.preventDefault();
        let nextActiveIndex = activeIndex + 1;
        while (
          nextActiveIndex < options.length &&
          isDisabled(nextActiveIndex)
        ) {
          nextActiveIndex += 1;
        }
        if (nextActiveIndex !== options.length) {
          setActiveIndex(nextActiveIndex);
          setKeyboardNavigation(true);
        }
      },
      [activeIndex, isDisabled, options],
    );

    const onPreviousOption = useCallback(
      event => {
        event.preventDefault();
        let nextActiveIndex = activeIndex - 1;
        while (nextActiveIndex >= 0 && isDisabled(nextActiveIndex)) {
          nextActiveIndex -= 1;
        }
        if (nextActiveIndex >= 0) {
          setActiveIndex(nextActiveIndex);
          setKeyboardNavigation(true);
        }
      },
      [activeIndex, isDisabled],
    );

    const onActiveOption = useCallback(
      index => () => {
        if (!keyboardNavigation) setActiveIndex(index);
      },
      [keyboardNavigation],
    );

    const onSelectOption = useCallback(
      event => {
        if (activeIndex >= 0) {
          event.preventDefault(); // prevent submitting forms
          selectOption(activeIndex)(event);
        }
      },
      [activeIndex, selectOption],
    );

    const customSearchInput = theme.select.searchInput;
    const SelectTextInput = customSearchInput || TextInput;
    const selectOptionsStyle = theme.select.options
      ? {
          ...theme.select.options.box,
          ...theme.select.options.container,
        }
      : {};

    return (
      <Keyboard
        onEnter={onSelectOption}
        onUp={onPreviousOption}
        onDown={onNextOption}
        onKeyDown={onKeyDown}
      >
        <StyledContainer
          ref={ref}
          as={Box}
          id={id ? `${id}__select-drop` : undefined}
          dropHeight={dropHeight}
        >
          {onSearch && (
            <Box pad={!customSearchInput ? 'xsmall' : undefined} flex={false}>
              <SelectTextInput
                focusIndicator={!customSearchInput}
                size="small"
                ref={searchRef}
                type="search"
                value={search || ''}
                placeholder={searchPlaceholder}
                onChange={event => {
                  const nextSearch = event.target.value;
                  setSearch(nextSearch);
                  setActiveIndex(-1);
                  onSearch(nextSearch);
                }}
              />
            </Box>
          )}
          <OptionsBox role="menubar" tabIndex="-1" ref={optionsRef}>
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
                  // Determine whether the label is done as a child or
                  // as an option Button kind property.
                  let child;
                  if (children)
                    child = children(option, index, options, {
                      active: optionActive,
                      disabled: optionDisabled,
                      selected: optionSelected,
                    });
                  else if (theme.select.options)
                    child = (
                      <OptionBox
                        {...selectOptionsStyle}
                        selected={optionSelected}
                      >
                        <Text {...theme.select.options.text}>
                          {optionLabel(index)}
                        </Text>
                      </OptionBox>
                    );
                  // if we have a child, turn on plain, and hoverIndicator

                  return (
                    <SelectOption
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      ref={optionRef}
                      tabIndex="-1"
                      role="menuitem"
                      plain={!child ? undefined : true}
                      align="start"
                      kind={!child ? 'option' : undefined}
                      hoverIndicator={!child ? undefined : 'background'}
                      label={!child ? optionLabel(index) : undefined}
                      disabled={optionDisabled || undefined}
                      active={optionActive}
                      selected={optionSelected}
                      option={option}
                      onMouseOver={
                        !optionDisabled ? onActiveOption(index) : undefined
                      }
                      onClick={
                        !optionDisabled ? selectOption(index) : undefined
                      }
                    >
                      {child}
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
                option={emptySearchMessage}
              >
                <OptionBox {...selectOptionsStyle}>
                  <Text {...theme.select.container.text}>
                    {emptySearchMessage}
                  </Text>
                </OptionBox>
              </SelectOption>
            )}
          </OptionsBox>
        </StyledContainer>
      </Keyboard>
    );
  },
);

export { SelectContainer };
