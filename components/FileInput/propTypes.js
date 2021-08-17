"use strict";

exports.__esModule = true;
exports.FileInputPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    disabled: _propTypes["default"].bool,
    id: _propTypes["default"].string,
    messages: _propTypes["default"].shape({
      browse: _propTypes["default"].string,
      dropPrompt: _propTypes["default"].string,
      dropPromptMultiple: _propTypes["default"].string,
      files: _propTypes["default"].string,
      remove: _propTypes["default"].string,
      removeAll: _propTypes["default"].string
    }),
    multiple: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].shape({
      aggregateThreshold: _propTypes["default"].number
    })]),
    name: _propTypes["default"].string,
    onChange: _propTypes["default"].func,
    renderFile: _propTypes["default"].func
  };
}

var FileInputPropTypes = PropType;
exports.FileInputPropTypes = FileInputPropTypes;