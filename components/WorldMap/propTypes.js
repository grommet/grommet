"use strict";

exports.__esModule = true;
exports.WorldMapPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
      content: _propTypes["default"].node,
      dropProps: _propTypes["default"].shape({}),
      name: _propTypes["default"].string,
      // for a11y aria-label
      location: _propTypes["default"].arrayOf(_propTypes["default"].number).isRequired,
      onClick: _propTypes["default"].func,
      onHover: _propTypes["default"].func
    })),
    hoverColor: _generalPropTypes.colorPropType
  });
}
var WorldMapPropTypes = exports.WorldMapPropTypes = PropType;