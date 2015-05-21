// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Legend = require('./Legend');

var CLASS_ROOT = "meter";

var BASE_WIDTH = 192;
var BASE_HEIGHT = 24;
var MID_HEIGHT = BASE_HEIGHT / 2;

// TODO: multi-value meter

var Meter = React.createClass({

  propTypes: {
    legend: React.PropTypes.bool,
    max: React.PropTypes.number,
    min: React.PropTypes.number,
    series: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.number,
      colorIndex: React.PropTypes.oneOfType([
        React.PropTypes.number, // 1-6
        React.PropTypes.string // status
      ]),
      important: React.PropTypes.bool,
      onClick: React.PropTypes.func
    })),
    threshold: React.PropTypes.number,
    units: React.PropTypes.string,
    value: React.PropTypes.number,
    vertical: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      max: 100,
      min: 0
    };
  },

  _initialTimeout: function () {
    this.setState({
      initial: false,
      activeIndex: this.state.importantIndex
    });
    clearTimeout(this._timeout);
  },

  _onActive: function (index) {
    this.setState({initial: false, activeIndex: index});
  },

  _generateSeries: function (props) {
    var remaining = props.max - props.value + props.min;
    return [
      {value: props.value},
      {value: remaining, colorIndex: 'unset'}
    ];
  },

  _importantIndex: function (series) {
    var result = 0;
    series.some(function (data, index) {
      if (data.important) {
        result = index;
        return true;
      }
    });
    return result;
  },

  getInitialState: function() {
    var series = this.props.series || this._generateSeries(this.props);
    return {
      initial: true,
      activeIndex: 0,
      legend: false,
      series: series
    };
  },

  _itemColorIndex: function (item, index) {
    return item.colorIndex || ('graph-' + (index + 1));
  },

  render: function() {
    var classes = [CLASS_ROOT];
    if (this.props.vertical) {
      classes.push(CLASS_ROOT + "--vertical");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    var scale = BASE_WIDTH / (this.props.max - this.props.min);

    var start = 0;
    var bars = this.state.series.map(function (item, index) {
      var colorIndex = this._itemColorIndex(item, index);
      var barClasses = [CLASS_ROOT + "__bar"];
      barClasses.push("color-index-" + colorIndex);
      var distance = Math.round(scale * (item.value - this.props.min));
      var commands = "M" + start + "," + MID_HEIGHT + " L" + (start + distance) + "," + MID_HEIGHT;
      start += distance;
      return(
        <path key={index} className={barClasses.join(' ')} d={commands}
          onMouseOver={this._onActive.bind(this, index)}
          onMouseOut={this._onActive.bind(this, index)}
          onClick={item.onClick} />
      );
    }, this);

    var threshold = null;
    if (this.props.threshold) {
      var distance = scale * (this.props.threshold - this.props.min);
      threshold = (
        <path className={CLASS_ROOT + "__threshold"}
          d={"M" + distance + ",0 L" + distance + "," + BASE_HEIGHT} />
      );
    }

    var legend = null;
    if (this.props.legend) {
      legend = (
        <Legend className={CLASS_ROOT + "__legend"}
          series={this.props.series}
          units={this.props.units}
          activeIndex={this.state.activeIndex}
          onActive={this._onActive} />
      );
    }

    return (
      <div className={classes.join(' ')}>
        <svg className={CLASS_ROOT + "__graphic"}
          viewBox={"0 0 " + BASE_WIDTH + " " + BASE_HEIGHT}
          preserveAspectRatio="xMidYMid meet">
          <g>
            {bars}
            {threshold}
          </g>
        </svg>
        <span className={CLASS_ROOT + "__label"}>
          <span className={CLASS_ROOT + "__label-value"}>{this.props.value}</span>
          <span className={CLASS_ROOT + "__label-units"}>{this.props.units}</span>
        </span>
        {legend}
      </div>
    );
  }

});

module.exports = Meter;
