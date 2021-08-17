"use strict";

exports.__esModule = true;
exports.MaskedInputPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    a11yTitle: _propTypes["default"].string,
    dropHeight: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), _propTypes["default"].string]),
    dropProps: _propTypes["default"].object,
    icon: _propTypes["default"].element,
    id: _propTypes["default"].string,
    name: _propTypes["default"].string,
    onChange: _propTypes["default"].func,
    focusIndicator: _propTypes["default"].bool,
    onBlur: _propTypes["default"].func,
    mask: _propTypes["default"].arrayOf(_propTypes["default"].shape({
      length: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].arrayOf(_propTypes["default"].number)]),
      fixed: _propTypes["default"].string,
      options: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number])),
      regexp: _propTypes["default"].shape({}) // RegExp

    })),
    reverse: _propTypes["default"].bool,
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', '2xl', '3xl', '4xl', '5xl', '6xl']), _propTypes["default"].string]),
    textAlign: _propTypes["default"].oneOf(['start', 'center', 'end']),
    value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number])
  };
}

var MaskedInputPropTypes = PropType;
exports.MaskedInputPropTypes = MaskedInputPropTypes;