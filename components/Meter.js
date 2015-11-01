// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var FormattedMessage = require('./FormattedMessage');

var Legend = require('./Legend');

var CLASS_ROOT = "meter";

var BAR_LENGTH = 192;
var BAR_THICKNESS = 24;
var MID_BAR_THICKNESS = BAR_THICKNESS / 2;

var CIRCLE_WIDTH = 192;
var CIRCLE_RADIUS = 84;

var ARC_HEIGHT = 144;

var SPIRAL_THICKNESS = 24;
// Allow for active value content next to a spiral meter
var SPIRAL_TEXT_PADDING = 48;

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

function arcCommands(centerX, centerY, radius, startAngle, endAngle) {
  var start = polarToCartesian(centerX, centerY, radius, endAngle);
  var end = polarToCartesian(centerX, centerY, radius, startAngle);
  var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
  var d = ["M", start.x, start.y, "A", radius, radius, 0, arcSweep, 0, end.x, end.y].join(" ");
  return d;
}

function singleIndicatorCommands(centerX, centerY, radius, startAngle, endAngle, length) {
  var point = polarToCartesian(centerX, centerY, radius - length, endAngle - 1);
  var start = polarToCartesian(centerX, centerY, radius, endAngle - 1);
  var d = ["M", start.x, start.y, "L", point.x, point.y].join(" ");
  return d;
}

function getThresholdsString(thresholds) {
  var thresholdsArray = [', Thresholds: '];

  thresholds.forEach(function (threshold) {
    thresholdsArray.push(threshold.label + ': ' + threshold.value);
  });

  return thresholdsArray.join(' ');
}

var Meter = React.createClass({
  displayName: 'Meter',

  propTypes: {
    important: React.PropTypes.number,
    large: React.PropTypes.bool, // DEPRECATED: remove in 0.5, use size
    legend: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.shape({
      total: React.PropTypes.bool,
      placement: React.PropTypes.oneOf(['right', 'bottom'])
    })]),
    max: React.PropTypes.oneOfType([React.PropTypes.shape({
      value: React.PropTypes.number.isRequired,
      label: React.PropTypes.string
    }), React.PropTypes.number]),
    min: React.PropTypes.oneOfType([React.PropTypes.shape({
      value: React.PropTypes.number.isRequired,
      label: React.PropTypes.string
    }), React.PropTypes.number]),
    size: React.PropTypes.oneOf(['small', 'medium', 'large']),
    series: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.number.isRequired,
      colorIndex: React.PropTypes.string,
      important: React.PropTypes.bool,
      onClick: React.PropTypes.func
    })),
    small: React.PropTypes.bool, // DEPRECATED: remove in 0.5, use size
    threshold: React.PropTypes.number,
    thresholds: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.number.isRequired,
      colorIndex: React.PropTypes.string
    })),
    type: React.PropTypes.oneOf(['bar', 'arc', 'circle', 'spiral']),
    units: React.PropTypes.string,
    value: React.PropTypes.number,
    vertical: React.PropTypes.bool,
    a11yRole: React.PropTypes.string,
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string,
    a11yDescId: React.PropTypes.string,
    a11yDesc: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      type: 'bar',
      a11yRole: 'img',
      a11yTitleId: 'meter-title',
      a11yDescId: 'meter-desc'
    };
  },

  getInitialState: function getInitialState() {
    var state = this._stateFromProps(this.props);
    if (state.placeLegend) {
      state.legendPlacement = 'bottom';
    }
    state.initial = true;
    return state;
  },

  componentDidMount: function componentDidMount() {
    this._initialTimer = setTimeout(this._initialTimeout, 10);
    window.addEventListener('resize', this._onResize);
    this._onResize();
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    var state = this._stateFromProps(newProps);
    this.setState(state);
    this._onResize();
  },

  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this._initialTimer);
    clearTimeout(this._resizeTimer);
    window.removeEventListener('resize', this._onResize);
  },

  _initialTimeout: function _initialTimeout() {
    this.setState({
      initial: false,
      activeIndex: this.state.importantIndex
    });
    clearTimeout(this._timeout);
  },

  _onActivate: function _onActivate(index) {
    this.setState({ initial: false, activeIndex: index });
  },

  _onResize: function _onResize() {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  },

  _layout: function _layout() {
    if (this.state.placeLegend) {
      // legendPlacement based on available window orientation
      var ratio = window.innerWidth / window.innerHeight;
      if (ratio < 0.8) {
        this.setState({ legendPlacement: 'bottom' });
      } else if (ratio > 1.2) {
        this.setState({ legendPlacement: 'right' });
      }
    }

    if ('right' === this.state.legendPlacement) {
      if (this.refs.legend) {
        var graphicHeight = this.refs.activeGraphic.offsetHeight;
        var legendHeight = ReactDOM.findDOMNode(this.refs.legend).offsetHeight;
        this.setState({ tallLegend: legendHeight > graphicHeight });
      }
    }
  },

  _normalizeSeries: function _normalizeSeries(props, min, max, thresholds) {
    var series = [];
    if (props.series) {
      series = props.series;
    } else if (props.value || props.value === 0) {
      series = [{ value: props.value, important: true }];
    }

    // set color index
    if (series.length === 1 && props.thresholds) {
      var item = series[0];
      if (!item.colorIndex) {
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
        if (!item.colorIndex) {
          item.colorIndex = 'graph-' + (index + 1);
        }
      });
    }

    return series;
  },

  _normalizeThresholds: function _normalizeThresholds(props, min, max) {
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
        if (i === props.thresholds.length - 1) {
          thresholds[i].value = max.value - total;
        }
      }
    } else if (props.threshold) {
      var remaining = max.value - props.threshold;
      thresholds = [{ value: props.threshold, colorIndex: 'unset' }, { value: remaining, colorIndex: 'error' }];
    } else {
      thresholds = [{ value: max.value, colorIndex: 'unset' }];
    }
    return thresholds;
  },

  _importantIndex: function _importantIndex(series) {
    var result = null;
    if (series.length === 1) {
      result = 0;
    }
    if (this.props.hasOwnProperty('important')) {
      result = this.props.important;
    }
    series.some(function (data, index) {
      if (data.important) {
        result = index;
        return true;
      }
    });
    return result;
  },

  // Normalize min or max to an object.
  _terminal: function _terminal(terminal) {
    if (typeof terminal === 'number') {
      terminal = { value: terminal };
    }
    return terminal;
  },

  _seriesTotal: function _seriesTotal(series) {
    var total = 0;
    series.some(function (item) {
      total += item.value;
    });
    return total;
  },

  _seriesMax: function _seriesMax(series) {
    var max = 0;
    series.some(function (item) {
      max = Math.max(max, item.value);
    });
    return max;
  },

  _viewBoxDimensions: function _viewBoxDimensions(series) {
    var viewBoxHeight;
    var viewBoxWidth;
    if ('arc' === this.props.type) {
      if (this.props.vertical) {
        viewBoxWidth = ARC_HEIGHT;
        viewBoxHeight = CIRCLE_WIDTH;
      } else {
        viewBoxWidth = CIRCLE_WIDTH;
        viewBoxHeight = ARC_HEIGHT;
      }
    } else if ('circle' === this.props.type) {
      viewBoxWidth = CIRCLE_WIDTH;
      viewBoxHeight = CIRCLE_WIDTH;
    } else if ('bar' === this.props.type) {
      if (this.props.vertical) {
        viewBoxWidth = BAR_THICKNESS;
        viewBoxHeight = BAR_LENGTH;
      } else {
        viewBoxWidth = BAR_LENGTH;
        viewBoxHeight = BAR_THICKNESS;
      }
    } else if ('spiral' === this.props.type) {
      // Give the graphic just a bit of breathing room
      // by not ending the spirals right at the center. (+1)
      viewBoxHeight = Math.max(CIRCLE_WIDTH, SPIRAL_THICKNESS * (series.length + 1) * 2);
      viewBoxWidth = viewBoxHeight + 2 * SPIRAL_TEXT_PADDING;
    }
    return [viewBoxWidth, viewBoxHeight];
  },

  // Generates state based on the provided props.
  _stateFromProps: function _stateFromProps(props) {
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
    var importantIndex = this._importantIndex(series);
    // Determine the viewBox dimensions
    var viewBoxDimensions = this._viewBoxDimensions(series);

    var state = {
      importantIndex: importantIndex,
      activeIndex: importantIndex,
      series: series,
      thresholds: thresholds,
      min: min,
      max: max,
      total: total,
      viewBoxWidth: viewBoxDimensions[0],
      viewBoxHeight: viewBoxDimensions[1]
    };

    if ('arc' === this.props.type) {
      state.startAngle = 60;
      state.anglePer = total === 0 ? 0 : 240.0 / total;
      if (this.props.vertical) {
        state.angleOffset = 90;
      } else {
        state.angleOffset = 180;
      }
    } else if ('circle' === this.props.type) {
      state.startAngle = 1;
      state.anglePer = total === 0 ? 0 : 358.0 / total;
      state.angleOffset = 180;
    } else if ('bar' === this.props.type) {
      state.scale = BAR_LENGTH / (max.value - min.value);
    } else if ('spiral' === this.props.type) {
      state.startAngle = 0;
      state.anglePer = 270.0 / max.value;
      state.angleOffset = 0;
      // The last spiral ends out near but not quite at the edge of the view box.
      state.startRadius = Math.max(CIRCLE_RADIUS, SPIRAL_THICKNESS * (series.length + 0.5)) - Math.max(0, series.length - 1) * SPIRAL_THICKNESS;
    }

    // normalize size
    state.size = props.size || (props.small ? 'small' : props.large ? 'large' : null);

    // legend
    state.placeLegend = !(props.legend && props.legend.placement);
    if (!state.placeLegend) {
      state.legendPlacement = props.legend.placement;
    }

    return state;
  },

  _interactionListeners: function _interactionListeners(interactive, item, index) {
    var result = {};
    if (interactive) {
      result.onOver = this._onActivate.bind(this, index);
      result.onOut = this._onActivate.bind(this, this.state.importantIndex);
      result.onClick = item.onClick;
    }
    return result;
  },

  _translateBarWidth: function _translateBarWidth(value) {
    return Math.round(this.state.scale * value);
  },

  _barCommands: function _barCommands(start, distance) {
    var commands;
    if (this.props.vertical) {
      commands = "M" + MID_BAR_THICKNESS + "," + (BAR_LENGTH - start) + " L" + MID_BAR_THICKNESS + "," + (BAR_LENGTH - (start + distance));
    } else {
      commands = "M" + start + "," + MID_BAR_THICKNESS + " L" + (start + distance) + "," + MID_BAR_THICKNESS;
    }
    return commands;
  },

  _buildPath: function _buildPath(commands, interactive, item, index, classes) {
    if (interactive) {
      var listeners = this._interactionListeners(interactive, item, index);

      return React.createElement('path', { key: index, className: classes.join(' '), d: commands, tabIndex: '0',
        onFocus: listeners.onOver, onBlur: listeners.onOut,
        onMouseOver: listeners.onOver, onMouseOut: listeners.onOut,
        onClick: listeners.onClick, role: 'img', 'aria-labelledby': this.props.a11yDescId });
    } else {
      return React.createElement('path', { key: index, className: classes.join(' '), d: commands });
    }
  },

  _renderBar: function _renderBar(series, interactive) {
    var start = 0;
    var minRemaining = this.state.min.value;
    var classes;
    var commands;

    var paths = series.map(function (item, index) {
      classes = [CLASS_ROOT + "__bar"];
      if (index === this.state.activeIndex) {
        classes.push(CLASS_ROOT + "__bar--active");
      }
      classes.push("color-index-" + item.colorIndex);

      var value = item.value - minRemaining;
      minRemaining = Math.max(0, minRemaining - item.value);
      var distance = this._translateBarWidth(value);
      commands = this._barCommands(start, distance);
      start += distance;

      return this._buildPath(commands, interactive, item, index, classes);
    }, this);

    if (paths.length === 0) {
      classes = [CLASS_ROOT + "__bar"];
      classes.push(CLASS_ROOT + "__bar--loading");
      classes.push("color-index-loading");
      commands = this._barCommands(0, BAR_LENGTH);
      paths.push(React.createElement('path', { key: 'loading', className: classes.join(' '), d: commands }));
    }

    return paths;
  },

  _translateEndAngle: function _translateEndAngle(startAngle, value) {
    return Math.min(360, Math.max(0, startAngle + this.state.anglePer * value));
  },

  _arcCommands: function _arcCommands(startAngle, endAngle) {
    return arcCommands(CIRCLE_WIDTH / 2, CIRCLE_WIDTH / 2, CIRCLE_RADIUS, startAngle + this.state.angleOffset, endAngle + this.state.angleOffset);
  },

  _renderArcOrCircle: function _renderArcOrCircle(series, interactive) {
    var startAngle = this.state.startAngle;
    var classes;
    var endAngle;
    var commands;

    var paths = series.map(function (item, index) {
      var classes = [CLASS_ROOT + "__slice"];
      if (index === this.state.activeIndex) {
        classes.push(CLASS_ROOT + "__slice--active");
      }
      classes.push("color-index-" + item.colorIndex);
      endAngle = this._translateEndAngle(startAngle, item.value);
      commands = this._arcCommands(startAngle, endAngle);

      startAngle = endAngle;

      return this._buildPath(commands, interactive, item, index, classes);
    }, this);

    if (paths.length === 0) {
      classes = [CLASS_ROOT + "__slice"];
      classes.push(CLASS_ROOT + "__slice--loading");
      classes.push("color-index-loading");
      endAngle = this._translateEndAngle(this.state.startAngle, this.state.max.value);
      commands = this._arcCommands(this.state.startAngle, endAngle);
      paths.push(React.createElement('path', { key: 'loading', className: classes.join(' '), d: commands }));
    }

    return paths;
  },

  _spiralCommands: function _spiralCommands(startAngle, endAngle, radius) {
    return arcCommands(this.state.viewBoxWidth / 2, this.state.viewBoxHeight / 2, radius, startAngle + this.state.angleOffset, endAngle + this.state.angleOffset);
  },

  _renderSpiral: function _renderSpiral(series, interactive) {
    var startAngle = this.state.startAngle;
    var radius = this.state.startRadius;
    var classes;
    var endAngle;
    var commands;

    var paths = series.map(function (item, index) {
      var classes = [CLASS_ROOT + "__slice"];
      if (index === this.state.activeIndex) {
        classes.push(CLASS_ROOT + "__slice--active");
      }
      classes.push("color-index-" + item.colorIndex);
      endAngle = this._translateEndAngle(startAngle, item.value);
      commands = this._spiralCommands(startAngle, endAngle, radius);

      radius += SPIRAL_THICKNESS;

      return this._buildPath(commands, interactive, item, index, classes);
    }, this);

    if (paths.length === 0) {
      classes = [CLASS_ROOT + "__slice"];
      classes.push(CLASS_ROOT + "__slice--loading");
      classes.push("color-index-loading");
      endAngle = this._translateEndAngle(this.state.startAngle, this.state.max.value);
      commands = this._spiralCommands(this.state.startAngle, endAngle, radius);
      paths.push(React.createElement('path', { key: 'loading', className: classes.join(' '), d: commands }));
    }

    return paths;
  },

  _renderSingleIndicator: function _renderSingleIndicator(series) {
    var seriesIndicator = null;
    var startAngle = this.state.startAngle;
    series.forEach(function (item, index) {
      var endAngle = this._translateEndAngle(startAngle, item.value);

      if (index === this.state.activeIndex) {
        var length;
        var x;
        var y;
        if ('arc' === this.props.type) {
          length = CIRCLE_RADIUS;
          x = CIRCLE_WIDTH / 2;
          y = CIRCLE_WIDTH / 2;
        } else {
          length = CIRCLE_RADIUS * 0.60;
          x = this.state.viewBoxWidth / 2;
          y = this.state.viewBoxHeight / 2;
        }
        var indicatorCommands = singleIndicatorCommands(x, y, CIRCLE_RADIUS * 1.1, startAngle + this.state.angleOffset, endAngle + this.state.angleOffset, length);
        seriesIndicator = React.createElement('path', { fill: 'none',
          className: CLASS_ROOT + "__slice-indicator color-index-" + item.colorIndex,
          d: indicatorCommands });
      }

      startAngle = endAngle;
    }, this);

    return seriesIndicator;
  },

  _getActiveFields: function _getActiveFields() {
    var fields;
    if (null === this.state.activeIndex) {
      fields = { value: this.state.total, label: 'Total' };
    } else {
      var active = this.state.series[this.state.activeIndex];
      fields = { value: active.value, label: active.label };
    }

    return fields;
  },

  _renderActive: function _renderActive() {

    var fields = this._getActiveFields();
    var units;
    if (this.props.units) {
      units = React.createElement(
        'span',
        { className: CLASS_ROOT + "__active-units large-number-font" },
        this.props.units
      );
    }
    return React.createElement(
      'div',
      { 'aria-hidden': 'true', role: 'presentation', className: CLASS_ROOT + "__active" },
      React.createElement(
        'span',
        {
          className: CLASS_ROOT + "__active-value large-number-font" },
        fields.value,
        units
      ),
      React.createElement(
        'span',
        { className: CLASS_ROOT + "__active-label" },
        fields.label
      )
    );
  },

  _renderLabels: function _renderLabels(series) {
    var x = this.state.viewBoxWidth / 2 - SPIRAL_THICKNESS / 2;
    var y = SPIRAL_THICKNESS * 0.75 + SPIRAL_THICKNESS * (series.length - 1);
    var labels = series.map(function (item, index) {
      var classes = [CLASS_ROOT + "__label"];
      if (index === this.state.activeIndex) {
        classes.push(CLASS_ROOT + "__label--active");
      }

      var textX = x;
      var textY = y;

      y -= SPIRAL_THICKNESS;

      return React.createElement(
        'text',
        { key: item.label || index, x: textX, y: textY,
          textAnchor: 'end', fontSize: 16,
          className: classes.join(' '),
          onMouseOver: this._onActivate.bind(this, index),
          onMouseOut: this._onActivate.bind(this, this.state.importantIndex),
          onClick: item.onClick },
        item.label
      );
    }, this);

    return React.createElement(
      'g',
      { className: CLASS_ROOT + "__labels" },
      labels
    );
  },

  _renderLegend: function _renderLegend() {
    return React.createElement(Legend, { ref: 'legend', className: CLASS_ROOT + "__legend",
      series: this.state.series,
      units: this.props.units,
      activeIndex: this.state.activeIndex,
      onActive: this._onActive });
  },

  render: function render() {
    var classes = [CLASS_ROOT];
    classes.push(CLASS_ROOT + "--" + this.props.type);
    if (this.props.vertical) {
      classes.push(CLASS_ROOT + "--vertical");
    }
    if (this.state.size) {
      classes.push(CLASS_ROOT + "--" + this.state.size);
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

    var values;
    var thresholds;
    var singleIndicator;
    var labels;
    var width;
    var height;

    if ('arc' === this.props.type || 'circle' === this.props.type) {
      values = this._renderArcOrCircle(this.state.series, this.props.series);
      thresholds = this._renderArcOrCircle(this.state.thresholds);
      if (this.state.series.length === 1) {
        singleIndicator = this._renderSingleIndicator(this.state.series);
      }
    } else if ('bar' === this.props.type) {
      values = this._renderBar(this.state.series, this.props.series);
      thresholds = this._renderBar(this.state.thresholds);
    } else if ('spiral' === this.props.type) {
      values = this._renderSpiral(this.state.series, this.props.series);
      if (this.state.series.length === 1) {
        singleIndicator = this._renderSingleIndicator(this.state.series);
      }
      labels = this._renderLabels(this.state.series);
      width = this.state.viewBoxWidth;
      height = this.state.viewBoxHeight;
    }

    if (thresholds) {
      thresholds = React.createElement(
        'g',
        { className: CLASS_ROOT + "__thresholds" },
        thresholds
      );
    }

    var minLabel;
    if (this.state.min.label) {
      minLabel = React.createElement(
        'div',
        { className: CLASS_ROOT + "__minmax-min" },
        this.state.min.label
      );
    }
    var maxLabel;
    if (this.state.max.label) {
      maxLabel = React.createElement(
        'div',
        { className: CLASS_ROOT + "__minmax-max" },
        this.state.max.label
      );
    }
    var minMax;
    if (minLabel || maxLabel) {
      minMax = React.createElement(
        'div',
        { className: CLASS_ROOT + "__minmax-container" },
        React.createElement(
          'div',
          { className: CLASS_ROOT + "__minmax" },
          minLabel,
          maxLabel
        )
      );
      classes.push(CLASS_ROOT + "--minmax");
    }

    var active = this._renderActive();

    var legend;
    if (this.props.legend) {
      legend = this._renderLegend();
      classes.push(CLASS_ROOT + "--legend-" + this.state.legendPlacement);
    }

    var a11yRole = this.props.series ? 'chart' : this.props.a11yRole;

    var defaultTitle;
    if (!this.props.a11yTitle) {
      defaultTitle = ['Meter, ', 'Type: ', (this.props.vertical ? 'vertical ' : '') + this.props.type].join(' ').trim();
    }

    var titleKey = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : defaultTitle;
    var a11yTitle = React.createElement(FormattedMessage, { id: titleKey, defaultMessage: titleKey });

    var defaultA11YDesc;
    if (this.props.a11yTitle !== "undefined") {
      var fields = this._getActiveFields();
      defaultA11YDesc = [', Value: ', fields.value, this.props.units || '', fields.label, this.state.min.label ? ', Minimum: ' + this.state.min.label : '', this.state.max.label ? ', Maximum: ' + this.state.max.label : '', this.props.threshold ? ', Threshold: ' + this.props.threshold : '', this.props.thresholds ? getThresholdsString(this.props.thresholds) : ''].join(' ').trim();
    }

    var descKey = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : defaultA11YDesc;
    var a11yDesc = React.createElement(FormattedMessage, { id: descKey, defaultMessage: descKey });

    return React.createElement(
      'div',
      { className: classes.join(' ') },
      React.createElement(
        'div',
        { ref: 'activeGraphic', className: CLASS_ROOT + "__active-graphic" },
        React.createElement(
          'div',
          { className: CLASS_ROOT + "__labeled-graphic" },
          React.createElement(
            'a',
            { href: '#', role: a11yRole, tabIndex: '0',
              'aria-labelledby': this.props.a11yTitleId + ' ' + this.props.a11yDescId },
            React.createElement(
              'title',
              { id: this.props.a11yTitleId },
              a11yTitle
            ),
            React.createElement(
              'svg',
              { className: CLASS_ROOT + "__graphic",
                viewBox: "0 0 " + this.state.viewBoxWidth + " " + this.state.viewBoxHeight,
                preserveAspectRatio: 'xMidYMid meet', width: width, height: height },
              React.createElement(
                'desc',
                { id: this.props.a11yDescId },
                a11yDesc
              ),
              thresholds,
              React.createElement(
                'g',
                { className: CLASS_ROOT + "__values" },
                values
              ),
              labels,
              singleIndicator
            )
          ),
          minMax
        ),
        active
      ),
      legend
    );
  }

});

module.exports = Meter;