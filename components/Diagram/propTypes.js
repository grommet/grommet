"use strict";

exports.__esModule = true;
exports.DiagramPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var animationPropType = _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['pulse', 'draw']), _propTypes["default"].shape({
  type: _propTypes["default"].oneOf(['pulse', 'draw']),
  delay: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  duration: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  size: _propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge'])
})]);

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    animation: animationPropType,
    connections: _propTypes["default"].arrayOf(_propTypes["default"].shape({
      anchor: _propTypes["default"].oneOf(['center', 'vertical', 'horizontal']),
      animation: animationPropType,
      color: _generalPropTypes.colorPropType,
      fromTarget: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]).isRequired,
      label: _propTypes["default"].string,
      // for accessibility
      offset: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large']), _propTypes["default"].string]),
      thickness: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['hair', 'xxsmall', 'xsmall', 'small', 'medium', 'large']), _propTypes["default"].string]),
      toTarget: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]).isRequired,
      type: _propTypes["default"].oneOf(['direct', 'curved', 'rectilinear'])
    })).isRequired
  };
}

var DiagramPropTypes = PropType;
exports.DiagramPropTypes = DiagramPropTypes;