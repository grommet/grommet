function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge, genericProps } from '../../utils';
export var doc = function doc(Paragraph) {
  var DocumentedParagraph = describe(Paragraph).availableAt(getAvailableAtBadge('Paragraph')).description('A paragraph of text.').usage("import { Paragraph } from 'grommet';\n<Paragraph />");
  DocumentedParagraph.propTypes = _extends({}, genericProps, {
    color: PropTypes.string.description('A color identifier to use for the text color.'),
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'xxlarge']), PropTypes.string]).description('The size of the Paragraph text.').defaultValue('medium'),
    textAlign: PropTypes.oneOf(['start', 'center', 'end']).description('How to align the text inside the paragraph.').defaultValue('start')
  });
  return DocumentedParagraph;
};