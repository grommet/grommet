// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var React = require('react');

var BASE_WIDTH = 400;
var BASE_HEIGHT = 200;

var Chart = React.createClass({

  propTypes: {
    legend: React.PropTypes.bool,
    max: React.PropTypes.number,
    min: React.PropTypes.number,
    series: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        label: React.PropTypes.string,
        values: React.PropTypes.arrayOf(
          React.PropTypes.arrayOf(
            React.PropTypes.oneOfType([
              React.PropTypes.number,
              React.PropTypes.object // Date
            ])
          )
        ),
        colorIndex: React.PropTypes.string
      })
    ).isRequired,
    threshold: React.PropTypes.number,
    type: React.PropTypes.oneOf(['line', 'bar', 'area']),
    units: React.PropTypes.string,
    xAxis: React.PropTypes.arrayOf(React.PropTypes.string)
  },

  _onMouseOver: function (index) {
    this.setState({activeIndex: index});
  },

  _onMouseOut: function () {
    this.setState({activeIndex: 0});
  },

  _onResize: function() {
    // nothing yet
  },

  _bounds: function (series) {
    // analyze series data
    var minX = null;
    var maxX = null;
    var minY = null;
    var maxY = null;
    var maxValuesLength = 0;

    series.forEach(function (item) {
      item.values.forEach(function (value) {
        var x = value[0];
        var y = value[1];

        if (null === minX) {
          minX = x;
          maxX = x;
          minY = y;
          maxY = y;
        } else {
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }
      });
      maxValuesLength = Math.max(maxValuesLength, item.values.length);
    });

    if (null === minX) {
      minX = 0;
      maxX = 100;
      minY = 0;
      maxY = 100;
    }

    if ('bar' === this.props.type) {
      /*jshint -W083 */
      for (var i=0; i<maxValuesLength; i++) {
        var sumY = 0;
        series.forEach(function (item) {
          sumY += item.values[i][1];
        });
        maxY = Math.max(maxY, sumY);
      }
    }

    if (this.props.threshold) {
      minY = Math.min(minY, this.props.threshold);
      maxY = Math.max(maxY, this.props.threshold);
    }
    minY = this.props.min || minY;
    maxY = this.props.max || maxY;
    var spanX = maxX - minX;
    var spanY = maxY - minY;
    var scaleX = (BASE_WIDTH / spanX);
    if ('bar' === this.props.type) {
      scaleX = (BASE_WIDTH / (spanX + (spanX / maxValuesLength)));
    }
    var scaleY = (BASE_HEIGHT / spanY);

    var result = {
      minX: minX,
      maxX: maxX,
      minY: minY,
      maxY: maxY,
      spanX: spanX,
      spanY: spanY,
      scaleX: scaleX,
      scaleY: scaleY,
      steps: maxValuesLength
    };

    return result;
  },

  getDefaultProps: function () {
    return {type: 'line'};
  },

  getInitialState: function () {
    var bounds = this._bounds(this.props.series);
    return {
      bounds: bounds,
      activeIndex: 0
    };
  },

  componentDidMount: function() {
    window.addEventListener('resize', this._onResize);
    setTimeout(this._onResize, 10);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this._onResize);
  },

  componentWillReceiveProps: function (newProps) {
    var bounds = this._bounds(newProps.series);
    this.setState({
      bounds: bounds,
      activeIndex: 0
    });
  },

  _translateX: function (x) {
    var bounds = this.state.bounds;
    return ((x - bounds.minX) * bounds.scaleX);
  },

  _translateY: function (y) {
    // leave room for line width since strokes are aligned to the center
    return Math.max(1, (BASE_HEIGHT - Math.max(1, this._translateHeight(y))));
  },

  _translateHeight: function (y) {
    var bounds = this.state.bounds;
    return ((y - bounds.minY) * bounds.scaleY);
  },

  _coordinates: function (point) {
    return this._translateX(point[0]) + ',' + this._translateY(point[1]);
  },

  _renderGrid: function () {
    var paths = [];

    var step = BASE_WIDTH / this.state.bounds.steps;
    for (var i=0; i<=BASE_WIDTH; i = i + step) {
      paths.push(
        <path key={i} fill="none" d={"M" + i + ",0L" + i + "," + BASE_HEIGHT} />
      );
    }

    step = BASE_HEIGHT / 5;
    for (i=BASE_HEIGHT; i>=0; i = i - step) {
      paths.push(
        <path key={1000 + i} fill="none" d={"M0," + i + "L" + BASE_WIDTH + "," + i} />
      );
    }

    return (
      <g className="chart__grid">{paths}</g>
    );
  },

  _itemColorIndex: function (item, index) {
    return item.colorIndex || ('graph-' + (index + 1));
  },

  _renderLineOrAreaValues: function () {
    var close = 'L0,' + BASE_HEIGHT + 'L' + BASE_WIDTH + ',' + BASE_HEIGHT + 'Z';
    var values = this.props.series.map(function (item, index) {

      var colorIndex = this._itemColorIndex(item, index);
      var commands = null;

      item.values.forEach(function (value) {
        if (null === commands) {
          commands = "M" + this._coordinates(value);
        } else {
          commands += "L" + this._coordinates(value);
        }
      }, this);

      var path = null;
      if ('line' === this.props.type) {
        path = (
          <path fill="none" className={"chart__values-line color-index-" + colorIndex}
            d={commands} />
        );
      } else {
        path = (
          <path stroke="none" className={"chart__values-area color-index-" + colorIndex}
            d={commands + close} />
        );
      }

      return (
        <g key={index}>
          {path}
        </g>
      );
    }, this);

    return values;
  },

  _renderBarValues: function () {
    var step = BASE_WIDTH / this.state.bounds.steps;
    var bars = [];

    /*jshint -W083 */
    for (var i=0; i<this.state.bounds.steps; i++) {
      var baseY = this.state.bounds.minY;
      var stepBars = this.props.series.map(function (item, index) {
        var colorIndex = item.colorIndex || ('graph-' + (index + 1));
        var value = item.values[i];
        var stepBarHeight = this._translateHeight(value[1]);
        var stepBarBase = this._translateHeight(baseY);
        baseY += value[1];
        var classes = ["chart__values-bar", "color-index-" + colorIndex];
        if (! this.props.legend || i === this.state.activeIndex) {
          classes.push("chart__values-bar--active");
        }

        return (
          <rect key={item.label}
            className={classes.join(' ')}
            x={this._translateX(value[0])}
            y={BASE_HEIGHT - (stepBarHeight + stepBarBase)}
            width={step-3} height={stepBarHeight} />
        );
      }, this);

      bars.push(
        <g key={i}
          onMouseOver={this._onMouseOver.bind(this, i)}
          onMouseOut={this._onMouseOut.bind(this, i)}>
          {stepBars}
        </g>
      );
    }

    return bars;
  },

  _renderLegend: function () {
    var total = 0;
    var legends = this.props.series.map(function (item, index) {
      var colorIndex = this._itemColorIndex(item, index);
      var value = item.values[this.state.activeIndex];
      total += value[1];
      return (
        <li key={item.label} className="chart__legend-item">
          <svg className={"chart__legend-item-swatch color-index-" + colorIndex}
            viewBox="0 0 12 12">
            <path className={item.className} d="M 5 0 l 0 12" />
          </svg>
          <span className="chart__legend-item-label">{item.label}</span>
          <span className="chart__legend-item-value">{value[1]}</span>
          <span className="chart__legend-item-units">{this.props.units}</span>
        </li>
      );
    }, this);

    var label = null;
    if (this.props.xAxis) {
      label = (
        <li className="chart__legend-label">
          {this.props.xAxis[this.state.activeIndex]}
        </li>
      );
    }

    return (
      <ol className="chart__legend">
        {label}
        {legends}
        <li className="chart__legend-total">
          <span className="chart__legend-total-label">Total</span>
          <span className="chart__legend-total-value">{total}</span>
          <span className="chart__legend-total-units">{this.props.units}</span>
        </li>
      </ol>
    );
  },

  render: function() {
    var grid = null; // this._renderGrid();

    var values = null;
    if ('line' === this.props.type || 'area' === this.props.type) {
      values = this._renderLineOrAreaValues();
    } else if ('bar' === this.props.type) {
      values = this._renderBarValues();
    }

    var threshold = null;
    if (this.props.threshold) {
      var y = this._translateY(this.props.threshold);
      var commands = 'M0,' + y + 'L' + BASE_WIDTH + ',' + y;
      threshold = (
        <g>
          <path className="chart__threshold" fill="none" d={commands} />
        </g>
      );
    }

    var legend = null;
    if (this.props.legend) {
      legend = this._renderLegend();
    }

    return (
      <div className="chart">
        <svg className="chart__graphic" viewBox={"0 0 " + BASE_WIDTH + " " + BASE_HEIGHT}
          preserveAspectRatio="none">
          {grid}
          <g className="chart__values">{values}</g>
          {threshold}
        </svg>
        {legend}
      </div>
    );
  }

});

module.exports = Chart;
