import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

export const doc = DropButton => {
  const DocumentedDropButton = describe(DropButton)
    .availableAt(getAvailableAtBadge('DropButton'))
    .description(
      `A Button that controls a Drop. When opened, the Drop will contain
      whatever is specified via \`dropContent\`. The Drop will control the focus
      so that the contents behind it are not focusable. All properties and theme properties of
      Button or Drop can be passed through.
      `,
    )
    .usage(
      `import { DropButton } from 'grommet';
<DropButton dropContent={...} />`,
    )
    .intrinsicElement('button');

  DocumentedDropButton.propTypes = {
    ...genericProps,
    disabled: PropTypes.bool
      .description('Whether the button should be disabled.')
      .defaultValue(false),
    dropAlign: PropTypes.shape({
      top: PropTypes.oneOf(['top', 'bottom']),
      bottom: PropTypes.oneOf(['top', 'bottom']),
      right: PropTypes.oneOf(['left', 'right']),
      left: PropTypes.oneOf(['left', 'right']),
    })
      .description('How to align the drop with respect to the button.')
      .defaultValue({
        top: 'top',
        left: 'left',
      }),
    dropContent: PropTypes.element.description(
      'Content to put inside the Drop.',
    ).isRequired,
    dropTarget: PropTypes.object.description(
      `Target where the drop will be aligned to. This should be
      a React reference. Typically, this is not required as the drop will be
      aligned to the DropButton itself by default.`,
    ),
    dropProps: PropTypes.object.description('Any valid Drop prop.'),
    onClose: PropTypes.func.description('Callback for when the drop is closed'),
    onOpen: PropTypes.func.description('Callback for when the drop is opened'),
    open: PropTypes.bool
      .description(
        `Whether the drop should be open or not. Setting this property does not
      influence user interaction after it has been rendered.`,
      )
      .defaultValue(false),
  };

  return DocumentedDropButton;
};
