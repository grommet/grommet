import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = (Button) => {
  const DocumentedButton = describe(Button)
    .availableAt(getAvailableAtBadge('Button'))
    .description(
      'A button. We have a separate component from the browser base so we can style it.'
    )
    .usage(
      `import { Button } from 'grommet';
<Button primary={true} label='Label' />`
    );

  DocumentedButton.propTypes = {
    a11yTitle: PropTypes.string.description('Custom title to be used by screen readers.'),
    active: PropTypes.bool.description('Whether the button is active.'),
    color: PropTypes.string.description('Fill color for primary, border color otherwise.'),
    fill: PropTypes.bool.description(
      'Whether the button expands to fill all of the available width and height.'
    ),
    focusIndicator: PropTypes.bool.description(
      'Whether when \'plain\' it should receive a focus outline.'
    ).defaultValue(true),
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
      'Whether this is a plain button with no border or padding.'
    ),
    primary: PropTypes.bool.description(
      'Whether this is a primary button. There should be at most one per page or screen.'
    ),
    reverse: PropTypes.bool.description(
      `Whether an icon and label should be reversed so that the icon is at the
end of the anchor.`
    ),
    type: PropTypes.oneOf(['button', 'reset', 'submit']).description(
      'The type of button. Set the type to submit for the default button on forms.'
    ).defaultValue('button'),
  };

  return DocumentedButton;
};
