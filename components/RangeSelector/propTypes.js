"use strict";

exports.__esModule = true;
exports.RangeSelectorPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    color: _generalPropTypes.colorPropType,
    direction: _propTypes["default"].oneOf(['horizontal', 'vertical']),
    invert: _propTypes["default"].bool,
    max: _propTypes["default"].number,
    messages: _propTypes["default"].shape({
      lower: _propTypes["default"].string,
      upper: _propTypes["default"].string
    }),
    min: _propTypes["default"].number,
    onChange: _propTypes["default"].func,
    opacity: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['weak', 'medium', 'strong']), _propTypes["default"].string, _propTypes["default"].bool]),
    round: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'full']), _propTypes["default"].string]),
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'full']), _propTypes["default"].string]),
    step: _propTypes["default"].number,
    values: _propTypes["default"].arrayOf(_propTypes["default"].number).isRequired
  };
}

var RangeSelectorPropTypes = PropType;
exports.RangeSelectorPropTypes = RangeSelectorPropTypes;