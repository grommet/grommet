"use strict";

exports.__esModule = true;
exports.EdgeControl = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _styledComponents = require("styled-components");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _Keyboard = require("../Keyboard");

var _utils = require("../../utils");

var _hocs = require("../hocs");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DIRECTION_PROPS = {
  horizontal: {
    cursor: 'col-resize',
    fill: 'vertical'
  },
  vertical: {
    cursor: 'row-resize',
    fill: 'horizontal'
  }
};

var EdgeControl =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(EdgeControl, _Component);

  function EdgeControl() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    return _this;
  }

  var _proto = EdgeControl.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        color = _this$props.color,
        direction = _this$props.direction,
        edge = _this$props.edge,
        forwardRef = _this$props.forwardRef,
        onDecrease = _this$props.onDecrease,
        onIncrease = _this$props.onIncrease,
        theme = _this$props.theme,
        rest = _objectWithoutPropertiesLoose(_this$props, ["color", "direction", "edge", "forwardRef", "onDecrease", "onIncrease", "theme"]);

    var focused = this.state.focused;
    var _DIRECTION_PROPS$dire = DIRECTION_PROPS[direction],
        cursor = _DIRECTION_PROPS$dire.cursor,
        fill = _DIRECTION_PROPS$dire.fill;
    var size = (0, _utils.parseMetricToNum)(theme.global.spacing) / 2;
    var keyboardProps = direction === 'vertical' ? {
      onUp: onDecrease,
      onDown: onIncrease
    } : {
      onLeft: onDecrease,
      onRight: onIncrease
    };
    var boxDirection = direction === 'vertical' ? 'row' : 'column';
    var type = theme.rangeSelector && theme.rangeSelector.edge && theme.rangeSelector.edge.type || 'disc';
    var node;

    if (type === 'bar') {
      node = _react.default.createElement(_Box.Box, {
        flex: true,
        justifySelf: "stretch",
        width: size + "px",
        background: (0, _utils.normalizeColor)(color || 'control', theme),
        border: focused ? {
          color: (0, _utils.normalizeColor)('focus', theme)
        } : undefined
      });
    } else if (type === 'disc') {
      node = _react.default.createElement(_Box.Box, {
        width: size + (focused ? 2 : 0) + "px",
        height: size + (focused ? 2 : 0) + "px",
        round: "full",
        background: (0, _utils.normalizeColor)(color || 'control', theme),
        border: focused ? {
          color: (0, _utils.normalizeColor)('focus', theme)
        } : undefined
      });
    } else {
      node = type;
    }

    return _react.default.createElement(_Keyboard.Keyboard, keyboardProps, _react.default.createElement(_Box.Box, {
      direction: boxDirection,
      style: {
        flex: '0 0 1px'
      },
      overflow: "visible",
      align: "center",
      justify: "center"
    }, _react.default.createElement(_Box.Box, _extends({
      ref: forwardRef,
      direction: boxDirection,
      justify: "center",
      align: "center",
      basis: "full",
      fill: fill,
      style: {
        cursor: cursor,
        minWidth: size,
        minHeight: size,
        zIndex: 10
      },
      onFocus: function onFocus() {
        return _this2.setState({
          focused: true
        });
      },
      onBlur: function onBlur() {
        return _this2.setState({
          focused: false
        });
      }
    }, rest), node)));
  };

  return EdgeControl;
}(_react.Component);

EdgeControl.defaultProps = {};
Object.setPrototypeOf(EdgeControl.defaultProps, _defaultProps.defaultProps);
var EdgeControlWrapper = (0, _recompose.compose)(_hocs.withForwardRef, _styledComponents.withTheme)(EdgeControl);
exports.EdgeControl = EdgeControlWrapper;