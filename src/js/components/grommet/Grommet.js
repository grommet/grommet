import React, { Component } from 'react';
import PropTypes from 'prop-types';
import deepAssign from 'deep-assign';

import StyledGrommet from './StyledGrommet';

import baseTheme from '../../theme';

import doc from './doc';

class Grommet extends Component {
  static childContextTypes = {
    theme: PropTypes.object,
  }
  static defaultProps = {
    centered: true,
    theme: undefined,
  }
  getChildContext() {
    const { theme } = this.props;

    const globalTheme = JSON.parse(JSON.stringify(baseTheme));
    return {
      theme: deepAssign(globalTheme, theme),
    };
  }
  render() {
    const {
      children,
      theme,
      ...rest
    } = this.props;

    const globalTheme = JSON.parse(JSON.stringify(baseTheme));
    return (
      <StyledGrommet {...rest} theme={deepAssign(globalTheme, theme)}>
        {children}
      </StyledGrommet>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Grommet);
}

export default Grommet;
