import { describe, PropTypes } from 'react-desc';

import {
  colorPropType,
  genericProps,
  getAvailableAtBadge,
  themeDocUtils,
} from '../../utils';

export const doc = Link => {
  const DocumentedLink = describe(Link)
    .availableAt(getAvailableAtBadge('Link'))
    .description('A text link.')
    .details(
      `We have a separate component from the browser
base so we can style it. You can either set the icon and/or label properties
or just use children.`,
    )
    .usage(
      "import { Link } from 'grommet';\n<Link href={location} label='Label' />",
    )
    .intrinsicElement('a');

  DocumentedLink.propTypes = {
    ...genericProps,
    a11yTitle: PropTypes.string.description(
      'Custom title to be used by screen readers.',
    ),
    color: colorPropType.description(
      'Label color and icon color, if not specified on the icon.',
    ),
    disabled: PropTypes.bool
      .description('Whether the link is disabled.')
      .defaultValue(false),
    href: PropTypes.string.description(
      'Hyperlink reference to place in the link.',
    ),
    icon: PropTypes.element.description('Icon element to place in the link.'),
    label: PropTypes.node.description('Label text to place in the link.'),
    onClick: PropTypes.func.description(
      `Click handler. It can be used, for example,
        to add analytics and track who clicked in the link.`,
    ),
    reverse: PropTypes.bool
      .description(
        `Whether an icon and label should be reversed so that the
        icon is at the end of the link.`,
      )
      .defaultValue(false),
    size: PropTypes.oneOfType([
      PropTypes.oneOf([
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        'xxlarge',
      ]),
      PropTypes.string,
    ]).description(
      `The font size is typically driven by the components containing
this component. But, it can be adjusted directly via this size property,
typically when it is not contained in a 'Heading', 'Paragraph', or 'Text'.`,
    ),
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).description(
      `The DOM tag or react component to use for the element.`,
    ),
  };

  return DocumentedLink;
};

export const themeDoc = {
  'link.color': {
    description: 'The color of the label text and icon strokes.',
    type: 'string | { dark: string, light: string }',
    defaultValue: "{ light: '#1D67E3', dark: '#6194EB' }",
  },
  'link.fontWeight': {
    description: 'The font weight of the label.',
    type: 'number',
    defaultValue: 600,
  },
  'link.textDecoration': {
    description:
      'The text decoration of the label. Refer to [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) for possible values.',
    type: 'string',
    defaultValue: 'none',
  },
  'link.hover.fontWeight': {
    description: 'The font weight of the label when hovering.',
    type: 'number',
    defaultValue: undefined,
  },
  'link.hover.textDecoration': {
    description:
      'The text decoration of the label when hovering. Refer to [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) for possible values.',
    type: 'string',
    defaultValue: 'underline',
  },
  'link.hover.extend': {
    description: 'Any additional style for the link when hovering.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'link.extend': {
    description: 'Any additional style for the link.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'text.medium.size': {
    description: 'The font size of the text label.',
    type: 'string',
    defaultValue: '18px',
  },
  'text.medium.height': {
    description: 'The line height of the text label.',
    type: 'string',
    defaultValue: '24px',
  },
  ...themeDocUtils.focusStyle,
  ...themeDocUtils.edgeStyle('The possible sizes for margin.'),
};
