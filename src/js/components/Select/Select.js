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

import { controlBorderStyle, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { DropButton } from '../DropButton';
import { Keyboard } from '../Keyboard';
import { FormContext } from '../Form/FormContext';
import { TextInput } from '../TextInput';

import { SelectContainer } from './SelectContainer';
import { applyKey } from './utils';
import { MessageContext } from '../../contexts/MessageContext';
import { SelectPropTypes } from './propTypes';

const SelectTextInput = styled(TextInput)`
  cursor: ${(props) => (props.defaultCursor ? 'default' : 'pointer')};
`;

const HiddenInput = styled.input`
  display: none;
`;

const StyledSelectDropButton = styled(DropButton)`
  ${(props) => !props.callerPlain && controlBorderStyle};
  ${(props) =>
    props.theme.select &&
    props.theme.select.control &&
    props.theme.select.control.extend};
  ${(props) => props.open && props.theme.select.control.open};
`;

StyledSelectDropButton.defaultProps = {};
Object.setPrototypeOf(StyledSelectDropButton.defaultProps, defaultProps);

const defaultDropAlign = { top: 'bottom', left: 'left' };

const Select = forwardRef(
  (
    {
      a11yTitle,
      'aria-label': ariaLabel,
      alignSelf,
      children,
      clear = false,
      closeOnChange = true,
      defaultValue,
      disabled,
      disabledKey,
      dropAlign = defaultDropAlign,
      dropHeight,
      dropProps,
      dropTarget,
      emptySearchMessage,
      focusIndicator,
      gridArea,
      id,
      icon,
      labelKey,
      margin,
      messages,
      multiple,
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
      selected,
      size,
      value: valueProp,
      valueKey,
      valueLabel,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const inputRef = useRef();
    const formContext = useContext(FormContext);
    const { format } = useContext(MessageContext);
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
        if (selected !== undefined) {
          if (Array.isArray(selected)) {
            if (selected.indexOf(index) !== -1) result.push(index);
          } else if (index === selected) {
            result.push(index);
          }
        } else if (Array.isArray(valuedValue)) {
          if (valuedValue.some((v) => v === applyKey(option, valueKey))) {
            result.push(index);
          }
        } else if (valuedValue === applyKey(option, valueKey)) {
          result.push(index);
        }
      });
      return result;
    }, [allOptions, selected, valueKey, valuedValue]);

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
      (event, { option, value: nextValue, selected: nextSelected }) => {
        if (closeOnChange) onRequestClose();
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
              selected: { value: nextSelected },
            });
          } else {
            adjustedEvent = event;
            adjustedEvent.target = inputRef.current;
            adjustedEvent.value = nextValue;
            adjustedEvent.option = option;
            adjustedEvent.selected = nextSelected;
          }
          onChange(adjustedEvent);
        }
        setSearch();
      },
      [closeOnChange, onChange, onRequestClose, setValue, triggerChangeEvent],
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

    // element to show, trumps inputValue
    const selectValue = useMemo(() => {
      if (valueLabel) return valueLabel;
      if (React.isValidElement(value)) return value; // deprecated
      return undefined;
    }, [value, valueLabel]);

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
        return format({ id: 'select.multiple', messages });
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

    return (
      <Keyboard onDown={onRequestOpen} onUp={onRequestOpen}>
        <StyledSelectDropButton
          ref={ref}
          a11yTitle={`${ariaLabel || a11yTitle || placeholder || 'Open Drop'}${
            value
              ? format({
                  id: 'select.selected',
                  messages,
                  values: { currentSelectedValue: value },
                })
              : ''
          }`}
          aria-expanded={Boolean(open)}
          aria-haspopup="listbox"
          id={id}
          disabled={disabled === true || undefined}
          dropAlign={dropAlign}
          dropTarget={dropTarget}
          open={open}
          alignSelf={alignSelf}
          focusIndicator={focusIndicator}
          onFocus={onFocus}
          onBlur={onBlur}
          gridArea={gridArea}
          margin={margin}
          onOpen={onRequestOpen}
          onClose={onRequestClose}
          onClick={onClick}
          dropContent={
            <SelectContainer
              clear={clear}
              disabled={disabled}
              disabledKey={disabledKey}
              dropHeight={dropHeight}
              emptySearchMessage={emptySearchMessage}
              id={id}
              labelKey={labelKey}
              multiple={multiple}
              name={name}
              onChange={onSelectChange}
              onKeyDown={onKeyDown}
              onMore={onMore}
              onSearch={onSearch}
              options={optionsProp}
              allOptions={allOptions}
              optionIndexesInValue={optionIndexesInValue}
              replace={replace}
              searchPlaceholder={searchPlaceholder}
              search={search}
              setSearch={setSearch}
              selected={selected}
              value={value}
              valueKey={valueKey}
            >
              {children}
            </SelectContainer>
          }
          // StyledDropButton needs to know if the border should be shown
          callerPlain={plain}
          plain // Button should be plain
          dropProps={dropProps}
          theme={theme}
        >
          <Box
            align="center"
            direction="row"
            justify="between"
            background={theme.select.background}
          >
            <Box direction="row" flex basis="auto">
              {selectValue ? (
                <>
                  {selectValue}
                  <HiddenInput
                    type="text"
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
      </Keyboard>
    );
  },
);

Select.defaultProps = { ...defaultProps };

Select.displayName = 'Select';
Select.propTypes = SelectPropTypes;

export { Select };
