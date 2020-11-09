"use strict";

exports.__esModule = true;
exports.pointPropType = exports.hoverIndicatorPropType = exports.genericProps = exports.padPropType = exports.marginProp = exports.MARGIN_SIZES = exports.backgroundDoc = exports.colorPropType = exports.getBorderPropType = exports.a11yTitlePropType = void 0;

var _reactDesc = require("react-desc");

var a11yTitlePropType = _reactDesc.PropTypes.string.description("Custom label to be used by screen readers. When provided, an aria-label will\n   be added to the element.");

exports.a11yTitlePropType = a11yTitlePropType;

var getBorderPropType = function getBorderPropType(_ref) {
  var _ref$includeBetween = _ref.includeBetween,
      includeBetween = _ref$includeBetween === void 0 ? true : _ref$includeBetween;
  return _reactDesc.PropTypes.shape({
    color: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.shape({
      dark: _reactDesc.PropTypes.string,
      light: _reactDesc.PropTypes.string
    })]),
    side: _reactDesc.PropTypes.oneOf(['top', 'left', 'bottom', 'right', 'start', 'end', 'horizontal', 'vertical', 'all'].concat(includeBetween ? ['between'] : [])),
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string]),
    style: _reactDesc.PropTypes.oneOf(['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset', 'hidden']).defaultValue('solid')
  });
};

exports.getBorderPropType = getBorderPropType;

var colorPropType = _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.shape({
  dark: _reactDesc.PropTypes.string,
  light: _reactDesc.PropTypes.string
})]);

exports.colorPropType = colorPropType;

var backgroundDoc = _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.shape({
  color: colorPropType,
  dark: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.string]),
  image: _reactDesc.PropTypes.string,
  position: _reactDesc.PropTypes.string,
  opacity: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.bool, _reactDesc.PropTypes.number, _reactDesc.PropTypes.oneOf(['weak', 'medium', 'strong'])]),
  repeat: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['no-repeat', 'repeat']), _reactDesc.PropTypes.string]),
  size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['cover', 'contain']), _reactDesc.PropTypes.string]),
  light: _reactDesc.PropTypes.string
})]).description("Either a color \nidentifier to use for the background color. For example: 'neutral-1'. Or, a \n'url()' for an image. Dark is not needed if color is provided.");

exports.backgroundDoc = backgroundDoc;
var MARGIN_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];
exports.MARGIN_SIZES = MARGIN_SIZES;

var marginProp = _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['none'].concat(MARGIN_SIZES)), _reactDesc.PropTypes.shape({
  bottom: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(MARGIN_SIZES), _reactDesc.PropTypes.string]),
  end: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(MARGIN_SIZES), _reactDesc.PropTypes.string]),
  horizontal: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(MARGIN_SIZES), _reactDesc.PropTypes.string]),
  left: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(MARGIN_SIZES), _reactDesc.PropTypes.string]),
  right: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(MARGIN_SIZES), _reactDesc.PropTypes.string]),
  start: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(MARGIN_SIZES), _reactDesc.PropTypes.string]),
  top: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(MARGIN_SIZES), _reactDesc.PropTypes.string]),
  vertical: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(MARGIN_SIZES), _reactDesc.PropTypes.string])
}), _reactDesc.PropTypes.string]).description("The amount of margin around the component. An object can\n    be specified to distinguish horizontal margin, vertical margin, and\n    margin on a particular side.");

exports.marginProp = marginProp;
var PAD_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];

var padPropType = _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['none'].concat(PAD_SIZES)), _reactDesc.PropTypes.shape({
  bottom: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(PAD_SIZES), _reactDesc.PropTypes.string]),
  end: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(PAD_SIZES), _reactDesc.PropTypes.string]),
  horizontal: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(PAD_SIZES), _reactDesc.PropTypes.string]),
  left: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(PAD_SIZES), _reactDesc.PropTypes.string]),
  right: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(PAD_SIZES), _reactDesc.PropTypes.string]),
  start: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(PAD_SIZES), _reactDesc.PropTypes.string]),
  top: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(PAD_SIZES), _reactDesc.PropTypes.string]),
  vertical: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(PAD_SIZES), _reactDesc.PropTypes.string])
}), _reactDesc.PropTypes.string]).description("The amount of padding around the box contents. An\n    object can be specified to distinguish horizontal padding, vertical\n    padding, and padding on a particular side of the box").defaultValue('none');

exports.padPropType = padPropType;
var genericProps = {
  a11yTitle: a11yTitlePropType,
  alignSelf: _reactDesc.PropTypes.oneOf(['start', 'center', 'end', 'stretch']).description("How to align along the cross axis when contained in\n      a Box or along the column axis when contained in a Grid."),
  gridArea: _reactDesc.PropTypes.string.description("The name of the area to place\n    this inside a parent Grid."),
  margin: marginProp
};
exports.genericProps = genericProps;

var hoverIndicatorPropType = _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.string, _reactDesc.PropTypes.oneOf(['background']), _reactDesc.PropTypes.shape({
  color: _reactDesc.PropTypes.string,
  dark: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.string]),
  image: _reactDesc.PropTypes.string,
  light: _reactDesc.PropTypes.string,
  position: _reactDesc.PropTypes.string,
  opacity: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.bool, _reactDesc.PropTypes.number, _reactDesc.PropTypes.oneOf(['weak', 'medium', 'strong'])]),
  repeat: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['no-repeat', 'repeat']), _reactDesc.PropTypes.string]),
  size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['cover', 'contain']), _reactDesc.PropTypes.string])
})]);

exports.hoverIndicatorPropType = hoverIndicatorPropType;

var pointPropType = _reactDesc.PropTypes.oneOf(['circle', 'diamond', 'square', 'star', 'triangle', 'triangleDown']);

exports.pointPropType = pointPropType;