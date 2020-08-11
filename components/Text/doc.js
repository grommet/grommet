"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(Text) {
  var DocumentedText = (0, _reactDesc.describe)(Text).availableAt((0, _utils.getAvailableAtBadge)('Text')).description('Arbitrary text.').usage("import { Text } from 'grommet';\n<Text />").intrinsicElement('span');
  DocumentedText.propTypes = _extends({}, _utils.genericProps, {
    color: _utils.colorPropType.description('A color identifier to use for the text color.'),
    margin: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['none'].concat(_utils.MARGIN_SIZES)), _reactDesc.PropTypes.shape({
      bottom: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(_utils.MARGIN_SIZES), _reactDesc.PropTypes.string]),
      end: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(_utils.MARGIN_SIZES), _reactDesc.PropTypes.string]),
      horizontal: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(_utils.MARGIN_SIZES), _reactDesc.PropTypes.string]),
      left: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(_utils.MARGIN_SIZES), _reactDesc.PropTypes.string]),
      right: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(_utils.MARGIN_SIZES), _reactDesc.PropTypes.string]),
      start: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(_utils.MARGIN_SIZES), _reactDesc.PropTypes.string]),
      top: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(_utils.MARGIN_SIZES), _reactDesc.PropTypes.string]),
      vertical: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(_utils.MARGIN_SIZES), _reactDesc.PropTypes.string])
    }), _reactDesc.PropTypes.string]).description("The amount of margin around the component. An object can be \n    specified to distinguish horizontal margin, vertical margin, and margin on \n    a particular side. For vertical margin to be applied, Text needs to be \n    contained within a layout component (such as Box or a generic div) or \n    behave as a div (by applying as=\"div\" or a display style of \n    inline-block)."),
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']), _reactDesc.PropTypes.string]).description("The font size and line height are primarily driven by the chosen tag. \nBut, it can be adjusted via this size property. The tag should be set for \nsemantic correctness and accessibility. This size property allows for stylistic\nadjustments.").defaultValue('medium'),
    tag: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.func]).description("The DOM tag to use for the element. NOTE: This is deprecated in favor\n         of indicating the DOM tag via the 'as' property."),
    as: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.func, _reactDesc.PropTypes.element]).description("The DOM tag or react component to use for the element.").defaultValue('span'),
    textAlign: _reactDesc.PropTypes.oneOf(['start', 'center', 'end']).description('How to align the text inside the component.').defaultValue('start'),
    truncate: _reactDesc.PropTypes.bool.description("Restrict the text to a single line and truncate with ellipsis if it\nis too long to all fit.").defaultValue(false),
    weight: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['normal', 'bold']), _reactDesc.PropTypes.number]).description('Font weight'),
    wordBreak: _reactDesc.PropTypes.oneOf(['normal', 'break-all', 'keep-all', 'break-word']).description('Whether words should break when reaching the end of a line.').defaultValue('normal')
  });
  return DocumentedText;
};

exports.doc = doc;

var themeDoc = _extends({
  'global.colors.text': {
    description: 'The text color used for Text.',
    type: 'object | { dark: string, light: string }',
    defaultValue: "{ dark: '#f8f8f8', light: '#444444' }"
  },
  text: {
    description: "The possible sizes of the text in terms of its font-size and \nline-height.",
    type: 'object',
    defaultValue: "{\n      xsmall: {\n        size: '12px',\n        height: '18px',\n       },\n      small: {\n        size: '14px',\n        height: '20px',\n       },\n      medium: {\n        size: '18px',\n        height: '24px',\n      },\n      large: {\n        size: '22px',\n        height: '28px',\n      },\n      xlarge: {\n        size: '26px',\n        height: '32px',\n      },\n      xxlarge: {\n        size: '34px',\n        height: '40px',\n      },\n    }"
  },
  'text.extend': {
    description: 'Any additional style for Text.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  }
}, _utils.themeDocUtils.edgeStyle('The possible sizes for margin.'));

exports.themeDoc = themeDoc;