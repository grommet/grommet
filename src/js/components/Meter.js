// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Props from '../utils/Props';
import Responsive from '../utils/Responsive';
import Legend from './Legend';
import Bar from './meter/Bar';
import Spiral from './meter/Spiral';
import Circle from './meter/Circle';
import Arc from './meter/Arc';
import Intl from '../utils/Intl';
import CSSClassnames from '../utils/CSSClassnames';

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
    this._layout = this._layout.bind(this);
    this._onResize = this._onResize.bind(this);
    this._onActivate = this._onActivate.bind(this);

    this.state = this._stateFromProps(props);
    if (this.state.placeLegend) {
      this.state.legendPlacement = 'bottom';
    }
    this.state.initial = true;
    this.state.limitMeterSize = false;
  }

  componentDidMount () {
    if (this.props.responsive) {
      this._responsive = Responsive.start(this._onResponsive);
    }

    this._initialTimer = setTimeout(this._initialTimeout, 10);
    window.addEventListener('resize', this._onResize);
    this._onResize();
  }

  componentWillReceiveProps (nextProps) {
    let state = this._stateFromProps(nextProps);
    this.setState(state);
    this._onResize();
  }

  componentWillUnmount () {
    clearTimeout(this._initialTimer);
    clearTimeout(this._resizeTimer);
    window.removeEventListener('resize', this._onResize);

    if (this._responsive) {
      this._responsive.stop();
    }
  }

  _initialTimeout () {
    this.setState({
      initial: false,
      activeIndex: this.state.importantIndex
    });
    clearTimeout(this._initialTimer);
  }

  _onResponsive (small) {
    if (small) {
      this.setState({limitMeterSize: true});
    } else {
      this.setState({limitMeterSize: false});
    }
  }

  _onActivate (index) {
    const { onActive } = this.props;
    const { importantIndex } = this.state;
    if (index === undefined) {
      index = importantIndex;
    }
    this.setState({initial: false, activeIndex: index});
    if (onActive) {
      onActive(index);
    }
  }

  _onResize () {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  }

  _layout () {
    const { placeLegend, legendPlacement } = this.state;
    if (placeLegend) {
      // legendPlacement based on available window orientation
      const ratio = window.innerWidth / window.innerHeight;
      if (ratio < 0.8) {
        this.setState({legendPlacement: 'bottom'});
      } else if (ratio > 1.2) {
        this.setState({legendPlacement: 'right'});
      }
    }

    if ('right' === legendPlacement) {
      if (this.legendRef) {
        const graphicHeight = this.activeGraphicRef.offsetHeight;
        const legendHeight =
          ReactDOM.findDOMNode(this.legendRef).offsetHeight;
        this.setState({tallLegend: (legendHeight > graphicHeight)});
      }
    }
  }

  _normalizeSeries (props, min, max, thresholds) {
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
        thresholds.some(function (threshold) {
          cumulative += threshold.value;
          if (item.value < cumulative) {
            item.colorIndex = threshold.colorIndex || 'graph-1';
            return true;
          }
          return false;
        });
      }
    } else {
      series.forEach(function (item, index) {
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
      let priorValue = min.value;
      thresholds.push({ hidden: true });
      for (let i = 0; i < props.thresholds.length; i += 1) {
        const threshold = props.thresholds[i];
        // The value for the prior threshold ends at the beginning of this
        // threshold. Series drawing code expects the end value.
        thresholds[i].value = threshold.value - priorValue;
        thresholds.push({
          label: threshold.label,
          colorIndex: threshold.colorIndex,
          ariaLabel:
            `${threshold.value} ${props.units || ''} ${threshold.label || ''}`
        });
        priorValue = threshold.value;
        if (i === (props.thresholds.length - 1)) {
          thresholds[thresholds.length-1].value = max.value - priorValue;
        }
      }
    } else if (props.threshold) {
      // let remaining = max.value - props.threshold;
      thresholds = [
        { value: props.threshold, hidden: true },
        {
          value: max.value - props.threshold,
          colorIndex: 'critical',
          ariaLabel: `${props.threshold} ${props.units || ''}`
        }
      ];
    }
    return thresholds;
  }

  _importantIndex (props, series) {
    let result = undefined;
    // removed to ensure important is set solely based on props
    // if (series.length === 1) {
    //   result = 0;
    // }
    if (props.hasOwnProperty('important')) {
      console.warn(
        'Meter: important prop has been deprecated. ' +
        'Use a activeIndex instead.'
      );
      result = props.important;
    }
    series.some(function (data, index) {
      if (data.important) {
        console.warn(
          'Meter: seriesp[].important has been deprecated. ' +
          'Use a activeIndex instead.'
        );
        result = index;
        return true;
      }
      return false;
    });
    return result;
  }

  // Normalize min or max to an object.
  _terminal (terminal) {
    if (typeof terminal === 'number') {
      terminal = {value: terminal};
    }
    return terminal;
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
    series.some(function (item) {
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
    const min = this._terminal(props.min || 0);
    // Max could be provided in props or come from the total of
    // a multi-value series.
    const max = this._terminal(props.max ||
      (props.stacked ? Math.max(seriesMax, total || 0, 100) :
        (seriesMax || Math.max(total || 0, 100))));
    // Normalize simple threshold prop to an array, if needed.
    const thresholds = this._normalizeThresholds(props, min, max);
    // Normalize simple value prop to a series, if needed.
    const series = this._normalizeSeries(props, min, max, thresholds);
    // Determine important index.
    const importantIndex = this._importantIndex(props, series);

    let state = {
      importantIndex: importantIndex,
      // we should preserve activeIndex across property updates
      // activeIndex: importantIndex,
      series: series,
      thresholds: thresholds,
      min: min,
      max: max,
      total: total
    };

    if (props.hasOwnProperty('activeIndex')) {
      state.activeIndex = props.activeIndex;
    } else if (props.hasOwnProperty('active')) {
      state.activeIndex = props.active ? 0 : undefined;
    }

    // legend
    state.placeLegend = ! (props.legend && props.legend.placement);
    if (! state.placeLegend) {
      state.legendPlacement = props.legend.placement;
    }

    return state;
  }

  _getActiveFields () {
    const { activeIndex, total, series } = this.state;
    let fields;
    if (undefined === activeIndex) {
      fields = {
        value: total
      };
      if (series.length > 1) {
        fields.label = Intl.getMessage(this.context.intl, 'Total');
      }
    } else {
      let active = series[activeIndex];
      if (!active) {
        active = series[0];
      }
      if (active.label) {
        console.warn(
          'Meter: series[].label has been deprecated. ' +
          'Use a separate Label instead.'
        );
      }
      fields = {
        value: active.value,
        label: active.label,
        onClick: active.onClick
      };
    }
    return fields;
  }

  _renderActiveValue () {
    let fields = this._getActiveFields();
    let classes = [`${CLASS_ROOT}__value`];
    if (fields.onClick) {
      classes.push(`${CLASS_ROOT}__value--active`);
    }
    let units;
    if (this.props.units) {
      console.warn(
        'Meter: units prop has been deprecated. ' +
        'Use a separate Label instead.'
      );
      units = (
        <span className={`${CLASS_ROOT}__value-units large-number-font`}>
          {this.props.units}
        </span>
      );
    }

    return (
      <div aria-hidden="true" role="presentation"
        className={classes.join(' ')} onClick={fields.onClick}>
        <span
          className={`${CLASS_ROOT}__value-value large-number-font`}>
          {fields.value}
          {units}
        </span>
        <span className={`${CLASS_ROOT}__value-label`}>
          {fields.label}
        </span>
      </div>
    );
  }

  _renderMinMax (classes) {
    const { min, max } = this.state;
    let minLabel;
    if (min.label) {
      console.warn(
        'Meter: min.label has been deprecated. ' +
        'Use a separate Label instead.'
      );
      minLabel = (
        <div className={`${CLASS_ROOT}__minmax-min`}>
          {min.label}
        </div>
      );
    }
    let maxLabel;
    if (max.label) {
      console.warn(
        'Meter: max.label has been deprecated. ' +
        'Use a separate Label instead.'
      );
      maxLabel = (
        <div className={`${CLASS_ROOT}__minmax-max`}>
          {max.label}
        </div>
      );
    }
    let minMax;
    if (minLabel || maxLabel) {
      minMax = (
        <div className={`${CLASS_ROOT}__minmax-container`}>
          <div className={`${CLASS_ROOT}__minmax`}>
            {minLabel}
            {maxLabel}
          </div>
        </div>
      );
      classes.push(`${CLASS_ROOT}--minmax`);
    }
    return minMax;
  }

  _renderLegend () {
    const { legend, units } = this.props;
    const { activeIndex, series } = this.state;
    const total = (typeof legend === 'object' && legend.total);
    return (
      <Legend ref={ref => this.legendRef = ref}
        className={`${CLASS_ROOT}__legend`}
        series={series} units={units} total={total}
        activeIndex={activeIndex} onActive={this._onActivate} />
    );
  }

  render () {
    const {
      active, label, legend, size, stacked, tabIndex, type, vertical
    } = this.props;
    const { legendPlacement, limitMeterSize, tallLegend, series } = this.state;
    let classes = [CLASS_ROOT];
    classes.push(`${CLASS_ROOT}--${type}`);
    if (vertical) {
      classes.push(`${CLASS_ROOT}--vertical`);
    }
    if (stacked) {
      classes.push(`${CLASS_ROOT}--stacked`);
    }
    if (size) {
      let responsiveSize = size;
      // shrink Meter to medium size if large and up
      if (limitMeterSize && (size === 'large' || size === 'xlarge')) {
        responsiveSize = 'medium';
      }
      classes.push(`${CLASS_ROOT}--${responsiveSize}`);
    }
    if (series.length === 0) {
      classes.push(`${CLASS_ROOT}--loading`);
    } else if (series.length === 1) {
      classes.push(`${CLASS_ROOT}--single`);
    } else {
      classes.push(`${CLASS_ROOT}--count-${series.length}`);
    }
    if (active) {
      classes.push(`${CLASS_ROOT}--active`);
    }
    if (tallLegend) {
      classes.push(`${CLASS_ROOT}--tall-legend`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    const restProps = Props.omit(this.props, Object.keys(Meter.propTypes));

    let minMax = this._renderMinMax(classes);
    let labelElement;
    if (label && true !== label) {
      labelElement = (
        <div className={`${CLASS_ROOT}__label`}>
          {label}
        </div>
      );
    } else if (label && series.length > 0) {
      labelElement = this._renderActiveValue();
    }
    let legendElement;

    if (legend || series) {

      if (legend) {
        console.warn(
          'Meter: legend prop has been deprecated. ' +
          'Use a separate Legend instead.'
        );
        if ('inline' !== legend.placement) {
          legendElement = this._renderLegend();
        } else {
          // Hide value (displaying total), if legend is inline
          // and total is set to false
          if (!(legend.total) && true === label) {
            labelElement = undefined;
          }
        }
        classes.push(`${CLASS_ROOT}--legend-${legendPlacement}`);
        if (legend.align) {
          classes.push(`${CLASS_ROOT}--legend-align-${legend.align}`);
        }
      }
    }

    let GraphicComponent = TYPE_COMPONENT[this.props.type];
    let graphic = (
      <GraphicComponent
        a11yTitle={this.props.a11yTitle}
        activeIndex={this.state.activeIndex}
        min={this.state.min} max={this.state.max}
        legend={legend}
        onActivate={this._onActivate}
        series={series}
        stacked={stacked}
        tabIndex={tabIndex}
        thresholds={this.state.thresholds}
        total={this.state.total}
        units={this.props.units}
        vertical={vertical} />
    );

    const graphicContainer = (
      <div {...restProps} className={`${CLASS_ROOT}__graphic-container`}>
        {graphic}
        {minMax}
      </div>
    );

    return (
      <div className={classes.join(' ')}>
        <div ref={ref => this.activeGraphicRef = ref}
          className={`${CLASS_ROOT}__value-container`}>
          {graphicContainer}
          {labelElement}
        </div>
        {legendElement}
      </div>
    );
  }

}

Meter.propTypes = {
  active: PropTypes.bool, // when single value
  activeIndex: PropTypes.number, // for series values
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  important: PropTypes.number, // remove in 1.0, use activeIndex
  label: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    // remove PropTypes.bool in 1.0
  legend: PropTypes.oneOfType([ // remove in 1.0
    PropTypes.bool,
    PropTypes.shape({
      align: PropTypes.oneOf(['start', 'center', 'end']),
      placement: PropTypes.oneOf(['right', 'bottom', 'inline']),
      total: PropTypes.bool
    })
  ]),
  max: PropTypes.oneOfType([
    PropTypes.shape({ // remove in 1.0
      value: PropTypes.number.isRequired,
      label: PropTypes.string
    }),
    PropTypes.number
  ]),
  min: PropTypes.oneOfType([
    PropTypes.shape({ // remove in 1.0
      value: PropTypes.number.isRequired,
      label: PropTypes.string
    }),
    PropTypes.number
  ]),
  onActive: PropTypes.func,
  series: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string, // remove in 1.0
    value: PropTypes.number.isRequired,
    colorIndex: PropTypes.string,
    important: PropTypes.bool, // remove in 1.0, use activeIndex
    onClick: PropTypes.func
  })),
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
  stacked: PropTypes.bool,
  tabIndex: PropTypes.string,
  threshold: PropTypes.number,
  thresholds: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string, // remove in 1.0?
    value: PropTypes.number.isRequired,
    colorIndex: PropTypes.string
  })),
  type: PropTypes.oneOf(['bar', 'arc', 'circle', 'spiral']),
  units: PropTypes.string, // remove in 1.0, have caller use label
  value: PropTypes.number,
  vertical: PropTypes.bool,
  responsive: PropTypes.bool
};

Meter.defaultProps = {
  label: true,
  type: 'bar'
};

Meter.contextTypes = {
  intl: PropTypes.object
};
