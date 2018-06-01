import React from 'react';
import baseTheme from '../themes/vanilla';
import { deepMerge } from '../utils';

const ThemeContext = React.createContext(baseTheme);

ThemeContext.Extend = ({ children, value }) => (
  <ThemeContext.Consumer>
    {theme => (
      <ThemeContext.Provider
        value={deepMerge(theme, value)}
      >
        {children}
      </ThemeContext.Provider>
    )}
  </ThemeContext.Consumer>
);

export default ThemeContext;
