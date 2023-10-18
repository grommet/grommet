"use strict";

exports.__esModule = true;
exports.TableCellPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var BORDER_SHAPE = _propTypes["default"].shape({
  color: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
    dark: _propTypes["default"].string,
    light: _propTypes["default"].string
  })]),
  side: _propTypes["default"].oneOf(['top', 'left', 'bottom', 'right', 'start', 'end', 'horizontal', 'vertical', 'all', 'between']),
  size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), _propTypes["default"].string]),
  style: _propTypes["default"].oneOf(['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset', 'hidden'])
});
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    border: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['top', 'left', 'bottom', 'right', 'start', 'end', 'horizontal', 'vertical', 'all']), BORDER_SHAPE, _propTypes["default"].arrayOf(BORDER_SHAPE)]),
    plain: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['noPad'])]),
    scope: _propTypes["default"].oneOf(['col', 'row']),
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', '1/2', '1/3', '2/3', '1/4', '2/4', '3/4']), _propTypes["default"].string]),
    verticalAlign: _propTypes["default"].oneOf(['top', 'middle', 'bottom']),
    align: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['left', 'right', 'center', 'justify', 'inherit', 'start', 'end']), _propTypes["default"].string])
  };
}
var TableCellPropTypes = exports.TableCellPropTypes = PropType;