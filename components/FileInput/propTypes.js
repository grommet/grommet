"use strict";

exports.__esModule = true;
exports.FileInputPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    confirmRemove: _propTypes["default"].func,
    disabled: _propTypes["default"].bool,
    id: _propTypes["default"].string,
    maxSize: _propTypes["default"].number,
    messages: _propTypes["default"].shape({
      alert: _propTypes["default"].shape({
        maxFile: _propTypes["default"].string,
        maxSize: _propTypes["default"].string
      }),
      browse: _propTypes["default"].string,
      dropPrompt: _propTypes["default"].string,
      dropPromptMultiple: _propTypes["default"].string,
      files: _propTypes["default"].string,
      maxFile: _propTypes["default"].string,
      maxSizeSingle: _propTypes["default"].string,
      maxSizeMultiple: _propTypes["default"].shape({
        singular: _propTypes["default"].string,
        plural: _propTypes["default"].string
      }),
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
var FileInputPropTypes = exports.FileInputPropTypes = PropType;