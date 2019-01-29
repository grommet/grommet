"use strict";

exports.__esModule = true;
exports.RangeInput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _hocs = require("../hocs");

var _StyledRangeInput = require("./StyledRangeInput");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var RangeInput =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(RangeInput, _Component);

  function RangeInput() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = RangeInput.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        forwardRef = _this$props.forwardRef,
        rest = _objectWithoutPropertiesLoose(_this$props, ["forwardRef"]);

    return _react.default.createElement(_StyledRangeInput.StyledRangeInput, _extends({}, rest, {
      ref: forwardRef,
      type: "range"
    }));
  };

  return RangeInput;
}(_react.Component);

var RangeInputDoc;

if (process.env.NODE_ENV !== 'production') {
  RangeInputDoc = require('./doc').doc(RangeInput); // eslint-disable-line global-require
}

var RangeInputWrapper = (0, _recompose.compose)((0, _hocs.withFocus)(), _hocs.withForwardRef)(RangeInputDoc || RangeInput);
exports.RangeInput = RangeInputWrapper;