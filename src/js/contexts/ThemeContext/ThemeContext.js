import React from 'react';
import PropTypes from 'prop-types';
import { base as baseTheme } from '../../themes';
import { deepMerge } from '../../utils';

const ThemeContext = React.createContext(baseTheme);

ThemeContext.Extend = ({ children, value }) => (
  <ThemeContext.Consumer>{theme => <ThemeContext.Provider value={deepMerge(theme, value)}>{children}</ThemeContext.Provider>}</ThemeContext.Consumer>
);

ThemeContext.Extend.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.shape({}).isRequired,
};

export { ThemeContext };
