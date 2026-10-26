// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, {
  Children,
  cloneElement,
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styled, { css } from 'styled-components';

import {
  backgroundStyle,
  borderStyle,
  containsFocus,
  edgeStyle,
  elevationStyle,
  isObject,
  normalizeColor,
  roundStyle,
  shouldKeepFocus,
  withinDropPortal,
  PortalContext,
} from '../../utils';
import { useDebounce } from '../../utils/use-debounce';
import { focusStyle } from '../../utils/styles';
import { parseMetricToNum } from '../../utils/mixins';
import { useForwardedRef } from '../../utils/refs';
import { Box } from '../Box';
import { CheckBox } from '../CheckBox';
import { CheckBoxGroup } from '../CheckBoxGroup';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { FormContext } from '../Form/FormContext';
import { FormFieldPropTypes } from './propTypes';
import { FormFieldContext } from './FormFieldContext';
import { useThemeValue } from '../../utils/useThemeValue';
import { AnnounceContext } from '../../contexts/AnnounceContext';

const grommetInputFocusNames = [
  'CheckBox',
  'CheckBoxGroup',
  'RadioButton',
  'RadioButtonGroup',
  'RangeInput',
  'RangeSelector',
  'StarRating',
  'ThumbsRating',
];

const grommetInputNames = [
  'CheckBox',
  'CheckBoxGroup',
  'TextInput',
  'Select',
  'MaskedInput',
  'SelectMultiple',
  'TextArea',
  'DateInput',
  'DateTimeInput',
  'TimeInput',
  'FileInput',
  'RadioButton',
  'RadioButtonGroup',
  'RangeInput',
  'RangeSelector',
  'StarRating',
  'ThumbsRating',
];
const grommetInputPadNames = [
  'CheckBox',
  'CheckBoxGroup',
  'RadioButton',
  'RadioButtonGroup',
  'RangeInput',
  'RangeSelector',
];

const isGrommetInput = (comp) =>
  comp &&
  (grommetInputNames.indexOf(comp.displayName) !== -1 ||
    grommetInputPadNames.indexOf(comp.displayName) !== -1);

const mergePartBorder = (border, override) => {
  if (override === undefined) return border;
  if (Array.isArray(border) && isObject(override) && !override.side)
    return border.map((part) => mergePartBorder(part, override));
  if (isObject(border) && isObject(override)) return { ...border, ...override };
  if (typeof border === 'string' && isObject(override))
    return { side: border, ...override };
  return override;
};

const getFocusStyle = (props, content = false) => {
  if (
    props.focus &&
    props.containerFocus === false &&
    props.theme.formField?.focus?.containerFocus === false
  ) {
    return null;
  }
  if (!props.focus) return undefined;
  if (
    content &&
    props.error &&
    props.theme.formField[props.componentName]?.error?.border !== undefined
  )
    return css`
      ${focusStyle({ justBorder: true })}
      ${props.border === false
        ? 'border: none;'
        : borderStyle(props.border, props.responsive ?? true, props.theme)}
      ${isObject(props.border) &&
      props.border.color !== undefined &&
      `border-color: ${normalizeColor(props.border.color, props.theme)};`}
    `;
  return focusStyle({ justBorder: true });
};

const boxStateStyles = (state, props) => {
  const { theme } = props;
  const responsive = props.responsive ?? true;
  const styles = [];
  if (state.elevation !== undefined)
    styles.push(elevationStyle(state.elevation));
  if (state.pad !== undefined)
    styles.push(
      edgeStyle(
        'padding',
        state.pad,
        responsive,
        theme.box.responsiveBreakpoint,
        theme,
      ),
    );
  if (state.round !== undefined)
    styles.push(
      state.round === false
        ? 'border-radius: 0;'
        : roundStyle(state.round, responsive, theme),
    );
  return styles;
};

// The border color has to be painted by whichever element owns the border,
// but the background belongs on the content element so it doesn't bleed
// behind the label and messages when the border is positioned 'outer'.
// FormField sets allowHover only when no higher priority state (disabled,
// readOnly, error, focus) applies.
const getHoverStyle = (role) => (props) => {
  const formFieldTheme = props.theme.formField;
  const hover = formFieldTheme?.hover;
  const componentHover = formFieldTheme?.[props.componentName]?.hover;
  if (!props.allowHover || (!hover && !componentHover)) return undefined;
  const position = formFieldTheme?.border?.position;
  const ownsBorder =
    role === 'outer' ? position === 'outer' : position === 'inner';
  const componentOwnsBorder =
    role === 'outer' ? position === 'outer' : position !== 'outer';

  const componentHoverBorder = componentHover?.border ?? undefined;
  const componentHoverBackground = componentHover?.background ?? undefined;
  const styles = [];
  if (role === 'content') {
    const background = componentHoverBackground ?? hover?.background;
    if (background !== undefined)
      styles.push(backgroundStyle(background, props.theme, false));
    styles.push(
      ...boxStateStyles(
        {
          elevation: componentHover?.elevation,
          pad: componentHover?.pad,
          round: componentHover?.round,
        },
        props,
      ),
    );
  }
  if (componentOwnsBorder && componentHoverBorder !== undefined) {
    if (componentHoverBorder === false) styles.push('border: none;');
    else if (
      componentHoverBorder &&
      typeof componentHoverBorder === 'object' &&
      !Array.isArray(componentHoverBorder) &&
      Object.keys(componentHoverBorder).every((key) => key === 'color')
    ) {
      if (componentHoverBorder.color !== undefined)
        styles.push(
          `border-color: ${normalizeColor(
            componentHoverBorder.color,
            props.theme,
          )};`,
        );
    } else {
      styles.push(
        borderStyle(
          componentHoverBorder,
          props.responsive ?? true,
          props.theme,
        ),
      );
    }
  } else if (ownsBorder && hover?.border?.color !== undefined) {
    styles.push(
      `border-color: ${normalizeColor(hover.border.color, props.theme)};`,
    );
  }
  if (styles.length === 0) return undefined;
  return css`
    &:hover {
      ${styles}
    }
  `;
};

const FormFieldBox = styled(Box)`
  ${(props) => getFocusStyle(props)}
  ${getHoverStyle('outer')}
  ${(props) => props.theme.formField?.extend}
`;

const FormFieldContentBox = styled(Box)`
  ${(props) => getFocusStyle(props, true)}
  ${getHoverStyle('content')}
  ${(props) =>
    props.theme.formField &&
    props.theme.formField[props?.componentName]?.container?.extend}
`;

const StyledContentsBox = styled(Box)`
  ${getHoverStyle('content')}
  ${(props) =>
    props.theme.formField &&
    props.theme.formField[props?.componentName]?.container?.extend}
`;

const StyledMessageContainer = styled(Box)`
  ${(props) =>
    props.messageType &&
    props.theme.formField[props.messageType].container &&
    props.theme.formField[props.messageType].container.extend}
`;

const RequiredText = styled(Text)`
  color: inherit;
  font-weight: inherit;
  line-height: inherit;
`;

const ScreenReaderOnly = styled(Text)`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const MessageContent = ({ message, id, ...rest }) =>
  typeof message === 'string' ? (
    <Text id={id} {...rest}>
      {message}
    </Text>
  ) : (
    <Box id={id} {...rest}>
      {message}
    </Box>
  );

const Message = ({ error, info, message, type, ...rest }) => {
  const { theme, passThemeFlag } = useThemeValue();
  if (message) {
    let icon;
    let containerProps;

    if (type) {
      icon = theme.formField[type] && theme.formField[type].icon;
      containerProps = theme.formField[type] && theme.formField[type].container;
    }

    // id is in rest; extract it so we can place it on the outermost element
    const { id, ...contentRest } = rest;

    if (icon || containerProps) {
      return (
        <StyledMessageContainer
          direction="row"
          messageType={type}
          {...containerProps}
          {...passThemeFlag}
          id={id}
        >
          {icon && <Box flex={false}>{icon}</Box>}
          <MessageContent message={message} {...contentRest} />
        </StyledMessageContainer>
      );
    }
    return <MessageContent message={message} id={id} {...contentRest} />;
  }
  return null;
};

const Input = ({ component, disabled, invalid, name, onChange, ...rest }) => {
  const formContext = useContext(FormContext);
  const [value, setValue] = formContext.useFormInput({
    name,
    value: rest.value,
  });
  const InputComponent = component || TextInput;
  // Grommet input components already check for FormContext
  // and, using their `name`, end up calling the useFormInput.setValue()
  // already. For custom components, we expect they will call
  // this onChange() and we'll call setValue() here, primarily
  // for backwards compatibility.
  const extraProps = isGrommetInput(InputComponent)
    ? { focusIndicator: false, onChange, plain: true }
    : {
        value,
        onChange: (event) => {
          setValue(
            event.value !== undefined ? event.value : event.target.value,
          );
          if (onChange) onChange(event);
        },
      };
  return (
    <InputComponent
      name={name}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      {...rest}
      {...extraProps}
    />
  );
};

// Adds aria-describedby (linking to the error Message) and aria-invalid to
// a Grommet input child when the field has an error. Merges with any
// aria-describedby the consumer already put on the child instead of
// overwriting it.
const getChildErrorProps = (child, errorId, error) => {
  if (!errorId && !error) return {};
  const props = {};
  if (errorId) {
    const existingDescribedBy = child.props['aria-describedby'];
    props['aria-describedby'] = existingDescribedBy
      ? `${existingDescribedBy} ${errorId}`
      : errorId;
  }
  if (error) props['aria-invalid'] = true;
  return props;
};

// Backwards compatibility: defaults plain/focusIndicator/pad on a Grommet
// input child, unless the consumer already set plain or focusIndicator.
// This is the same logic FormField has always had; only pulled out into
// its own function so it can be reasoned about independent of the newer
// error-linking logic above.
const getChildFocusProps = (
  child,
  themeBorder,
  containerFocus,
  formFieldTheme,
) =>
  !themeBorder ||
  child.props.plain !== undefined ||
  child.props.focusIndicator !== undefined
    ? {}
    : {
        plain: true,
        focusIndicator: !containerFocus,
        pad:
          child.type.displayName === 'CheckBox'
            ? formFieldTheme?.checkBox?.pad
            : undefined,
      };

const FormField = forwardRef(
  (
    {
      children,
      className,
      component,
      contentProps,
      disabled, // pass through in renderInput()
      error: errorProp,
      help,
      htmlFor,
      info: infoProp,
      label,
      margin,
      name, // pass through in renderInput()
      onBlur,
      onChange,
      onFocus,
      pad,
      required,
      style,
      validate,
      validateOn,
      ...rest
    },
    ref,
  ) => {
    const { theme, passThemeFlag } = useThemeValue();
    const formContext = useContext(FormContext);

    const {
      error,
      info,
      inForm,
      onBlur: contextOnBlur,
      onChange: contextOnChange,
    } = formContext.useFormField({
      disabled,
      error: errorProp,
      info: infoProp,
      name,
      required,
      validate,
      validateOn,
    });
    const formKind = formContext.kind;
    const [focus, setFocus] = useState();
    const [focusIndicator, setFocusIndicator] = useState(true);
    const fieldFocus = focus && focusIndicator;
    const fieldContext = useMemo(() => ({ setFocusIndicator }), []);
    const formFieldRef = useForwardedRef(ref);

    const { formField: formFieldTheme } = theme;
    const { border: themeBorder } = formFieldTheme;
    const debounce = useDebounce();

    const portalContext = useContext(PortalContext);
    const announce = useContext(AnnounceContext);

    useEffect(() => {
      if (error && validate?.max) {
        announce(error, 'polite', 5000);
      }
    }, [error, announce, validate?.max]);

    const readOnlyField = useMemo(() => {
      let readOnly = false;
      if (!children && inForm) {
        const InputComponent = component || TextInput;
        readOnly =
          (rest.readOnly === true || rest.readOnlyCopy === true) &&
          (InputComponent.displayName === 'TextInput' ||
            InputComponent.displayName === 'DateInput');
      }
      if (children) {
        Children.map(children, (child) => {
          if (
            (child?.props?.readOnly === true ||
              child?.props?.readOnlyCopy === true) &&
            child.type &&
            (child.type.displayName === 'TextInput' ||
              child.type.displayName === 'DateInput')
          ) {
            readOnly = true;
          }
        });
      }
      return readOnly;
    }, [children, component, inForm, rest.readOnly, rest.readOnlyCopy]);

    const containerFocus = useMemo(() => {
      let focusIndicatorFlag = true;
      Children.forEach(children, (child) => {
        if (
          child &&
          child.type &&
          grommetInputFocusNames.includes(child.type.displayName) &&
          theme.formField?.focus?.containerFocus !== true
        ) {
          focusIndicatorFlag = false;
        }
      });
      return focusIndicatorFlag;
    }, [children, theme.formField?.focus?.containerFocus]);

    // Check if child is Select or SelectMultiple and modify htmlFor if needed
    let adjustedHtmlFor = htmlFor;
    if (htmlFor) {
      let isSelectComponent = false;

      // Check if children contain Select or SelectMultiple
      if (children) {
        Children.forEach(children, (child) => {
          if (
            child &&
            child.type &&
            (child.type.displayName === 'Select' ||
              child.type.displayName === 'SelectMultiple') &&
            child.props.id === htmlFor
          ) {
            isSelectComponent = true;
          }
        });
      }

      // If it's a Select component and htmlFor doesn't end with __input, add it
      if (isSelectComponent && !htmlFor.endsWith('__input')) {
        adjustedHtmlFor = `${htmlFor}__input`;
      }
    }

    // This is here for backwards compatibility. In case the child is a grommet
    // input component, set plain and focusIndicator props, if they aren't
    // already set.
    let wantContentPad =
      component &&
      (component === CheckBox ||
        component === CheckBoxGroup ||
        component === RadioButtonGroup);

    // id of the error Message, used to link it to its input via
    // aria-describedby. Always computed when there's an error + htmlFor,
    // regardless of theme border config.
    const errorId =
      error && htmlFor ? `grommet-${adjustedHtmlFor}__error` : undefined;

    // Single Children.map pass applying both the error-linking props
    // (getChildErrorProps) and the plain/focusIndicator/pad backwards-compat
    // defaults (getChildFocusProps) to each Grommet input child. Must run
    // the same way regardless of `error`, or a child's reconciliation key
    // changes between renders - remounting it and losing state (e.g. a
    // typed value) right when the error appears.
    let contents;
    if (children) {
      contents = Children.map(children, (child) => {
        if (!child || !child.type || !isGrommetInput(child.type)) return child;

        if (
          themeBorder &&
          grommetInputPadNames.indexOf(child.type.displayName) !== -1
        ) {
          wantContentPad = true;
        }

        const newProps = {
          ...getChildErrorProps(child, errorId, error),
          ...getChildFocusProps(
            child,
            themeBorder,
            containerFocus,
            formFieldTheme,
          ),
        };
        return Object.keys(newProps).length
          ? cloneElement(child, newProps)
          : child;
      });
    } else {
      contents = children;
    }

    // put rest on container, unless we use internal Input
    let containerRest = rest;
    if (inForm) {
      if (!contents) containerRest = {};
      // Merge aria-describedby with the error id rather than
      // letting either one silently win.
      const { 'aria-describedby': ariaDescribedBy, ...restWithoutAria } = rest;
      const combinedAriaDescribedBy = errorId
        ? [ariaDescribedBy, errorId].filter(Boolean).join(' ')
        : ariaDescribedBy;
      contents = contents || (
        <Input
          component={component}
          disabled={disabled}
          invalid={!!error}
          name={name}
          label={component === CheckBox ? label : undefined}
          {...restWithoutAria}
          aria-describedby={combinedAriaDescribedBy || undefined}
        />
      );
    }

    // Only inspect direct children. Generated inputs have no child to identify.
    let childName;
    Children.forEach(children, (child) => {
      if (child && child.type) childName = child.type.displayName;
    });
    if (!children && inForm) childName = (component || TextInput).displayName;
    if (childName?.length > 0)
      childName = childName.charAt(0).toLowerCase() + childName.slice(1);

    let outerBackground;

    if (themeBorder && themeBorder.position === 'outer') {
      if (error && formFieldTheme.error && formFieldTheme.error.background) {
        outerBackground = formFieldTheme.error.background;
      } else if (
        focus &&
        formFieldTheme.focus &&
        formFieldTheme.focus.background &&
        formFieldTheme.focus.background.color
      ) {
        outerBackground = formFieldTheme.focus.background.color;
      } else if (
        disabled &&
        formFieldTheme.disabled &&
        formFieldTheme.disabled.background
      ) {
        outerBackground = formFieldTheme.disabled.background;
      }
    }

    const componentBoxProps = { ...(formFieldTheme[childName] || {}) };
    const componentError =
      error && !disabled && !readOnlyField
        ? componentBoxProps.error
        : undefined;
    const componentBackground = componentBoxProps.background;
    delete componentBoxProps.background;
    delete componentBoxProps.container;
    delete componentBoxProps.error;
    delete componentBoxProps.hover;
    if (childName === 'checkBox') delete componentBoxProps.pad;
    const themeContentProps = {
      ...formFieldTheme.content,
      ...componentBoxProps,
    };
    if (componentError) {
      ['elevation', 'pad', 'round'].forEach((property) => {
        if (componentError[property] !== undefined)
          themeContentProps[property] = componentError[property];
      });
    }
    let componentBorder = componentBoxProps.border;
    if (
      componentError &&
      (componentError.border !== undefined ||
        componentBorder !== undefined ||
        themeBorder?.position === 'inner')
    ) {
      const defaultBorder = themeBorder
        ? { ...themeBorder, side: themeBorder.side || 'bottom' }
        : undefined;
      const normalBorder = componentBorder ?? defaultBorder;
      const sharedErrorBorder =
        formFieldTheme.error?.border ??
        (themeBorder?.error?.color !== undefined
          ? { color: themeBorder.error.color }
          : undefined);
      componentBorder =
        normalBorder === false && componentError.border === undefined
          ? false
          : mergePartBorder(
              mergePartBorder(
                normalBorder === false ? defaultBorder : normalBorder,
                sharedErrorBorder,
              ),
              componentError.border,
            );
      themeContentProps.border = componentBorder;
    }
    const background = componentBackground ?? formFieldTheme.background;
    if (background !== undefined) {
      // Existing outer state fills must remain visible through the content.
      themeContentProps.background =
        outerBackground !== undefined ? undefined : background;
    }

    if (
      !pad &&
      !wantContentPad &&
      componentBoxProps.pad === undefined &&
      componentError?.pad === undefined
    ) {
      themeContentProps.pad = undefined;
    }

    if (themeBorder && themeBorder.position === 'inner') {
      let stateBackground;
      if (readOnlyField) {
        stateBackground = theme.global.input.readOnly?.background;
      } else if (error && formFieldTheme.error) {
        stateBackground = formFieldTheme.error.background;
      } else if (disabled && formFieldTheme.disabled) {
        stateBackground = formFieldTheme.disabled.background;
      }
      if (stateBackground !== undefined)
        themeContentProps.background = stateBackground;
    }
    if (componentError) {
      const errorBackground =
        componentError.background ??
        (themeBorder?.position !== 'outer'
          ? formFieldTheme.error?.background
          : undefined);
      if (errorBackground !== undefined)
        themeContentProps.background = errorBackground;
    }

    // fileinput handle
    // use fileinput plain use formfield to drive the border
    let isFileInputComponent;
    if (children) {
      Children.forEach(children, (child) => {
        if (child && child.type && child.type.displayName === 'FileInput')
          isFileInputComponent = true;
      });
    }

    if (
      component &&
      component.displayName === 'FileInput' &&
      !isFileInputComponent
    ) {
      isFileInputComponent = true;
    }

    const allowHover = !disabled && !readOnlyField && !error && !focus;

    if (!themeBorder) {
      contents = (
        <StyledContentsBox
          disabledProp={disabled}
          error={error}
          componentName={childName}
          {...themeContentProps}
          {...contentProps}
          allowHover={allowHover} // internal prop
          {...passThemeFlag}
        >
          {contents}
        </StyledContentsBox>
      );
    }

    let borderColor;

    if (
      disabled &&
      formFieldTheme.disabled.border &&
      formFieldTheme.disabled.border.color
    ) {
      borderColor = formFieldTheme.disabled.border.color;
    } else if (readOnlyField && theme.global.input?.readOnly?.border?.color) {
      borderColor = theme.global.input?.readOnly?.border?.color;
    } else if (
      // backward compatibility check
      (error && themeBorder?.error?.color) ||
      (error && formFieldTheme.error && formFieldTheme.error.border)
    ) {
      if (
        themeBorder?.error?.color &&
        formFieldTheme.error.border === undefined
      ) {
        borderColor = themeBorder.error.color || 'status-critical';
      } else if (
        formFieldTheme.error.border &&
        formFieldTheme.error.border.color
      ) {
        borderColor = formFieldTheme.error.border.color || 'status-critical';
      }
    } else if (
      fieldFocus &&
      formFieldTheme.focus &&
      formFieldTheme.focus.border &&
      formFieldTheme.focus.border.color
    ) {
      borderColor = formFieldTheme.focus.border.color;
    } else {
      borderColor = (themeBorder && themeBorder.color) || 'border';
    }

    const labelStyle = {
      ...(formKind ? formFieldTheme[formKind].label : formFieldTheme.label),
    };

    if (disabled) {
      labelStyle.color =
        formFieldTheme.disabled && formFieldTheme.disabled.label
          ? formFieldTheme.disabled.label.color
          : labelStyle.color;
    }

    const themeHelpProps = {
      ...formFieldTheme.help,
      ...(disabled && { color: formFieldTheme?.disabled?.help?.color }),
    };

    const themeInfoProps = {
      ...formFieldTheme.info,
      ...(disabled && { color: formFieldTheme?.disabled?.info?.color }),
    };

    let abut;
    let abutMargin;
    let outerStyle = style;

    // If fileinput is wrapped in a formfield we want to use
    // the border style from the fileInput.theme. We also do not
    // want the foocus around the formfield since the the focus
    // is on the anchor/button inside fileinput

    if (themeBorder) {
      const innerProps =
        themeBorder.position === 'inner'
          ? {
              border:
                componentBorder !== undefined
                  ? componentBorder
                  : {
                      ...themeBorder,
                      size: isFileInputComponent
                        ? theme.fileInput.border.size
                        : undefined,
                      style: isFileInputComponent
                        ? theme.fileInput.border.style
                        : undefined,
                      side: isFileInputComponent
                        ? theme.fileInput.border.side
                        : themeBorder.side || 'bottom',
                      color: borderColor,
                    },
              round: componentError?.round ?? formFieldTheme.round,
              focus: isFileInputComponent ? undefined : fieldFocus,
            }
          : {};
      contents = (
        <FormFieldContentBox
          disabledProp={disabled}
          error={error}
          componentName={childName}
          {...themeContentProps}
          {...innerProps}
          {...contentProps}
          containerFocus={containerFocus} // internal prop
          allowHover={allowHover} // internal prop
          {...passThemeFlag}
        >
          {contents}
        </FormFieldContentBox>
      );

      const mergedMargin = margin || formFieldTheme.margin;
      abut =
        themeBorder.position === 'outer' &&
        (themeBorder.side === 'all' ||
          themeBorder.side === 'horizontal' ||
          !themeBorder.side) &&
        !(
          mergedMargin &&
          ((typeof mergedMargin === 'string' && mergedMargin !== 'none') ||
            (mergedMargin.bottom && mergedMargin.bottom !== 'none') ||
            (mergedMargin.horizontal && mergedMargin.horizontal !== 'none'))
        );
      if (abut) {
        // marginBottom is set to overlap adjacent fields
        abutMargin = { bottom: '-1px' };
        if (margin) {
          abutMargin = margin;
        } else if (themeBorder.size) {
          // if the user defines a margin,
          // then the default margin below will be overridden
          abutMargin = {
            bottom: `-${parseMetricToNum(
              theme.global.borderSize[themeBorder.size] || themeBorder.size,
            )}px`,
          };
        }

        outerStyle = {
          position: fieldFocus ? 'relative' : undefined,
          zIndex: fieldFocus ? 10 : undefined,
          ...style,
        };
      }
    }

    if (themeBorder && themeBorder.position === 'outer') {
      if (error && formFieldTheme.error && formFieldTheme.error.background) {
        outerBackground = formFieldTheme.error.background;
      } else if (
        fieldFocus &&
        formFieldTheme.focus &&
        formFieldTheme.focus.background &&
        formFieldTheme.focus.background.color
      ) {
        outerBackground = formFieldTheme.focus.background.color;
      } else if (
        disabled &&
        formFieldTheme.disabled &&
        formFieldTheme.disabled.background
      ) {
        outerBackground = formFieldTheme.disabled.background;
      }
    }

    const outerProps =
      themeBorder && themeBorder.position === 'outer'
        ? {
            border: { ...themeBorder, color: borderColor },
            round: formFieldTheme.round,
            focus: fieldFocus,
          }
        : {};

    let { requiredIndicator } = theme.formField.label;
    if (requiredIndicator === true)
      // accessibility resource: https://www.deque.com/blog/anatomy-of-accessible-forms-required-form-fields/
      // this approach allows the required indicator to be hidden visually,
      // but present for assistive tech.
      // using aria-hidden so screen does not read out "star" and
      // just reads out "required"
      requiredIndicator = (
        <>
          <RequiredText aria-hidden="true">*</RequiredText>
          <ScreenReaderOnly>required</ScreenReaderOnly>
        </>
      );

    let showRequiredIndicator = required && requiredIndicator;
    if (typeof required === 'object' && required.indicator === false)
      showRequiredIndicator = false;

    return (
      <FormFieldBox
        ref={formFieldRef}
        className={className}
        background={outerBackground}
        margin={abut ? abutMargin : margin || { ...formFieldTheme.margin }}
        {...outerProps}
        style={outerStyle}
        containerFocus={containerFocus} // internal prop
        allowHover={allowHover} // internal prop
        onFocusCapture={() => setFocusIndicator(true)}
        onFocus={(event) => {
          const root = formFieldRef.current?.getRootNode();
          if (root) {
            setFocus(
              containsFocus(formFieldRef.current) && shouldKeepFocus(root),
            );
          }
          if (onFocus) onFocus(event);
        }}
        onBlur={(event) => {
          const focusRemainsInside = formFieldRef.current?.contains(
            event.relatedTarget,
          );
          if (!focusRemainsInside) {
            setFocus(false);
            setFocusIndicator(true);
          }

          // if input has a drop and focus is within drop
          // prevent onBlur validation from running until
          // focus is no longer within the drop or input
          if (
            contextOnBlur &&
            !formFieldRef.current.contains(event.relatedTarget) &&
            !withinDropPortal(event.relatedTarget, portalContext)
          ) {
            contextOnBlur(event);
          }

          if (onBlur) onBlur(event);
        }}
        onChange={
          contextOnChange || onChange
            ? (event) => {
                event.persist();
                if (onChange) onChange(event);
                if (contextOnChange)
                  debounce(() => () => contextOnChange(event));
              }
            : undefined
        }
        {...containerRest}
        {...passThemeFlag}
      >
        {(label && component !== CheckBox) || help ? (
          <>
            {label && component !== CheckBox && (
              <Text
                as="label"
                id={htmlFor ? `grommet-${adjustedHtmlFor}__label` : undefined}
                htmlFor={adjustedHtmlFor}
                {...labelStyle}
              >
                {label}
                {showRequiredIndicator ? requiredIndicator : undefined}
              </Text>
            )}
            <Message message={help} {...themeHelpProps} />
          </>
        ) : undefined}
        <FormFieldContext.Provider value={fieldContext}>
          {contents}
        </FormFieldContext.Provider>
        <Message
          type="error"
          message={error}
          {...formFieldTheme.error}
          id={errorId}
        />
        <Message type="info" message={info} {...themeInfoProps} />
      </FormFieldBox>
    );
  },
);

FormField.displayName = 'FormField';
FormField.propTypes = FormFieldPropTypes;

export { FormField };
