// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Legend = require('./Legend');

var CLASS_ROOT = "chart";

var DEFAULT_WIDTH = 400;
var DEFAULT_HEIGHT = 200;
var XAXIS_HEIGHT = 24;
var BAR_PADDING = 2;

var Chart = React.createClass({

  propTypes: {
    important: React.PropTypes.number,
    large: React.PropTypes.bool,
    legend: React.PropTypes.bool,
    legendTotal: React.PropTypes.bool,
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
        ).isRequired,
        colorIndex: React.PropTypes.string
      })
    ).isRequired,
    small: React.PropTypes.bool,
    smooth: React.PropTypes.bool,
    threshold: React.PropTypes.number,
    type: React.PropTypes.oneOf(['line', 'bar', 'area']),
    units: React.PropTypes.string,
    xAxis: React.PropTypes.arrayOf(React.PropTypes.shape({
      value: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.object // Date
      ]).isRequired,
      label: React.PropTypes.string.isRequired
    }))
  },

  getDefaultProps: function () {
    return {
      min: 0,
      type: 'line'
    };
  },

  _onMouseOver: function (xIndex) {
    this.setState({activeXIndex: xIndex});
  },

  _onMouseOut: function () {
    this.setState({activeXIndex: this.state.defaultXIndex});
  },

  _onResize: function() {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  },

  // Performs some initial calculations to make subsequent calculations easier.
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
          xAxis.push({value: x, label: ''});
        }
      });
    });

    if (null === minX) {
      minX = 0;
      maxX = 1;
      minY = 0;
      maxY = 100;
    }

    if ('bar' === this.props.type) {
      xAxis.forEach(function (obj, xIndex) {
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
    if (this.props.hasOwnProperty('min')) {
      minY = this.props.min;
    }
    if (this.props.hasOwnProperty('max')) {
      maxY = this.props.max;
    }
    var spanX = maxX - minX;
    var spanY = maxY - minY;
    var scaleX = (width / spanX);
    var xStepWidth = (width / (xAxis.length - 1));
    if ('bar' === this.props.type) {
      // allow room for bar width for last bar
      xStepWidth = (width / xAxis.length);
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

  // Aligns the legend with the current position of the cursor, if any.
  _alignLegend: function () {
    if (this.state.activeXIndex >= 0) {
      var cursorElement = this.refs.cursor.getDOMNode();
      var cursorRect = cursorElement.getBoundingClientRect();
      var element = this.refs.chart.getDOMNode();
      var rect = element.getBoundingClientRect();
      var legendElement = this.refs.legend.getDOMNode();
      var legendRect = legendElement.getBoundingClientRect();

      var left = cursorRect.left - rect.left + 1;
      // if the legend would be outside the graphic, orient it to the right.
      if ((left + legendRect.width) > rect.width) {
        left -= legendRect.width + 3;
      }
      legendElement.style.left = '' + left + 'px ';
      legendElement.style.top = '' + (XAXIS_HEIGHT) + 'px ';
    }
  },

  // Adjusts the legend position and set the width, height, and
  // redo the bounds calculations.
  // Called whenever the browser resizes or new properties arrive.
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
        bounds: this._bounds(this.props.series, this.props.xAxis,
          rect.width, rect.height)
      });
    }
  },

  // Generates state based on the provided props.
  _stateFromProps: function (props, width, height) {
    var bounds = this._bounds(props.series, props.xAxis, width, height);
    var defaultXIndex = -1;
    if (props.series && props.series.length > 0) {
      defaultXIndex = 0;
    }
    if (props.hasOwnProperty('important')) {
      defaultXIndex = props.important;
    }
    return {
      bounds: bounds,
      defaultXIndex: defaultXIndex,
      activeXIndex: defaultXIndex,
      width: width,
      height: height
    };
  },

  getInitialState: function () {
    return this._stateFromProps(this.props, DEFAULT_WIDTH, DEFAULT_HEIGHT);
  },

  componentDidMount: function() {
    window.addEventListener('resize', this._onResize);
    this._onResize();
  },

  componentWillUnmount: function() {
    clearTimeout(this._resizeTimer);
    window.removeEventListener('resize', this._onResize);
  },

  componentWillReceiveProps: function (newProps) {
    var state = this._stateFromProps(newProps,
      this.state.width, this.state.height);
    this.setState(state);
  },

  componentDidUpdate: function () {
    this._layout();
  },

  // Translates X value to X coordinate.
  _translateX: function (x) {
    var bounds = this.state.bounds;
    return ((x - bounds.minX) * bounds.scaleX);
  },

  // Translates Y value to Y coordinate.
  _translateY: function (y) {
    // leave room for line width since strokes are aligned to the center
    return Math.max(1,
      (this.state.height - Math.max(1, this._translateHeight(y))));
  },

  // Translates Y value to graph height.
  _translateHeight: function (y) {
    var bounds = this.state.bounds;
    return ((y - bounds.minY) * bounds.scaleY);
  },

  // Translates X and Y values to X and Y coordinates.
  _coordinates: function (point) {
    return [this._translateX(point[0]), this._translateY(point[1])];
  },

  // Uses the provided colorIndex or provides one based on the seriesIndex.
  _itemColorIndex: function (item, seriesIndex) {
    return item.colorIndex || ('graph-' + (seriesIndex + 1));
  },

  // Determines what the appropriate control coordinates are on
  // either side of the coordinate at the specified index.
  // This calculation is a simplified smoothing function that
  // just looks at whether the line through this coordinate is
  // ascending, descending or not. Peaks, valleys, and flats are
  // treated the same.
  _controlCoordinates: function (coordinates, index) {
    var current = coordinates[index];
    // Use previous and next coordinates when available, otherwise use
    // the current coordinate for them.
    var previous = current;
    if (index > 0) {
      previous = coordinates[index-1];
    }
    var next = current;
    if (index < coordinates.length - 1) {
      next = coordinates[index+1];
    }

    // Put the control X coordinates midway between the coordinates.
    var deltaX = (current[0] - previous[0]) / 2;
    var deltaY;

    // Start with a flat slope. This works for peaks, valleys, and flats.
    var first = [current[0] - deltaX, current[1]];
    var second = [current[0] + deltaX, current[1]];

    if (previous[1] < current[1] && current[1] < next[1]) {
      // Ascending, use the minimum positive slope.
      deltaY = Math.min(((current[1] - previous[1]) / 2),
        ((next[1] - current[1]) / 2));
      first[1] = current[1] - deltaY;
      second[1] = current[1] + deltaY;
    } else if (previous[1] > current[1] && current[1] > next[1]) {
      // Descending, use the minimum negative slope.
      deltaY = Math.min(((previous[1] - current[1]) / 2),
        ((current[1] - next[1]) / 2));
      first[1] = current[1] + deltaY;
      second[1] = current[1] - deltaY;
    }
    return [first, second];
  },

  // Converts the series data into paths for line or area types.
  _renderLinesOrAreas: function () {
    var values = this.props.series.map(function (item, seriesIndex) {

      // Get all coordinates up front so they are available
      // if we are drawing a smooth chart.
      var coordinates = item.values.map(function (value) {
        return this._coordinates(value);
      }, this);

      var colorIndex = this._itemColorIndex(item, seriesIndex);
      var className = CLASS_ROOT + "__values-" + this.props.type +
        " color-index-" + colorIndex;
      var commands = null;
      var controlCoordinates = null;
      var previousControlCoordinates = null;

      // Build the commands for this set of coordinates.
      coordinates.forEach(function (coordinate, index) {
        if (this.props.smooth) {
          controlCoordinates = this._controlCoordinates(coordinates, index);
        }
        if (0 === index) {
          commands = "M" + coordinate.join(',');
        } else {
          if (this.props.smooth) {
            // Use the previous right control coordinate and the current
            // left control coordinate. We do this because we calculate
            // the left and right sides for a particular index together,
            // so the path is smooth but the SVG C command needs the
            // right one from the previous index and the left one from
            // the current index.
            commands += " C" + previousControlCoordinates[1].join(',') + " " +
              controlCoordinates[0].join(',') + " " + coordinate.join(',');
          } else {
            commands += " L" + coordinate.join(',');
          }
        }
        previousControlCoordinates = controlCoordinates;
      }, this);

      var path = null;
      if ('line' === this.props.type) {
        path = (
          <path fill="none" className={className} d={commands} />
        );
      } else if ('area' === this.props.type) {
        // For area charts, close the path by drawing down to the bottom
        // and across to the bottom of where we started.
        var close = 'L' + coordinates[coordinates.length - 1][0] +
          ',' + this.state.height +
          'L' + coordinates[0][0] + ',' + this.state.height + 'Z';
        commands += close;

        // _renderGradients() constructs the fill gradient referred to here.
        var fill = 'url(#' + CLASS_ROOT + "__gradient-" + colorIndex + ')';

        path = (
          <path stroke="none" className={className} fill={fill} d={commands} />
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

  // Converts the series data into rects for bar types.
  _renderBars: function () {
    var bounds = this.state.bounds;

    var bars = bounds.xAxis.map(function (obj, xIndex) {
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

        // _renderGradients() constructs the fill gradient referred to here.
        var fill = 'url(#' + CLASS_ROOT + "__gradient-" + colorIndex + ')';

        return (
          <rect key={item.label}
            className={classes.join(' ')}
            fill={fill}
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

  // Converts the threshold value into a line.
  _renderThreshold: function () {
    var y = this._translateY(this.props.threshold);
    var commands = 'M0,' + y + 'L' + this.state.width + ',' + y;
    return (
      <g className={CLASS_ROOT + "__threshold"}>
        <path fill="none" d={commands} />
      </g>
    );
  },

  // Creates the gradient definitions for the color indexes used.
  _renderGradients: function () {
    var gradients = this.props.series.map(function (item, seriesIndex) {
      var colorIndex = this._itemColorIndex(item, seriesIndex);
      // The id here must match the fill url used in _renderLineOrAreaValues().
      // Actual coloring of the gradient is driven by the stylesheets.
      return (
        <linearGradient key={colorIndex}
          id={CLASS_ROOT + "__gradient-" + colorIndex}
          className={CLASS_ROOT + "__gradient color-index-" + colorIndex}
          x1="0" x2="0" y1="0" y2="1">
          <stop className={"begin"} offset="0"/>
          <stop className={"end"} offset="1"/>
        </linearGradient>
      );
    }, this);
    return <defs>{gradients}</defs>;
  },

  // Converts the xAxis labels into texts.
  _renderXAxis: function () {
    var bounds = this.state.bounds;
    var labelY = XAXIS_HEIGHT * 0.6;

    var labels = bounds.xAxis.map(function (obj, xIndex) {
      var classes = [CLASS_ROOT + "__xaxis-index"];
      if (xIndex === this.state.activeXIndex) {
        classes.push(CLASS_ROOT + "__xaxis-index--active");
      }

      var x = this._translateX(obj.value);
      var anchor;
      if ('line' === this.props.type || 'area' === this.props.type) {
        // Place the text in the middle for line and area type charts.
        anchor = 'middle';
        if (x <= 0) {
          // This is the first data point, align the text to the left edge.
          x = 0;
          anchor = 'start';
        }
        if (x >= this.state.width) {
          // This is the last data point, align the text to the right edge.
          x = this.state.width - 3;
          anchor = 'end';
        }
      }

      return (
        <g key={xIndex} className={classes.join(' ')}>
          <text x={x + BAR_PADDING} y={labelY}
            textAnchor={anchor} fontSize={16}>
            {obj.label}
          </text>
        </g>
      );
    }, this);

    return (
      <g ref="xAxis" className={CLASS_ROOT + "__xaxis"}>
        {labels}
      </g>
    );
  },

  // Create vertical rects for each X data point.
  // These are used to track the mouse hover.
  _renderXBands: function (layer) {
    var className = CLASS_ROOT + "__" + layer;
    var bounds = this.state.bounds;

    var bands = bounds.xAxis.map(function (obj, xIndex) {
      var classes = [className + "-xband"];
      if (xIndex === this.state.activeXIndex) {
        classes.push(className + "-xband--active");
      }

      // For bar charts, the band is left aligned with the bars.
      var x = this._translateX(obj.value);
      if ('line' === this.props.type || 'area' === this.props.type) {
        // For line and area charts, the band is centered.
        x -= (bounds.xStepWidth / 2);
      }

      var onMouseOver;
      var onMouseOut;
      if ('front' === layer) {
        onMouseOver = this._onMouseOver.bind(this, xIndex);
        onMouseOut = this._onMouseOut.bind(this, xIndex);
      }

      return (
        <g key={xIndex} className={classes.join(' ')}
          onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
          <rect className={className + "-xband-background"}
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

  // Converts the active X index to a line.
  _renderCursor: function () {
    var value = this.props.series[0].values[this.state.activeXIndex];
    var coordinates = this._coordinates(value);
    // Offset it just a little if it is at an edge.
    var x = Math.max(1, Math.min(coordinates[0], this.state.width - 1));
    return (
      <g ref="cursor" className={CLASS_ROOT + "__cursor"}>
        <path fill="none" d={"M" + x + "," + XAXIS_HEIGHT + "L" + x + "," + this.state.height} />
      </g>
    );
  },

  // Builds a Legend appropriate for the currently active X index.
  _renderLegend: function () {
    var activeSeries = this.props.series.map(function (item) {
      return {
        label: item.label,
        value: item.values[this.state.activeXIndex][1],
        units: item.units,
        colorIndex: item.colorIndex
      };
    }, this);
    return (
      <Legend ref="legend" className={CLASS_ROOT + "__legend"}
        series={activeSeries}
        total={this.props.legendTotal}
        units={this.props.units} />
    );
  },

  render: function() {
    var classes = [CLASS_ROOT];
    classes.push(CLASS_ROOT + "--" + this.props.type);
    if (this.props.small) {
      classes.push(CLASS_ROOT + "--small");
    }
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }

    var values = null;
    if ('line' === this.props.type || 'area' === this.props.type) {
      values = this._renderLinesOrAreas();
    } else if ('bar' === this.props.type) {
      values = this._renderBars();
    }

    var gradients = null;
    if (('area' === this.props.type || 'bar' === this.props.type) &&
      this.state.activeXIndex >= 0) {
      gradients = this._renderGradients();
    }

    var threshold = null;
    if (this.props.threshold) {
      threshold = this._renderThreshold();
    }

    var cursor = null;
    var legend = null;
    if (this.props.legend && this.state.activeXIndex >= 0) {
      cursor = this._renderCursor();
      legend = this._renderLegend();
    }

    var xAxis = null;
    if (this.props.xAxis) {
      xAxis = this._renderXAxis();
    }

    var frontBands = null;
    if (this.props.legend) {
      frontBands = this._renderXBands('front');
    }

    return (
      <div className={classes.join(' ')}>
        <svg ref="chart" className={CLASS_ROOT + "__graphic"}
          viewBox={"0 0 " + this.state.width + " " + this.state.height}
          preserveAspectRatio="none">
          {gradients}
          {xAxis}
          <g className={CLASS_ROOT + "__values"}>{values}</g>
          {frontBands}
          {threshold}
          {cursor}
        </svg>
        {legend}
      </div>
    );
  }

});

module.exports = Chart;
