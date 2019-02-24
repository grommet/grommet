import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Bar } from './Bar';
import { Circle } from './Circle';

const deriveMax = values => {
  let max = 100;
  if (values && values.length > 1) {
    max = 0;
    values.forEach(v => {
      max += v.value;
    });
  }
  return max;
};

class Meter extends Component {
  static defaultProps = {
    background: { color: 'light-2', opacity: 'medium' },
    size: 'medium',
    thickness: 'medium',
    type: 'bar',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { max } = prevState;
    const nextMax = deriveMax(nextProps.values);
    if (!max || nextMax !== max) {
      return { max: nextMax };
    }
    return null;
  }

  state = {};

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

let MeterDoc;
if (process.env.NODE_ENV !== 'production') {
  MeterDoc = require('./doc').doc(Meter); // eslint-disable-line global-require
}
const MeterWrapper = MeterDoc || Meter;

export { MeterWrapper as Meter };

/* PropTypes for UXPin Merge */
Meter.propTypes = {
  a11yTitle: PropTypes.string,
  alignSelf: PropTypes.oneOf(["start", "center", "end", "stretch"]),
  gridArea: PropTypes.string,
  margin: PropTypes.oneOf(["none", "xxsmall", "xsmall", "small", "medium", "large", "xlarge"]),
  background: PropTypes.string,
  round: PropTypes.bool,
  size: PropTypes.oneOf(["xsmall", "small", "medium", "large", "xlarge", "full"]),
  thickness: PropTypes.oneOf(["xsmall", "small", "medium", "large", "xlarge"]),
  type: PropTypes.oneOf(["bar", "circle"]),
  values: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      highlight: PropTypes.bool,
      label: PropTypes.string,
      onClick: PropTypes.func,
      onHover: PropTypes.func,
      value: PropTypes.number,
    }),
  ),
}

/* Export for UXPin Merge */
export default Meter;