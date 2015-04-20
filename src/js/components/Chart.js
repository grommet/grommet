// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var React = require('react');

var BASE_WIDTH = 400;
var BASE_HEIGHT = 200;

var Chart = React.createClass({

  propTypes: {
    key: React.PropTypes.bool,
    max: React.PropTypes.number,
    min: React.PropTypes.number,
    series: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string,
      values: React.PropTypes.arrayOf(React.PropTypes.number),
      colorIndex: React.PropTypes.number
    })).isRequired,
    threshold: React.PropTypes.number
  },

  getDefaultProps: function () {
    return {
      max: 100,
      min: 0
    };
  },

  render: function() {
    var step = (this.props.max - this.props.min) / 10;
    var grid = [];
    for (var i=0; i<BASE_WIDTH; i = i + step) {
      grid.push(<path key={i} fill="none" d={"M" + i + ",0L" + i + "," + BASE_HEIGHT} />);
    }
    for (i=0; i<BASE_HEIGHT; i = i + step) {
      grid.push(<path key={100 + i} fill="none" d={"M0," + i + ",0L" + BASE_WIDTH + "," + i} />);
    }

    var lines = {};
    var keys = {};

    /*this.props.series.forEach(function (item, index) {

      var endAngle = Math.min(360, Math.max(10, startAngle + (anglePer * item.value)));
      var commands = describeArc(100, 100, 80, startAngle, endAngle-2);
      startAngle = endAngle;
      var colorIndex = item.colorIndex || (index + 1);

      var sliceClasses = ["donut__slice"];
      sliceClasses.push("donut__slice--color-index-" + colorIndex);
      if (this.state.activeIndex === index) {
        sliceClasses.push("donut__slice--active");
        value = item.value;
        units = item.units;
        label = item.label;
      }

      paths[colorIndex] = (
        <path fill="none" className={sliceClasses.join(' ')} d={commands} />
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
      */

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
