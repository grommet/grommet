import React, { Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import Bar from './Bar';
import Circle from './Circle';
import doc from './doc';

class Meter extends Component {
  static defaultProps = {
    background: { color: 'light-1', opacity: 'medium' },
    size: 'medium',
    thickness: 'medium',
    type: 'bar',
  };

  state = {}

  componentWillMount() {
    this.deriveMax(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.deriveMax(nextProps);
  }

  deriveMax = (props) => {
    let max = 100;
    if (props.values && props.values.length > 1) {
      max = 0;
      props.values.forEach((v) => { max += v.value; });
    }
    this.setState({ max });
  }

  render() {
    const { type, ...rest } = this.props;
    const { max } = this.state;

    let content;
    if (type === 'bar') {
      content = <Bar max={max} {...rest} />;
    } else if (type === 'circle') {
      content = <Circle max={max} {...rest} />;
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
