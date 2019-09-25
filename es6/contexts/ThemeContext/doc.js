import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge } from '../../utils';
export var doc = function doc(ThemeContext) {
  var DocumentedThemeContext = describe(ThemeContext).availableAt(getAvailableAtBadge('ThemeContext')).description('A means of tweaking the theme for contained components.').usage("import { ThemeContext } from 'grommet';\n" + '<ThemeContext.Extend value={value} />');
  DocumentedThemeContext.propTypes = {
    value: PropTypes.shape({}).description('Sparse theme object that will be merged with the current theme.')
  };
  return DocumentedThemeContext;
};