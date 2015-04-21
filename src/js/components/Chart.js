// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var React = require('react');

var BASE_WIDTH = 400;
var BASE_HEIGHT = 200;

var Chart = React.createClass({

  propTypes: {
    key: React.PropTypes.bool,
    max: React.PropTypes.number,
    min: React.PropTypes.number,
    series: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        label: React.PropTypes.string,
        values: React.PropTypes.arrayOf(
          React.PropTypes.arrayOf(React.PropTypes.number)),
        colorIndex: React.PropTypes.string
      })
    ).isRequired,
    threshold: React.PropTypes.number
  },

  getInitialState: function () {
    // analyze series data
    var minX = null;
    var maxX = null;
    var minY = null;
    var maxY = null;
    var maxValues = 0;
    this.props.series.forEach(function (item) {
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
      maxValues = Math.max(maxValues, item.values.length);
    });
    if (this.props.threshold) {
      minX = Math.min(minX, this.props.threshold);
      maxX = Math.max(maxX, this.props.threshold);
    }
    return {
      minX: minX,
      maxX: maxX,
      minY: this.props.min || minY,
      maxY: this.props.max || maxY,
      steps: maxValues
    };
  },

  _translateX: function (x) {
    return (x - this.state.minX) * (BASE_WIDTH) / (this.state.maxX - this.state.minX);
  },

  _translateY: function (y) {
    return BASE_HEIGHT -
      ((y - this.state.minY) * (BASE_HEIGHT) / (this.state.maxY - this.state.minY));
  },

  _coordinates: function (point) {
    return this._translateX(point[0]) + ',' + this._translateY(point[1]);
  },

  render: function() {
    var step = BASE_WIDTH / this.state.steps;
    var grid = [];
    for (var i=0; i<=BASE_WIDTH; i = i + step) {
      grid.push(<path key={i} fill="none" d={"M" + i + ",0L" + i + "," + BASE_HEIGHT} />);
    }
    var step = BASE_HEIGHT / 5;
    for (i=BASE_HEIGHT; i>=0; i = i - step) {
      grid.push(<path key={100 + i} fill="none" d={"M0," + i + "L" + BASE_WIDTH + "," + i} />);
    }

    var lines = {};
    var keys = {};

    this.props.series.forEach(function (item, index) {
      var commands = null;
      item.values.forEach(function (value) {
        if (null === commands) {
          commands = "M" + this._coordinates(value);
        } else {
          commands += "L" + this._coordinates(value);
        }
      }, this);
      lines[index] = (
        <path fill="none" className={"color-index-" + item.colorIndex} d={commands} />
      );

      if (this.props.key) {

        var keyItemClasses = ["chart__key-item"];

        keys[colorIndex] = (
          <li key={item.className} className={keyItemClasses.join(' ')}>
            <svg className={"chart__key-item-swatch"} viewBox="0 0 10 10">
              <path className={item.className} d="M 5 0 l 0 10" />
            </svg>
            <span className="chart__key-item-label">{item.label}</span>
          </li>
        );
      }
    }, this);

    return (
      <div className="chart">
        <svg className="chart__graphic" viewBox={"0 0 " + BASE_WIDTH + " " + BASE_HEIGHT}
          preserveAspectRatio="xMidYMid meet">
          <g className="chart__grid">{grid}</g>
          <g className="chart__lines">{lines}</g>
        </svg>
        <ol className="chart__key">
          {keys}
        </ol>
      </div>
    );
  }

});

module.exports = Chart;
