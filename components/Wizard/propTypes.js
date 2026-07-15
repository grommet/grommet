"use strict";

exports.__esModule = true;
exports.WizardPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  var stepShape = {
    id: _propTypes["default"].string.isRequired,
    title: _propTypes["default"].string.isRequired,
    description: _propTypes["default"].node,
    render: _propTypes["default"].func,
    validate: _propTypes["default"].func,
    nextStep: _propTypes["default"].func,
    skippable: _propTypes["default"].bool,
    disabled: _propTypes["default"].bool,
    disabledReason: _propTypes["default"].string,
    'aria-label': _propTypes["default"].string
  };
  var nestedStepShape = _extends({}, stepShape, {
    children: _propTypes["default"].array
  });
  PropType = {
    steps: _propTypes["default"].arrayOf(_propTypes["default"].shape(nestedStepShape)).isRequired,
    currentStep: _propTypes["default"].string,
    defaultStep: _propTypes["default"].string,
    direction: _propTypes["default"].oneOf(['horizontal', 'vertical']),
    kind: _propTypes["default"].oneOf(['full', 'narrow', 'wide']),
    onStepChange: _propTypes["default"].func,
    onComplete: _propTypes["default"].func,
    onCancel: _propTypes["default"].func,
    renderStep: _propTypes["default"].func,
    header: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].shape({
      title: _propTypes["default"].node,
      description: _propTypes["default"].node
    })]),
    footer: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func]),
    scrollToTop: _propTypes["default"].bool,
    value: _propTypes["default"].object,
    defaultValue: _propTypes["default"].object,
    onValueChange: _propTypes["default"].func,
    id: _propTypes["default"].string,
    'aria-label': _propTypes["default"].string,
    a11yTitle: _propTypes["default"].string,
    children: _propTypes["default"].node,
    messages: _propTypes["default"].shape({
      previous: _propTypes["default"].string,
      next: _propTypes["default"].string,
      skip: _propTypes["default"].string,
      cancel: _propTypes["default"].string,
      close: _propTypes["default"].string,
      complete: _propTypes["default"].string,
      stepCounter: _propTypes["default"].string,
      progress: _propTypes["default"].string,
      validationError: _propTypes["default"].string
    })
  };
}
var WizardPropTypes = exports.WizardPropTypes = PropType;