"use strict";

exports.__esModule = true;
exports.ButtonPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    children: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].object, _propTypes["default"].node]),
    active: _propTypes["default"].bool,
    as: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func, _propTypes["default"].elementType]),
    badge: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].element, _propTypes["default"].number, _propTypes["default"].shape({
      background: _generalPropTypes.backgroundPropType,
      max: _propTypes["default"].number,
      value: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].number])
    })]),
    busy: _propTypes["default"].bool,
    color: _generalPropTypes.colorPropType,
    disabled: _propTypes["default"].bool,
    fill: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['horizontal', 'vertical']), _propTypes["default"].bool]),
    focusIndicator: _propTypes["default"].bool,
    gap: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge']), _propTypes["default"].string]),
    hoverIndicator: _generalPropTypes.hoverIndicatorPropType,
    href: _propTypes["default"].string,
    icon: _propTypes["default"].element,
    justify: _propTypes["default"].oneOf(['around', 'between', 'center', 'end', 'evenly', 'start', 'stretch']),
    label: _propTypes["default"].node,
    messages: _propTypes["default"].shape({
      busy: _propTypes["default"].string,
      success: _propTypes["default"].string
    }),
    onClick: _propTypes["default"].func,
    pad: _generalPropTypes.padPropType,
    plain: _propTypes["default"].bool,
    primary: _propTypes["default"].bool,
    reverse: _propTypes["default"].bool,
    secondary: _propTypes["default"].bool,
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['small', 'medium', 'large']), _propTypes["default"].string]),
    success: _propTypes["default"].bool,
    target: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['_self', '_blank', '_parent', '_top']), _propTypes["default"].string]),
    tip: _propTypes["default"].oneOfType([_propTypes["default"].shape({
      content: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string]),
      dropProps: _propTypes["default"].shape({}),
      plain: _propTypes["default"].bool
    }), _propTypes["default"].string]),
    type: _propTypes["default"].oneOf(['button', 'reset', 'submit'])
  });
}
var ButtonPropTypes = exports.ButtonPropTypes = PropType;