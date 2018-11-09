"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(TextArea) {
  var DocumentedTextArea = (0, _reactDesc.describe)(TextArea).availableAt((0, _utils.getAvailableAtBadge)('TextArea')).description('A textarea.').usage("import { TextArea } from 'grommet';\n<TextArea id='item' name='item' />");
  DocumentedTextArea.propTypes = {
    id: _reactDesc.PropTypes.string.description('The id attribute of the textarea.'),
    fill: _reactDesc.PropTypes.oneOf([true, false]).description('Whether the width and height should fill the container.').defaultValue(false),
    focusIndicator: _reactDesc.PropTypes.bool.description('Whether the plain textarea should receive a focus outline.'),
    name: _reactDesc.PropTypes.string.description('The name attribute of the textarea.'),
    onChange: _reactDesc.PropTypes.func.description('Function that will be called when the user types in the textarea.'),
    placeholder: _reactDesc.PropTypes.string.description('Placeholder text to use when no value is provided.'),
    plain: _reactDesc.PropTypes.bool.description("Whether this is a plain textarea with no border or padding.\nOnly use this when the containing context provides sufficient affordance."),
    value: _reactDesc.PropTypes.string.description('What text to put in the textarea.')
  };
  return DocumentedTextArea;
};

exports.doc = doc;