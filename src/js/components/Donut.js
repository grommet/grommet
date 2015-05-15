// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var React = require('react');

var BASE_SIZE = 192;

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
    legend: React.PropTypes.bool,
    series: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.number,
      colorIndex: React.PropTypes.oneOfType([
        React.PropTypes.number, // 1-6
        React.PropTypes.string // status
      ]),
      onClick: React.PropTypes.func
    })).isRequired,
    units: React.PropTypes.string
  },

  _initialTimeout: function () {
    this.setState({initial: false, activeIndex: 0});
    clearTimeout(this._timeout);
  },

  _onMouseOver: function (index) {
    this.setState({initial: false, activeIndex: index});
  },

  _onMouseOut: function () {
    this.setState({initial: false, activeIndex: 0});
  },

  _onResize: function() {
    // orientation based on available window orientation
    var ratio = window.innerWidth / window.innerHeight;
    if (ratio < 0.8) {
      this.setState({orientation: 'portrait'});
    } else if (ratio > 1.2) {
      this.setState({orientation: 'landscape'});
    }
    // content based on avialable real estate
    var parentElement = this.refs.donut.getDOMNode().parentNode;
    var width = parentElement.offsetWidth;
    var height = parentElement.offsetHeight;
    if (height < BASE_SIZE || width < BASE_SIZE ||
      (width < (BASE_SIZE * 2) && height < (BASE_SIZE * 2))) {
      this.setState({size: 'small'});
    } else {
      this.setState({size: null});
    }
  },

  getInitialState: function() {
    return {
      initial: true,
      activeIndex: 0,
      legend: false,
      orientation: 'portrait'
    };
  },

  componentDidMount: function() {
    this._timeout = setTimeout(this._initialTimeout, 10);
    this.setState({initial: true, activeIndex: 0});
    window.addEventListener('resize', this._onResize);
    setTimeout(this._onResize, 10);
  },

  componentWillUnmount: function() {
    clearTimeout(this._timeout);
    this._timeout = null;
    window.removeEventListener('resize', this._onResize);
  },

  _itemColorIndex: function (item, index) {
    return item.colorIndex || ('graph-' + (index + 1));
  },

  _renderLegend: function () {
    var total = 0;

    var legends = this.props.series.map(function (item, index) {
      var legendClasses = ["donut__legend-item"];
      if (this.state.activeIndex === index) {
        legendClasses.push("donut__legend-item--active");
      }
      var colorIndex = this._itemColorIndex(item, index);
      total += item.value;

      return(
        <li key={item.label} className={legendClasses.join(' ')}
          onMouseOver={this._onMouseOver.bind(this, index)}
          onMouseOut={this._onMouseOut.bind(this, index)}>
          <svg className={"donut__legend-item-swatch color-index-" + colorIndex}
            viewBox="0 0 12 12">
            <path className={item.className} d="M 5 0 l 0 12" />
          </svg>
          <span className="donut__legend-item-label">{item.label}</span>
          <span className="donut__legend-item-value">{item.value}</span>
          <span className="donut__legend-item-units">{this.props.units}</span>
        </li>
      );
    }, this);

    return (
      <ol className="donut__legend">
        {legends}
        <li className="donut__legend-total">
          <span className="donut__legend-total-label">Total</span>
          <span className="donut__legend-total-value">{total}</span>
          <span className="donut__legend-total-units">{this.props.units}</span>
        </li>
      </ol>
    );
  },

  render: function() {
    var classes = ["donut", "donut--" + this.state.orientation];
    if (this.state.size) {
      classes.push("donut--" + this.state.size);
    }

    var total = 0;
    this.props.series.some(function (item) {
      total += item.value;
    });

    var startAngle = 0;
    var anglePer = 360.0 / total;
    var value = null;
    var units = null;
    var label = null;

    var paths = this.props.series.map(function (item, index) {

      var endAngle = Math.min(360, Math.max(10, startAngle + (anglePer * item.value)));
      var radius = 84;
      var commands = describeArc(BASE_SIZE/2, BASE_SIZE/2, radius, startAngle, endAngle);
      startAngle = endAngle;
      var colorIndex = this._itemColorIndex(item, index);

      var sliceClasses = ["donut__slice"];
      sliceClasses.push("color-index-" + colorIndex);
      if (this.state.activeIndex === index) {
        sliceClasses.push("donut__slice--active");
        value = item.value;
        units = item.units;
        label = item.label;
      }

      return(
        <path key={item.label} fill="none" className={sliceClasses.join(' ')} d={commands}
          onMouseOver={this._onMouseOver.bind(null, index)}
          onMouseOut={this._onMouseOut.bind(null, index)}
          onClick={item.onClick} />
      );
    }, this);

    var legend = null;
    if (this.props.legend) {
      legend = this._renderLegend();
    }

    return (
      <div ref="donut" className={classes.join(' ')}>
        <div className="donut__graphic-container">
          <svg className="donut__graphic"
            viewBox={"0 0 " + BASE_SIZE + " " + BASE_SIZE}
            preserveAspectRatio="xMidYMid meet">
            <g>{paths}</g>
          </svg>
          <div className="donut__active">
            <div className="donut__active-value large-number-font">
              {value}
              <span className="donut__active-units large-number-font">{units}</span>
            </div>
            <div className="donut__active-label">{label}</div>
          </div>
        </div>
        {legend}
      </div>
    );
  }

});

module.exports = Donut;
