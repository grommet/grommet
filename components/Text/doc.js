"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(Text) {
  var DocumentedText = (0, _reactDesc.describe)(Text).availableAt((0, _utils.getAvailableAtBadge)('Text')).description('Arbitrary text.').usage("import { Text } from 'grommet';\n<Text />");
  DocumentedText.propTypes = _extends({}, _utils.genericProps, {
    color: _reactDesc.PropTypes.string.description('A color identifier to use for the text color.'),
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']), _reactDesc.PropTypes.string]).description("The font size is primarily driven by the chosen tag. But, it can\nbe adjusted via this size property. The tag should be set for semantic\ncorrectness and accessibility. This size property allows for stylistic\nadjustments."),
    tag: _reactDesc.PropTypes.string.description('The DOM tag to use for the element.').defaultValue('span'),
    textAlign: _reactDesc.PropTypes.oneOf(['start', 'center', 'end']).description('How to align the text inside the component.').defaultValue('start'),
    truncate: _reactDesc.PropTypes.bool.description("Restrict the text to a single line and truncate with ellipsis if it\nis too long to all fit.").defaultValue(false),
    weight: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['normal', 'bold']), _reactDesc.PropTypes.number]).description('Font weight')
  });
  return DocumentedText;
};

exports.doc = doc;