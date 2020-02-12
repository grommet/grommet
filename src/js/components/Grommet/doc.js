import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = Grommet => {
  const DocumentedGrommet = describe(Grommet)
    .availableAt(getAvailableAtBadge('Grommet'))
    .description('The top level Grommet container.')
    .usage(
      `import { Grommet } from 'grommet';
<Grommet>...</Grommet>`,
    )
    .intrinsicElement('div');

  DocumentedGrommet.propTypes = {
    background: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        color: PropTypes.string,
        dark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        image: PropTypes.string,
        position: PropTypes.string,
        opacity: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.bool,
          PropTypes.number,
          PropTypes.oneOf(['weak', 'medium', 'strong']),
        ]),
        repeat: PropTypes.oneOfType([
          PropTypes.oneOf(['no-repeat', 'repeat']),
          PropTypes.string,
        ]),
        size: PropTypes.oneOfType([
          PropTypes.oneOf(['cover', 'contain']),
          PropTypes.string,
        ]),
        light: PropTypes.string,
      }),
    ]).description(`Either a color identifier to use for the background
        color. For example: 'neutral-1'. Or, a 'url()' for an image. Dark
        is not needed if color is provided.`),
    dir: PropTypes.oneOf(['rtl']).description(
      'Layout direction for right to left contexts',
    ),
    full: PropTypes.bool
      .description('Whether to take the whole viewport.')
      .defaultValue(false),
    plain: PropTypes.bool
      .description(
        `Whether or not Grommet should apply a global font-family, font-size, 
        and line-height.`,
      )
      .defaultValue(false),
    cssVars: PropTypes.bool
      .description('Whether to expose the css variables.')
      .defaultValue(false),
    theme: PropTypes.object.description(
      'Custom styles for Grommet app component.',
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

  return DocumentedGrommet;
};

export const themeDoc = {
  'grommet.extend': {
    description: 'Any additional style for Grommet.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'global.font.face': {
    description: 'Custom font face declaration',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
};
