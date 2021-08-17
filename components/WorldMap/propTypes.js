"use strict";

exports.__esModule = true;
exports.WorldMapPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    color: _generalPropTypes.colorPropType,
    continents: _propTypes["default"].arrayOf(_propTypes["default"].shape({
      color: _generalPropTypes.colorPropType,
      name: _propTypes["default"].oneOf(['Africa', 'Asia', 'Australia', 'Europe', 'North America', 'South America']).isRequired,
      onClick: _propTypes["default"].func,
      onHover: _propTypes["default"].func
    })),
    fill: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['horizontal', 'vertical']), _propTypes["default"].bool]),
    onSelectPlace: _propTypes["default"].func,
    places: _propTypes["default"].arrayOf(_propTypes["default"].shape({
      color: _generalPropTypes.colorPropType,
      name: _propTypes["default"].string,
      // for a11y aria-label
      location: _propTypes["default"].arrayOf(_propTypes["default"].number).isRequired,
      onClick: _propTypes["default"].func,
      onHover: _propTypes["default"].func
    })),
    hoverColor: _generalPropTypes.colorPropType
  });
}

var WorldMapPropTypes = PropType;
exports.WorldMapPropTypes = WorldMapPropTypes;