"use strict";

exports.__esModule = true;
exports.FormFieldPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    a11yTitle: _propTypes["default"].string,
    component: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].object]),
    contentProps: _propTypes["default"].object,
    disabled: _propTypes["default"].bool,
    error: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
    help: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
    htmlFor: _propTypes["default"].string,
    info: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
    label: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
    name: _propTypes["default"].string,
    margin: _generalPropTypes.marginProp,
    pad: _propTypes["default"].bool,
    required: _propTypes["default"].bool,
    validate: _propTypes["default"].oneOfType([_propTypes["default"].shape({
      regexp: _propTypes["default"].instanceOf(RegExp),
      // regular expression
      message: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
      status: _propTypes["default"].oneOf(['error', 'info'])
    }), _propTypes["default"].func, _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].shape({
      regexp: _propTypes["default"].instanceOf(RegExp),
      // regular expression
      message: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
      status: _propTypes["default"].oneOf(['error', 'info'])
    }), _propTypes["default"].func]))])
  };
}

var FormFieldPropTypes = PropType;
exports.FormFieldPropTypes = FormFieldPropTypes;