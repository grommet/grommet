"use strict";

exports.__esModule = true;
exports.NameValueListType = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    align: _generalPropTypes.alignPropType,
    layout: _propTypes["default"].oneOfType(['column', 'grid']),
    nameProps: _propTypes["default"].shape({
      align: _generalPropTypes.alignPropType,
      width: _generalPropTypes.widthPropType
    }),
    pairProps: _propTypes["default"].shape({
      direction: _propTypes["default"].oneOf(['row', 'column', 'column-reverse'])
    }),
    valueProps: _propTypes["default"].shape({
      align: _generalPropTypes.alignPropType,
      width: _generalPropTypes.widthPropType
    })
  };
}
var NameValueListType = exports.NameValueListType = PropType;