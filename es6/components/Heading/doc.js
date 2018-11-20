function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps, getAvailableAtBadge } from '../../utils';
export var doc = function doc(Heading) {
  var DocumentedHeading = describe(Heading).availableAt(getAvailableAtBadge('Heading')).description('Heading text structed in levels.').usage("import { Heading } from 'grommet';\n<Heading />");
  DocumentedHeading.propTypes = _extends({}, genericProps, {
    color: PropTypes.string.description('A color identifier to use for the text color.'),
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6, '1', '2', '3', '4', '5', '6']).description("The heading level. It corresponds to the number after the 'H' for\nthe DOM tag. Set the level for semantic accuracy and accessibility.\nThe sizing can be further adjusted using the size property.").defaultValue(1),
    responsive: PropTypes.bool.description("Whether the font size should be scaled for\n      mobile environments.").defaultValue(true),
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']), PropTypes.string]).description("The font size is primarily driven by the chosen tag. But, it can\nbe adjusted via this size property. The tag should be set for semantic\ncorrectness and accessibility. This size property allows for stylistic\nadjustments.").defaultValue('medium'),
    textAlign: PropTypes.oneOf(['start', 'center', 'end']).description('How to align the text inside the heading.').defaultValue('start'),
    truncate: PropTypes.bool.description("Restrict the text to a single line and truncate with ellipsis if it\nis too long to all fit.").defaultValue(false)
  });
  return DocumentedHeading;
};