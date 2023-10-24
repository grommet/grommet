var _excluded = ["active", "align", "aria-label", "badge", "busy", "color", "children", "disabled", "icon", "focusIndicator", "gap", "fill", "href", "justify", "kind", "label", "messages", "onBlur", "onClick", "onFocus", "onMouseOut", "onMouseOver", "pad", "plain", "primary", "reverse", "secondary", "selected", "size", "success", "tip", "type", "a11yTitle", "as"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { cloneElement, Children, forwardRef, useContext, useMemo, useState, useCallback, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { backgroundAndTextColors, colorIsDark, findButtonParent, useSizedIcon, normalizeBackground, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';
import { ButtonPropTypes } from './propTypes';
import { AnnounceContext } from '../../contexts/AnnounceContext';
import { MessageContext } from '../../contexts/MessageContext';
import { Box } from '../Box';
import { Tip } from '../Tip';
import { Badge } from './Badge';
import { StyledButton } from './StyledButton';
import { StyledButtonKind } from './StyledButtonKind';
import { useAnalytics } from '../../contexts/AnalyticsContext';
import { Skeleton, useSkeleton } from '../Skeleton';
import { EllipsisAnimation, GrowCheckmark, StyledBusyContents } from './BusyAnimation';
var RelativeBox = styled(Box).withConfig({
  displayName: "Button__RelativeBox",
  componentId: "sc-zuqsuw-0"
})(["position:relative;"]);

// We have two Styled* components to separate
// the newer default|primary|secondary approach,
// which we use the term "kind" to refer to,
// from the previous approach. Hopefully, when we get to grommet v3,
// we can drop the old way and just use kind.
//
// In the kind approach, we rely on the basic structure of the theme
// being repeated. For example: button.default, button.active,
// button.active.default all refer to a similar object containing
// { background, border, color, padding }.
// This allows us to use the same code to evaluate color and generate CSS.
// We just need to build up CSS, since selectors override previous ones.
// See StyledButtonKind.kindStyles() for this.
// And we build down to determine icon color, once we have a color from
// the latest applicable state, we can stop. See Button.getIconColor() for this.
// backgroundAndTextColor() is used in both cases to ensure we are determining
// color in the same way, so the icon and label align.

// only when default is in the theme
// Used to get the color for the icon to match what StyledButtonKind
// and backgroundStyle() will do for the label.
// The paths are ordered from basic to specific. Go through them
// specific to base until we find one that has a color and use that.
var getIconColor = function getIconColor(paths, theme, colorProp, kind) {
  if (paths === void 0) {
    paths = [];
  }
  var result = [];
  var index = paths.length - 1;
  // caller has specified a themeObj to use for styling
  // relevant for cases like pagination which looks to theme.pagination.button
  if (typeof kind === 'object') index = 0;
  // stop when we have a color or no more paths
  while (index >= 0 && !result[1]) {
    var baseObj = typeof kind === 'object' && kind || theme.button;
    var obj = baseObj;
    // find sub-object under the button theme that corresponds with this path
    // for example: 'active.primary'
    if (paths[index]) {
      var parts = paths[index].split('.');
      while (obj && parts.length) obj = obj[parts.shift()];
    }
    if (obj) {
      var _obj;
      // use passed in color for background if the theme has a background color
      var background = colorProp && obj.background && obj.background.color ? colorProp : obj.background;

      // if theme object explicitly sets the color to undefined, pass false
      // to indicate that the theme doesn't want any text color
      var objColor = obj.color || (Object.prototype.hasOwnProperty.call(obj, 'color') && obj.color === undefined ? false : undefined);
      var color = void 0;
      if ((_obj = obj) != null && (_obj = _obj.icon) != null && (_obj = _obj.props) != null && _obj.color) color = obj.icon.props.color;
      // if no icon defined for this state, see if there is an icon
      // with color defined at one higher level
      else if (paths[index + 1]) {
        var _obj2;
        var _parts = paths[index + 1].split('.');
        while (baseObj && _parts.length) obj = baseObj[_parts.shift()];
        if ((_obj2 = obj) != null && (_obj2 = _obj2.icon) != null && (_obj2 = _obj2.props) != null && _obj2.color) color = obj.icon.props.color;
      }
      // use passed in color for text if the theme doesn't have
      // background or border color
      if (!color) color = colorProp && (!obj.background || !obj.background.color) && (!obj.border || !obj.border.color) ? colorProp : objColor;
      result = backgroundAndTextColors(background, color, theme);
    }
    index -= 1;
  }
  return result[1] || undefined;
};

// get the icon for the current button state
var getKindIcon = function getKindIcon(paths, theme, kind) {
  if (paths === void 0) {
    paths = [];
  }
  var result;
  var index = paths.length - 1;
  // caller has specified a themeObj to use for styling
  // relevant for cases like pagination which looks to theme.pagination.button
  if (typeof kind === 'object') index = 0;
  // stop when we have a color or no more paths
  while (index >= 0 && !result) {
    var _obj3;
    var obj = typeof kind === 'object' && kind || theme.button;
    // find sub-object under the button theme that corresponds with this path
    // for example: 'active.primary'
    if (paths[index]) {
      var parts = paths[index].split('.');
      while (obj && parts.length) obj = obj[parts.shift()];
    }
    if ((_obj3 = obj) != null && _obj3.icon) result = obj.icon;
    index -= 1;
  }
  return result || undefined;
};
var getPropertyColor = function getPropertyColor(property, paths, theme, kind, primary) {
  if (paths === void 0) {
    paths = [];
  }
  var result;
  if (kind) {
    var obj = typeof kind === 'object' && kind || theme.button;
    // index 0 is default state
    if (paths[0]) {
      var parts = paths[0].split('.');
      while (obj && parts.length) obj = obj[parts.shift()];
    }
    if (obj) {
      result = obj[property] || obj[property] && obj[property].color;
    }
  } else if (primary && theme && theme.button && theme.button.primary) {
    result = theme.button.primary[property] || theme.button.primary[property] && theme.button.primary[property].color;
  } else {
    result = theme && theme.button && theme.button[property] || theme && theme.button && theme.button[property] && theme.button[property].color;
  }
  return result;
};
var Button = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _theme$button$kind, _theme$button2;
  var active = _ref.active,
    _ref$align = _ref.align,
    align = _ref$align === void 0 ? 'center' : _ref$align,
    ariaLabel = _ref['aria-label'],
    badgeProp = _ref.badge,
    busy = _ref.busy,
    color = _ref.color,
    children = _ref.children,
    disabled = _ref.disabled,
    icon = _ref.icon,
    _ref$focusIndicator = _ref.focusIndicator,
    focusIndicator = _ref$focusIndicator === void 0 ? true : _ref$focusIndicator,
    gap = _ref.gap,
    fill = _ref.fill,
    href = _ref.href,
    justify = _ref.justify,
    kindArg = _ref.kind,
    label = _ref.label,
    messages = _ref.messages,
    _onBlur = _ref.onBlur,
    onClickProp = _ref.onClick,
    _onFocus = _ref.onFocus,
    onMouseOut = _ref.onMouseOut,
    onMouseOver = _ref.onMouseOver,
    pad = _ref.pad,
    plain = _ref.plain,
    primary = _ref.primary,
    reverseProp = _ref.reverse,
    secondary = _ref.secondary,
    selected = _ref.selected,
    sizeProp = _ref.size,
    success = _ref.success,
    tip = _ref.tip,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'button' : _ref$type,
    _ref$a11yTitle = _ref.a11yTitle,
    a11yTitle = _ref$a11yTitle === void 0 ? typeof tip === 'string' ? tip : undefined : _ref$a11yTitle,
    as = _ref.as,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var theme = useContext(ThemeContext) || defaultProps.theme;
  var _useState = useState(),
    focus = _useState[0],
    setFocus = _useState[1];
  var _useState2 = useState(false),
    hover = _useState2[0],
    setHover = _useState2[1];
  var announce = useContext(AnnounceContext);
  var _useContext = useContext(MessageContext),
    format = _useContext.format;
  if (busy && success) {
    console.warn('Button cannot have both busy and success set to true.');
  }
  useEffect(function () {
    if (busy) announce(format({
      id: 'button.busy',
      messages: messages
    }));else if (success) announce(format({
      id: 'button.success',
      messages: messages
    }));
  }, [announce, busy, format, messages, success]);
  if ((icon || label) && children) {
    console.warn('Button should not have children if icon or label is provided');
  }
  var skeleton = useSkeleton();
  var sendAnalytics = useAnalytics();
  var onClick = useCallback(function (event) {
    sendAnalytics({
      type: 'buttonClick',
      element: findButtonParent(event.target),
      event: event,
      href: href,
      label: typeof label === 'string' ? label : undefined
    });
    if (onClickProp) onClickProp(event);
  }, [onClickProp, sendAnalytics, href, label]);

  // kindArg is object if we are referencing a theme object
  // outside of theme.button
  var kindObj = useMemo(function () {
    return typeof kindArg === 'object';
  }, [kindArg]);

  // if the theme has button.default, what kind of Button is this
  var kind = useMemo(function () {
    if (theme.button["default"] || kindObj) {
      if (kindArg) return kindArg;
      if (primary) return 'primary';
      if (secondary) return 'secondary';
      return 'default';
    }
    return undefined; // pre-default, no kind
  }, [kindArg, kindObj, primary, secondary, theme]);

  // for backwards compatibility, no-kind button theme did not
  // default to size "medium" on buttons with no size prop
  var size = sizeProp || kind && 'medium' || undefined;
  // When we have a kind and are not plain, themePaths stores the relative
  // paths within the theme for the current kind and state of the button.
  // These paths are used with getIconColor() above and kindStyle() within
  // StyledButtonKind.
  var themePaths = useMemo(function () {
    if (!kind || plain) return undefined;
    var result = {
      base: [],
      hover: []
    };
    if (!kindObj) result.base.push(kind);
    if (selected) {
      result.base.push('selected');
      if (!kindObj) result.base.push("selected." + kind);
    }
    if (disabled) {
      result.base.push('disabled');
      if (!kindObj) result.base.push("disabled." + kind);
    } else {
      if (active) {
        result.base.push('active');
        if (!kindObj) result.base.push("active." + kind);
      }
      result.hover.push('hover');
      if (!kindObj) result.hover.push("hover." + kind);
      if (active) {
        result.hover.push("hover.active");
        if (!kindObj) {
          result.hover.push("hover.active." + kind);
        }
      }
    }
    return result;
  }, [active, disabled, kind, kindObj, plain, selected]);

  // only used when theme does not have button.default
  var isDarkBackground = function isDarkBackground() {
    var backgroundColor = normalizeBackground(normalizeColor(color || theme.button.primary && theme.button.primary.color || theme.global.colors.control || 'brand', theme), theme);
    return colorIsDark(backgroundColor, theme);
  };
  var onMouseOverButton = function onMouseOverButton(event) {
    setHover(true);
    if (onMouseOver) {
      onMouseOver(event);
    }
  };
  var onMouseOutButton = function onMouseOutButton(event) {
    setHover(false);
    if (onMouseOut) {
      onMouseOut(event);
    }
  };
  var kindIcon = hover && getKindIcon(themePaths == null ? void 0 : themePaths.hover, theme, kind) || getKindIcon(themePaths == null ? void 0 : themePaths.base, theme, kind);
  var buttonIcon = icon || kindIcon;
  // only change color if user did not specify the color themselves...
  if (icon && !icon.props.color) {
    if (kind) {
      if (!plain) {
        // match what the label will use
        var iconColor = hover && getIconColor(themePaths.hover, theme) || getIconColor(themePaths.base, theme, color, kind);
        if (iconColor) buttonIcon = /*#__PURE__*/cloneElement(icon, {
          color: iconColor
        });
      }
    } else if (primary) {
      buttonIcon = /*#__PURE__*/cloneElement(icon, {
        color: theme.global.colors.text[isDarkBackground() ? 'dark' : 'light']
      });
    }
  } else if (kindIcon && !plain) {
    var _iconColor = hover && getIconColor(themePaths.hover, theme) || getIconColor(themePaths.base, theme, color, kind);
    if (_iconColor) buttonIcon = /*#__PURE__*/cloneElement(kindIcon, {
      color: _iconColor
    });
  }
  buttonIcon = useSizedIcon(buttonIcon, size, theme);
  if (skeleton) {
    var _theme$text, _theme$button$size;
    return /*#__PURE__*/React.createElement(Skeleton, _extends({
      ref: ref,
      height: ((_theme$text = theme.text[size || 'medium']) == null ? void 0 : _theme$text.height) || size,
      a11yTitle: a11yTitle
    }, rest, (_theme$button$size = theme.button.size) == null ? void 0 : _theme$button$size[size || 'medium'], theme.button.skeleton));
  }
  var reverse = reverseProp != null ? reverseProp : (_theme$button$kind = theme.button[kind]) == null ? void 0 : _theme$button$kind.reverse;
  var domTag = !as && href ? 'a' : as;
  var first = reverse ? label : buttonIcon;
  var second = reverse ? buttonIcon : label;
  var contents;
  if (first && second) {
    var _theme$button;
    contents = /*#__PURE__*/React.createElement(Box, {
      direction: ((_theme$button = theme.button) == null || (_theme$button = _theme$button[kind]) == null ? void 0 : _theme$button.direction) || 'row',
      align: "center",
      justify: justify || (align === 'center' ? 'center' : 'between'),
      gap: gap || theme.button.gap,
      responsive: false
    }, first, second);
  } else if (typeof children === 'function') {
    contents = children({
      disabled: disabled,
      hover: hover,
      focus: focus
    });
  } else {
    contents = first || second || children;
  }
  var background = getPropertyColor('background', themePaths && themePaths.base, theme, kind, primary);
  var border = getPropertyColor('border', themePaths && themePaths.base, theme, kind, primary);
  // set the badge relative to the button content
  // when the button doesn't have background or border
  // (!kind && icon && !label) is necessary because for old button logic,
  // if button has icon but not label, it will be considered "plain",
  // so no border or background will be applied
  var innerBadge = ((_theme$button2 = theme.button) == null || (_theme$button2 = _theme$button2.badge) == null ? void 0 : _theme$button2.align) !== 'container' && (!background && !border || !kind && icon && !label);
  if (badgeProp && innerBadge) {
    contents = /*#__PURE__*/React.createElement(Badge, {
      content: badgeProp
    }, contents);
  }
  if (busy || success) {
    // match what the label will use
    var animationColor;
    if (kind) {
      if (!plain) {
        animationColor = hover && getIconColor(themePaths.hover, theme) || getIconColor(themePaths.base, theme, color, kind);
      }
    } else if (primary) {
      animationColor = theme.global.colors.text[isDarkBackground() ? 'dark' : 'light'];
    }
    contents =
    /*#__PURE__*/
    // position relative is necessary to have the animation
    // display over the button content
    React.createElement(RelativeBox, {
      flex: false
    }, busy && /*#__PURE__*/React.createElement(EllipsisAnimation, null), success && /*#__PURE__*/React.createElement(Box, {
      style: {
        position: 'absolute'
      },
      fill: true,
      alignContent: "center",
      justify: "center"
    }, /*#__PURE__*/React.createElement(GrowCheckmark, {
      color: animationColor,
      "aria-hidden": true
    })), /*#__PURE__*/React.createElement(StyledBusyContents, {
      animating: busy || success
    }, contents));
  }
  var styledButtonResult;
  if (kind) {
    styledButtonResult = /*#__PURE__*/React.createElement(StyledButtonKind, _extends({}, rest, {
      as: domTag,
      ref: ref,
      active: active,
      align: align,
      "aria-label": ariaLabel || a11yTitle,
      busy: busy,
      badge: badgeProp,
      colorValue: color,
      disabled: disabled,
      hasIcon: !!icon,
      gap: gap,
      hasLabel: !!label,
      icon: icon,
      fillContainer: fill,
      focus: focus,
      focusIndicator: focusIndicator,
      href: href,
      kind: kind,
      themePaths: themePaths,
      onClick: !busy && !success ? onClick : undefined,
      onFocus: function onFocus(event) {
        setFocus(true);
        if (_onFocus) _onFocus(event);
      },
      onBlur: function onBlur(event) {
        setFocus(false);
        if (_onBlur) _onBlur(event);
      },
      onMouseOver: onMouseOverButton,
      onMouseOut: onMouseOutButton,
      pad: pad,
      plain: plain || Children.count(children) > 0,
      primary: primary,
      sizeProp: size,
      success: success,
      type: !href ? type : undefined
    }), contents);
  } else {
    styledButtonResult = /*#__PURE__*/React.createElement(StyledButton, _extends({}, rest, {
      as: domTag,
      ref: ref,
      "aria-label": ariaLabel || a11yTitle,
      busy: busy,
      colorValue: color,
      active: active,
      selected: selected,
      disabled: disabled,
      hasIcon: !!icon,
      gap: gap,
      hasLabel: !!label,
      fillContainer: fill,
      focus: focus,
      focusIndicator: focusIndicator,
      href: href,
      kind: kind,
      themePaths: themePaths,
      onClick: !busy && !success ? onClick : undefined,
      onFocus: function onFocus(event) {
        setFocus(true);
        if (_onFocus) _onFocus(event);
      },
      onBlur: function onBlur(event) {
        setFocus(false);
        if (_onBlur) _onBlur(event);
      },
      onMouseOver: onMouseOverButton,
      onMouseOut: onMouseOutButton,
      pad: pad || !plain,
      plain: typeof plain !== 'undefined' ? plain : Children.count(children) > 0 || icon && !label,
      primary: primary,
      sizeProp: size,
      success: success,
      type: !href ? type : undefined
    }), contents);
  }
  if (tip) {
    if (typeof tip === 'string') {
      styledButtonResult = /*#__PURE__*/React.createElement(Tip, {
        content: tip
      }, styledButtonResult);
    } else {
      styledButtonResult = /*#__PURE__*/React.createElement(Tip, tip, styledButtonResult);
    }
  }

  // if button has background or border, place badge relative
  // to outer edge of button
  if (badgeProp && !innerBadge) {
    styledButtonResult = /*#__PURE__*/React.createElement(Badge, {
      content: badgeProp
    }, styledButtonResult);
  }
  return styledButtonResult;
});
Button.displayName = 'Button';
Button.propTypes = ButtonPropTypes;
export { Button };