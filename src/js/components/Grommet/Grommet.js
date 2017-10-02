import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StyledGrommet from './StyledGrommet';

import doc from './doc';

import baseTheme from '../../themes/vanilla';
import { deepMerge } from '../../utils';

class Grommet extends Component {
  static childContextTypes = {
    grommet: PropTypes.object,
    theme: PropTypes.object,
  }

  static defaultProps = {
    centered: true,
    theme: undefined,
  }

  getChildContext() {
    const { theme } = this.props;

    return {
      grommet: {},
      theme: deepMerge(baseTheme, theme),
    };
  }

  render() {
    const {
      children,
      theme,
      ...rest
    } = this.props;

    return (
      <StyledGrommet {...rest} theme={deepMerge(baseTheme, theme)}>
        {children}
      </StyledGrommet>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Grommet);
}

export default Grommet;
