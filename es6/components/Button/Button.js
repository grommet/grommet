function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { cloneElement, Children, forwardRef, useContext, useMemo, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { backgroundAndTextColors, colorIsDark, normalizeBackground, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Tip } from '../Tip';
import { StyledButton } from './StyledButton';
import { StyledButtonKind } from './StyledButtonKind'; // We have two Styled* components to separate
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

var getIconColor = function getIconColor(paths, theme, colorProp) {
  if (paths === void 0) {
    paths = [];
  }

  var result = [];
  var index = paths.length - 1; // stop when we have a color or no more paths

  while (index >= 0 && !result[1]) {
    var obj = theme.button; // find the sub-object under the button them that corresponds with this path
    // for example: 'active.primary'

    if (paths[index]) {
      var parts = paths[index].split('.');

      while (obj && parts.length) {
        obj = obj[parts.shift()];
      }
    }

    if (obj) {
      // use passed in color for background if the theme has a background color
      var background = colorProp && obj.background && obj.background.color ? colorProp : obj.background; // if theme object explicitly sets the color to undefined, pass false
      // to indicate that the theme doesn't want any text color

      var objColor = obj.color || (Object.prototype.hasOwnProperty.call(obj, 'color') && obj.color === undefined ? false : undefined); // use passed in color for text if the theme doesn't have
      // background or border color

      var color = colorProp && (!obj.background || !obj.background.color) && (!obj.border || !obj.border.color) ? colorProp : objColor;
      result = backgroundAndTextColors(background, color, theme);
    }

    index -= 1;
  }

  return result[1] || undefined;
};

var Button = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
      active = _ref.active,
      _ref$align = _ref.align,
      align = _ref$align === void 0 ? 'center' : _ref$align,
      color = _ref.color,
      children = _ref.children,
      disabled = _ref.disabled,
      icon = _ref.icon,
      _ref$focusIndicator = _ref.focusIndicator,
      focusIndicator = _ref$focusIndicator === void 0 ? true : _ref$focusIndicator,
      _ref$gap = _ref.gap,
      gap = _ref$gap === void 0 ? 'small' : _ref$gap,
      fill = _ref.fill,
      href = _ref.href,
      kindArg = _ref.kind,
      label = _ref.label,
      _onBlur = _ref.onBlur,
      onClick = _ref.onClick,
      _onFocus = _ref.onFocus,
      onMouseOut = _ref.onMouseOut,
      onMouseOver = _ref.onMouseOver,
      plain = _ref.plain,
      primary = _ref.primary,
      reverse = _ref.reverse,
      secondary = _ref.secondary,
      selected = _ref.selected,
      size = _ref.size,
      tip = _ref.tip,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'button' : _ref$type,
      as = _ref.as,
      rest = _objectWithoutPropertiesLoose(_ref, ["a11yTitle", "active", "align", "color", "children", "disabled", "icon", "focusIndicator", "gap", "fill", "href", "kind", "label", "onBlur", "onClick", "onFocus", "onMouseOut", "onMouseOver", "plain", "primary", "reverse", "secondary", "selected", "size", "tip", "type", "as"]);

  var theme = useContext(ThemeContext) || defaultProps.theme;

  var _useState = useState(),
      focus = _useState[0],
      setFocus = _useState[1];

  var _useState2 = useState(false),
      hover = _useState2[0],
      setHover = _useState2[1];

  if ((icon || label) && children) {
    console.warn('Button should not have children if icon or label is provided');
  } // if the theme has button.default, what kind of Button is this


  var kind = useMemo(function () {
    if (theme.button["default"]) {
      if (kindArg) return kindArg;
      if (primary) return 'primary';
      if (secondary) return 'secondary';
      return 'default';
    }

    return undefined; // pre-default, no kind
  }, [kindArg, primary, secondary, theme.button["default"]]); // When we have a kind and are not plain, themePaths stores the relative
  // paths within the theme for the current kind and state of the button.
  // These paths are used with getIconColor() above and kindStyle() within
  // StyledButtonKind.

  var themePaths = useMemo(function () {
    if (!kind || plain) return undefined;
    var result = {
      base: [],
      hover: []
    };
    result.base.push(kind);

    if (selected) {
      result.base.push('selected', "selected." + kind);
    }

    if (disabled) {
      result.base.push('disabled', "disabled." + kind);
    } else {
      if (active) {
        result.base.push('active', "active." + kind);
      }

      result.hover.push('hover', "hover." + kind);

      if (active) {
        result.hover.push("hover.active", "hover.active." + kind);
      }
    }

    return result;
  }, [active, disabled, kind, plain, selected]); // only used when theme does not have button.default

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

  var buttonIcon = icon; // only change color if user did not specify the color themselves...

  if (icon && !icon.props.color) {
    if (kind) {
      if (!plain) {
        // match what the label will use
        var iconColor = hover && getIconColor(themePaths.hover, theme) || getIconColor(themePaths.base, theme, color);
        if (iconColor) buttonIcon = /*#__PURE__*/cloneElement(icon, {
          color: iconColor
        });
      }
    } else if (primary) {
      buttonIcon = /*#__PURE__*/cloneElement(icon, {
        color: theme.global.colors.text[isDarkBackground() ? 'dark' : 'light']
      });
    }
  }

  var domTag = !as && href ? 'a' : as;
  var first = reverse ? label : buttonIcon;
  var second = reverse ? buttonIcon : label;
  var contents;

  if (first && second) {
    contents = /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      align: "center",
      justify: align === 'center' ? 'center' : 'between',
      gap: gap,
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

  var styledButtonResult;

  if (kind) {
    styledButtonResult = /*#__PURE__*/React.createElement(StyledButtonKind, _extends({}, rest, {
      as: domTag,
      ref: ref,
      active: active,
      align: align,
      "aria-label": a11yTitle,
      colorValue: color,
      disabled: disabled,
      gap: gap,
      fillContainer: fill,
      focus: focus,
      focusIndicator: focusIndicator,
      href: href,
      kind: kind,
      themePaths: themePaths,
      onClick: onClick,
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
      plain: plain || Children.count(children) > 0,
      primary: primary,
      sizeProp: size,
      type: !href ? type : undefined
    }), contents);
  } else {
    styledButtonResult = /*#__PURE__*/React.createElement(StyledButton, _extends({}, rest, {
      as: domTag,
      ref: ref,
      "aria-label": a11yTitle,
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
      onClick: onClick,
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
      pad: !plain,
      plain: typeof plain !== 'undefined' ? plain : Children.count(children) > 0 || icon && !label,
      primary: primary,
      sizeProp: size,
      type: !href ? type : undefined
    }), contents);
  }

  if (tip) {
    if (typeof tip === 'string') {
      return /*#__PURE__*/React.createElement(Tip, {
        content: tip
      }, styledButtonResult);
    }

    return /*#__PURE__*/React.createElement(Tip, tip, styledButtonResult);
  }

  return styledButtonResult;
});
Button.displayName = 'Button';
var ButtonDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  ButtonDoc = require('./doc').doc(Button);
}

var ButtonWrapper = ButtonDoc || Button;
export { ButtonWrapper as Button };