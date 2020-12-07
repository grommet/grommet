"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _mixins = require("../../utils/mixins");

var _themeDocUtils = require("../../utils/themeDocUtils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var PAD_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large'];

var doc = function doc(Layer) {
  var DocumentedLayer = (0, _reactDesc.describe)(Layer).availableAt((0, _mixins.getAvailableAtBadge)('Layer', 'Layout')).description("An overlay. Layer is typically modal and anchored to an edge, corner, or\n      center of the window. It is the caller's responsibility to provide a\n      control for the user to close the layer.").usage("import { Layer } from 'grommet';\n<Layer />").intrinsicElement('div');
  DocumentedLayer.propTypes = {
    animate: _reactDesc.PropTypes.bool.description("Whether to animate the Layer content when it opens. This\n        property is deprecated and will be removed in the next major version\n        of grommet. Instead, use 'animation'.").defaultValue(true),
    animation: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['slide', 'fadeIn', 'none']), _reactDesc.PropTypes.bool]).description('Animation transition of the Layer content when it opens and closes.').defaultValue('slide'),
    full: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.oneOf(['vertical', 'horizontal'])]).description("Whether the width and/or height should fill the current viewport \n        size.").defaultValue(false),
    margin: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['none'].concat(PAD_SIZES)), _reactDesc.PropTypes.shape({
      bottom: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(PAD_SIZES), _reactDesc.PropTypes.string]),
      end: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(PAD_SIZES), _reactDesc.PropTypes.string]),
      horizontal: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(PAD_SIZES), _reactDesc.PropTypes.string]),
      left: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(PAD_SIZES), _reactDesc.PropTypes.string]),
      right: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(PAD_SIZES), _reactDesc.PropTypes.string]),
      start: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(PAD_SIZES), _reactDesc.PropTypes.string]),
      top: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(PAD_SIZES), _reactDesc.PropTypes.string]),
      vertical: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(PAD_SIZES), _reactDesc.PropTypes.string])
    }), _reactDesc.PropTypes.string]).description("The amount of margin around the Layer. An object can be specified to\ndistinguish horizontal margin, vertical margin, and margin on a\nparticular side of the layer"),
    modal: _reactDesc.PropTypes.bool.description("Whether there should be an overlay preventing interaction underneath \n        the layer.").defaultValue(true),
    onClickOutside: _reactDesc.PropTypes.func.description("Function that will be invoked on modal layers when the user clicks \n      outside the layer."),
    onEsc: _reactDesc.PropTypes.func.description("Function that will be called when the user presses the escape key inside\n       the layer."),
    plain: _reactDesc.PropTypes.bool.description('Whether this is a plain Layer with no background color or border.').defaultValue(false),
    position: _reactDesc.PropTypes.oneOf(['bottom', 'bottom-left', 'bottom-right', 'center', 'end', 'hidden', 'left', 'right', 'start', 'top', 'top-left', 'top-right']).description('Position of the layer content.').defaultValue('center'),
    responsive: _reactDesc.PropTypes.bool.description('Whether the layer should take full width and height on mobile').defaultValue(true),
    target: _reactDesc.PropTypes.object.description("Target where the layer will be aligned to. This should be a React \n      reference.")
  };
  return DocumentedLayer;
};

exports.doc = doc;

var themeDoc = _extends({
  'global.size.xxsmall': {
    description: 'The minimal height of the Layer.',
    type: 'string',
    defaultValue: '48px'
  },
  'layer.background': {
    description: 'The background color of the Layer Container.',
    type: 'string',
    defaultValue: 'white'
  },
  'layer.container.zIndex': {
    description: 'The stack order of Layer Container.',
    type: 'number',
    defaultValue: '20'
  },
  'layer.extend': {
    description: 'Any additional style for Layer.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'layer.overlay.background': {
    description: 'The background of the Layer overlay.',
    type: 'string',
    defaultValue: 'rgba(0, 0, 0, 0.5)'
  },
  'layer.responsiveBreakpoint': {
    description: "The actual breakpoint to trigger changes in the border, \ndirection, gap, margin, pad, and round.",
    type: 'string',
    defaultValue: 'small'
  },
  'layer.zIndex': {
    description: 'The stack order of Layer.',
    type: 'number',
    defaultValue: '20'
  }
}, _themeDocUtils.themeDocUtils.breakpointStyle("The possible breakpoints that could affect border, direction, gap, margin, \n    pad, and round."));

exports.themeDoc = themeDoc;