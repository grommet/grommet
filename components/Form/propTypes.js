"use strict";

exports.__esModule = true;
exports.FormPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    errors: _propTypes["default"].shape({}),
    infos: _propTypes["default"].shape({}),
    messages: _propTypes["default"].shape({
      invalid: _propTypes["default"].string,
      required: _propTypes["default"].string
    }),
    onChange: _propTypes["default"].func,
    onSubmit: _propTypes["default"].func,
    onReset: _propTypes["default"].func,
    onValidate: _propTypes["default"].func,
    validate: _propTypes["default"].oneOf(['blur', 'submit', 'change']),
    value: _propTypes["default"].shape({})
  };
}

var FormPropTypes = PropType;
exports.FormPropTypes = FormPropTypes;