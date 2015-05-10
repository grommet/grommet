// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_ROOT = "chart";
var BASE_WIDTH = 400;
var BASE_HEIGHT = 200;
var XAXIS_HEIGHT = 20;
var BAR_PADDING = 2;

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

  _onMouseOver: function (xIndex) {
    this.setState({activeXIndex: xIndex});
  },

  _onMouseOut: function () {
    this.setState({activeXIndex: 0});
  },

  _onResize: function() {
    if (this.props.legend) {
      this._alignLegend();
    }
  },

  _bounds: function (series, xAxis) {
    // analyze series data
    var minX = null;
    var maxX = null;
    var minY = null;
    var maxY = null;
    xAxis = xAxis || [];

    series.forEach(function (item) {
      item.values.forEach(function (value, xIndex) {
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
        if (xIndex >= xAxis.length) {
          xAxis.push('');
        }
      });
    });

    if (null === minX) {
      minX = 0;
      maxX = 100;
      minY = 0;
      maxY = 100;
    }

    if ('bar' === this.props.type) {
      xAxis.forEach(function (label, xIndex) {
        var sumY = 0;
        series.forEach(function (item) {
          sumY += item.values[xIndex][1];
        });
        maxY = Math.max(maxY, sumY);
      });
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
    var xStepWidth = (BASE_WIDTH / xAxis.length);
    if ('bar' === this.props.type) {
      // allow room for bar width for last bar
      scaleX = (BASE_WIDTH / (spanX + (spanX / (xAxis.length - 1))));
    }
    var scaleY = (BASE_HEIGHT / spanY);
    if (this.props.xAxis) {
      // reserve room for the xAxis
      scaleY = ((BASE_HEIGHT - XAXIS_HEIGHT) / spanY);
    }

    var result = {
      minX: minX,
      maxX: maxX,
      minY: minY,
      maxY: maxY,
      spanX: spanX,
      spanY: spanY,
      scaleX: scaleX,
      scaleY: scaleY,
      xStepWidth: xStepWidth,
      xAxis: xAxis
    };

    return result;
  },

  _alignLegend: function () {
    // align legend with active index
    var legendElement = this.refs.legend.getDOMNode();
    var xAxisElement = this.refs.xAxis.getDOMNode();
    var activeElement =
      xAxisElement.querySelectorAll('.chart__xaxis-index--active')[0];
    if (activeElement) {
      var rect = xAxisElement.getBoundingClientRect();
      var activeRect = activeElement.getBoundingClientRect();
      var legendRect = legendElement.getBoundingClientRect();
      var left = ((activeRect.left - rect.left) + (2 * BAR_PADDING));
      if ((left + legendRect.width) > rect.width) {
        left -= ((left + legendRect.width) - rect.width + (2 * BAR_PADDING));
      }
      legendElement.style.left = '' + left + 'px';
    }
  },

  getDefaultProps: function () {
    return {type: 'line'};
  },

  getInitialState: function () {
    var bounds = this._bounds(this.props.series, this.props.xAxis);
    return {
      bounds: bounds,
      activeXIndex: 0
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
    var bounds = this._bounds(newProps.series, newProps.xAxis);
    this.setState({
      bounds: bounds,
      activeXIndex: 0
    });
  },

  componentDidUpdate: function () {
    if (this.props.legend) {
      this._alignLegend();
    }
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

  /*_renderGrid: function () {
    var paths = [];

    for (var i=0; i<=BASE_WIDTH; i = i + this.state.bounds.xStepWidth) {
      paths.push(
        <path key={i} fill="none" d={"M" + i + ",0L" + i + "," + BASE_HEIGHT} />
      );
    }

    var step = BASE_HEIGHT / 5;
    for (i=BASE_HEIGHT; i>=0; i = i - step) {
      paths.push(
        <path key={1000 + i} fill="none" d={"M0," + i + "L" + BASE_WIDTH + "," + i} />
      );
    }

    return (
      <g className={CLASS_ROOT + "__grid"}>{paths}</g>
    );
  },*/

  _itemColorIndex: function (item, seriesIndex) {
    return item.colorIndex || ('graph-' + (seriesIndex + 1));
  },

  _renderLineOrAreaValues: function () {
    var close = 'L0,' + BASE_HEIGHT + 'L' + BASE_WIDTH + ',' + BASE_HEIGHT + 'Z';
    var values = this.props.series.map(function (item, seriesIndex) {

      var colorIndex = this._itemColorIndex(item, seriesIndex);
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
          <path fill="none" className={CLASS_ROOT + "__values-line color-index-" + colorIndex}
            d={commands} />
        );
      } else {
        path = (
          <path stroke="none" className={CLASS_ROOT + "__values-area color-index-" + colorIndex}
            d={commands + close} />
        );
      }

      return (
        <g key={seriesIndex}>
          {path}
        </g>
      );
    }, this);

    return values;
  },

  _renderBarValues: function () {
    var bounds = this.state.bounds;

    var bars = bounds.xAxis.map(function (label, xIndex) {
      var baseY = bounds.minY;
      var stepBars = this.props.series.map(function (item, seriesIndex) {
        var colorIndex = item.colorIndex || ('graph-' + (seriesIndex + 1));
        var value = item.values[xIndex];
        var stepBarHeight = this._translateHeight(value[1]);
        var stepBarBase = this._translateHeight(baseY);
        baseY += value[1];
        var classes = [CLASS_ROOT + "__values-bar", "color-index-" + colorIndex];
        if (! this.props.legend || xIndex === this.state.activeXIndex) {
          classes.push(CLASS_ROOT + "__values-bar--active");
        }

        return (
          <rect key={item.label}
            className={classes.join(' ')}
            x={this._translateX(value[0]) + BAR_PADDING}
            y={BASE_HEIGHT - (stepBarHeight + stepBarBase)}
            width={bounds.xStepWidth - (2 * BAR_PADDING)}
            height={stepBarHeight} />
        );
      }, this);

      return (
        <g key={xIndex}>
          {stepBars}
        </g>
      );
    }, this);

    return bars;
  },

  _renderXAxis: function () {
    var bounds = this.state.bounds;
    var size = Math.min(XAXIS_HEIGHT / 1.7,
      Math.max((XAXIS_HEIGHT / 3),
        (XAXIS_HEIGHT - (bounds.xAxis.length))));
    var labelY = XAXIS_HEIGHT * 0.6;

    var labels = bounds.xAxis.map(function (label, xIndex) {
      var classes = [CLASS_ROOT + "__xaxis-index"];
      if (xIndex === this.state.activeXIndex) {
        classes.push(CLASS_ROOT + "__xaxis-index--active");
      }

      var x = (bounds.xAxis.length - xIndex - 1) * bounds.xStepWidth;
      var text = null;
      if (this.props.xAxis) {
        text = (<text x={x + BAR_PADDING} y={labelY} fontSize={size}>{label}</text>);
      }

      return (
        <g key={xIndex} className={classes.join(' ')}
          onMouseOver={this._onMouseOver.bind(this, xIndex)}
          onMouseOut={this._onMouseOut.bind(this, xIndex)}>
          <rect className={CLASS_ROOT + "__xaxis-index-background"}
            x={x} y={0} width={bounds.xStepWidth} height={BASE_HEIGHT} />
          {text}
        </g>
      );
    }, this);

    return (
      <g ref="xAxis" className={CLASS_ROOT + "__xaxis"}>
        {labels}
      </g>
    );
  },

  _renderLegend: function () {
    var total = 0;
    var legends = this.props.series.map(function (item, seriesIndex) {
      var classes = [CLASS_ROOT + "__legend-item"];
      var colorIndex = this._itemColorIndex(item, seriesIndex);
      var value = item.values[this.state.activeXIndex];
      total += value[1];
      if (0 === value[1]) {
        classes.push(CLASS_ROOT + "__legend-item--unset");
      }

      return (
        <li key={item.label} className={classes.join(' ')}>
          <svg className={CLASS_ROOT + "__legend-item-swatch color-index-" + colorIndex}
            viewBox="0 0 12 12">
            <path className={item.className} d="M 5 0 l 0 12" />
          </svg>
          <span className={CLASS_ROOT + "__legend-item-label"}>{item.label}</span>
          <span className={CLASS_ROOT + "__legend-item-value"}>{value[1]}</span>
          <span className={CLASS_ROOT + "__legend-item-units"}>{this.props.units}</span>
        </li>
      );
    }, this);

    var label = null;
    if (false && this.props.xAxis) {
      label = (
        <li className={CLASS_ROOT + "__legend-label"}>
          {this.props.xAxis[this.state.activeXIndex]}
        </li>
      );
    }

    return (
      <ol ref="legend" className={CLASS_ROOT + "__legend"}>
        {label}
        {legends}
        <li className={CLASS_ROOT + "__legend-total"}>
          <span className={CLASS_ROOT + "__legend-total-label"}>Total</span>
          <span className={CLASS_ROOT + "__legend-total-value"}>{total}</span>
          <span className={CLASS_ROOT + "__legend-total-units"}>{this.props.units}</span>
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
          <path className={CLASS_ROOT + "__threshold"} fill="none" d={commands} />
        </g>
      );
    }

    var legend = null;
    if (this.props.legend) {
      legend = this._renderLegend();
    }

    var xAxis = null;
    if (this.props.legend || this.props.xAxis) {
      xAxis = this._renderXAxis();
    }

    return (
      <div className={CLASS_ROOT}>
        <svg className={CLASS_ROOT + "__graphic"}
          viewBox={"0 0 " + BASE_WIDTH + " " + BASE_HEIGHT}
          preserveAspectRatio="none">
          {grid}
          <g className={CLASS_ROOT + "__values"}>{values}</g>
          {threshold}
          {xAxis}
        </svg>
        {legend}
      </div>
    );
  }

});

module.exports = Chart;
