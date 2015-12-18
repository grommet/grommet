// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Legend from './Legend';
import Bar from './meter/Bar';
import Spiral from './meter/Spiral';
import Circle from './meter/Circle';
import Arc from './meter/Arc';

const CLASS_ROOT = "meter";

const TYPE_COMPONENT = {
  'bar': Bar,
  'circle': Circle,
  'arc': Arc,
  'spiral': Spiral
};

class Meter extends Component {

  constructor(props) {
    super();

    this._initialTimeout = this._initialTimeout.bind(this);
    this._layout = this._layout.bind(this);
    this._onResize = this._onResize.bind(this);
    this._onActivate = this._onActivate.bind(this);

    this.state = this._stateFromProps(props);
    if (this.state.placeLegend) {
      this.state.legendPlacement = 'bottom';
    }
    this.state.initial = true;
  }

  componentDidMount () {
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
  }

  _initialTimeout () {
    this.setState({
      initial: false,
      activeIndex: this.state.importantIndex
    });
    clearTimeout(this._initialTimer);
  }

  _onActivate (index) {
    if (index === null) {
      index = this.state.importantIndex;
    }
    this.setState({initial: false, activeIndex: index});
  }

  _onResize () {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  }

  _layout () {
    if (this.state.placeLegend) {
      // legendPlacement based on available window orientation
      let ratio = window.innerWidth / window.innerHeight;
      if (ratio < 0.8) {
        this.setState({legendPlacement: 'bottom'});
      } else if (ratio > 1.2) {
        this.setState({legendPlacement: 'right'});
      }
    }

    if ('right' === this.state.legendPlacement) {
      if (this.refs.legend) {
        let graphicHeight = this.refs.activeGraphic.offsetHeight;
        let legendHeight = ReactDOM.findDOMNode(this.refs.legend).offsetHeight;
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
        {value: props.value, important: true}
      ];
    }

    // set color index
    if (series.length === 1 && props.thresholds) {
      let item = series[0];
      if (! item.colorIndex) {
        // see which threshold color index to use
        let cumulative = 0;
        thresholds.some(function (threshold) {
          cumulative += threshold.value;
          if (item.value < cumulative) {
            item.colorIndex = threshold.colorIndex || 'graph-1';
            return true;
          }
        });
      }
    } else {
      series.forEach(function (item, index) {
        if (! item.colorIndex) {
          item.colorIndex = ('graph-' + (index + 1));
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
      let total = 0;
      for (let i = 0; i < props.thresholds.length; i += 1) {
        let threshold = props.thresholds[i];
        thresholds.push({
          label: threshold.label,
          colorIndex: threshold.colorIndex,
          ariaLabel: `${threshold.value} ${props.units || ''} ${threshold.label || ''}`
        });
        if (i > 0) {
          thresholds[i - 1].value = threshold.value - total;
          total += thresholds[i - 1].value;
        }
        if (i === (props.thresholds.length - 1)) {
          thresholds[i].value = max.value - total;
        }
      }
    } else if (props.threshold) {
      let remaining = max.value - props.threshold;
      thresholds = [
        {
          value: props.threshold,
          colorIndex: 'unset',
          ariaLabel: `${props.threshold} ${props.units || ''}`
        },
        {value: remaining, colorIndex: 'critical'}
      ];
    } else {
      thresholds = [
        {value: max.value, colorIndex: 'unset'}
      ];
    }
    return thresholds;
  }

  _importantIndex (props, series) {
    let result = null;
    if (series.length === 1) {
      result = 0;
    }
    if (props.hasOwnProperty('important')) {
      result = props.important;
    }
    series.some(function (data, index) {
      if (data.important) {
        result = index;
        return true;
      }
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
    let total = 0;
    series.some(function (item) {
      total += item.value;
    });
    return total;
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
    if (props.series && props.series.length > 1) {
      total = this._seriesTotal(props.series);
    } else if (props.max && props.max.value) {
      total = props.max.value;
    } else {
      total = 100;
    }
    let seriesMax;
    if (props.series && 'spiral' === props.type) {
      seriesMax = this._seriesMax(props.series);
    }
    // Normalize min and max
    let min = this._terminal(props.min || 0);
    // Max could be provided in props or come from the total of
    // a multi-value series.
    let max = this._terminal(props.max || seriesMax || total);
    // Normalize simple threshold prop to an array, if needed.
    let thresholds = this._normalizeThresholds(props, min, max);
    // Normalize simple value prop to a series, if needed.
    let series = this._normalizeSeries(props, min, max, thresholds);
    // Determine important index.
    let importantIndex = this._importantIndex(props, series);

    let state = {
      importantIndex: importantIndex,
      activeIndex: importantIndex,
      series: series,
      thresholds: thresholds,
      min: min,
      max: max,
      total: total
    };

    // legend
    state.placeLegend = ! (props.legend && props.legend.placement);
    if (! state.placeLegend) {
      state.legendPlacement = props.legend.placement;
    }

    return state;
  }

  _getActiveFields () {
    let fields;
    if (null === this.state.activeIndex) {
      fields = {value: this.state.total, label: 'Total'};
    } else {
      let active = this.state.series[this.state.activeIndex];
      if (!active) {
        active = this.state.series[0];
      }
      fields = {value: active.value, label: active.label, onClick: active.onClick};
    }
    return fields;
  }

  _renderActiveValue () {
    let fields = this._getActiveFields();
    let classes = [CLASS_ROOT + "__value"];
    if (fields.onClick) {
      classes.push(CLASS_ROOT + "__value--active");
    }
    let units;
    if (this.props.units) {
      units = (
        <span className={CLASS_ROOT + "__value-units large-number-font"}>
          {this.props.units}
        </span>
      );
    }

    return (
      <div aria-hidden="true" role="presentation"
        className={classes.join(' ')} onClick={fields.onClick}>
        <span
          className={CLASS_ROOT + "__value-value large-number-font"}>
          {fields.value}
          {units}
        </span>
        <span className={CLASS_ROOT + "__value-label"}>
          {fields.label}
        </span>
      </div>
    );
  }

  _renderMinMax (classes) {
    let minLabel;
    if (this.state.min.label) {
      minLabel = (
        <div className={CLASS_ROOT + "__minmax-min"}>
          {this.state.min.label}
        </div>
      );
    }
    let maxLabel;
    if (this.state.max.label) {
      maxLabel = (
        <div className={CLASS_ROOT + "__minmax-max"}>
          {this.state.max.label}
        </div>
      );
    }
    let minMax;
    if (minLabel || maxLabel) {
      minMax = (
        <div className={CLASS_ROOT + "__minmax-container"}>
          <div className={CLASS_ROOT + "__minmax"}>
            {minLabel}
            {maxLabel}
          </div>
        </div>
      );
      classes.push(CLASS_ROOT + "--minmax");
    }
    return minMax;
  }

  _renderLegend () {
    let total = (typeof this.props.legend === 'object' && this.props.legend.total);
    return (
      <Legend ref="legend" className={CLASS_ROOT + "__legend"}
        series={this.state.series}
        units={this.props.units}
        total={total}
        activeIndex={this.state.activeIndex}
        onActive={this._onActivate} />
    );
  }

  render () {
    let classes = [CLASS_ROOT];
    classes.push(CLASS_ROOT + "--" + this.props.type);
    if (this.props.vertical) {
      classes.push(CLASS_ROOT + "--vertical");
    }
    if (this.props.stacked) {
      classes.push(CLASS_ROOT + "--stacked");
    }
    if (this.props.size) {
      classes.push(CLASS_ROOT + "--" + this.props.size);
    }
    if (this.state.series.length === 0) {
      classes.push(CLASS_ROOT + "--loading");
    } else if (this.state.series.length === 1) {
      classes.push(CLASS_ROOT + "--single");
    }
    if (this.state.activeIndex !== null) {
      classes.push(CLASS_ROOT + "--active");
    }
    if (this.state.tallLegend) {
      classes.push(CLASS_ROOT + "--tall-legend");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let minMax = this._renderMinMax(classes);

    let activeValue = this._renderActiveValue();

    let legend;
    let a11yRole;
    if (this.props.legend || this.props.type === 'spiral') {
      a11yRole = 'tablist';

      if (this.props.legend) {
        legend = this._renderLegend();
        classes.push(CLASS_ROOT + "--legend-" + this.state.legendPlacement);
      }
    }

    let GraphicComponent = TYPE_COMPONENT[this.props.type];
    let graphic = (
      <GraphicComponent
        a11yTitle={this.props.a11yTitle}
        a11yTitleId={this.props.a11yTitleId}
        a11yDesc={this.props.a11yDesc}
        a11yDescId={this.props.a11yDescId}
        a11yRole={a11yRole}
        activeIndex={this.state.activeIndex}
        min={this.state.min} max={this.state.max}
        onActivate={this._onActivate}
        series={this.state.series}
        stacked={this.props.stacked}
        thresholds={this.state.thresholds}
        total={this.state.total}
        units={this.props.units}
        vertical={this.props.vertical} />
    );

    let graphicContainer;
    if (this.state.total > 0) {
      graphicContainer = (
        <div className={CLASS_ROOT + "__graphic-container"}>
          {graphic}
          {minMax}
        </div>
      );
    }

    return (
      <div className={classes.join(' ')}>
        <div ref="activeGraphic" className={CLASS_ROOT + "__value-container"}>
          {graphicContainer}
          {activeValue}
        </div>
        {legend}
      </div>
    );
  }

}

Meter.propTypes = {
  a11yTitle: PropTypes.string,
  a11yTitleId: PropTypes.string,
  a11yDescId: PropTypes.string,
  a11yDesc: PropTypes.string,
  important: PropTypes.number,
  legend: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      total: PropTypes.bool,
      placement: PropTypes.oneOf(['right', 'bottom'])
    })
  ]),
  max: PropTypes.oneOfType([
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string
    }),
    PropTypes.number
  ]),
  min: PropTypes.oneOfType([
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string
    }),
    PropTypes.number
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  series: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number.isRequired,
    colorIndex: PropTypes.string,
    important: PropTypes.bool,
    onClick: PropTypes.func
  })),
  stacked: PropTypes.bool,
  threshold: PropTypes.number,
  thresholds: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number.isRequired,
    colorIndex: PropTypes.string
  })),
  type: PropTypes.oneOf(['bar', 'arc', 'circle', 'spiral']),
  units: PropTypes.string,
  value: PropTypes.number,
  vertical: PropTypes.bool
};

Meter.defaultProps = {
  a11yTitleId: 'meter-title',
  a11yDescId: 'meter-desc',
  type: 'bar'
};

Meter.contextTypes = {
  intl: PropTypes.object
};

module.exports = Meter;
