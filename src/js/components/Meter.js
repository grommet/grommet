// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Legend from './Legend';
import Intl from '../utils/Intl';
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

function getThresholdsString(thresholds) {
  var thresholdsArray = [', Thresholds: '];

  thresholds.forEach(function (threshold) {
    thresholdsArray.push(threshold.label + ': ' + threshold.value);
  });

  return thresholdsArray.join(' ');
}

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
    var state = this._stateFromProps(nextProps);
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
      var ratio = window.innerWidth / window.innerHeight;
      if (ratio < 0.8) {
        this.setState({legendPlacement: 'bottom'});
      } else if (ratio > 1.2) {
        this.setState({legendPlacement: 'right'});
      }
    }

    if ('right' === this.state.legendPlacement) {
      if (this.refs.legend) {
        var graphicHeight = this.refs.activeGraphic.offsetHeight;
        var legendHeight = ReactDOM.findDOMNode(this.refs.legend).offsetHeight;
        this.setState({tallLegend: (legendHeight > graphicHeight)});
      }
    }
  }

  _normalizeSeries (props, min, max, thresholds) {
    var series = [];
    if (props.series) {
      series = props.series;
    } else if (props.value || props.value === 0) {
      series = [
        {value: props.value, important: true}
      ];
    }

    // set color index
    if (series.length === 1 && props.thresholds) {
      var item = series[0];
      if (! item.colorIndex) {
        // see which threshold color index to use
        var cumulative = 0;
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
    var thresholds = [];
    if (props.thresholds) {
      // Convert thresholds from absolute values to cummulative,
      // so we can re-use the series drawing code.
      var total = 0;
      for (var i = 0; i < props.thresholds.length; i += 1) {
        var threshold = props.thresholds[i];
        thresholds.push({
          label: threshold.label,
          colorIndex: threshold.colorIndex
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
      var remaining = max.value - props.threshold;
      thresholds = [
        {value: props.threshold, colorIndex: 'unset'},
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
    var result = null;
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
    var total = 0;
    series.some(function (item) {
      total += item.value;
    });
    return total;
  }

  _seriesMax (series) {
    var max = 0;
    series.some(function (item) {
      max = Math.max(max, item.value);
    });
    return max;
  }

  // Generates state based on the provided props.
  _stateFromProps (props) {
    var total;
    if (props.series && props.series.length > 1) {
      total = this._seriesTotal(props.series);
    } else if (props.max && props.max.value) {
      total = props.max.value;
    } else {
      total = 100;
    }
    var seriesMax;
    if (props.series && 'spiral' === props.type) {
      seriesMax = this._seriesMax(props.series);
    }
    // Normalize min and max
    var min = this._terminal(props.min || 0);
    // Max could be provided in props or come from the total of
    // a multi-value series.
    var max = this._terminal(props.max || seriesMax || total);
    // Normalize simple threshold prop to an array, if needed.
    var thresholds = this._normalizeThresholds(props, min, max);
    // Normalize simple value prop to a series, if needed.
    var series = this._normalizeSeries(props, min, max, thresholds);
    // Determine important index.
    var importantIndex = this._importantIndex(props, series);

    var state = {
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
    var fields;
    if (null === this.state.activeIndex) {
      fields = {value: this.state.total, label: 'Total'};
    } else {
      var active = this.state.series[this.state.activeIndex];
      fields = {value: active.value, label: active.label, onClick: active.onClick};
    }
    return fields;
  }

  _renderActiveValue () {
    var fields = this._getActiveFields();
    var classes = [CLASS_ROOT + "__value"];
    if (fields.onClick) {
      classes.push(CLASS_ROOT + "__value--active");
    }
    var units;
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
    var minLabel;
    if (this.state.min.label) {
      minLabel = (
        <div className={CLASS_ROOT + "__minmax-min"}>
          {this.state.min.label}
        </div>
      );
    }
    var maxLabel;
    if (this.state.max.label) {
      maxLabel = (
        <div className={CLASS_ROOT + "__minmax-max"}>
          {this.state.max.label}
        </div>
      );
    }
    var minMax;
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
    var total = (typeof this.props.legend === 'object' && this.props.legend.total);
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
    var classes = [CLASS_ROOT];
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

    var minMax = this._renderMinMax(classes);

    var activeValue = this._renderActiveValue();

    var legend;
    if (this.props.legend) {
      legend = this._renderLegend();
      classes.push(CLASS_ROOT + "--legend-" + this.state.legendPlacement);
    }

    var a11yRole = this.props.series ? 'chart' : this.props.a11yRole;

    var defaultTitle;
    if (!this.props.a11yTitle) {
      defaultTitle = [
        'Meter, ',
        'Type: ',
        (this.props.vertical ? 'vertical ' : '') + this.props.type
      ].join(' ').trim();
    }

    var titleKey = typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : defaultTitle;
    var a11yTitle = Intl.getMessage(this.context.intl, titleKey);

    var defaultA11YDesc;
    if (this.props.a11yDesc !== "undefined") {
      var fields = this._getActiveFields();
      defaultA11YDesc = [
        ', Value: ',
        fields.value,
        this.props.units || '',
        fields.label,
        this.state.min.label ? ', Minimum: ' + this.state.min.label : '',
        this.state.max.label ? ', Maximum: ' + this.state.max.label : '',
        this.props.threshold ? ', Threshold: ' + this.props.threshold : '',
        this.props.thresholds ? getThresholdsString(this.props.thresholds) : ''
      ].join(' ').trim();
    }

    var descKey = typeof this.props.a11yDesc !== "undefined" ?
        this.props.a11yDesc : defaultA11YDesc;
    var a11yDesc = Intl.getMessage(this.context.intl, descKey);

    var GraphicComponent = TYPE_COMPONENT[this.props.type];
    var graphic = (
      <GraphicComponent
        a11yDesc={a11yDesc}
        a11yDescId={this.props.a11yDescId}
        activeIndex={this.state.activeIndex}
        min={this.state.min} max={this.state.max}
        onActivate={this._onActivate}
        series={this.state.series}
        stacked={this.props.stacked}
        thresholds={this.state.thresholds}
        total={this.state.total}
        vertical={this.props.vertical} />
    );

    return (
      <div className={classes.join(' ')}>
        <div ref="activeGraphic" className={CLASS_ROOT + "__value-container"}>
          <div className={CLASS_ROOT + "__graphic-container"}>
            <a href="#" role={a11yRole} tabIndex="0" className={CLASS_ROOT + "__aria"}
              aria-labelledby={this.props.a11yTitleId + ' ' + this.props.a11yDescId}>
              <title id={this.props.a11yTitleId}>{a11yTitle}</title>
              {graphic}
            </a>
            {minMax}
          </div>
          {activeValue}
        </div>
        {legend}
      </div>
    );
  }

}

Meter.propTypes = {
  a11yRole: PropTypes.string,
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
  a11yRole: 'img',
  a11yTitleId: 'meter-title',
  a11yDescId: 'meter-desc',
  type: 'bar'
};

Meter.contextTypes = {
  intl: PropTypes.object
};

module.exports = Meter;
