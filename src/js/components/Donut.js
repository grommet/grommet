// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var React = require('react');

function polarToCartesian (centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc (x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);
  var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
  var d = [
      "M", start.x, start.y,
      "A", radius, radius, 0, arcSweep, 0, end.x, end.y
  ].join(" ");
  return d;
}

var Donut = React.createClass({

  propTypes: {
    key: React.PropTypes.bool,
    series: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.number,
      accentIndex: React.PropTypes.oneOfType([
        React.PropTypes.number, // 1-6
        React.PropTypes.string // status
      ]),
      onClick: React.PropTypes.func
    })).isRequired
  },

  _initialTimeout: function () {
    this.setState({initial: false, activeIndex: 0});
    clearTimeout(this._timeout);
  },

  _onMouseOver: function (index) {
    this.setState({initial: false, activeIndex: index});
  },

  _onMouseOut: function (index) {
    this.setState({initial: false, activeIndex: 0});
  },

  getInitialState: function() {
    return {initial: true, activeIndex: 0};
  },

  componentDidMount: function() {
    this._timeout = setTimeout(this._initialTimeout, 10);
    this.setState({initial: true, activeIndex: 0});
  },

  componentWillUnmount: function() {
    clearTimeout(this._timeout);
    this._timeout = null;
  },

  render: function() {
    var total = 0;
    this.props.series.some(function (item) {
      total += item.value;
    });

    var series = this.props.series;
    var startAngle = 0;
    var anglePer = 360.0 / total;
    var paths = {};
    var keys = {};
    var value = null;
    var units = null;
    var label = null;

    this.props.series.forEach(function (item, index) {

      var endAngle = Math.min(360, Math.max(10, startAngle + (anglePer * item.value)));
      var commands = describeArc(100, 100, 80, startAngle, endAngle-2);
      startAngle = endAngle;
      var accentIndex = item.accentIndex || (index + 1);

      var sliceClasses = ["donut__slice"];
      sliceClasses.push("donut__slice--accent-" + accentIndex);
      if (this.state.activeIndex === index) {
        sliceClasses.push("donut__slice--active");
        value = item.value;
        units = item.units;
        label = item.label;
      }

      paths[accentIndex] = (
        <path fill="none" className={sliceClasses.join(' ')} d={commands}
          onMouseOver={this._onMouseOver.bind(null, index)}
          onMouseOut={this._onMouseOut.bind(null, index)}
          onClick={item.onClick} />
      );

      if (this.props.key) {

        var keyItemClasses = ["donut__key-item"];
        if (this.state.activeIndex === index) {
          keyItemClasses.push("donut__key-item--active");
        }

        keys[accentIndex] = (
          <li key={item.className} className={keyItemClasses.join(' ')}
            onMouseOver={this._onMouseOver.bind(null, index)}
            onMouseOut={this._onMouseOut.bind(null, index)}>
            <svg className={"donut__key-item-swatch"} viewBox="0 0 10 10">
              <path className={item.className} d="M 5 0 l 0 10" />
            </svg>
            <span className="donut__key-item-label">{item.label}</span>
            <span className="donut__key-item-value">{item.value}</span>
          </li>
        );
      }
    }, this);

    return (
      <div className="donut">
        <div className="donut__graphic-container">
          <svg className="donut__graphic" viewBox="0 0 200 200"
            preserveAspectRatio="xMidYMid meet">
            <g>{paths}</g>
          </svg>
          <div className="donut__active">
            <div className="donut__active-value">
              {value}
              <span className="donut__active-units">{units}</span>
            </div>

            <div className="donut__active-label">{label}</div>
          </div>
        </div>
        <ol className="donut__key">
          {keys}
        </ol>
      </div>
    );
  }

});

module.exports = Donut;
