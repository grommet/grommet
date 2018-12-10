"use strict";

exports.__esModule = true;
exports.SelectOption = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Box = require("../Box");

var _Button = require("../Button");

var _hocs = require("../hocs");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var SelectOption =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SelectOption, _Component);

  function SelectOption() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = SelectOption.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    var _this$props = this.props,
        active = _this$props.active,
        disabled = _this$props.disabled,
        option = _this$props.option,
        selected = _this$props.selected;
    var nextActive = nextProps.active,
        nextDisabled = nextProps.disabled,
        nextOption = nextProps.option,
        nextSelected = nextProps.selected;
    return active !== nextActive || selected !== nextSelected || disabled !== nextDisabled || option !== nextOption;
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        forwardRef = _this$props2.forwardRef,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["forwardRef"]);

    return _react.default.createElement(_Box.Box, {
      flex: false
    }, _react.default.createElement(_Button.Button, _extends({
      tabIndex: "-1",
      ref: forwardRef,
      role: "menuitem"
    }, rest)));
  };

  return SelectOption;
}(_react.Component);

var SelectOptionWrapper = (0, _hocs.withForwardRef)(SelectOption);
exports.SelectOption = SelectOptionWrapper;