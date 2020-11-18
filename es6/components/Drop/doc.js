import { describe, PropTypes } from 'react-desc';
import { OVERFLOW_VALUES } from '../Box/doc';
import { getAvailableAtBadge } from '../../utils/mixins'; // if you update values here, make sure to update in Box/doc too.

var dropOverflowPropTypes = PropTypes.oneOfType([PropTypes.oneOf(OVERFLOW_VALUES), PropTypes.shape({
  horizontal: PropTypes.oneOf(OVERFLOW_VALUES),
  vertical: PropTypes.oneOf(OVERFLOW_VALUES)
}), PropTypes.string]);
export var doc = function doc(Drop) {
  var DocumentedDrop = describe(Drop).availableAt(getAvailableAtBadge('Drop', 'Controls')).description('A container that is overlaid next to a target.').usage("import { Drop } from 'grommet';\n<Drop target={reference}>...</Drop>").intrinsicElement('div');
  DocumentedDrop.propTypes = {
    align: PropTypes.shape({
      top: PropTypes.oneOf(['top', 'bottom']),
      bottom: PropTypes.oneOf(['top', 'bottom']),
      right: PropTypes.oneOf(['left', 'right']),
      left: PropTypes.oneOf(['left', 'right'])
    }).description("How to align the drop with respect to the target element. Not \n        specifying a vertical or horizontal alignment will cause it to be \n        aligned in the center.").defaultValue({
      top: 'top',
      left: 'left'
    }),
    onClickOutside: PropTypes.func.description('Function that will be invoked when the user clicks outside the drop.'),
    onEsc: PropTypes.func.description("Function that will be called when the user presses the escape key inside\n       the drop."),
    overflow: dropOverflowPropTypes.description('How to control the overflow inside the drop.').defaultValue('auto'),
    responsive: PropTypes.bool.description('Whether to dynamically re-place when resized.').defaultValue(true),
    restrictFocus: PropTypes.bool.description('Whether the drop should control focus.').defaultValue(false),
    stretch: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['align'])]).description("If set to true the drop element will be stretched to at least match the\n      width of the target element. If set to align the width of the drop element\n      will be restricted to the width of the target element. The default is true\n      because that is what most uses of Drop want, like Select and Menu.").defaultValue(true),
    target: PropTypes.object.description("Target where the drop will be aligned to. This should be a React \n      reference.").isRequired,
    elevation: PropTypes.oneOfType([PropTypes.oneOf(['none', 'xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]).description("Elevated height of the target, indicated via a drop shadow. \n      Only applicable if the Drop isn't plain."),
    plain: PropTypes.bool.description("Whether the drop element should have no background nor elevation.").defaultValue(false),
    trapFocus: PropTypes.bool.description("Traps keyboard focus inside of drop.").defaultValue(true)
  };
  return DocumentedDrop;
};
export var themeDoc = {
  'drop.maxHeight': {
    description: 'The max height of the Drop container.',
    type: 'string',
    defaultValue: undefined
  },
  'global.drop.background': {
    description: 'The background color of Drop.',
    type: 'string | { dark: string, light: string }',
    defaultValue: '#ffffff'
  },
  'global.drop.border.radius': {
    description: 'The border radius of the Drop container.',
    type: 'string',
    defaultValue: '0px'
  },
  'global.drop.extend': {
    description: 'Any additional style for Drop.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'global.drop.shadowSize': {
    description: 'Elevated height of the Drop.',
    type: 'string',
    defaultValue: 'small'
  },
  'global.drop.zIndex': {
    description: 'The stack order of the Drop.',
    type: 'number',
    defaultValue: 20
  }
};