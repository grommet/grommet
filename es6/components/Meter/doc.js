function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { backgroundPropType, genericProps, getAvailableAtBadge } from '../../utils';
export var doc = function doc(Meter) {
  var DocumentedMeter = describe(Meter).availableAt(getAvailableAtBadge('Meter')).description('A graphical meter.').usage("import { Meter } from 'grommet';\n<Meter />");
  DocumentedMeter.propTypes = _extends({}, genericProps, {
    background: backgroundPropType.defaultValue({
      color: 'light-2',
      opacity: 'medium'
    }),
    round: PropTypes.bool.description('Whether to round the line ends').defaultValue(false),
    size: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'full']), PropTypes.string]).description('The size of the Meter.').defaultValue('medium'),
    thickness: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]).description('The size of the Meter.').defaultValue('medium'),
    type: PropTypes.oneOf(['bar', 'circle']).description('The visual type of meter.').defaultValue('bar'),
    values: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string,
      highlight: PropTypes.bool,
      label: PropTypes.string.isRequired,
      // for accessibility
      onClick: PropTypes.func,
      onHover: PropTypes.func,
      value: PropTypes.number.isRequired
    })).description("Array of value objects describing the data.\n      'value' is the actual numeric value.\n      'label' is a text string describing it.\n      'color' indicates the color name to use. If not specified a default one\n      will be chosen.\n      'onClick' will be called when the user clicks on it.\n      Set 'highlight' to call attention to it.\n      'onHover' will be called with a boolean argument indicating when the\n      user hovers onto or away from it.")
  });
  return DocumentedMeter;
};