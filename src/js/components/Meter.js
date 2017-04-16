import PropTypes from 'prop-types';
// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import classnames from 'classnames';
import Responsive from '../utils/Responsive';
import CSSClassnames from '../utils/CSSClassnames';
import Bar from './meter/Bar';
import Spiral from './meter/Spiral';
import Circle from './meter/Circle';
import Arc from './meter/Arc';

const CLASS_ROOT = CSSClassnames.METER;

const TYPE_COMPONENT = {
  'bar': Bar,
  'circle': Circle,
  'arc': Arc,
  'spiral': Spiral
};

function getMaxDecimalDigits (series) {
  let maxDigits = 0;
  series.forEach((item) => {
    const currentDigitsGroup = /\.(\d*)$/.exec(item.value.toString());
    if (currentDigitsGroup) {
      const currentDigits = currentDigitsGroup[1].length;
      maxDigits = Math.max(maxDigits, currentDigits);
    }
  });
  return Math.pow(10, maxDigits);
}

export default class Meter extends Component {

  constructor(props, context) {
    super(props, context);

    this._onResponsive = this._onResponsive.bind(this);
    this._initialTimeout = this._initialTimeout.bind(this);
    this._onActivate = this._onActivate.bind(this);

    this.state = this._stateFromProps(props);
    this.state.initial = true;
    this.state.limitMeterSize = false;
  }

  componentDidMount () {
    if (this.props.responsive) {
      this._responsive = Responsive.start(this._onResponsive);
    }

    this._initialTimer = setTimeout(this._initialTimeout, 10);
  }

  componentWillReceiveProps (nextProps) {
    let state = this._stateFromProps(nextProps);
    this.setState({ ...state });
  }

  componentWillUnmount () {
    clearTimeout(this._initialTimer);

    if (this._responsive) {
      this._responsive.stop();
    }
  }

  _normalizeSeries (props, thresholds) {
    let series = [];
    if (props.series) {
      series = props.series;
    } else if (props.value || props.value === 0) {
      series = [
        {value: props.value}
      ];
      if (props.colorIndex) {
        series[0].colorIndex = props.colorIndex;
      }
    }

    // set color index
    if (series.length === 1 && props.thresholds) {
      const item = series[0];
      if (! item.colorIndex) {
        // see which threshold color index to use
        let cumulative = 0;
        thresholds.some(threshold => {
          cumulative += threshold.value;
          if (item.value < cumulative) {
            item.colorIndex = threshold.colorIndex || 'graph-1';
            return true;
          }
          return false;
        });
      }
    } else {
      series.forEach((item, index) => {
        if (! item.colorIndex) {
          item.colorIndex = `graph-${index + 1}`;
        }
      });
    }

    return series;
  }

  _normalizeThresholds (props, min, max) {
    let thresholds = [];
    if (props.thresholds) {
      // Convert thresholds from absolute values to cummulative,
      // so we can re-use the series drawing code.
      let priorValue = min;
      thresholds.push({ hidden: true });
      for (let i = 0; i < props.thresholds.length; i += 1) {
        const threshold = props.thresholds[i];
        // The value for the prior threshold ends at the beginning of this
        // threshold. Series drawing code expects the end value.
        thresholds[i].value = threshold.value - priorValue;
        thresholds.push({
          colorIndex: threshold.colorIndex
        });
        priorValue = threshold.value;
        if (i === (props.thresholds.length - 1)) {
          thresholds[thresholds.length-1].value = max - priorValue;
        }
      }
    } else if (props.threshold) {
      thresholds = [
        { value: props.threshold, hidden: true },
        {
          value: max - props.threshold,
          colorIndex: 'critical'
        }
      ];
    }
    return thresholds;
  }

  _seriesTotal (series) {
    const maxDecimalDigits = getMaxDecimalDigits(series);
    let total = 0;
    series.forEach((item) => {
      total += item.value * maxDecimalDigits;
    });

    return total / maxDecimalDigits;
  }

  _seriesMax (series) {
    let max = 0;
    series.some(item => {
      max = Math.max(max, item.value);
    });
    return max;
  }

  // Generates state based on the provided props.
  _stateFromProps (props) {
    let total;
    if (props.series) {
      total = this._seriesTotal(props.series);
    } else if (props.hasOwnProperty('value')) {
      total = props.value;
    } else {
      total = 0;
    }
    let seriesMax;
    // only care about series max when there are multiple values
    if (props.series && props.series.length > 1) {
      seriesMax = this._seriesMax(props.series);
    }
    // Normalize min and max
    const min = (props.min || 0);
    // Max could be provided in props or come from the total of
    // a multi-value series.
    const max = (props.max ||
      (props.stacked ? Math.max(seriesMax, total || 0, 100) :
        (seriesMax || Math.max(total || 0, 100))));
    // Normalize simple threshold prop to an array, if needed.
    const thresholds = this._normalizeThresholds(props, min, max);
    // Normalize simple value prop to a series, if needed.
    const series = this._normalizeSeries(props, thresholds);

    let nextState = {
      series: series,
      thresholds: thresholds,
      min: min,
      max: max,
      total: total
    };

    if (props.hasOwnProperty('activeIndex')) {
      nextState.activeIndex = props.activeIndex;
    } else if (props.hasOwnProperty('active')) {
      nextState.activeIndex = props.active ? 0 : undefined;
    }

    return nextState;
  }

  _initialTimeout () {
    this.setState({
      initial: false,
      activeIndex: this.state.activeIndex
    });
    clearTimeout(this._initialTimer);
  }

  _onResponsive (small) {
    this.setState({ limitMeterSize: small ? true : false });
  }

  _onActivate (index) {
    const { onActive } = this.props;
    this.setState({ initial: false, activeIndex: index });
    if (onActive) {
      onActive(index);
    }
  }

  render () {
    const {
      active, a11yTitle, className, label, onActive, size, stacked,
      tabIndex, type, vertical, ...props
    } = this.props;
    delete props.activeIndex;
    delete props.colorIndex;
    delete props.max;
    delete props.min;
    delete props.series;
    delete props.threshold;
    delete props.thresholds;
    delete props.value;
    delete props.responsive;
    const {
      activeIndex, limitMeterSize, max, min, series, thresholds, total
    } = this.state;

    let responsiveSize;
    if (size) {
      responsiveSize = size;
      // shrink Meter to medium size if large and up
      if (limitMeterSize && (size === 'large' || size === 'xlarge')) {
        responsiveSize = 'medium';
      }
    }

    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--${type}`]: type,
        [`${CLASS_ROOT}--stacked`]: stacked,
        [`${CLASS_ROOT}--vertical`]: vertical,
        [`${CLASS_ROOT}--loading`]: series.length === 0,
        [`${CLASS_ROOT}--single`]: series.length === 1,
        [`${CLASS_ROOT}--count-${series.length}`]: series.length > 1,
        [`${CLASS_ROOT}--${responsiveSize}`]: responsiveSize,
        [`${CLASS_ROOT}--active`]: active
      },
      className
    );


    let labelElement;
    if (label) {
      labelElement = <div className={`${CLASS_ROOT}__label`}>{label}</div>;
    }

    let onActivate;
    if (onActive || series.length > 1 ||
      (series.length === 1 && series[0].onClick)) {
      onActivate = this._onActivate;
    }

    let GraphicComponent = TYPE_COMPONENT[this.props.type];
    let graphic = (
      <GraphicComponent
        a11yTitle={a11yTitle}
        activeIndex={activeIndex}
        min={min} max={max}
        onActivate={onActivate}
        series={series}
        stacked={stacked}
        tabIndex={tabIndex}
        thresholds={thresholds}
        total={total}
        vertical={vertical} />
    );

    const graphicContainer = (
      <div {...props} className={`${CLASS_ROOT}__graphic-container`}>
        {graphic}
      </div>
    );

    return (
      <div className={classes}>
        <div ref={ref => this.activeGraphicRef = ref}
          className={`${CLASS_ROOT}__value-container`}>
          {graphicContainer}
          {labelElement}
        </div>
      </div>
    );
  }

}

Meter.propTypes = {
  active: PropTypes.bool, // when single value
  activeIndex: PropTypes.number, // for series values
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  label: PropTypes.node,
  max: PropTypes.number,
  min: PropTypes.number,
  onActive: PropTypes.func,
  series: PropTypes.arrayOf(PropTypes.shape({
    colorIndex: PropTypes.string,
    onClick: PropTypes.func,
    label: PropTypes.string, // only for Spiral
    value: PropTypes.number.isRequired
  })),
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
  stacked: PropTypes.bool,
  tabIndex: PropTypes.string,
  threshold: PropTypes.number,
  thresholds: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    colorIndex: PropTypes.string
  })),
  type: PropTypes.oneOf(['bar', 'arc', 'circle', 'spiral']),
  value: PropTypes.number,
  vertical: PropTypes.bool,
  responsive: PropTypes.bool
};

Meter.defaultProps = {
  type: 'bar'
};

Meter.contextTypes = {
  intl: PropTypes.object
};
