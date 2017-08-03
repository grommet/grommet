import { schema, PropTypes } from 'react-desc';

export default Anchor => schema(Anchor, {
  description: `A text link. We have a separate component from the browser
  base so we can style it. You can either set the icon and/or label properties
  or just use children.`,
  usage: `import Anchor from 'grommet/components/Anchor';
  <Anchor href={location} label="Label" />`,
  props: {
    a11yTitle: [PropTypes.string, 'Accessibility title.'],
    align: [PropTypes.oneOf(['start', 'center', 'end']), 'Text alignment.'],
    animateIcon: [PropTypes.bool, 'Whether to animate the icon on hover.', {
      defaultProp: true,
    }],
    disabled: [PropTypes.bool, 'Whether to disable the anchor.'],
    href: [PropTypes.string, 'Hyperlink reference to place in the anchor. If'
      + ' `path` prop is provided, `href` prop will be ignored.'],
    icon: [PropTypes.element, 'Icon element to place in the anchor.'],
    id: [PropTypes.string, 'Anchor identifier.'],
    label: [PropTypes.node, 'Label text to place in the anchor.'],
    method: [PropTypes.oneOf(['push', 'replace']),
      'Valid only when used with path. Indicates whether the browser history' +
      ' should be appended to or replaced.', {
        defaultProp: 'push',
      },
    ],
    onClick: [PropTypes.func, 'Click handler.'],
    path: [
      PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      `React-router path to navigate to when 
      clicked. Use path={{ path: '/', index: true }} 
      if you want the Anchor to be active only 
        when the index route is current.`,
    ],
    primary: [PropTypes.bool, 'Whether this is a primary anchor.'],
    reverse: [
      PropTypes.bool,
      'Whether an icon and label should be reversed so that the icon is at ' +
      'the end of the anchor.',
    ],
    tag: [PropTypes.string,
      'The DOM tag to use for the element. The default is <a>. This should be' +
      ' used in conjunction with components like Link from React Router. In' +
      ' this case, Link controls the navigation while Anchor controls the' +
      ' styling.', {
        defaultProp: 'a',
      },
    ],
    target: [PropTypes.string, 'Target of the link.'],
  },
});
