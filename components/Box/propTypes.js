"use strict";

exports.__esModule = true;
exports.BoxPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var OVERFLOW_VALUES = ['auto', 'hidden', 'scroll', 'visible'];

var ANIMATION_TYPE = _propTypes["default"].oneOf(['fadeIn', 'fadeOut', 'jiggle', 'pulse', 'rotateLeft', 'rotateRight', 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'zoomIn', 'zoomOut']);

var ANIMATION_SHAPE = _propTypes["default"].shape({
  type: ANIMATION_TYPE,
  delay: _propTypes["default"].number,
  duration: _propTypes["default"].number,
  size: _propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge'])
});

var BORDER_SHAPE = _propTypes["default"].shape({
  color: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
    dark: _propTypes["default"].string,
    light: _propTypes["default"].string
  })]),
  side: _propTypes["default"].oneOf(['top', 'left', 'bottom', 'right', 'start', 'end', 'horizontal', 'vertical', 'all', 'between']),
  size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), _propTypes["default"].string]),
  style: _propTypes["default"].oneOf(['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset', 'hidden'])
}); // if you update values here, make sure to update in Drop/doc too.


var overflowPropType = _propTypes["default"].oneOfType([_propTypes["default"].oneOf(OVERFLOW_VALUES), _propTypes["default"].shape({
  horizontal: _propTypes["default"].oneOf(OVERFLOW_VALUES),
  vertical: _propTypes["default"].oneOf(OVERFLOW_VALUES)
}), _propTypes["default"].string]);

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    align: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['baseline', 'center', 'end', 'start', 'stretch']), _propTypes["default"].string]),
    alignContent: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['around', 'baseline', 'between', 'center', 'evenly', 'end', 'start', 'stretch']), _propTypes["default"].string]),
    animation: _propTypes["default"].oneOfType([ANIMATION_TYPE, ANIMATION_SHAPE, _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([ANIMATION_TYPE, ANIMATION_SHAPE]))]),
    background: _generalPropTypes.backgroundDoc,
    basis: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'full', '1/2', '1/3', '2/3', '1/4', '2/4', '3/4', 'auto']), _propTypes["default"].string]),
    border: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['top', 'left', 'bottom', 'right', 'start', 'end', 'horizontal', 'vertical', 'all', 'between']), BORDER_SHAPE, _propTypes["default"].arrayOf(BORDER_SHAPE)]),
    direction: _propTypes["default"].oneOf(['row', 'column', 'row-responsive', 'row-reverse', 'column-reverse']),
    elevation: _generalPropTypes.elevationPropType,
    flex: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['grow', 'shrink']), _propTypes["default"].bool, _propTypes["default"].shape({
      grow: _propTypes["default"].number,
      shrink: _propTypes["default"].number
    })]),
    fill: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['horizontal', 'vertical']), _propTypes["default"].bool]),
    focusIndicator: _propTypes["default"].bool,
    gap: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge']), _propTypes["default"].string]),
    height: _generalPropTypes.heightPropType,
    hoverIndicator: _generalPropTypes.hoverIndicatorPropType,
    justify: _propTypes["default"].oneOf(['around', 'between', 'center', 'end', 'evenly', 'start', 'stretch']),
    onClick: _propTypes["default"].func,
    overflow: overflowPropType,
    pad: _generalPropTypes.padPropType,
    responsive: _propTypes["default"].bool,
    round: _generalPropTypes.roundPropType,
    tag: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    as: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    width: _generalPropTypes.widthPropType,
    wrap: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['reverse'])])
  });
}

var BoxPropTypes = PropType;
exports.BoxPropTypes = BoxPropTypes;