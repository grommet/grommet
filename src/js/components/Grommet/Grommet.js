import React, { Component } from 'react';
import PropTypes from 'prop-types';
import deepAssign from 'deep-assign';
import cloneDeep from 'clone-deep';

import StyledGrommet from './StyledGrommet';

import baseTheme from '../../themes/vanilla';

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

    const globalTheme = cloneDeep(baseTheme);

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

    const globalTheme = cloneDeep(baseTheme);
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
