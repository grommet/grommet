import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

const PAD_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large'];

export const doc = Layer => {
  const DocumentedLayer = describe(Layer)
    .availableAt(getAvailableAtBadge('Layer'))
    .description(
      `An overlay. Layer is typically modal and anchored to an edge, corner, or
      center of the window. It is the caller's responsibility to provide a
      control for the user to close the layer.`,
    )
    .usage(
      `import { Layer } from 'grommet';
<Layer />`,
    )
    .intrinsicElement('div');

  DocumentedLayer.propTypes = {
    animate: PropTypes.bool
      .description('Animation transition of the Layer content when it opens.')
      .defaultValue(true),
    full: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['vertical', 'horizontal']),
    ])
      .description(
        'Whether the width and/or height should fill the current viewport size.',
      )
      .defaultValue(false),
    margin: PropTypes.oneOfType([
      PropTypes.oneOf(['none', ...PAD_SIZES]),
      PropTypes.shape({
        bottom: PropTypes.oneOfType([
          PropTypes.oneOf(PAD_SIZES),
          PropTypes.string,
        ]),
        horizontal: PropTypes.oneOfType([
          PropTypes.oneOf(PAD_SIZES),
          PropTypes.string,
        ]),
        left: PropTypes.oneOfType([
          PropTypes.oneOf(PAD_SIZES),
          PropTypes.string,
        ]),
        right: PropTypes.oneOfType([
          PropTypes.oneOf(PAD_SIZES),
          PropTypes.string,
        ]),
        top: PropTypes.oneOfType([
          PropTypes.oneOf(PAD_SIZES),
          PropTypes.string,
        ]),
        vertical: PropTypes.oneOfType([
          PropTypes.oneOf(PAD_SIZES),
          PropTypes.string,
        ]),
      }),
      PropTypes.string,
    ]).description(
      `The amount of margin around the Layer. An object can be specified to
distinguish horizontal margin, vertical margin, and margin on a
particular side of the layer`,
    ),
    modal: PropTypes.bool
      .description(
        'Whether there should be an overlay preventing interaction underneath the layer.',
      )
      .defaultValue(true),
    onClickOutside: PropTypes.func.description(
      'Function that will be invoked when the user clicks outside the layer.',
    ),
    onEsc: PropTypes.func.description(
      'Function that will be called when the user presses the escape key inside the layer.',
    ),
    plain: PropTypes.bool
      .description(
        'Whether this is a plain Layer with no background color or border.',
      )
      .defaultValue(false),
    position: PropTypes.oneOf([
      'bottom',
      'bottom-left',
      'bottom-right',
      'center',
      'hidden',
      'left',
      'right',
      'top',
      'top-left',
      'top-right',
    ])
      .description('Position of the layer content.')
      .defaultValue('center'),
    responsive: PropTypes.bool
      .description(
        'Whether the layer should take full width and height on mobile',
      )
      .defaultValue(true),
  };

  return DocumentedLayer;
};

export const themeDoc = {
  'global.breakpoints': {
    description:
      'The possible breakpoints that could affect border, direction, gap, margin, pad, and round.',
    type: 'object',
    defaultValue: `{
      small: {
        value: '768px',
        borderSize: {
          xsmall: '1px',
          small: '2px',
          medium: '4px',
          large: '6px',
          xlarge: '12px',
        },
        edgeSize: {
          none: '0px',
          hair: '1px',
          xxsmall: '2px',
          xsmall: '3px',
          small: '6px',
          medium: '12px',
          large: '24px',
          xlarge: '48px',
        },
        size: {
          xxsmall: '24px',
          xsmall: '48px',
          small: '96px',
          medium: '192px',
          large: '384px',
          xlarge: '768px',
          full: '100%',
        },
      },
      medium: {
        value: '1536px',
      },
      large: {},
      }`,
  },
  'global.size.xxsmall': {
    description: 'The minimal height of the Layer.',
    type: 'string',
    defaultValue: '48px',
  },
  'layer.background': {
    description: 'The background color of the Layer Container.',
    type: 'string',
    defaultValue: 'white',
  },
  'layer.container.zIndex': {
    description: 'The stack order of Layer Container.',
    type: 'number',
    defaultValue: '15',
  },
  'layer.extend': {
    description: 'Any additional style for Layer.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'layer.overlay.background': {
    description: 'The background of the Layer overlay.',
    type: 'string',
    defaultValue: 'rgba(0, 0, 0, 0.5)',
  },
  'layer.responsiveBreakpoint': {
    description:
      'The actual breakpoint to trigger changes in the border, direction, gap, margin, pad, and round.',
    type: 'string',
    defaultValue: 'small',
  },
  'layer.zIndex': {
    description: 'The stack order of Layer.',
    type: 'number',
    defaultValue: '10',
  },
};
