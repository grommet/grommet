"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _doc = require("../Box/doc");

var _utils = require("../../utils");

// if you update values here, make sure to update in Box/doc too.
var dropOverflowPropTypes = _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(_doc.OVERFLOW_VALUES), _reactDesc.PropTypes.shape({
  horizontal: _reactDesc.PropTypes.oneOf(_doc.OVERFLOW_VALUES),
  vertical: _reactDesc.PropTypes.oneOf(_doc.OVERFLOW_VALUES)
}), _reactDesc.PropTypes.string]);

var doc = function doc(Drop) {
  var DocumentedDrop = (0, _reactDesc.describe)(Drop).availableAt((0, _utils.getAvailableAtBadge)('Drop')).description('A container that is overlaid next to a target.').usage("import { Drop } from 'grommet';\n<Drop target={reference}>...</Drop>").intrinsicElement('div');
  DocumentedDrop.propTypes = {
    align: _reactDesc.PropTypes.shape({
      top: _reactDesc.PropTypes.oneOf(['top', 'bottom']),
      bottom: _reactDesc.PropTypes.oneOf(['top', 'bottom']),
      right: _reactDesc.PropTypes.oneOf(['left', 'right']),
      left: _reactDesc.PropTypes.oneOf(['left', 'right'])
    }).description("How to align the drop with respect to the target element. Not \n        specifying a vertical or horizontal alignment will cause it to be \n        aligned in the center.").defaultValue({
      top: 'top',
      left: 'left'
    }),
    onClickOutside: _reactDesc.PropTypes.func.description('Function that will be invoked when the user clicks outside the drop.'),
    onEsc: _reactDesc.PropTypes.func.description("Function that will be called when the user presses the escape key inside\n       the drop."),
    overflow: dropOverflowPropTypes.description('How to control the overflow inside the drop.').defaultValue('auto'),
    responsive: _reactDesc.PropTypes.bool.description('Whether to dynamically re-place when resized.').defaultValue(true),
    restrictFocus: _reactDesc.PropTypes.bool.description('Whether the drop should control focus.').defaultValue(false),
    stretch: _reactDesc.PropTypes.bool.description("Whether the drop element should be stretched to at least match the\n      width of the target element. The default is true because\n      that is what most uses of Drop want, like Select and Menu.").defaultValue(true),
    target: _reactDesc.PropTypes.object.description("Target where the drop will be aligned to. This should be a React \n      reference.").isRequired,
    elevation: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['none', 'xsmall', 'small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string]).description("Elevated height of the target, indicated via a drop shadow."),
    plain: _reactDesc.PropTypes.bool.description("Whether the drop element should have no background nor shadow").defaultValue(false),
    trapFocus: _reactDesc.PropTypes.bool.description("Traps keyboard focus inside of drop.").defaultValue(true)
  };
  return DocumentedDrop;
};

exports.doc = doc;
var themeDoc = {
  'drop.maxHeight': {
    description: 'The max height of the Drop container',
    type: 'string',
    defaultValue: undefined
  },
  'global.drop.background': {
    description: 'The background color of Drop',
    type: 'string | { dark: string, light: string }',
    defaultValue: '#ffffff'
  },
  'global.drop.border.radius': {
    description: 'The corner radius',
    type: 'string',
    defaultValue: '0px'
  },
  'global.drop.extend': {
    description: 'Any additional style for Drop.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'global.drop.shadowSize': {
    description: 'Elevated height of the Drop',
    type: 'string',
    defaultValue: 'small'
  },
  'global.drop.zIndex': {
    description: 'The stack order of the Drop',
    type: 'number',
    defaultValue: 20
  }
};
exports.themeDoc = themeDoc;