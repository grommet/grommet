"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(Paragraph) {
  var DocumentedParagraph = (0, _reactDesc.describe)(Paragraph).availableAt((0, _utils.getAvailableAtBadge)('Paragraph')).description('A paragraph of text.').usage("import { Paragraph } from 'grommet';\n<Paragraph />");
  DocumentedParagraph.propTypes = _extends({}, _utils.genericProps, {
    color: _reactDesc.PropTypes.string.description('A color identifier to use for the text color.'),
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'xxlarge']), _reactDesc.PropTypes.string]).description('The size of the Paragraph text.').defaultValue('medium'),
    textAlign: _reactDesc.PropTypes.oneOf(['start', 'center', 'end']).description('How to align the text inside the paragraph.').defaultValue('start')
  });
  return DocumentedParagraph;
};

exports.doc = doc;