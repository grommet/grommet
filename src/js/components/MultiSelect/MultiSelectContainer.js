import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled, { ThemeContext } from 'styled-components';
import { FormUp } from 'grommet-icons/icons/FormUp';

import {
  getHoverIndicatorStyle,
  selectedStyle,
  setFocusWithoutScroll,
} from '../../utils';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { CheckBox } from '../CheckBox';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { TextInput } from '../TextInput';

import { StyledContainer } from '../Select/StyledSelect';
import {
  applyKey,
  OptionsBox,
  optionLabel,
  optionValue,
  isDisabled,
  isSelected,
} from '../Select/utils';

// position relative is so scroll can be managed correctly
// const OptionsBox = styled.div`
//   position: relative;
//   scroll-behavior: smooth;
//   overflow: auto;
//   outline: none;
// `;

const SelectOption = styled(Button)`
  ${(props) => props.selected && props.textComponent && selectedStyle}
  // applies theme.global.hover.background to the active
  // option for mouse and keyboard interactions
  ${(props) =>
    props.active &&
    getHoverIndicatorStyle(
      !props.children && !props.theme.select.options ? undefined : 'background',
      props.theme,
    )}
  display: block;
  width: 100%;
`;

const MultiSelectContainer = forwardRef(
  (
    {
      allOptions,
      children = null,
      disabled: disabledProp,
      disabledKey,
      dropHeight,
      emptySearchMessage = 'No matches found',
      helpContent,
      id,
      labelKey,
      limit,
      onChange,
      onClose,
      onKeyDown,
      onMore,
      onSearch,
      optionIndexesInValue,
      options,
      replace = true,
      searchPlaceholder,
      search,
      setSearch,
      usingKeyboard,
      value = '',
      valueKey,
      visibleSelection,
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    // const [activeIndex, setActiveIndex] = useState(usingKeyboard ? 0 : -1);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [keyboardNavigation, setKeyboardNavigation] = useState(usingKeyboard);
    // const [keyboardNavigation, setKeyboardNavigation] = useState();
    const searchRef = useRef();
    const optionsRef = useRef();
    const [disabled, setDisabled] = useState(disabledProp);
    const activeRef = useRef();
    const [showA11yLimit, setShowA11yLimit] = useState();

    // for keyboard/screenreader, keep the active option in focus
    useEffect(() => {
      if (activeIndex) activeRef.current?.focus();
    }, [activeIndex]);

    useEffect(() => {
      const optionsNode = optionsRef.current;
      if (optionsNode.children) {
        const optionNode = optionsNode.children[activeIndex];
        if (optionNode) optionNode.focus();
      }
    }, [activeIndex]);

    const selectOption = useCallback(
      (index) => (event) => {
        if (onChange) {
          const nextOptionIndexesInValue = optionIndexesInValue.slice(0);
          const allOptionsIndex = allOptions.indexOf(options[index]);
          const valueIndex = optionIndexesInValue.indexOf(allOptionsIndex);
          if (valueIndex === -1 && (!limit || value.length < limit)) {
            nextOptionIndexesInValue.push(allOptionsIndex);
          } else {
            nextOptionIndexesInValue.splice(valueIndex, 1);
          }
          const nextValue = nextOptionIndexesInValue.map((i) =>
            valueKey && valueKey.reduce
              ? applyKey(allOptions[i], valueKey)
              : allOptions[i],
          );
          const nextSelected = nextOptionIndexesInValue;
          onChange(event, {
            option: options[index],
            value: nextValue,
            selected: nextSelected,
          });
        }
      },
      [
        limit,
        onChange,
        optionIndexesInValue,
        options,
        allOptions,
        valueKey,
        value,
      ],
    );

    const onNextOption = useCallback(
      (event) => {
        event.preventDefault();
        const nextActiveIndex = activeIndex + 1;
        if (nextActiveIndex !== options.length) {
          setActiveIndex(nextActiveIndex);
          setKeyboardNavigation(true);
        }
      },
      [activeIndex, options],
    );

    const onPreviousOption = useCallback(
      (event) => {
        event.preventDefault();
        const nextActiveIndex = activeIndex - 1;

        if (nextActiveIndex === -1) {
          const searchInput = searchRef.current;
          if (searchInput && searchInput.focus) {
            setActiveIndex(nextActiveIndex);
            setFocusWithoutScroll(searchInput);
          }
        }

        if (nextActiveIndex >= 0) {
          setActiveIndex(nextActiveIndex);
          setKeyboardNavigation(true);
        }
      },
      [activeIndex],
    );

    const onKeyDownOption = useCallback(
      (event) => {
        if (!onSearch) {
          const nextActiveIndex = options.findIndex((e) => {
            let label;
            if (typeof e === 'object') {
              label = e.label || applyKey(e, labelKey);
            } else {
              label = e;
            }
            return (
              typeof label === 'string' &&
              label.charAt(0).toLowerCase() === event.key.toLowerCase()
            );
          });

          if (nextActiveIndex >= 0) {
            event.preventDefault();
            setActiveIndex(nextActiveIndex);
            setKeyboardNavigation(true);
          }
        }
        if (onKeyDown) {
          onKeyDown(event);
        }
      },
      [onKeyDown, options, onSearch, labelKey],
    );

    const onActiveOption = useCallback(
      (index) => () => {
        if (!keyboardNavigation) setActiveIndex(index);
      },
      [keyboardNavigation],
    );

    const onSelectOption = useCallback(
      (event) => {
        if (
          !isDisabled(activeIndex, disabled, disabledKey, options, valueKey) &&
          activeIndex >= 0 &&
          activeIndex < options.length
        ) {
          event.preventDefault(); // prevent submitting forms
          selectOption(activeIndex)(event);
        }
      },
      [activeIndex, selectOption, options, disabled, disabledKey, valueKey],
    );

    const customSearchInput = theme.select.searchInput;
    const SelectTextInput = customSearchInput || TextInput;
    const selectOptionsStyle = theme.select.options
      ? {
          ...theme.select.options.box,
          ...theme.select.options.container,
        }
      : {};

    useEffect(() => {
      if (value.length === limit) {
        const newDisabled = [...disabledProp];
        // disable everything that is not selected
        const originallyDisabled = (index) => {
          const option = allOptions[index];
          let result;
          if (disabledKey) {
            result = applyKey(option, disabledKey);
          } else if (Array.isArray(disabledProp)) {
            if (typeof disabledProp[0] === 'number') {
              result = disabledProp.indexOf(index) !== -1;
            } else {
              result =
                disabledProp.indexOf(optionValue(index, options, labelKey)) !==
                -1;
            }
          }
          return result;
        };
        for (let i = 0; i < options.length; i += 1) {
          if (
            !isSelected(i, value, valueKey, labelKey, options) &&
            !originallyDisabled(i)
          ) {
            newDisabled.push(options[i]);
          }
        }
        if (usingKeyboard)
          setShowA11yLimit('Selected. Maximum selection limit reached.');
        console.log(newDisabled);
        setDisabled(newDisabled);
      } else {
        if (usingKeyboard) setShowA11yLimit(undefined);
        setDisabled(disabledProp);
      }
    }, [
      value,
      limit,
      disabledProp,
      allOptions,
      disabledKey,
      labelKey,
      options,
      usingKeyboard,
      valueKey,
    ]);

    // reset showA11yLimit after announcement is read
    useEffect(() => {
      if (showA11yLimit !== undefined) {
        setTimeout(() => {
          setShowA11yLimit(undefined);
        }, 2000);
      }
    }, [showA11yLimit]);

    return (
      <Keyboard
        onEnter={onSelectOption}
        onSpace={onSelectOption}
        onUp={onPreviousOption}
        onDown={onNextOption}
        onKeyDown={onKeyDownOption}
      >
        <StyledContainer
          ref={ref}
          as={Box}
          id={id ? `${id}__select-drop` : undefined}
          dropHeight={dropHeight}
          a11yTitle="Select dropdown"
        >
          {visibleSelection ? (
            <Box
              direction="row"
              justify="between"
              flex={false}
              pad={{ horizontal: 'small', top: 'xsmall' }}
            >
              <Box
                pad={{ top: 'xsmall', bottom: 'xsmall' }}
                direction="row"
                justify="between"
                gap="small"
                fill="horizontal"
              >
                <Box alignSelf="center">
                  {value.length === 0 && <Text size="small">0 selected</Text>}
                  {value.length !== 0 &&
                    (search === '' || search === undefined) && (
                      <Text size="small">
                        {value.length} selected of {allOptions.length}
                      </Text>
                    )}
                  {value.length !== 0 &&
                    search !== '' &&
                    search !== undefined && (
                      <Text size="small">{value.length} selected</Text>
                    )}
                </Box>
                <Box>
                  {(search === '' || search === undefined) &&
                    (value.length === 0 ? (
                      !limit && (
                        <Button
                          a11yTitle={`Select all ${allOptions.length} options`}
                          size="small"
                          label="Select All"
                          onClick={(event) => {
                            if (onChange) {
                              const nextSelected = options.filter(
                                (i, index) =>
                                  !isDisabled(
                                    index,
                                    disabled,
                                    disabledKey,
                                    options,
                                    valueKey,
                                  ),
                              );
                              const nextValue = nextSelected.map((i) =>
                                valueKey && valueKey.reduce
                                  ? applyKey(i, valueKey)
                                  : i,
                              );

                              onChange(event, {
                                option: options,
                                value: nextValue,
                                selected: nextSelected,
                              });
                            }
                          }}
                          onFocus={() => setActiveIndex(-1)}
                        />
                      )
                    ) : (
                      <Button
                        a11yTitle={`${value.length}
                         options selected. Clear all?`}
                        size="small"
                        label="Clear All"
                        onClick={(event) => {
                          if (onChange) {
                            const nextSelected = options.filter(
                              (i, index) =>
                                isDisabled(
                                  index,
                                  disabled,
                                  disabledKey,
                                  options,
                                  valueKey,
                                ) &&
                                isSelected(
                                  index,
                                  value,
                                  valueKey,
                                  labelKey,
                                  options,
                                ),
                            );
                            const nextValue = nextSelected.map((i) =>
                              valueKey && valueKey.reduce
                                ? applyKey(i, valueKey)
                                : i,
                            );

                            onChange(event, {
                              option: options,
                              value: nextValue,
                              selected: nextSelected,
                            });
                          }
                        }}
                        onFocus={() => setActiveIndex(-1)}
                      />
                    ))}
                </Box>
              </Box>
              <Button onClick={onClose} a11yTitle="Close Select">
                <FormUp />
              </Button>
            </Box>
          ) : (
            <Box
              pad={{ horizontal: 'xsmall', top: 'xsmall', bottom: 'xsmall' }}
              direction="row"
              justify="between"
              gap="small"
              flex={false}
            >
              {search === '' || search === undefined ? (
                <>
                  <Box alignSelf="center">
                    {value.length === 0 ? (
                      <Text size="small">0 selected</Text>
                    ) : (
                      <Text size="small">
                        {value.length} selected of {options.length}
                      </Text>
                    )}
                  </Box>
                  <Box>
                    {options.length > 0 &&
                      (value.length === 0 ? (
                        !limit && (
                          <Button
                            a11yTitle={`Select all ${options.length} options`}
                            label="Select All"
                            onClick={(event) => {
                              if (onChange) {
                                const nextSelected = options.filter(
                                  (i, index) =>
                                    !isDisabled(
                                      index,
                                      disabled,
                                      disabledKey,
                                      options,
                                      valueKey,
                                    ),
                                );
                                const nextValue = nextSelected.map((i) =>
                                  valueKey && valueKey.reduce
                                    ? applyKey(i, valueKey)
                                    : i,
                                );

                                onChange(event, {
                                  option: options,
                                  value: nextValue,
                                  selected: nextSelected,
                                });
                              }
                            }}
                            onFocus={() => setActiveIndex(-1)}
                          />
                        )
                      ) : (
                        <Button
                          a11yTitle={`${value.length} 
                          options selected. Clear all?`}
                          label="Clear All"
                          onClick={(event) => {
                            if (onChange) {
                              const nextSelected = options.filter(
                                (i, index) =>
                                  isDisabled(
                                    index,
                                    disabled,
                                    disabledKey,
                                    options,
                                    valueKey,
                                  ) &&
                                  isSelected(
                                    index,
                                    value,
                                    valueKey,
                                    labelKey,
                                    options,
                                  ),
                              );
                              const nextValue = nextSelected.map((i) =>
                                valueKey && valueKey.reduce
                                  ? applyKey(i, valueKey)
                                  : i,
                              );
                              onChange(event, {
                                option: options,
                                value: nextSelected,
                                selected: nextValue,
                              });
                            }
                          }}
                          onFocus={() => setActiveIndex(-1)}
                        />
                      ))}
                  </Box>
                </>
              ) : (
                <Text size="small">{`${value.length} selected`}</Text>
              )}
            </Box>
          )}

          {onSearch && (
            <Box pad={!customSearchInput ? 'xsmall' : undefined} flex={false}>
              <Keyboard
                onEnter={(event) => {
                  onNextOption(event);
                }}
              >
                <SelectTextInput
                  a11yTitle="Search"
                  focusIndicator={!customSearchInput}
                  size="small"
                  ref={searchRef}
                  type="search"
                  value={search || ''}
                  placeholder={searchPlaceholder}
                  onChange={(event) => {
                    const nextSearch = event.target.value;
                    setSearch(nextSearch);
                    setActiveIndex(-1);
                    onSearch(nextSearch);
                  }}
                />
              </Keyboard>
            </Box>
          )}
          <Box flex={false}>{helpContent}</Box>
          <OptionsBox
            role="listbox"
            tabIndex="0"
            ref={optionsRef}
            aria-multiselectable
            onMouseMove={() => setKeyboardNavigation(false)}
            aria-activedescendant={optionsRef?.current?.children[activeIndex]}
          >
            {options.length > 0 ? (
              <InfiniteScroll
                items={options}
                step={theme.select.step}
                onMore={onMore}
                replace={replace}
                show={activeIndex !== -1 ? activeIndex : undefined}
              >
                {(option, index, optionRef) => {
                  const iValue =
                    valueKey && valueKey.reduce
                      ? applyKey(option, valueKey)
                      : option;
                  const optionDisabled = isDisabled(
                    index,
                    disabled,
                    disabledKey,
                    options,
                    valueKey,
                  );
                  const optionSelected = value.includes(iValue);
                  const optionActive = activeIndex === index;

                  // Determine whether the label is done as a child or
                  // as an option Button kind property.
                  let child;
                  let textComponent = false;
                  if (children) {
                    child = children(option, index, options, {
                      active: optionActive,
                      disabled: optionDisabled,
                      selected: optionSelected,
                    });
                    if (
                      typeof child === 'string' ||
                      (child.props &&
                        child.props.children &&
                        typeof child.props.children === 'string')
                    )
                      textComponent = true;
                  } else {
                    child = (
                      <CheckBox
                        label={
                          <Box alignSelf="center" width="100%" align="start">
                            {optionLabel(index, options, labelKey)}
                          </Box>
                        }
                        pad="xsmall"
                        tabIndex="-1"
                        checked={optionSelected}
                        disabled={optionDisabled}
                      />
                    );
                  }

                  if (!children && !theme.select.options && search) {
                    const label = optionLabel(index, options, labelKey);
                    if (
                      typeof label === typeof '' &&
                      label.toLowerCase().indexOf(search) >= 0
                    ) {
                      // code to bold search term in matching options
                      const boldIndex = label.toLowerCase().indexOf(search);
                      const childBeginning = label.substring(0, boldIndex);
                      let childBold = label.substring(
                        boldIndex,
                        boldIndex + search.length,
                      );
                      childBold = <b>{childBold}</b>;
                      const childEnd = label.substring(
                        boldIndex + search.length,
                      );
                      child = (
                        <CheckBox
                          label={
                            <Box
                              alignSelf="center"
                              width="100%"
                              align="start"
                              direction="row"
                            >
                              <Text>
                                {childBeginning}
                                {childBold}
                                {childEnd}
                              </Text>
                            </Box>
                          }
                          pad="xsmall"
                          tabIndex="-1"
                          checked={optionSelected}
                          disabled={optionDisabled}
                        />
                      );
                    }
                  }

                  // if we have a child, turn on plain, and hoverIndicator
                  return (
                    <SelectOption
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      // merge optionRef and activeRef
                      ref={(node) => {
                        // eslint-disable-next-line no-param-reassign
                        if (optionRef) optionRef.current = node;
                        if (optionActive) activeRef.current = node;
                      }}
                      tabIndex={optionSelected ? '0' : '-1'}
                      role="option"
                      id={`option${index}`}
                      aria-setsize={options.length}
                      aria-posinset={index + 1}
                      aria-selected={optionSelected}
                      focusIndicator={false}
                      aria-disabled={optionDisabled || undefined}
                      plain={!child ? undefined : true}
                      align="start"
                      kind={!child ? 'option' : undefined}
                      active={optionActive}
                      selected={optionSelected}
                      onMouseOver={
                        !optionDisabled ? onActiveOption(index) : undefined
                      }
                      onClick={
                        !optionDisabled ? selectOption(index) : undefined
                      }
                      textComponent={textComponent}
                    >
                      {child}
                    </SelectOption>
                  );
                }}
              </InfiniteScroll>
            ) : (
              <SelectOption
                key="search_empty"
                tabIndex="0"
                role="menuitem"
                hoverIndicator="background"
                disabled
                aria-live="polite"
              >
                <Box {...selectOptionsStyle}>
                  <Text {...theme.select.container.text}>
                    {emptySearchMessage}
                  </Text>
                </Box>
              </SelectOption>
            )}
          </OptionsBox>
          {usingKeyboard && showA11yLimit && (
            <Box
              height="0px"
              width="0px"
              overflow="hidden"
              // announce when an item is removed from selected options
              aria-live="assertive"
            >
              <Text>{showA11yLimit}</Text>
            </Box>
          )}
        </StyledContainer>
      </Keyboard>
    );
  },
);

export { MultiSelectContainer };
