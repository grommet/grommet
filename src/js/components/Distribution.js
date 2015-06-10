// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Legend = require('./Legend');

var CLASS_ROOT = "distribution";

var DEFAULT_WIDTH = 400;
var DEFAULT_HEIGHT = 200;

var Distribution = React.createClass({

  propTypes: {
    large: React.PropTypes.bool,
    legend: React.PropTypes.bool,
    legendTotal: React.PropTypes.bool,
    series: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.number.isRequired,
      colorIndex: React.PropTypes.string,
      important: React.PropTypes.bool,
      onClick: React.PropTypes.func
    })),
    small: React.PropTypes.bool,
    units: React.PropTypes.string,
    vertical: React.PropTypes.bool
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

    var element = this.refs.box.getDOMNode();
    var rect = element.getBoundingClientRect();
    if (rect.width !== this.state.width || rect.height !== this.state.height) {
      this.setState({
        width: rect.width,
        height: rect.height
      });
    }
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

    var state = {
      total: total
    };

    return state;
  },

  getInitialState: function() {
    var state = this._stateFromProps(this.props);
    state.legendPosition = 'bottom';
    state.width = DEFAULT_WIDTH;
    state.height = DEFAULT_HEIGHT;
    return state;
  },

  componentDidMount: function() {
    this._initialTimer = setTimeout(this._initialTimeout, 10);
    window.addEventListener('resize', this._onResize);
    this._onResize();
  },

  componentWillReceiveProps: function (newProps) {
    var state = this._stateFromProps(newProps);
    state.width = this.state.width;
    state.height = this.state.height;
    this.setState(state);
    this._onResize();
  },

  componentWillUnmount: function() {
    clearTimeout(this._resizeTimer);
    window.removeEventListener('resize', this._onResize);
  },

  _itemColorIndex: function (item, index) {
    return item.colorIndex || ('graph-' + (index + 1));
  },

  _renderLegend: function () {
    return (
      <Legend className={CLASS_ROOT + "__legend"}
        series={this.props.series}
        units={this.props.units}
        activeIndex={this.state.activeIndex}
        onActive={this._onActive} />
    );
  },

  render: function() {
    var classes = [CLASS_ROOT];
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
    if (! this.props.series || this.props.series.length === 0) {
      classes.push(CLASS_ROOT + "--loading");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var legend = null;
    if (this.props.legend) {
      legend = this._renderLegend();
    }

    var rects = null;
    if (this.props.series) {
      var areaPer = (this.state.width * this.state.height) / this.state.total;
      var origin = [0, 0];
      var across = false;
      rects = this.props.series.map(function (item, index) {
        var classes = [CLASS_ROOT + "__box"];
        var colorIndex = this._itemColorIndex(item, index);
        classes.push("color-index-" + colorIndex);
        var x = origin[0];
        var y = origin[1];
        var width, height;
        if (across) {
          width = this.state.width - x;
          height = (areaPer * item.value) / width;
          across = false;
          origin[1] += height;
        } else {
          height = this.state.height - y;
          width = (areaPer * item.value) / height;
          across = true;
          origin[0] += width;
        }
        return (
          <rect key={index} className={classes.join(' ')} x={x} y={y} width={width} height={height} />
        );
      }, this);
    }

    return (
      <div className={classes.join(' ')}>
        <svg ref="box" className={CLASS_ROOT + "__graphic"}
          viewBox={"0 0 " + this.state.width + " " + this.state.height}
          preserveAspectRatio="none">
          {rects}
        </svg>
        {legend}
      </div>
    );
  }

});

module.exports = Distribution;
