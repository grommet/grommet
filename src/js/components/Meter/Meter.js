import React, { Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import Bar from './Bar';
import Circle from './Circle';
import doc from './doc';

class Meter extends Component {
  static defaultProps = {
    background: 'light-1',
    size: 'medium',
    thickness: 'medium',
    type: 'bar',
  };

  render() {
    const { type, ...rest } = this.props;

    let content;
    if (type === 'bar') {
      content = <Bar {...rest} />;
    } else if (type === 'circle') {
      content = <Circle {...rest} />;
    }

    return content;
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Meter);
}

export default compose(
  withTheme,
)(Meter);
