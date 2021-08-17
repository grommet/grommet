"use strict";

exports.__esModule = true;
exports.TableCellPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    plain: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['noPad'])]),
    scope: _propTypes["default"].oneOf(['col', 'row']),
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', '1/2', '1/3', '2/3', '1/4', '2/4', '3/4']), _propTypes["default"].string]),
    verticalAlign: _propTypes["default"].oneOf(['top', 'middle', 'bottom']),
    align: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['left', 'right', 'center', 'justify', 'inherit', 'start', 'end']), _propTypes["default"].string])
  };
}

var TableCellPropTypes = PropType;
exports.TableCellPropTypes = TableCellPropTypes;