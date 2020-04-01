import React, {
  forwardRef,
  isValidElement,
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

const SelectTextInput = styled(TextInput)`
  cursor: pointer;
`;

const StyledSelectDropButton = styled(DropButton)`
  ${props => !props.plain && controlBorderStyle};
  ${props =>
    props.theme.select &&
    props.theme.select.control &&
    props.theme.select.control.extend};
  ${props => props.open && props.theme.select.control.open};
`;

StyledSelectDropButton.defaultProps = {};
Object.setPrototypeOf(StyledSelectDropButton.defaultProps, defaultProps);

const Select = forwardRef(
  (
    {
      a11yTitle,
      alignSelf,
      children,
      closeOnChange = true,
      disabled,
      disabledKey,
      dropAlign = { top: 'bottom', left: 'left' },
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
      messages = { multiple: 'multiple' },
      multiple,
      name,
      onChange,
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

    // normalize the value prop to not be objects
    const normalizedValueProp = useMemo(() => {
      if (Array.isArray(valueProp)) {
        if (valueProp.length === 0) return valueProp;
        if (typeof valueProp[0] === 'object' && valueKey) {
          return valueProp.map(v => v[valueKey]);
        }
        return valueProp;
      }
      if (typeof valueProp === 'object' && valueKey) return valueProp[valueKey];
      return valueProp;
    }, [valueKey, valueProp]);

    const [value, setValue] = formContext.useFormContext(
      name,
      normalizedValueProp,
      '',
    );

    // track which options are present in the value
    const valueOptions = useMemo(
      () =>
        options.filter((option, index) => {
          if (selected !== undefined) {
            if (Array.isArray(selected)) return selected.indexOf(index) !== -1;
            return index === selected;
          }
          if (typeof option === 'object' && valueKey) {
            if (Array.isArray(value)) {
              return value.indexOf(option[valueKey]) !== -1;
            }
            return option[valueKey] === value;
          }
          if (Array.isArray(value)) {
            return value.indexOf(option) !== -1;
          }
          return option === value;
        }),
      [options, selected, value, valueKey],
    );

    const [open, setOpen] = useState(propOpen);
    useEffect(() => setOpen(propOpen), [propOpen]);

    const onRequestOpen = () => {
      setOpen(true);
      if (onOpen) onOpen();
    };

    const onRequestClose = () => {
      setOpen(false);
      if (onClose) onClose();
    };

    const onSelectChange = (
      event,
      { option, value: nextValue, selected: nextSelected },
    ) => {
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
    };

    let SelectIcon;
    switch (icon) {
      case false:
        break;
      case true:
      case undefined:
        SelectIcon = theme.select.icons.down;
        break;
      default:
        SelectIcon = icon;
    }

    // element to show, trumps inputValue
    const selectValue = useMemo(() => {
      if (valueLabel) return valueLabel;
      if (React.isValidElement(value)) return value;
      return undefined;
    }, [value, valueLabel]);

    // text to show
    const inputValue = useMemo(() => {
      if (!selectValue) {
        if (Array.isArray(valueOptions)) {
          if (valueOptions.length === 0) return '';
          if (valueOptions.length === 1) {
            const valueOption = valueOptions[0];
            if (typeof valueOption === 'object' && labelKey) {
              if (typeof labelKey === 'function') {
                return labelKey(valueOption);
              }
              return valueOption[labelKey];
            }
            return valueOption;
          }
          return messages.multiple;
        }
        if (typeof valueOptions === 'object' && labelKey) {
          if (typeof labelKey === 'function') {
            return labelKey(valueOptions);
          }
          return valueOptions[labelKey];
        }
        if (valueOptions !== undefined) return valueOptions;
        return '';
      }
      return undefined;
    }, [labelKey, messages, selectValue, valueOptions]);

    // const dark = theme.select.background
    // ? colorIsDark(theme.select.background)
    // : theme.dark;
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
              replace={replace}
              searchPlaceholder={searchPlaceholder}
              selected={selected}
              value={value}
              valueKey={valueKey}
            >
              {children}
            </SelectContainer>
          }
          plain={plain}
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
                      typeof value === 'string' ? `, ${value}` : ''
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
                  onClick={disabled === true ? undefined : onRequestOpen}
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
