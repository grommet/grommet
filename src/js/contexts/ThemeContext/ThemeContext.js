// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';

import { deepMerge } from '../../utils';
import { ThemeContextPropTypes } from './propTypes';

ThemeContext.Extend = ({ children, value }) => (
  <ThemeContext.Consumer>
    {(theme) => (
      <ThemeContext.Provider value={deepMerge(theme, value)}>
        {children}
      </ThemeContext.Provider>
    )}
  </ThemeContext.Consumer>
);

ThemeContext.Extend.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.shape({}).isRequired,
};
ThemeContext.propTypes = ThemeContextPropTypes;

export { ThemeContext };
