import { describe, PropTypes } from 'react-desc';
import { backgroundDoc, getAvailableAtBadge } from '../../utils';
export var doc = function doc(Grommet) {
  var DocumentedGrommet = describe(Grommet).availableAt(getAvailableAtBadge('Grommet')).description('The top level Grommet container.').usage("import { Grommet } from 'grommet';\n<Grommet>...</Grommet>").intrinsicElement('div');
  DocumentedGrommet.propTypes = {
    background: backgroundDoc,
    dir: PropTypes.oneOf(['rtl']).description('Layout direction for right to left contexts'),
    full: PropTypes.bool.description('Whether to take the whole viewport.').defaultValue(false),
    plain: PropTypes.bool.description("Whether or not Grommet should apply a global font-family, font-size,\n        and line-height.").defaultValue(false),
    cssVars: PropTypes.bool.description('Whether to expose the css variables.').defaultValue(false),
    theme: PropTypes.object.description('Custom styles for Grommet app component.'),
    themeMode: PropTypes.oneOf(['dark', 'light']).description("Dark vs. light theme variation. Default is unspecified and left to\n      theme."),
    userAgent: PropTypes.string.description("User agent used to detect the device width for setting the initial\n      breakpoint."),
    containerTarget: PropTypes.object.description("The node where Drop and Layer containers are inserted. Defaults to\n      document.body which is almost always the right choice. This is used\n      for less common cases like rendering within an internal node (e.g.\n      shadow root).")
  };
  return DocumentedGrommet;
};
export var themeDoc = {
  'grommet.extend': {
    description: 'Any additional style for Grommet.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'global.font.face': {
    description: 'Custom font face declaration',
    type: 'string | (props) => {}',
    defaultValue: undefined
  }
};