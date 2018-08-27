import React from 'react';
import { base as baseTheme } from '../../themes';
import { deepMerge } from '../../utils';

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

export { ThemeContext };
