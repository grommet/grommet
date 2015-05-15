// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_ROOT = "chart";
var DEFAULT_WIDTH = 400;
var DEFAULT_HEIGHT = 200;
var XAXIS_HEIGHT = 24;
var BAR_PADDING = 2;

var Chart = React.createClass({

  propTypes: {
    height: React.PropTypes.number,
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
    width: React.PropTypes.number,
    xAxis: React.PropTypes.arrayOf(React.PropTypes.string)
  },

  getDefaultProps: function () {
    return {
      type: 'line',
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT
    };
  },

  _onMouseOver: function (xIndex) {
    this.setState({activeXIndex: xIndex});
  },

  _onMouseOut: function () {
    this.setState({activeXIndex: 0});
  },

  _onResize: function() {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  },

  _layout: function () {
    if (this.props.legend) {
      this._alignLegend();
    }
    var element = this.refs.chart.getDOMNode();
    var rect = element.getBoundingClientRect();
    if (rect.width !== this.state.width || rect.height !== this.state.height) {
      this.setState({
        width: rect.width,
        height: rect.height,
        bounds: this._bounds(this.props.series, this.props.xAxis, rect.width, rect.height)
      });
    }
  },

  _bounds: function (series, xAxis, width, height) {
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
    var scaleX = (width / spanX);
    var xStepWidth = (width / xAxis.length);
    if ('bar' === this.props.type) {
      // allow room for bar width for last bar
      scaleX = (width / (spanX + (spanX / (xAxis.length - 1))));
    }
    var scaleY = (height / spanY);
    if (xAxis) {
      // reserve room for the xAxis
      scaleY = ((height - XAXIS_HEIGHT) / spanY);
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
    var frontElement = this.refs.front.getDOMNode();
    var activeElement =
      frontElement.querySelectorAll('.chart__front-band--active')[0];
    if (activeElement) {
      var rect = frontElement.getBoundingClientRect();
      var activeRect = activeElement.getBoundingClientRect();
      var legendRect = legendElement.getBoundingClientRect();
      var left = (activeRect.right - rect.left);
      if ((left + legendRect.width) > rect.width) {
        left = (activeRect.left - rect.left) - legendRect.width;
      }
      legendElement.style.left = '' + left + 'px ';
      legendElement.style.top = '' + (XAXIS_HEIGHT * 2) + 'px ';
    }
  },

  getInitialState: function () {
    var bounds = this._bounds(this.props.series, this.props.xAxis,
      this.props.width, this.props.height);
    return {
      bounds: bounds,
      activeXIndex: 0,
      width: this.props.width,
      height: this.props.height
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
    var bounds = this._bounds(newProps.series, newProps.xAxis,
      newProps.width, newProps.height);
    this.setState({
      bounds: bounds,
      activeXIndex: 0,
      width: newProps.width,
      height: newProps.height
    });
  },

  componentDidUpdate: function () {
    this._layout();
  },

  _translateX: function (x) {
    var bounds = this.state.bounds;
    return ((x - bounds.minX) * bounds.scaleX);
  },

  _translateY: function (y) {
    // leave room for line width since strokes are aligned to the center
    return Math.max(1, (this.state.height - Math.max(1, this._translateHeight(y))));
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

    for (var i=0; i<=this.state.width; i = i + this.state.bounds.xStepWidth) {
      paths.push(
        <path key={i} fill="none" d={"M" + i + ",0L" + i + "," + this.state.height} />
      );
    }

    var step = this.state.height / 5;
    for (i=this.state.height; i>=0; i = i - step) {
      paths.push(
        <path key={1000 + i} fill="none" d={"M0," + i + "L" + this.state.width + "," + i} />
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
    var close = 'L0,' + this.state.height +
      'L' + this.state.width + ',' + this.state.height + 'Z';
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
          <path fill="none"
            className={CLASS_ROOT + "__values-line color-index-" + colorIndex}
            d={commands} />
        );
      } else {
        path = (
          <path stroke="none"
            className={CLASS_ROOT + "__values-area color-index-" + colorIndex}
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
            y={this.state.height - (stepBarHeight + stepBarBase)}
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
    var labelY = XAXIS_HEIGHT * 0.6;

    var labels = bounds.xAxis.map(function (label, xIndex) {
      var classes = [CLASS_ROOT + "__xaxis-index"];
      if (xIndex === this.state.activeXIndex) {
        classes.push(CLASS_ROOT + "__xaxis-index--active");
      }

      var x = (bounds.xAxis.length - xIndex - 1) * bounds.xStepWidth;
      var text = null;
      if (this.props.xAxis) {
        text = (<text x={x + BAR_PADDING} y={labelY} fontSize={16}>{label}</text>);
      }

      return (
        <g key={xIndex} className={classes.join(' ')}>
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

  _renderBands: function (layer) {
    var className = "chart__" + layer;
    var bounds = this.state.bounds;

    var bands = bounds.xAxis.map(function (label, xIndex) {
      var classes = [className + "-band"];
      if (xIndex === this.state.activeXIndex) {
        classes.push(className + "-band--active");
      }

      var x = (bounds.xAxis.length - xIndex - 1) * bounds.xStepWidth;
      var onMouseOver;
      var onMouseOut;
      if ('front' === layer) {
        onMouseOver = this._onMouseOver.bind(this, xIndex);
        onMouseOut = this._onMouseOut.bind(this, xIndex);
      }

      return (
        <g key={xIndex} className={classes.join(' ')}
          onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
          <rect className={className + "-band-background"}
            x={x} y={0} width={bounds.xStepWidth} height={this.state.height} />
        </g>
      );
    }, this);

    return (
      <g ref={layer} className={className}>
        {bands}
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
      var commands = 'M0,' + y + 'L' + this.state.width + ',' + y;
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
    if (this.props.xAxis) {
      xAxis = this._renderXAxis();
    }
    var backBands = null;
    var frontBands = null;
    if (this.props.legend) {
      backBands = this._renderBands('back');
      frontBands = this._renderBands('front');
    }

    return (
      <div className={CLASS_ROOT}>
        <svg ref="chart" className={CLASS_ROOT + "__graphic"}
          viewBox={"0 0 " + this.state.width + " " + this.state.height}
          preserveAspectRatio="none">
          {grid}
          {backBands}
          {xAxis}
          <g className={CLASS_ROOT + "__values"}>{values}</g>
          {frontBands}
          {threshold}
        </svg>
        {legend}
      </div>
    );
  }

});

module.exports = Chart;
