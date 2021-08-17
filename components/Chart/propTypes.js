"use strict";

exports.__esModule = true;
exports.ChartPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var thicknessType = _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['hair', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'none']), _propTypes["default"].string, _propTypes["default"].number]);

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    animate: _propTypes["default"].bool,
    bounds: _propTypes["default"].arrayOf(_propTypes["default"].arrayOf(_propTypes["default"].number)),
    color: _propTypes["default"].oneOfType([_generalPropTypes.colorPropType, _propTypes["default"].shape({
      color: _generalPropTypes.colorPropType,
      // deprecated, use top level 'opacity'
      opacity: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['weak', 'medium', 'strong']), _propTypes["default"].bool])
    }), _propTypes["default"].arrayOf(_propTypes["default"].shape({
      color: _generalPropTypes.colorPropType,
      value: _propTypes["default"].number
    }))]),
    id: _propTypes["default"].string,
    dash: _propTypes["default"].bool,
    gap: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge']), _propTypes["default"].string]),
    onClick: _propTypes["default"].func,
    onHover: _propTypes["default"].func,
    opacity: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['weak', 'medium', 'strong']), _propTypes["default"].bool]),
    overflow: _propTypes["default"].bool,
    pad: _generalPropTypes.padPropType,
    pattern: _generalPropTypes.patternPropType,
    point: _generalPropTypes.pointPropType,
    round: _propTypes["default"].bool,
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'fill', 'full']), _propTypes["default"].shape({
      height: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'fill', 'full']), _propTypes["default"].string]),
      width: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'fill', 'full', 'auto']), _propTypes["default"].string])
    }), _propTypes["default"].string]),
    thickness: thicknessType,
    type: _propTypes["default"].oneOf(['bar', 'line', 'area', 'point']),
    values: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].arrayOf(_propTypes["default"].number), _propTypes["default"].shape({
      color: _generalPropTypes.colorPropType,
      label: _propTypes["default"].string,
      // for accessibility of bars and points
      onClick: _propTypes["default"].func,
      onHover: _propTypes["default"].func,
      opacity: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].bool]),
      thickness: thicknessType,
      value: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].arrayOf(_propTypes["default"].number)])
    })]))
  });
}

var ChartPropTypes = PropType;
exports.ChartPropTypes = ChartPropTypes;