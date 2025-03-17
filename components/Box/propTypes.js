"use strict";

exports.__esModule = true;
exports.BoxPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var OVERFLOW_VALUES = ['auto', 'hidden', 'scroll', 'visible'];
var BORDER_SHAPE = _propTypes["default"].shape({
  color: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
    dark: _propTypes["default"].string,
    light: _propTypes["default"].string
  })]),
  side: _propTypes["default"].oneOf(['top', 'left', 'bottom', 'right', 'start', 'end', 'horizontal', 'vertical', 'all', 'between']),
  size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), _propTypes["default"].string]),
  style: _propTypes["default"].oneOf(['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset', 'hidden'])
});

// if you update values here, make sure to update in Drop/doc too.
var overflowPropType = _propTypes["default"].oneOfType([_propTypes["default"].oneOf(OVERFLOW_VALUES), _propTypes["default"].shape({
  horizontal: _propTypes["default"].oneOf(OVERFLOW_VALUES),
  vertical: _propTypes["default"].oneOf(OVERFLOW_VALUES)
}), _propTypes["default"].string]);
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    align: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['baseline', 'center', 'end', 'start', 'stretch']), _propTypes["default"].string]),
    alignContent: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['around', 'baseline', 'between', 'center', 'evenly', 'end', 'start', 'stretch']), _propTypes["default"].string]),
    animation: _generalPropTypes.animationPropType,
    background: _generalPropTypes.backgroundDoc,
    basis: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'full', '1/2', '1/3', '2/3', '1/4', '2/4', '3/4', 'auto']), _propTypes["default"].string]),
    border: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['top', 'left', 'bottom', 'right', 'start', 'end', 'horizontal', 'vertical', 'all', 'between']), BORDER_SHAPE, _propTypes["default"].arrayOf(BORDER_SHAPE)]),
    cssGap: _propTypes["default"].bool,
    direction: _propTypes["default"].oneOf(['row', 'column', 'row-responsive', 'row-reverse', 'column-reverse']),
    elevation: _generalPropTypes.elevationPropType,
    flex: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['grow', 'shrink']), _propTypes["default"].bool, _propTypes["default"].shape({
      grow: _propTypes["default"].number,
      shrink: _propTypes["default"].number
    })]),
    fill: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['horizontal', 'vertical']), _propTypes["default"].bool]),
    focusIndicator: _propTypes["default"].bool,
    gap: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge']), _propTypes["default"].string, _propTypes["default"].shape({
      row: _propTypes["default"].string,
      column: _propTypes["default"].string
    })]),
    height: _generalPropTypes.heightPropType,
    hoverIndicator: _generalPropTypes.hoverIndicatorPropType,
    justify: _propTypes["default"].oneOf(['around', 'between', 'center', 'end', 'evenly', 'start', 'stretch']),
    onClick: _propTypes["default"].func,
    overflow: overflowPropType,
    pad: _generalPropTypes.padPropType,
    responsive: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['container'])]),
    round: _generalPropTypes.roundPropType,
    skeleton: _generalPropTypes.skeletonPropType,
    tag: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    as: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func, _propTypes["default"].elementType]),
    width: _generalPropTypes.widthPropType,
    wrap: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['reverse'])])
  });
}
var BoxPropTypes = exports.BoxPropTypes = PropType;