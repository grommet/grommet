"use strict";

exports.__esModule = true;
exports.Meter = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Bar = require("./Bar");

var _Circle = require("./Circle");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var deriveMax = function deriveMax(values) {
  var max = 100;

  if (values && values.length > 1) {
    max = 0;
    values.forEach(function (v) {
      max += v.value;
    });
  }

  return max;
};

var Meter =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Meter, _Component);

  function Meter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    return _this;
  }

  Meter.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var max = prevState.max;
    var nextMax = deriveMax(nextProps.values);

    if (!max || nextMax !== max) {
      return {
        max: nextMax
      };
    }

    return null;
  };

  var _proto = Meter.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        type = _this$props.type,
        rest = _objectWithoutPropertiesLoose(_this$props, ["type"]);

    var max = this.state.max;
    var content;

    if (type === 'bar') {
      content = _react.default.createElement(_Bar.Bar, _extends({
        max: max
      }, rest));
    } else if (type === 'circle') {
      content = _react.default.createElement(_Circle.Circle, _extends({
        max: max
      }, rest));
    }

    return content;
  };

  return Meter;
}(_react.Component);

_defineProperty(Meter, "defaultProps", {
  background: {
    color: 'light-2',
    opacity: 'medium'
  },
  size: 'medium',
  thickness: 'medium',
  type: 'bar'
});

var MeterDoc;

if (process.env.NODE_ENV !== 'production') {
  MeterDoc = require('./doc').doc(Meter); // eslint-disable-line global-require
}

var MeterWrapper = MeterDoc || Meter;
exports.Meter = MeterWrapper;