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

const SelectTextInput = styled(TextInput)`
  cursor: pointer;
`;

const StyledSelectDropButton = styled(DropButton)`
  ${props => !props.callerPlain && controlBorderStyle};
  ${props =>
    props.theme.select &&
    props.theme.select.control &&
    props.theme.select.control.extend};
  ${props => props.open && props.theme.select.control.open};
`;

StyledSelectDropButton.defaultProps = {};
Object.setPrototypeOf(StyledSelectDropButton.defaultProps, defaultProps);

const defaultDropAlign = { top: 'bottom', left: 'left' };
const defaultMessages = { multiple: 'multiple' };

const Select = forwardRef(
  (
    {
      a11yTitle,
      alignSelf,
      children,
      closeOnChange = true,
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
      messages = defaultMessages,
      multiple,
      name,
      onChange,
      onClick,
      onClose,
      onKeyDown,
      onMore,
      onOpen,
      onSearch,
      open: propOpen,
      options,
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

    // value is used for what we receive in valueProp and the basis for
    // what we send with onChange
    const [value, setValue] = formContext.useFormInput(name, valueProp, '');
    // valuedValue is the value mapped with any valueKey applied
    const valuedValue = useMemo(() => {
      if (Array.isArray(value))
        return value.map(v =>
          valueKey && valueKey.reduce ? v : applyKey(v, valueKey),
        );
      return valueKey && valueKey.reduce ? value : applyKey(value, valueKey);
    }, [value, valueKey]);
    // the option indexes present in the value
    const optionIndexesInValue = useMemo(() => {
      const result = [];
      options.forEach((option, index) => {
        if (selected !== undefined) {
          if (Array.isArray(selected)) {
            if (selected.indexOf(index) !== -1) result.push(index);
          } else if (index === selected) {
            result.push(index);
          }
        } else if (Array.isArray(valuedValue)) {
          if (valuedValue.some(v => v === applyKey(option, valueKey))) {
            result.push(index);
          }
        } else if (valuedValue === applyKey(option, valueKey)) {
          result.push(index);
        }
      });
      return result;
    }, [options, selected, valueKey, valuedValue]);

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
    }, [onClose]);

    const onSelectChange = useCallback(
      (event, { option, value: nextValue, selected: nextSelected }) => {
        if (closeOnChange) onRequestClose();
        setValue(nextValue);
        if (onChange) {
          event.persist();
          const adjustedEvent = event;
          adjustedEvent.target = inputRef.current;
          adjustedEvent.value = nextValue;
          adjustedEvent.option = option;
          adjustedEvent.selected = nextSelected;
          onChange(adjustedEvent);
        }
      },
      [closeOnChange, onChange, onRequestClose, setValue],
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
    const inputValue = useMemo(() => {
      if (!selectValue) {
        if (optionIndexesInValue.length === 0) return '';
        if (optionIndexesInValue.length === 1)
          return applyKey(options[optionIndexesInValue[0]], labelKey);
        return messages.multiple;
      }
      return undefined;
    }, [labelKey, messages, optionIndexesInValue, options, selectValue]);

    const iconColor = normalizeColor(
      theme.select.icons.color || 'control',
      theme,
    );

    return (
      <Keyboard onDown={onRequestOpen} onUp={onRequestOpen}>
        <StyledSelectDropButton
          ref={ref}
          id={id}
          disabled={disabled === true || undefined}
          dropAlign={dropAlign}
          dropTarget={dropTarget}
          open={open}
          alignSelf={alignSelf}
          focusIndicator={focusIndicator}
          gridArea={gridArea}
          margin={margin}
          onOpen={onRequestOpen}
          onClose={onRequestClose}
          onClick={onClick}
          dropContent={
            <SelectContainer
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
              options={options}
              optionIndexesInValue={optionIndexesInValue}
              replace={replace}
              searchPlaceholder={searchPlaceholder}
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
              {selectValue || (
                <SelectTextInput
                  a11yTitle={
                    a11yTitle &&
                    `${a11yTitle}${
                      value && typeof value === 'string' ? `, ${value}` : ''
                    }`
                  }
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

let SelectDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  SelectDoc = require('./doc').doc(Select);
}
const SelectWrapper = SelectDoc || Select;

export { SelectWrapper as Select };
