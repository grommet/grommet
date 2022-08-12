import React, {
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useMemo,
  useState,
  useRef,
  useEffect,
} from 'react';
import styled, { ThemeContext } from 'styled-components';

import {
  controlBorderStyle,
  normalizeColor,
  useKeyboard,
  useForwardedRef,
} from '../../utils';
import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { CheckBox } from '../CheckBox';
import { DropButton } from '../DropButton';
import { Keyboard } from '../Keyboard';
import { FormContext } from '../Form/FormContext';
import { TextInput } from '../TextInput';
import { Text } from '../Text';

import { MultiSelectContainer } from './MultiSelectContainer';
import { applyKey, HiddenInput } from '../Select/utils';
import { MessageContext } from '../../contexts/MessageContext';
import { MultiSelectPropTypes } from './propTypes';

const SelectTextInput = styled(TextInput)`
  cursor: ${(props) => (props.defaultCursor ? 'default' : 'pointer')};
`;

const StyledSelectDropButton = styled(DropButton)`
  ${(props) => !props.callerPlain && controlBorderStyle};
  ${(props) =>
    props.theme.select &&
    props.theme.select.control &&
    props.theme.select.control.extend};
  ${(props) => props.open && props.theme.select.control.open};
`;

const StyledSelectBox = styled(Box)`
  ${(props) => !props.callerPlain && controlBorderStyle};
  ${(props) =>
    props.theme.select &&
    props.theme.select.control &&
    props.theme.select.control.extend};
  ${(props) => props.open && props.theme.select.control.open};
`;

StyledSelectDropButton.defaultProps = {};
Object.setPrototypeOf(StyledSelectDropButton.defaultProps, defaultProps);

const MultiSelect = forwardRef(
  (
    {
      a11yTitle,
      'aria-label': ariaLabel,
      alignSelf,
      children,
      defaultValue,
      disabled,
      disabledKey,
      dropAlign,
      dropHeight,
      dropProps,
      dropTarget,
      emptySearchMessage,
      focusIndicator,
      gridArea,
      helpContent,
      id,
      icon,
      labelKey,
      limit,
      margin,
      messages,
      name,
      onBlur,
      onChange,
      onClick,
      onClose,
      onFocus,
      onKeyDown,
      onMore,
      onOpen,
      onSearch,
      open: propOpen,
      options: optionsProp,
      placeholder,
      plain,
      replace,
      searchPlaceholder,
      size,
      value: valueProp,
      valueKey,
      valueLabel,
      visibleSelection = false,
      width,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const inputRef = useRef();
    const formContext = useContext(FormContext);
    const { format } = useContext(MessageContext);
    const selectBoxRef = useRef();
    const [showA11yDiv, setShowA11yDiv] = useState(false);
    const dropButtonRef = useForwardedRef(ref);

    // Determine if the Select is opened with the keyboard. If so,
    // focus should be set on the first option when the drop opens
    // see set initial focus code in SelectContainer.js
    const usingKeyboard = useKeyboard();

    // value is used for what we receive in valueProp and the basis for
    // what we send with onChange
    // When 'valueKey' sets 'reduce', the value(s) here should match
    // what the 'valueKey' would return for the corresponding
    // selected option object.
    // Otherwise, the value(s) should match the selected options.

    const [value, setValue] = formContext.useFormInput({
      name,
      value: valueProp,
      initialValue: defaultValue || '',
    });
    // valuedValue is the value mapped with any valueKey applied
    // When the options array contains objects, this property indicates how
    // to retrieve the value of each option.
    // If a string is provided, it is used as the key to retrieve a
    // property of an option object.
    // If a function is provided, it is called with the option and should
    // return the value.
    // If reduce is true, this value will be used for the 'value'
    // delivered via 'onChange'.
    const valuedValue = useMemo(() => {
      if (Array.isArray(value))
        return value.map((v) =>
          valueKey && valueKey.reduce ? v : applyKey(v, valueKey),
        );
      return valueKey && valueKey.reduce ? value : applyKey(value, valueKey);
    }, [value, valueKey]);
    // search input value
    const [search, setSearch] = useState();
    // All select option indices and values
    const [allOptions, setAllOptions] = useState(optionsProp);
    // Track changes to options property, except when options are being
    // updated due to search activity. Allows option's initial index value
    // to be referenced when filtered by search.
    useEffect(() => {
      if (!search) setAllOptions(optionsProp);
    }, [optionsProp, search]);

    // the option indexes present in the value
    const optionIndexesInValue = useMemo(() => {
      const result = [];
      allOptions.forEach((option, index) => {
        if (Array.isArray(valuedValue)) {
          if (valuedValue.some((v) => v === applyKey(option, valueKey))) {
            result.push(index);
          }
        } else if (valuedValue === applyKey(option, valueKey)) {
          result.push(index);
        }
      });
      return result;
    }, [allOptions, valueKey, valuedValue]);

    const [open, setOpen] = useState(propOpen);
    useEffect(() => setOpen(propOpen), [propOpen]);

    const onRequestOpen = useCallback(() => {
      if (open) return;
      setOpen(true);
      if (onOpen) onOpen();
    }, [onOpen, open]);

    const onRequestClose = useCallback(() => {
      setOpen(false);
      if (onClose) onClose();
      setSearch();
    }, [onClose]);

    const triggerChangeEvent = useCallback((nextValue) => {
      // Calling set value function directly on input because React library
      // overrides setter `event.target.value =` and loses original event
      // target fidelity.
      // https://stackoverflow.com/a/46012210
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
      ).set;
      nativeInputValueSetter.call(inputRef.current, nextValue);
      const event = new Event('input', { bubbles: true });
      inputRef.current.dispatchEvent(event);
    }, []);

    const onSelectChange = useCallback(
      (event, { option, value: nextValue }) => {
        // nextValue must not be of type object to set value directly on the
        // input. if it is an object, then the user has not provided necessary
        // props to reduce object option
        if (
          typeof nextValue !== 'object' &&
          nextValue !== event.target.value &&
          inputRef.current
        ) {
          // select registers changing option as a click event or keydown.
          // when in a form, we need to programatically trigger a change
          // event in order for the change event to be registered upstream
          // necessary for change validation in form
          triggerChangeEvent(nextValue);
        }
        setValue(nextValue);
        if (onChange) {
          event.persist();
          let adjustedEvent;
          // support for native event used by Preact
          if (event instanceof Event) {
            adjustedEvent = new event.constructor(event.type, event);
            Object.defineProperties(adjustedEvent, {
              target: { value: inputRef.current },
              value: { value: nextValue },
              option: { value: option },
            });
          } else {
            adjustedEvent = event;
            adjustedEvent.target = inputRef.current;
            adjustedEvent.value = nextValue;
            adjustedEvent.option = option;
          }
          onChange(adjustedEvent);
        }
      },
      [onChange, setValue, triggerChangeEvent],
    );

    let SelectIcon;
    switch (icon) {
      case false:
        break;
      case true:
      case undefined:
        SelectIcon =
          open && theme.select.icons.up
            ? theme.select.icons.up
            : theme.select.icons.down;
        break;
      default:
        SelectIcon = icon;
    }

    const optionValue = useCallback(
      (index) => applyKey(allOptions[index], valueKey),
      [allOptions, valueKey],
    );

    const isDisabled = useCallback(
      (index) => {
        const option = allOptions[index];
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
      [disabled, disabledKey, allOptions, optionValue],
    );

    const optionLabel = useCallback(
      (index) => applyKey(allOptions[index], labelKey),
      [labelKey, allOptions],
    );

    // element to show, trumps inputValue
    const selectValue = useMemo(() => {
      if (valueLabel instanceof Function) {
        if (value) {
          return valueLabel(value);
        }
      } else if (valueLabel) {
        return valueLabel;
      } else if (value.length > 0 && visibleSelection) {
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
                  .map((i) => {
                    const iValue =
                      valueKey && valueKey.reduce ? applyKey(i, valueKey) : i;
                    const indexOptions = allOptions.indexOf(i);
                    const iLabel = optionLabel(indexOptions);
                    if (value.indexOf(iValue) < 5) {
                      let child;
                      if (children) {
                        const optionDisabled = isDisabled(indexOptions);
                        const optionSelected = true;
                        const optionActive = false;
                        child = children(i, indexOptions, allOptions, {
                          active: optionActive,
                          disabled: optionDisabled,
                          selected: optionSelected,
                        });
                      }

                      return (
                        <Button
                          role="option"
                          a11yTitle={
                            value.includes(iValue)
                              ? `${iLabel} selected`
                              : `${iLabel} not selected`
                          }
                          aria-setsize={value.length}
                          aria-posinset={value.indexOf(iValue)}
                          aria-selected={value.includes(iValue)}
                          aria-disabled={isDisabled(indexOptions)}
                          plain
                          hoverIndicator
                          fill="horizontal"
                          tabIndex="0"
                          onClick={(event) => {
                            if (!isDisabled(indexOptions)) {
                              const intermediate = [...value];
                              const index = value.indexOf(iValue);
                              if (intermediate.includes(iValue)) {
                                onSelectChange(event, {
                                  option: iValue,
                                  value: intermediate.filter(
                                    (v) => v !== iValue,
                                  ),
                                });
                                if (index !== intermediate.length - 1) {
                                  let timer = 0;
                                  // if index is the last one visible
                                  // allow time for the next option to
                                  // become visible
                                  if (index === 4) timer = 200;

                                  setTimeout(() => {
                                    const nextFocus = document.getElementById(
                                      `selected-${intermediate[index + 1]}`,
                                    );
                                    if (nextFocus) nextFocus.focus();
                                    const result = allOptions.find(
                                      (obj, j) =>
                                        optionValue(j) ===
                                        intermediate[index + 1],
                                    );
                                    setShowA11yDiv(
                                      `Unselected ${iLabel}. 
                                      Focus moved to ${optionLabel(
                                        allOptions.indexOf(result),
                                      )}`,
                                    );
                                  }, timer);
                                } else if (intermediate.length !== 1) {
                                  const nextFocus = document.getElementById(
                                    `selected-${intermediate[index - 1]}`,
                                  );
                                  if (nextFocus) nextFocus.focus();
                                  const result = allOptions.find(
                                    (obj, j) =>
                                      optionValue(j) ===
                                      intermediate[index - 1],
                                  );
                                  setShowA11yDiv(
                                    `Unselected ${iLabel}. Focus moved to 
                                    ${optionLabel(allOptions.indexOf(result))}`,
                                  );
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
                              disabled={isDisabled(indexOptions)}
                              label={
                                <Box
                                  alignSelf="center"
                                  width="100%"
                                  align="start"
                                >
                                  {iLabel}
                                </Box>
                              }
                              key={iLabel}
                              pad="xsmall"
                              tabIndex="-1"
                              checked={value.includes(iValue)}
                            />
                          )}
                        </Button>
                      );
                    }
                  })}
              {showA11yDiv && (
                <Box
                  height="0px"
                  width="0px"
                  overflow="hidden"
                  // announce when an item is removed from selected options
                  aria-live="assertive"
                >
                  <Text>{showA11yDiv}</Text>
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
        // }
      }
      return undefined;
    }, [
      children,
      dropButtonRef,
      isDisabled,
      optionLabel,
      optionValue,
      valueKey,
      value,
      valueLabel,
      visibleSelection,
      showA11yDiv,
      allOptions,
      onRequestOpen,
      onSelectChange,
    ]);

    // After announcing set showA11yDiv to undefined so it won't
    // be read out again
    useEffect(() => {
      if (showA11yDiv !== undefined) {
        setTimeout(() => {
          setShowA11yDiv(undefined);
        }, 1000);
      }
    }, [showA11yDiv]);

    // if labelKey is a function and valueLabel is not defined
    // we should use the labelKey function to display the
    // selected value
    const displayLabelKey = useMemo(() => {
      const optionLabelKey = applyKey(
        allOptions[optionIndexesInValue[0]],
        labelKey,
      );
      if (
        !selectValue &&
        optionIndexesInValue.length === 1 &&
        typeof optionLabelKey === 'object'
      )
        return optionLabelKey;
      return undefined;
    }, [labelKey, allOptions, optionIndexesInValue, selectValue]);

    // text to show
    // When the options array contains objects, this property indicates how
    // to retrieve the value of each option.
    // If a string is provided, it is used as the key to retrieve a
    // property of an option object.
    // If a function is provided, it is called with the option and should
    // return the value.
    // If reduce is true, this value will be used for the 'value'
    // delivered via 'onChange'.
    const inputValue = useMemo(() => {
      if (!selectValue) {
        if (optionIndexesInValue.length === 0) return '';
        if (optionIndexesInValue.length === 1)
          return applyKey(allOptions[optionIndexesInValue[0]], labelKey);
        if (messages) return format({ id: 'select.multiple', messages });
        return `${optionIndexesInValue.length} selected`;
      }
      return undefined;
    }, [
      labelKey,
      messages,
      format,
      optionIndexesInValue,
      allOptions,
      selectValue,
    ]);

    const iconColor = normalizeColor(
      theme.select.icons.color || 'control',
      theme,
    );

    const dropContent = (
      <MultiSelectContainer
        allOptions={allOptions}
        disabled={disabled}
        disabledKey={disabledKey}
        dropHeight={dropHeight}
        emptySearchMessage={emptySearchMessage}
        helpContent={helpContent}
        id={id}
        labelKey={labelKey}
        limit={limit}
        onChange={onSelectChange}
        onClose={onRequestClose}
        onKeyDown={onKeyDown}
        onMore={onMore}
        onSearch={onSearch}
        options={optionsProp}
        optionIndexesInValue={optionIndexesInValue}
        replace={replace}
        searchPlaceholder={searchPlaceholder}
        search={search}
        setSearch={setSearch}
        usingKeyboard={usingKeyboard}
        value={value}
        valueKey={valueKey}
        visibleSelection={visibleSelection}
      >
        {children}
      </MultiSelectContainer>
    );

    const dropButtonProps = {
      ref: dropButtonRef,
      a11yTitle: `${ariaLabel || a11yTitle || placeholder || 'Open Drop'}. ${
        value.length
      } selected.`,
      'aria-expanded': Boolean(open),
      'aria-haspopup': 'listbox',
      id,
      disabled: disabled === true || undefined,
      open,
      focusIndicator,
      onFocus,
      onBlur,
      gridArea,
      margin,
      onOpen: onRequestOpen,
      onClose: onRequestClose,
      onClick,
      callerPlain: plain,
      plain, // Button should be plain
      dropProps,
      dropContent,
      theme,
    };

    return (
      <Keyboard onDown={onRequestOpen} onUp={onRequestOpen}>
        {visibleSelection ? (
          <StyledSelectBox
            disabled={disabled === true || undefined}
            alignSelf={alignSelf}
            direction="row"
            alignContent="start"
            background={theme.select.background}
            ref={selectBoxRef}
            flex={false}
            callerPlain={plain}
            width={width}
          >
            <Box direction="column" width="100%">
              <DropButton
                fill="horizontal"
                alignSelf="start"
                {...dropButtonProps}
                dropAlign={
                  dropAlign || { top: 'top', right: 'right', left: 'left' }
                }
                dropTarget={dropTarget || selectBoxRef.current}
              >
                {selectValue || displayLabelKey ? (
                  <>
                    <Box direction="row" width="100%">
                      <SelectTextInput
                        a11yTitle={
                          (ariaLabel || a11yTitle) &&
                          `${ariaLabel || a11yTitle}${
                            value && typeof value === 'string'
                              ? `, ${value}`
                              : ''
                          }`
                        }
                        defaultCursor={disabled === true || undefined}
                        focusIndicator={false}
                        id={id ? `${id}__input` : undefined}
                        name={name}
                        width="100%"
                        {...rest}
                        tabIndex="-1"
                        type="text"
                        // eslint-disable-next-line max-len
                        placeholder={`${value.length} selected of ${allOptions.length}`}
                        plain
                        readOnly
                        value=""
                        theme={theme}
                      />

                      {SelectIcon && (
                        <Box
                          pad={{ top: 'xsmall' }}
                          alignSelf="start"
                          margin={theme.select.icons.margin}
                          style={{ minWidth: 'auto' }}
                        >
                          {isValidElement(SelectIcon) ? (
                            SelectIcon
                          ) : (
                            <SelectIcon color={iconColor} size={size} />
                          )}
                        </Box>
                      )}
                    </Box>
                    <HiddenInput
                      type="text"
                      name={name}
                      id={id ? `${id}__input` : undefined}
                      value={inputValue}
                      ref={inputRef}
                      readOnly
                    />
                  </>
                ) : (
                  <Box direction="row">
                    <SelectTextInput
                      a11yTitle={
                        (ariaLabel || a11yTitle) &&
                        `${ariaLabel || a11yTitle}${
                          value && typeof value === 'string' ? `, ${value}` : ''
                        }`
                      }
                      // When Select is disabled, we want to show a default
                      // cursor but not have disabled styling come from
                      // TextInput. Disabled can be a bool or an array of
                      // options to disable. We only want to disable the
                      // TextInput if the control button should be
                      // disabled which occurs when disabled equals true.
                      defaultCursor={disabled === true || undefined}
                      focusIndicator={false}
                      id={id ? `${id}__input` : undefined}
                      name={name}
                      ref={inputRef}
                      {...rest}
                      tabIndex="-1"
                      type="text"
                      placeholder={placeholder}
                      plain
                      readOnly
                      value={inputValue}
                      size={size}
                      theme={theme}
                    />
                    {SelectIcon && (
                      <Box
                        pad={{ top: 'xsmall' }}
                        alignSelf="start"
                        margin={theme.select.icons.margin}
                        style={{ minWidth: 'auto' }}
                      >
                        {isValidElement(SelectIcon) ? (
                          SelectIcon
                        ) : (
                          <SelectIcon color={iconColor} size={size} />
                        )}
                      </Box>
                    )}
                  </Box>
                )}
              </DropButton>
              {!open && (selectValue || displayLabelKey)}
            </Box>
          </StyledSelectBox>
        ) : (
          <StyledSelectDropButton
            {...dropButtonProps}
            dropAlign={dropAlign || { top: 'bottom', left: 'left' }}
            dropTarget={dropTarget}
            alignSelf={alignSelf}
            tabIndex="0"
          >
            <Box
              align="center"
              direction="row"
              justify="between"
              background={theme.select.background}
              width={width}
            >
              <Box direction="row" flex basis="auto">
                {selectValue || displayLabelKey ? (
                  <>
                    {selectValue || displayLabelKey}
                    <HiddenInput
                      type="text"
                      name={name}
                      id={id ? `${id}__input` : undefined}
                      value={inputValue}
                      ref={inputRef}
                      readOnly
                    />
                  </>
                ) : (
                  <SelectTextInput
                    a11yTitle={
                      (ariaLabel || a11yTitle) &&
                      `${ariaLabel || a11yTitle}${
                        value && typeof value === 'string' ? `, ${value}` : ''
                      }`
                    }
                    // When Select is disabled, we want to show a default cursor
                    // but not have disabled styling come from TextInput
                    // Disabled can be a bool or an array of options to disable.
                    // We only want to disable the TextInput if the control
                    // button should be disabled which occurs when disabled
                    // equals true.
                    defaultCursor={disabled === true || undefined}
                    focusIndicator={false}
                    id={id ? `${id}__input` : undefined}
                    name={name}
                    ref={inputRef}
                    {...rest}
                    tabIndex="-1"
                    type="text"
                    placeholder={placeholder}
                    plain
                    readOnly
                    value={inputValue}
                    size={size}
                    theme={theme}
                  />
                )}
              </Box>
              {SelectIcon && (
                <Box
                  margin={theme.select.icons.margin}
                  flex={false}
                  style={{ minWidth: 'auto' }}
                >
                  {isValidElement(SelectIcon) ? (
                    SelectIcon
                  ) : (
                    <SelectIcon color={iconColor} size={size} />
                  )}
                </Box>
              )}
            </Box>
          </StyledSelectDropButton>
        )}
      </Keyboard>
    );
  },
);

MultiSelect.defaultProps = { ...defaultProps };

MultiSelect.displayName = 'MultiSelect';
MultiSelect.propTypes = MultiSelectPropTypes;

export { MultiSelect };
