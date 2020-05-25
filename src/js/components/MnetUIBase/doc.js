import { describe, PropTypes } from 'react-desc';

import { backgroundDoc, getAvailableAtBadge } from '../../utils';

export const doc = MnetUIBase => {
  const DocumentedMnetUIBase = describe(MnetUIBase)
    .availableAt(getAvailableAtBadge('MnetUIBase'))
    .description('The top level MnetUIBase container.')
    .usage(
      `import { MnetUIBase } from 'mnet-ui-base';
<MnetUIBase>...</MnetUIBase>`,
    )
    .intrinsicElement('div');

  DocumentedMnetUIBase.propTypes = {
    background: backgroundDoc,
    dir: PropTypes.oneOf(['rtl']).description(
      'Layout direction for right to left contexts',
    ),
    full: PropTypes.bool
      .description('Whether to take the whole viewport.')
      .defaultValue(false),
    plain: PropTypes.bool
      .description(
        `Whether or not MnetUIBase should apply a global font-family, font-size,
        and line-height.`,
      )
      .defaultValue(false),
    cssVars: PropTypes.bool
      .description('Whether to expose the css variables.')
      .defaultValue(false),
    theme: PropTypes.object.description(
      'Custom styles for MnetUIBase app component.',
    ),
    themeMode: PropTypes.oneOf(['dark', 'light']).description(
      `Dark vs. light theme variation. Default is unspecified and left to
      theme.`,
    ),
    userAgent: PropTypes.string.description(
      `User agent used to detect the device width for setting the initial
      breakpoint.`,
    ),
  };

  return DocumentedMnetUIBase;
};

export const themeDoc = {
  'mnet.extend': {
    description: 'Any additional style for MnetUIBase.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'global.font.face': {
    description: 'Custom font face declaration',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
};
