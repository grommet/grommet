function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps, getAvailableAtBadge } from '../../utils';
export var doc = function doc(Anchor) {
  var DocumentedAnchor = describe(Anchor).availableAt(getAvailableAtBadge('Anchor')).description('A text link.').details("We have a separate component from the browser\nbase so we can style it. You can either set the icon and/or label properties\nor just use children.").usage("import { Anchor } from 'grommet';\n<Anchor href={location} label='Label' />");
  DocumentedAnchor.propTypes = _extends({}, genericProps, {
    a11yTitle: PropTypes.string.description('Custom title to be used by screen readers.'),
    color: PropTypes.string.description('Label color and icon color, if not specified on the icon.'),
    href: PropTypes.string.description('Hyperlink reference to place in the anchor.'),
    icon: PropTypes.element.description('Icon element to place in the anchor.'),
    label: PropTypes.node.description('Label text to place in the anchor.'),
    onClick: PropTypes.func.description("Click handler. It can be used, for example, \n        to add analytics and track who clicked in the anchor."),
    reverse: PropTypes.bool.description("Whether an icon and label should be reversed so that the\n        icon is at the end of the anchor.").defaultValue(false),
    size: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']), PropTypes.string]).description("The font size is typically driven by the components containing\nthis component. But, it can be adjusted directly via this size property, typically\nwhen it is not contained in a 'Heading', 'Paragraph', or 'Text'.")
  });
  return DocumentedAnchor;
};
export var themeDoc = {
  'global.focus.border.color': {
    description: 'The color around the Anchor when in focus.',
    type: 'string | { dark: string, light: string }',
    defaultValue: 'focus'
  },
  'anchor.color': {
    description: 'The color of the label text and icon strokes.',
    type: 'string | { dark: string, light: string }',
    defaultValue: "{ light: '#1D67E3', dark: '#6194EB' }"
  },
  'anchor.fontWeight': {
    description: 'The font weight of the label.',
    type: 'number',
    defaultValue: 600
  },
  'anchor.textDecoration': {
    description: 'The text decoration of the label. Refer to [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) for possible values.',
    type: 'string',
    defaultValue: 'none'
  },
  'anchor.hover.fontWeight': {
    description: 'The font weight of the label when hovering.',
    type: 'number',
    defaultValue: undefined
  },
  'anchor.hover.textDecoration': {
    description: 'The text decoration of the label when hovering. Refer to [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) for possible values.',
    type: 'string',
    defaultValue: 'underline'
  },
  'anchor.hover.extend': {
    description: 'Any additional style for the Anchor when hovering.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'anchor.extend': {
    description: 'Any additional style for the Anchor.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  }
};