"use strict";

exports.__esModule = true;
exports.GridPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var fixedSizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
var sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge', 'full', '1/2', '1/3', '2/3', '1/4', '2/4', '3/4', 'flex', 'auto'];
var edgeSizes = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'none'];

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
  PropType = _extends({}, _generalPropTypes.genericProps, {
    align: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['baseline', 'center', 'end', 'start', 'stretch']), _propTypes["default"].string]),
    alignContent: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['around', 'baseline', 'between', 'center', 'evenly', 'end', 'start', 'stretch']), _propTypes["default"].string]),
    areas: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].shape({
      name: _propTypes["default"].string,
      start: _propTypes["default"].arrayOf(_propTypes["default"].number),
      end: _propTypes["default"].arrayOf(_propTypes["default"].number)
    })), _propTypes["default"].arrayOf(_propTypes["default"].arrayOf(_propTypes["default"].string))]),
    border: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['top', 'left', 'bottom', 'right', 'start', 'end', 'horizontal', 'vertical', 'all']), BORDER_SHAPE, _propTypes["default"].arrayOf(BORDER_SHAPE)]),
    columns: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].oneOf(sizes), _propTypes["default"].string])), _propTypes["default"].oneOf(sizes), _propTypes["default"].string])), _propTypes["default"].oneOf(sizes), _propTypes["default"].shape({
      count: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['fit', 'fill']), _propTypes["default"].number]),
      size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(sizes), _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].oneOf(sizes), _propTypes["default"].string])), _propTypes["default"].string])
    }), _propTypes["default"].string]),
    fill: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['horizontal', 'vertical']), _propTypes["default"].bool]),
    gap: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(edgeSizes), _propTypes["default"].shape({
      row: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(edgeSizes), _propTypes["default"].string]),
      column: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(edgeSizes), _propTypes["default"].string])
    }), _propTypes["default"].string]),
    height: _generalPropTypes.heightPropType,
    justify: _propTypes["default"].oneOf(['start', 'center', 'end', 'stretch']),
    justifyContent: _propTypes["default"].oneOf(['start', 'center', 'end', 'between', 'around', 'stretch']),
    pad: _generalPropTypes.padPropType,
    responsive: _propTypes["default"].bool,
    rows: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].oneOf(sizes), _propTypes["default"].string])), _propTypes["default"].oneOf(sizes), _propTypes["default"].string])), _propTypes["default"].oneOf(fixedSizes), _propTypes["default"].string]),
    tag: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    as: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    width: _generalPropTypes.widthPropType
  });
}

var GridPropTypes = PropType;
exports.GridPropTypes = GridPropTypes;