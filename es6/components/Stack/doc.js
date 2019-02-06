function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps, getAvailableAtBadge } from '../../utils';
export var doc = function doc(Stack) {
  var DocumentedStack = describe(Stack).availableAt(getAvailableAtBadge('Stack')).description("A container that stacks contents on top of each other. One child is\n      designated as the `guidingChild` which determines the size. All\n      other children are placed within that size, either above or below\n      based on their order. Stack is typically used to decorate Meter, Chart,\n      or icons.").usage("import { Stack } from 'grommet';\n<Stack />").intrinsicElement('div');
  DocumentedStack.propTypes = _extends({}, genericProps, {
    anchor: PropTypes.oneOf(['center', 'left', 'right', 'top', 'bottom', 'top-left', 'bottom-left', 'top-right', 'bottom-right']).description("Where to anchor children from. If not specified, children\n      fill the guiding child's area."),
    fill: PropTypes.bool.description("Whether to expand to fill\n      all of the available width and height in the parent container.").defaultValue(false),
    guidingChild: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['first', 'last'])]).description("Which child to guide layout from. All other children\n      will be positioned within that area. Defaults to 'first'.").defaultValue('first'),
    interactiveChild: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['first', 'last'])]).description("Which child to restrict user interaction to. All other children\n      will have user interaction disabled.")
  });
  return DocumentedStack;
};
export var themeDoc = {
  'stack.extend': {
    description: 'Any additional style for the control of the Stack component.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  }
};