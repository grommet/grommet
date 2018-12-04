"use strict";

exports.__esModule = true;
exports.genericProps = exports.colorPropType = exports.backgroundPropType = exports.a11yTitlePropType = void 0;

var _reactDesc = require("react-desc");

var a11yTitlePropType = _reactDesc.PropTypes.string.description('Custom title to be used by screen readers.');

exports.a11yTitlePropType = a11yTitlePropType;

var backgroundPropType = _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.shape({
  color: _reactDesc.PropTypes.string,
  opacity: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['weak', 'medium', 'strong']), _reactDesc.PropTypes.bool])
})]).description('Background color');

exports.backgroundPropType = backgroundPropType;

var colorPropType = _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.shape({
  dark: _reactDesc.PropTypes.string,
  light: _reactDesc.PropTypes.string
})]);

exports.colorPropType = colorPropType;
var MARGIN_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];
var genericProps = {
  a11yTitle: a11yTitlePropType,
  alignSelf: _reactDesc.PropTypes.oneOf(['start', 'center', 'end', 'stretch']).description("How to align along the cross axis when contained in\n      a Box or along the column axis when contained in a Grid."),
  gridArea: _reactDesc.PropTypes.string.description("The name of the area to place\n    this inside a parent Grid."),
  margin: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['none'].concat(MARGIN_SIZES)), _reactDesc.PropTypes.shape({
    bottom: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(MARGIN_SIZES), _reactDesc.PropTypes.string]),
    horizontal: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(MARGIN_SIZES), _reactDesc.PropTypes.string]),
    left: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(MARGIN_SIZES), _reactDesc.PropTypes.string]),
    right: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(MARGIN_SIZES), _reactDesc.PropTypes.string]),
    top: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(MARGIN_SIZES), _reactDesc.PropTypes.string]),
    vertical: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(MARGIN_SIZES), _reactDesc.PropTypes.string])
  }), _reactDesc.PropTypes.string]).description("The amount of margin around the component. An object can\n      be specified to distinguish horizontal margin, vertical margin, and\n      margin on a particular side.")
};
exports.genericProps = genericProps;