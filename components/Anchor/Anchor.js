"use strict";

exports.__esModule = true;
exports.Anchor = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _styledComponents = require("styled-components");

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _hocs = require("../hocs");

var _StyledAnchor = require("./StyledAnchor");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Anchor =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Anchor, _Component);

  function Anchor(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    var children = props.children,
        icon = props.icon,
        label = props.label;

    if ((icon || label) && children) {
      console.warn('Anchor should not have children if icon or label is provided');
    }

    return _this;
  }

  var _proto = Anchor.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        a11yTitle = _this$props.a11yTitle,
        children = _this$props.children,
        color = _this$props.color,
        disabled = _this$props.disabled,
        forwardRef = _this$props.forwardRef,
        href = _this$props.href,
        icon = _this$props.icon,
        focus = _this$props.focus,
        label = _this$props.label,
        onClick = _this$props.onClick,
        reverse = _this$props.reverse,
        theme = _this$props.theme,
        rest = _objectWithoutPropertiesLoose(_this$props, ["a11yTitle", "children", "color", "disabled", "forwardRef", "href", "icon", "focus", "label", "onClick", "reverse", "theme"]);

    var coloredIcon = icon;

    if (icon && !icon.props.color) {
      coloredIcon = (0, _react.cloneElement)(icon, {
        color: (0, _utils.normalizeColor)(color || theme.anchor.color, theme)
      });
    }

    var first = reverse ? label : coloredIcon;
    var second = reverse ? coloredIcon : label;
    return _react.default.createElement(_StyledAnchor.StyledAnchor, _extends({}, rest, {
      ref: forwardRef,
      "aria-label": a11yTitle,
      colorProp: color,
      disabled: disabled,
      hasIcon: !!icon,
      focus: focus,
      hasLabel: label,
      reverse: reverse,
      href: !disabled ? href : undefined,
      onClick: !disabled ? onClick : undefined
    }), first && second ? _react.default.createElement(_Box.Box, {
      as: "span",
      direction: "row",
      align: "center",
      gap: "small",
      style: {
        display: 'inline-flex'
      }
    }, first, second) : first || second || children);
  };

  return Anchor;
}(_react.Component);

Anchor.defaultProps = {};
Object.setPrototypeOf(Anchor.defaultProps, _defaultProps.defaultProps);
var AnchorDoc;

if (process.env.NODE_ENV !== 'production') {
  AnchorDoc = require('./doc').doc(Anchor); // eslint-disable-line global-require
}

var AnchorWrapper = (0, _recompose.compose)((0, _hocs.withFocus)(), _styledComponents.withTheme, _hocs.withForwardRef)(AnchorDoc || Anchor);
exports.Anchor = AnchorWrapper;