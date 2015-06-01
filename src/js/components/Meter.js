// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Legend = require('./Legend');

var CLASS_ROOT = "meter";

var BAR_LENGTH = 192;
var BAR_THICKNESS = 24;
var MID_BAR_THICKNESS = BAR_THICKNESS / 2;

var CIRCLE_WIDTH = 192;
var CIRCLE_RADIUS = 84;

var ARC_HEIGHT = 144;

function polarToCartesian (centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function arcCommands (x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);
  var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
  var d = [
    "M", start.x, start.y,
    "A", radius, radius, 0, arcSweep, 0, end.x, end.y
  ].join(" ");
  return d;
}

function activeIndicatorCommands (x, y, radius, startAngle, endAngle) {
  var midAngle = endAngle - ((endAngle - startAngle) / 2);
  var point = polarToCartesian(x, y, radius - 24, midAngle);
  var start = polarToCartesian(x, y, radius, midAngle - 10);
  var end = polarToCartesian(x, y, radius, midAngle + 10);
  var d = ["M", point.x, point.y,
    "L", start.x, start.y,
    "A", radius, radius, 0, 0, 0, end.x, end.y,
    "Z"
  ].join(" ");
  return d;
}

var Meter = React.createClass({

  propTypes: {
    important: React.PropTypes.number,
    large: React.PropTypes.bool,
    legend: React.PropTypes.bool,
    legendTotal: React.PropTypes.bool,
    max: React.PropTypes.oneOfType([
      React.PropTypes.shape({
        value: React.PropTypes.number.isRequired,
        label: React.PropTypes.string
      }),
      React.PropTypes.number
    ]),
    min: React.PropTypes.oneOfType([
      React.PropTypes.shape({
        value: React.PropTypes.number.isRequired,
        label: React.PropTypes.string
      }),
      React.PropTypes.number
    ]),
    series: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.number.isRequired,
      colorIndex: React.PropTypes.string,
      important: React.PropTypes.bool,
      onClick: React.PropTypes.func
    })),
    small: React.PropTypes.bool,
    threshold: React.PropTypes.number,
    type: React.PropTypes.oneOf(['bar', 'arc', 'circle']),
    units: React.PropTypes.string,
    value: React.PropTypes.number,
    vertical: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      type: 'bar'
    };
  },

  _initialTimeout: function () {
    this.setState({
      initial: false,
      activeIndex: this.state.importantIndex
    });
    clearTimeout(this._timeout);
  },

  _onActivate: function (index) {
    this.setState({initial: false, activeIndex: index});
  },

  _onResize: function() {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  },

  _layout: function () {
    // legendPosition based on available window orientation
    var ratio = window.innerWidth / window.innerHeight;
    if (ratio < 0.8) {
      this.setState({legendPosition: 'bottom'});
    } else if (ratio > 1.2) {
      this.setState({legendPosition: 'right'});
    }
    /*
    // content based on available real estate
    var parentElement = this.refs.donut.getDOMNode().parentNode;
    var width = parentElement.offsetWidth;
    var height = parentElement.offsetHeight;
    var donutHeight = BASE_SIZE;
    if (this.props.partial) {
      donutHeight = PARTIAL_SIZE;
    }
    if (height < donutHeight || width < BASE_SIZE ||
      (width < (BASE_SIZE * 2) && height < (donutHeight * 2))) {
      this.setState({size: 'small'});
    } else {
      this.setState({size: null});
    }
    */
  },

  _generateSeries: function (props, min, max) {
    var remaining = max.value - props.value;
    return [
      {value: props.value, important: true},
      {value: remaining, colorIndex: 'unset'}
    ];
  },

  _importantIndex: function (series) {
    var result = series.length - 1;
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
  _terminal: function (terminal) {
    if (typeof terminal === 'number') {
      terminal = {value: terminal};
    }
    return terminal;
  },

  _seriesTotal: function (series) {
    var total = 0;
    series.some(function (item) {
      total += item.value;
    });
    return total;
  },

  // Generates state based on the provided props.
  _stateFromProps: function (props) {
    var total;
    if (props.series && props.series.length > 1) {
      total = this._seriesTotal(props.series);
    } else {
      total = 100;
    }
    // Normalize min and max
    var min = this._terminal(props.min || 0);
    // Max could be provided in props or come from the total of
    // a multi-value series.
    var max = this._terminal(props.max || total);
    // Normalize simple value prop to a series, if needed.
    var series = props.series || this._generateSeries(props, min, max);
    // Determine important index.
    var importantIndex = this._importantIndex(series);
    total = this._seriesTotal(series);

    var state = {
      importantIndex: importantIndex,
      activeIndex: importantIndex,
      legendPosition: 'bottom',
      series: series,
      min: min,
      max: max,
      total: total
    };

    if ('arc' === this.props.type) {
      state.startAngle = 60;
      state.anglePer = 240.0 / total;
      if (this.props.vertical) {
        state.angleOffset = 90;
      } else {
        state.angleOffset = 180;
      }
    } else if ('circle' === this.props.type) {
      state.startAngle = 1;
      state.anglePer = 358.0 / total;
      state.angleOffset = 180;
    } else if ('bar' === this.props.type) {
      state.scale = BAR_LENGTH / (max.value - min.value);
    }

    return state;
  },

  getInitialState: function() {
    var state = this._stateFromProps(this.props);
    state.initial = true;
    return state;
  },

  componentDidMount: function() {
    this._initialTimer = setTimeout(this._initialTimeout, 10);
    window.addEventListener('resize', this._onResize);
    this._onResize();
  },

  componentWillReceiveProps: function (newProps) {
    var state = this._stateFromProps(newProps);
    this.setState(state);
  },

  componentWillUnmount: function() {
    clearTimeout(this._initialTimer);
    clearTimeout(this._resizeTimer);
    window.removeEventListener('resize', this._onResize);
  },

  _itemColorIndex: function (item, index) {
    return item.colorIndex || ('graph-' + (index + 1));
  },

  _translateBarWidth: function (value) {
    return Math.round(this.state.scale * value);
  },

  _renderBar: function () {
    var start = 0;
    var minRemaining = this.state.min.value;
    var bars = this.state.series.map(function (item, index) {
      var colorIndex = this._itemColorIndex(item, index);
      var barClasses = [CLASS_ROOT + "__bar"];
      if (index === this.state.activeIndex) {
        barClasses.push(CLASS_ROOT + "__bar--active");
      }
      barClasses.push("color-index-" + colorIndex);

      var value = item.value - minRemaining;
      minRemaining = Math.max(0, minRemaining - item.value);
      var distance = this._translateBarWidth(value);
      var commands;
      if (this.props.vertical) {
        commands = "M" + MID_BAR_THICKNESS + "," + (BAR_LENGTH - start) +
          " L" + MID_BAR_THICKNESS + "," + (BAR_LENGTH - (start + distance));
      } else {
        commands = "M" + start + "," + MID_BAR_THICKNESS +
          " L" + (start + distance) + "," + MID_BAR_THICKNESS;
      }
      start += distance;

      return (
        <path key={index} className={barClasses.join(' ')} d={commands}
          onMouseOver={this._onActivate.bind(this, index)}
          onMouseOut={this._onActivate.bind(this, this.state.importantIndex)}
          onClick={item.onClick} />
      );
    }, this);

    return bars;
  },

  _renderArcOrCircle: function () {
    var startAngle = this.state.startAngle;
    var activeIndicator = null;

    var paths = this.state.series.map(function (item, index) {
      var sliceClasses = [CLASS_ROOT + "__slice"];
      if (index === this.state.activeIndex) {
        sliceClasses.push(CLASS_ROOT + "__slice--active");
      }
      var colorIndex = this._itemColorIndex(item, index);
      sliceClasses.push("color-index-" + colorIndex);

      var endAngle = Math.min(360, Math.max(0,
        startAngle + (this.state.anglePer * item.value)));
      // start from the bottom
      var commands = arcCommands(CIRCLE_WIDTH / 2, CIRCLE_WIDTH / 2, CIRCLE_RADIUS,
        startAngle + this.state.angleOffset,
        endAngle + this.state.angleOffset);

      if (index === this.state.activeIndex) {
        var indicatorCommands =
          activeIndicatorCommands(CIRCLE_WIDTH / 2, CIRCLE_WIDTH / 2, CIRCLE_RADIUS,
          startAngle + this.state.angleOffset,
          endAngle + this.state.angleOffset);
        activeIndicator = (
          <path stroke="none"
            className={CLASS_ROOT + "__slice-indicator color-index-" + colorIndex}
            d={indicatorCommands} />
        );
      }

      startAngle = endAngle;

      return (
        <path key={item.label} fill="none"
          className={sliceClasses.join(' ')} d={commands}
          onMouseOver={this._onActivate.bind(this, index)}
          onMouseOut={this._onActivate.bind(this, this.state.importantIndex)}
          onClick={item.onClick} />
      );
    }, this);

    return (
      <g>
        {activeIndicator}
        {paths}
      </g>
    );
  },

  _renderCurrent: function () {
    var current;
    var active = this.state.series[this.state.activeIndex];
    if ('arc' === this.props.type || 'circle' === this.props.type) {
      current = (
        <div className={CLASS_ROOT + "__active"}>
          <div className={CLASS_ROOT + "__active-value large-number-font"}>
            {active.value}
            <span className={CLASS_ROOT + "__active-units large-number-font"}>
              {this.props.units}
            </span>
          </div>
          <div className={CLASS_ROOT + "__active-label"}>
            {active.label}
          </div>
        </div>
      );
    } else if ('bar' === this.props.type) {
      current = (
        <span className={CLASS_ROOT + "__active"}>
          <span className={CLASS_ROOT + "__active-value large-number-font"}>
            {active.value}
          </span>
          <span className={CLASS_ROOT + "__active-units large-number-font"}>
            {this.props.units}
          </span>
        </span>
      );
    }
    return current;
  },

  _renderBarThreshold: function () {
    var distance =
      this._translateBarWidth(this.props.threshold - this.state.min.value);
    var commands;
    if (this.props.vertical) {
      commands = "M0," + (BAR_LENGTH - distance) +
        " L" + BAR_THICKNESS + "," + (BAR_LENGTH - distance);
    } else {
      commands = "M" + distance + ",0 L" + distance + "," + BAR_THICKNESS;
    }
    return <path className={CLASS_ROOT + "__threshold"} d={commands} />;
  },

  _renderCircleOrArcThreshold: function () {
    var startAngle = this.state.startAngle +
      (this.state.anglePer * this.props.threshold);
    var endAngle = Math.min(360, Math.max(0, startAngle + 1));
    // start from the bottom
    var commands = arcCommands(CIRCLE_WIDTH / 2, CIRCLE_WIDTH / 2, CIRCLE_RADIUS,
      startAngle + 180, endAngle + 180);
    return (
      <path className={CLASS_ROOT + "__threshold"} d={commands} />
    );
  },

  _renderLegend: function () {
    return (
      <Legend className={CLASS_ROOT + "__legend"}
        series={this.state.series}
        units={this.props.units}
        activeIndex={this.state.activeIndex}
        onActive={this._onActive} />
    );
  },

  render: function() {
    var classes = [CLASS_ROOT];
    classes.push(CLASS_ROOT + "--" + this.props.type);
    classes.push(CLASS_ROOT + "--legend-" + this.state.legendPosition);
    if (this.props.vertical) {
      classes.push(CLASS_ROOT + "--vertical");
    }
    if (this.props.small) {
      classes.push(CLASS_ROOT + "--small");
    }
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

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
    }

    var values = null;
    if ('arc' === this.props.type || 'circle' === this.props.type) {
      values = this._renderArcOrCircle();
    } else if ('bar' === this.props.type) {
      values = this._renderBar();
    }

    var threshold = null;
    if (this.props.threshold) {
      if ('arc' === this.props.type || 'circle' === this.props.type) {
        threshold = this._renderCircleOrArcThreshold();
      } else if ('bar' === this.props.type) {
        threshold = this._renderBarThreshold();
      }
    }

    var minLabel = null;
    if (this.state.min.label) {
      minLabel = (
        <div className={CLASS_ROOT + "__label-min"}>
          {this.state.min.label}
        </div>
      );
    }
    var maxLabel = null;
    if (this.state.max.label) {
      maxLabel = (
        <div className={CLASS_ROOT + "__label-max"}>
          {this.state.max.label}
        </div>
      );
    }

    var current = null;
    if (this.state.activeIndex >= 0) {
      current = this._renderCurrent();
    }

    var legend = null;
    if (this.props.legend) {
      legend = this._renderLegend();
    }

    return (
      <div className={classes.join(' ')}>
        <svg className={CLASS_ROOT + "__graphic"}
          viewBox={"0 0 " + viewBoxWidth + " " + viewBoxHeight}
          preserveAspectRatio="xMidYMid meet">
          <g>
            {values}
            {threshold}
          </g>
        </svg>
        {current}
        <div className={CLASS_ROOT + "__labels"}>
          {minLabel}
          {maxLabel}
        </div>
        {legend}
      </div>
    );
  }

});

module.exports = Meter;
