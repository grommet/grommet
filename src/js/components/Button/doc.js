import { schema, PropTypes } from 'react-desc';

import { ROUTER_PROPS } from '../utils';

export function routedButton(RoutedButton) {
  return schema(RoutedButton, {
    description: 'A button with support for React Router.',
    usage: `import { RoutedButton } from 'grommet';
    <RoutedButton primary={true} path="/documentation" />`,
    props: { ...ROUTER_PROPS },
  });
}

export default Button => schema(Button, {
  description: `A button. We have a separate component 
  from the browser base so we can style it.`,
  usage: `import { Button } from 'grommet';
  <Button primary={true} label="Label" />`,
  props: {
    a11yTitle: [
      PropTypes.string,
      'Custom title to be used by screen readers.',
    ],
    accent: [
      PropTypes.bool, 'Whether this is a accent button.',
    ],
    active: [
      PropTypes.bool, 'Whether the button is active.',
    ],
    box: [
      PropTypes.bool,
      `Whether the button should support Box props. 
      This is useful if you want your children to be a 
      flexbox container.`,
    ],
    centered: [
      PropTypes.bool,
      'Whether this is an accent button.',
    ],
    critical: [
      PropTypes.bool,
      'Whether this is an critical button.',
    ],
    fill: [
      PropTypes.bool,
      'Whether the button expands to fill all of the available width and height.',
    ],
    hoverIndicator: [
      PropTypes.oneOfType([
        PropTypes.oneOf(['background']),
        PropTypes.shape({
          background: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string,
          ]),
        }),
      ]),
      `Optional. The hover indicator to apply when the user is mousing over the
      button. An object can be also be specified for color index support:
      {background: 'neutral-2'}. This prop is meant to be used only 
      with plain Buttons.`,
    ],
    href: [
      PropTypes.string, 'If specified, the button will behave like an anchor tag.',
    ],
    icon: [
      PropTypes.element, 'Icon element to place in the button.',
    ],
    label: [
      PropTypes.node, 'Label text to place in the button.',
    ],
    onClick: [
      PropTypes.func,
      `Click handler. Not setting this property and not specifying a href 
      causes the Button to be disabled.`,
    ],
    plain: [
      PropTypes.bool,
      `Whether this is a plain button with no border or padding. 
      Use this when wrapping children that provide the complete visualization
      of the control. Do not use plain with label or icon properties.`,
    ],
    primary: [
      PropTypes.bool,
      `Whether this is a primary button. There should be at most one 
      per page or screen.`,
    ],
    reverse: [
      PropTypes.bool,
      `Whether an icon and label should be reversed so that the icon is at the
      end of the anchor.`,
    ],
    secondary: [
      PropTypes.bool, 'Whether this is a secondary button.',
    ],
    type: [
      PropTypes.oneOf(['button', 'reset', 'submit']),
      `The type of button. Set the type to submit for the default button 
      on forms.`,
      {
        defaultProp: 'button',
      },
    ],
  },
});
