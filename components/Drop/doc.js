"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _doc = require("../Box/doc");

var _mixins = require("../../utils/mixins");

var _themeDocUtils = require("../../utils/themeDocUtils");

var _propTypes = require("../../utils/prop-types");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// if you update values here, make sure to update in Box/doc too.
var dropOverflowPropTypes = _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(_doc.OVERFLOW_VALUES), _reactDesc.PropTypes.shape({
  horizontal: _reactDesc.PropTypes.oneOf(_doc.OVERFLOW_VALUES),
  vertical: _reactDesc.PropTypes.oneOf(_doc.OVERFLOW_VALUES)
}), _reactDesc.PropTypes.string]);

var doc = function doc(Drop) {
  var DocumentedDrop = (0, _reactDesc.describe)(Drop).availableAt((0, _mixins.getAvailableAtBadge)('Drop', 'Controls')).description('A container that is overlaid next to a target.').usage("import { Drop } from 'grommet';\n<Drop target={reference}>...</Drop>").intrinsicElement('div');
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
    background: _propTypes.backgroundDoc,
    elevation: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['none', 'xsmall', 'small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string]).description("Elevated height of the target, indicated via a drop shadow. \n      Only applicable if the Drop isn't plain."),
    margin: _propTypes.marginProp,
    onClickOutside: _reactDesc.PropTypes.func.description('Function that will be invoked when the user clicks outside the drop.'),
    onEsc: _reactDesc.PropTypes.func.description("Function that will be called when the user presses the escape key inside\n       the drop."),
    overflow: dropOverflowPropTypes.description('How to control the overflow inside the drop.').defaultValue('auto'),
    plain: _reactDesc.PropTypes.bool.description("Whether the drop element should have no background, \n        elevation, margin or round.").defaultValue(false),
    responsive: _reactDesc.PropTypes.bool.description('Whether to dynamically re-place when resized.').defaultValue(true),
    restrictFocus: _reactDesc.PropTypes.bool.description('Whether the drop should control focus.').defaultValue(false),
    round: _propTypes.roundPropType,
    stretch: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.oneOf(['align'])]).description("If set to true the drop element will be stretched to at least match the\n      width of the target element. If set to align the width of the drop element\n      will be restricted to the width of the target element. The default is true\n      because that is what most uses of Drop want, like Select and Menu.").defaultValue(true),
    target: _reactDesc.PropTypes.object.description("Target where the drop will be aligned to. This should be a React \n      reference.").isRequired,
    trapFocus: _reactDesc.PropTypes.bool.description("Traps keyboard focus inside of drop.").defaultValue(true)
  };
  return DocumentedDrop;
};

exports.doc = doc;

var themeDoc = _extends({
  'drop.maxHeight': {
    description: 'The max height of the Drop container.',
    type: 'string',
    defaultValue: undefined
  },
  'global.drop.background': {
    description: 'The background color of Drop.',
    type: 'string | { dark: string, light: string }',
    defaultValue: "{\n      dark: 'black',\n      light: 'white',\n    }"
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
  }
}, _themeDocUtils.themeDocUtils.edgeStyle('The possible sizes for the Drop margin.'), {
  'global.drop.elevation': {
    description: "Elevated height above the underlying context, indicated\n    via a drop shadow.",
    type: 'string',
    defaultValue: 'small'
  },
  'global.drop.margin': {
    description: 'The margin of the drop from the target.',
    type: 'string | object',
    defaultValue: undefined
  },
  'global.drop.shadowSize': {
    description: "Deprecated. Use 'global.drop.elevation' instead.",
    type: 'string'
  },
  'global.drop.zIndex': {
    description: 'The stack order of the Drop.',
    type: 'number',
    defaultValue: 20
  }
});

exports.themeDoc = themeDoc;