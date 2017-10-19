import { describe, PropTypes } from 'react-desc';

import { ROUTER_PROPS } from '../utils';

export function routedButton(RoutedButton) {
  const DocumentedRoutedButton = describe(RoutedButton)
    .description('A button with support for React Router.')
    .usage(
      `import { RoutedButton } from 'grommet';
      <RoutedButton primary={true} path="/documentation" />`
    );
  DocumentedRoutedButton.propTypes = { ...ROUTER_PROPS };
  return DocumentedRoutedButton;
}

export default (Button) => {
  const DocumentedButton = describe(Button)
    .description(
      `A button. We have a separate component
      from the browser base so we can style it.`
    )
    .usage(
      `import { Button } from 'grommet';
      <Button primary={true} label="Label" />`
    );

  DocumentedButton.propTypes = {
    a11yTitle: PropTypes.string.description('Custom title to be used by screen readers.'),
    accent: PropTypes.bool.description('Whether this is a accent button.'),
    active: PropTypes.bool.description('Whether the button is active.'),
    critical: PropTypes.bool.description('Whether this is an critical button.'),
    fill: PropTypes.bool.description(
      'Whether the button expands to fill all of the available width and height.'
    ),
    hoverIndicator: PropTypes.oneOfType([
      PropTypes.oneOf(['background']),
      PropTypes.shape({
        background: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.string,
        ]),
      }),
    ]).description(
      `The hover indicator to apply when the user is mousing over the
      button. An object can be also be specified for color index support:
      {background: 'neutral-2'}. This prop is meant to be used only
      with plain Buttons.`,
    ),
    href: PropTypes.string.description(
      'If specified, the button will behave like an anchor tag.'
    ),
    icon: PropTypes.element.description('Icon element to place in the button.'),
    label: PropTypes.node.description('Label text to place in the button.'),
    onClick: PropTypes.func.description(
      `Click handler. Not setting this property and not specifying a href
      causes the Button to be disabled.`
    ),
    plain: PropTypes.bool.description(
      `Whether this is a plain button with no border or padding.
      Use this when wrapping children that provide the complete visualization
      of the control. Do not use plain with label or icon properties.`
    ),
    primary: PropTypes.bool.description(
      `Whether this is a primary button. There should be at most one
      per page or screen.`
    ),
    reverse: PropTypes.bool.description(
      `Whether an icon and label should be reversed so that the icon is at the
      end of the anchor.`
    ),
    secondary: PropTypes.bool.description('Whether this is a secondary button.'),
    type: PropTypes.oneOf(['button', 'reset', 'submit']).description(
      `The type of button. Set the type to submit for the default button
      on forms.`
    ).defaultValue('button'),
  };

  return DocumentedButton;
};
