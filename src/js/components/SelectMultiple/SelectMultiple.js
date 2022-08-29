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
import { controlBorderStyle, useKeyboard, useForwardedRef } from '../../utils';
import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { DropButton } from '../DropButton';
import { Keyboard } from '../Keyboard';
import { FormContext } from '../Form/FormContext';
import { SelectMultipleValue } from './SelectMultipleValue';

import { SelectMultipleContainer } from './SelectMultipleContainer';
import {
  HiddenInput,
  SelectTextInput,
  StyledSelectDropButton,
} from '../Select/StyledSelect';
import {
  applyKey,
  getNormalizedValue,
  changeEvent,
  getSelectIcon,
  getIconColor,
  getDisplayLabelKey,
} from '../Select/utils';
import { DefaultSelectTextInput } from '../Select/DefaultSelectTextInput';
import { MessageContext } from '../../contexts/MessageContext';
import { SelectMultiplePropTypes } from './propTypes';

const StyledSelectBox = styled(Box)`
  ${(props) => !props.callerPlain && controlBorderStyle};
  ${(props) =>
    props.theme.select &&
    props.theme.select?.control &&
    props.theme.select?.control?.extend};
  ${(props) => props.open && props.theme.select.control?.open};
`;

StyledSelectDropButton.defaultProps = {};
Object.setPrototypeOf(StyledSelectDropButton.defaultProps, defaultProps);

const SelectMultiple = forwardRef(
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
      focusIndicator, // internal only from FormField
      gridArea,
      help,
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
      open: openProp,
      options: optionsProp,
      placeholder,
      plain,
      replace,
      searchPlaceholder,
      size,
      separateSelected,
      value: valueProp,
      valueKey,
      valueLabel,
      showSelectedInline = false,
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
    const dropButtonRef = useForwardedRef(ref);
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

    // normalizedValue is the value mapped with any valueKey applied
    // When the options array contains objects, this property indicates how
    // to retrieve the value of each option.
    // If a string is provided, it is used as the key to retrieve a
    // property of an option object.
    // If a function is provided, it is called with the option and should
    // return the value.
    // If reduce is true, this value will be used for the 'value'
    // delivered via 'onChange'.
    const normalizedValue = useMemo(
      () => getNormalizedValue(value, valueKey),
      [value, valueKey],
    );
    // search input value
    const [search, setSearch] = useState();
    // All select option indices and values
    const [allOptions, setAllOptions] = useState(optionsProp);
    const [orderedOptions, setOrderedOptions] = useState();
    // Track changes to options property, except when options are being
    // updated due to search activity. Allows option's initial index value
    // to be referenced when filtered by search.
    useEffect(() => {
      if (!search) setAllOptions(optionsProp);
      if (!search && separateSelected) setOrderedOptions(optionsProp);
    }, [optionsProp, search, separateSelected]);

    // the option indexes present in the value
    const optionIndexesInValue = useMemo(() => {
      const result = [];
      allOptions.forEach((option, index) => {
        if (
          normalizedValue &&
          normalizedValue.length > 0 &&
          normalizedValue.some((v) => v === applyKey(option, valueKey))
        ) {
          result.push(index);
        }
      });
      return result;
    }, [allOptions, valueKey, normalizedValue]);

    const [open, setOpen] = useState(openProp);
    useEffect(() => setOpen(openProp), [openProp]);

    const onRequestOpen = useCallback(() => {
      if (open) return;
      setOpen(true);
      if (onOpen) onOpen();
    }, [onOpen, open]);

    useEffect(() => {
      if (separateSelected && ((open && search) || !open)) {
        const selectedOptions = optionsProp.filter((option) => {
          const iValue =
            valueKey && valueKey.reduce ? applyKey(option, valueKey) : option;
          return value.includes(iValue);
        });
        const unselectedOptions = optionsProp.filter(
          (i) => !selectedOptions.includes(i),
        );
        const nextOrderedOptions = selectedOptions.concat(unselectedOptions);
        setOrderedOptions(nextOrderedOptions);
      }
    }, [open, separateSelected, optionsProp, value, valueKey, search]);

    const onRequestClose = useCallback(() => {
      setOpen(false);
      if (onClose) onClose();
      setSearch();
    }, [onClose]);

    const triggerChangeEvent = useCallback(
      (nextValue) => changeEvent(inputRef, nextValue),
      [],
    );

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

    const SelectIcon = getSelectIcon(icon, theme, open);

    // element to show, trumps inputValue
    const selectValue = useMemo(() => {
      if (valueLabel instanceof Function) {
        if (value) return valueLabel(value);
      } else if (valueLabel) return valueLabel;
      else if (value.length > 0 && showSelectedInline) {
        return (
          <SelectMultipleValue
            allOptions={allOptions}
            disabled={disabled}
            disabledKey={disabledKey}
            dropButtonRef={dropButtonRef}
            labelKey={labelKey}
            onRequestOpen={onRequestOpen}
            onSelectChange={onSelectChange}
            theme={theme}
            value={value}
            valueKey={valueKey}
          >
            {children}
          </SelectMultipleValue>
        );
      }
      return undefined;
    }, [
      valueKey,
      value,
      valueLabel,
      showSelectedInline,
      onRequestOpen,
      allOptions,
      children,
      labelKey,
      onSelectChange,
      disabled,
      disabledKey,
      dropButtonRef,
      theme,
    ]);

    const displayLabelKey = useMemo(
      () =>
        getDisplayLabelKey(
          labelKey,
          allOptions,
          optionIndexesInValue,
          selectValue,
        ),
      [labelKey, allOptions, optionIndexesInValue, selectValue],
    );

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

    const iconColor = getIconColor(theme);

    const dropContent = (
      <SelectMultipleContainer
        allOptions={allOptions}
        disabled={disabled}
        disabledKey={disabledKey}
        dropHeight={dropHeight}
        emptySearchMessage={emptySearchMessage}
        help={help}
        id={id}
        labelKey={labelKey}
        limit={limit}
        onChange={onSelectChange}
        onClose={onRequestClose}
        onKeyDown={onKeyDown}
        onMore={onMore}
        onSearch={onSearch}
        options={orderedOptions || optionsProp}
        optionIndexesInValue={optionIndexesInValue}
        replace={replace}
        searchPlaceholder={searchPlaceholder}
        search={search}
        setSearch={setSearch}
        usingKeyboard={usingKeyboard}
        value={value}
        valueKey={valueKey}
        showSelectedInline={showSelectedInline}
      >
        {children}
      </SelectMultipleContainer>
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

    const displaySelectIcon = SelectIcon && (
      <Box
        alignSelf="center"
        margin={theme.select.icons.margin}
        width={{ min: 'auto' }}
      >
        {isValidElement(SelectIcon) ? (
          SelectIcon
        ) : (
          <SelectIcon color={iconColor} size={size} />
        )}
      </Box>
    );

    return (
      <Keyboard onDown={onRequestOpen} onUp={onRequestOpen}>
        {showSelectedInline ? (
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
            <Box width="100%">
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
                    <Box direction="row">
                      <SelectTextInput
                        a11yTitle={ariaLabel || a11yTitle}
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
                      {displaySelectIcon}
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
                    <DefaultSelectTextInput
                      a11yTitle={ariaLabel || a11yTitle}
                      disabled={disabled}
                      id={id}
                      name={name}
                      ref={inputRef}
                      placeholder={placeholder}
                      value={inputValue}
                      size={size}
                      theme={theme}
                      {...rest}
                    />
                    {displaySelectIcon}
                  </Box>
                )}
              </DropButton>
              {!open && (selectValue || displayLabelKey)}
            </Box>
          </StyledSelectBox>
        ) : (
          <Box width={width}>
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
                    <DefaultSelectTextInput
                      a11yTitle={ariaLabel || a11yTitle}
                      disabled={disabled}
                      id={id}
                      name={name}
                      ref={inputRef}
                      placeholder={placeholder}
                      value={inputValue}
                      size={size}
                      theme={theme}
                      {...rest}
                    />
                  )}
                </Box>
                {displaySelectIcon}
              </Box>
            </StyledSelectDropButton>
          </Box>
        )}
      </Keyboard>
    );
  },
);

SelectMultiple.defaultProps = { ...defaultProps };

SelectMultiple.displayName = 'SelectMultiple';
SelectMultiple.propTypes = SelectMultiplePropTypes;

export { SelectMultiple };
