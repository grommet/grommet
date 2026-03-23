import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { deepMerge } from '../../utils';
import { ThemeContextPropTypes } from './propTypes';

const GrommetThemeContext = React.createContext({});

// Keep styled-components theme propagation while we migrate to Grommet context.
const OriginalProvider = GrommetThemeContext.Provider;
GrommetThemeContext.Provider = ({ value, children }) => (
  <StyledThemeProvider theme={value}>
    <OriginalProvider value={value}>{children}</OriginalProvider>
  </StyledThemeProvider>
);
GrommetThemeContext.Provider.displayName = 'GrommetThemeContext.Provider';

GrommetThemeContext.Extend = ({ children, value }) => (
  <GrommetThemeContext.Consumer>
    {(theme) => (
      <GrommetThemeContext.Provider value={deepMerge(theme, value)}>
        {children}
      </GrommetThemeContext.Provider>
    )}
  </GrommetThemeContext.Consumer>
);

GrommetThemeContext.Extend.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.shape({}).isRequired,
};
GrommetThemeContext.propTypes = ThemeContextPropTypes;

export { GrommetThemeContext as ThemeContext };
export default GrommetThemeContext;
