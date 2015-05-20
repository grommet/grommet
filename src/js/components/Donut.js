// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_ROOT = "donut";
var BASE_SIZE = 192;
var PARTIAL_SIZE = 168;

function polarToCartesian (centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function arcCommands (x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);
  var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
  var d = [
    "M", start.x, start.y,
    "A", radius, radius, 0, arcSweep, 0, end.x, end.y
  ].join(" ");
  return d;
}

function activeIndicatorCommands (x, y, radius, startAngle, endAngle) {
  var midAngle = endAngle - ((endAngle - startAngle) / 2);
  var point = polarToCartesian(x, y, radius - 24, midAngle);
  var start = polarToCartesian(x, y, radius, midAngle - 10);
  var end = polarToCartesian(x, y, radius, midAngle + 10);
  //var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
  var d = ["M", point.x, point.y,
    "L", start.x, start.y,
    "A", radius, radius, 0, 0, 0, end.x, end.y,
    "Z"
  ].join(" ");
  return d;
}

var Donut = React.createClass({

  propTypes: {
    legend: React.PropTypes.bool,
    partial: React.PropTypes.bool,
    maxLabel: React.PropTypes.string,
    minLabel: React.PropTypes.string,
    series: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.number,
      colorIndex: React.PropTypes.oneOfType([
        React.PropTypes.number, // 1-6
        React.PropTypes.string // status
      ]),
      important: React.PropTypes.bool,
      onClick: React.PropTypes.func
    })).isRequired,
    units: React.PropTypes.string
  },

  _initialTimeout: function () {
    this.setState({
      initial: false,
      activeIndex: this.state.importantIndex
    });
    clearTimeout(this._timeout);
  },

  _onMouseOver: function (index) {
    this.setState({initial: false, activeIndex: index});
  },

  _onMouseOut: function () {
    this.setState({
      initial: false,
      activeIndex: this.state.importantIndex
    });
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
    var donutHeight = BASE_SIZE;
    if (this.props.partial) {
      donutHeight = PARTIAL_SIZE;
    }
    if (height < donutHeight || width < BASE_SIZE ||
      (width < (BASE_SIZE * 2) && height < (donutHeight * 2))) {
      this.setState({size: 'small'});
    } else {
      this.setState({size: null});
    }
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
    var importantIndex = this._importantIndex(this.props.series);
    return {
      initial: true,
      importantIndex: importantIndex,
      activeIndex: importantIndex,
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

  componentWillReceiveProps: function (newProps) {
    var importantIndex = this._importantIndex(newProps.series);
    this.setState({
      importantIndex: importantIndex,
      activeIndex: importantIndex
    });
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
    var classPrefix = CLASS_ROOT + "__legend";

    var legends = this.props.series.map(function (item, index) {
      var legendClasses = [classPrefix + "-item"];
      if (this.state.activeIndex === index) {
        legendClasses.push(classPrefix + "-item--active");
      }
      var colorIndex = this._itemColorIndex(item, index);
      total += item.value;

      return(
        <li key={item.label} className={legendClasses.join(' ')}
          onMouseOver={this._onMouseOver.bind(this, index)}
          onMouseOut={this._onMouseOut.bind(this, index)}
          onClick={item.onClick}>
          <svg className={classPrefix + "-item-swatch color-index-" + colorIndex}
            viewBox="0 0 12 12">
            <path className={item.className} d="M 5 0 l 0 12" />
          </svg>
          <span className={classPrefix + "-item-label"}>{item.label}</span>
          <span className={classPrefix + "-item-value"}>{item.value}</span>
          <span className={classPrefix + "-item-units"}>{this.props.units}</span>
        </li>
      );
    }, this);

    return (
      <ol className={classPrefix}>
        {legends.reverse()}
        <li className={classPrefix + "-total"}>
          <span className={classPrefix + "-total-label"}>Total</span>
          <span className={classPrefix + "-total-value"}>{total}</span>
          <span className={classPrefix + "-total-units"}>{this.props.units}</span>
        </li>
      </ol>
    );
  },

  render: function() {
    var classes = [CLASS_ROOT, CLASS_ROOT + "--" + this.state.orientation];
    if (this.state.size) {
      classes.push(CLASS_ROOT + "--" + this.state.size);
    }
    if (this.props.partial) {
      classes.push(CLASS_ROOT + "--partial");
    }

    var viewBoxHeight = BASE_SIZE;
    if (this.props.partial) {
      viewBoxHeight = PARTIAL_SIZE;
    }

    var total = 0;
    this.props.series.some(function (item) {
      total += item.value;
    });

    var startAngle = 0;
    var anglePer = 360.0 / total;
    if (this.props.partial) {
      startAngle = 60;
      anglePer = 240.0 / total;
    }
    var value = null;
    var units = null;
    var label = null;
    var activeIndicator = null;

    var paths = this.props.series.map(function (item, index) {

      var endAngle = Math.min(360, Math.max(10, startAngle + (anglePer * item.value)));
      if (item.value > 0 && (startAngle + 360) === endAngle) {
        // full use for this item, make sure we render it.
        endAngle -= 0.1;
      }
      var radius = 84;
      // start from the bottom
      var commands = arcCommands(BASE_SIZE/2, BASE_SIZE/2, radius,
        startAngle + 180, endAngle + 180);
      var colorIndex = this._itemColorIndex(item, index);

      var sliceClasses = [CLASS_ROOT + "__slice"];
      sliceClasses.push("color-index-" + colorIndex);
      if (this.state.activeIndex === index) {
        sliceClasses.push(CLASS_ROOT + "__slice--active");
        value = item.value;
        units = item.units;
        label = item.label;
      }

      if (index === this.state.activeIndex) {
        var indicatorCommands = activeIndicatorCommands(BASE_SIZE/2, BASE_SIZE/2, radius,
          startAngle + 180, endAngle + 180);
        activeIndicator = (
          <path stroke="none"
            className={CLASS_ROOT + "__slice-indicator color-index-" + colorIndex}
            d={indicatorCommands} />
        );
      }

      startAngle = endAngle;

      return(
        <path key={item.label} fill="none" className={sliceClasses.join(' ')} d={commands}
          onMouseOver={this._onMouseOver.bind(null, index)}
          onMouseOut={this._onMouseOut.bind(null, index)}
          onClick={item.onClick} />
      );
    }, this);

    var minLabel;
    if (this.props.minLabel) {
      minLabel = (
        <div className={CLASS_ROOT + "__min-label"}>
          {this.props.minLabel}
        </div>
      );
    }

    var maxLabel;
    if (this.props.maxLabel) {
      maxLabel = (
        <div className={CLASS_ROOT + "__max-label"}>
          {this.props.maxLabel}
        </div>
      );
    }

    var legend = null;
    if (this.props.legend) {
      legend = this._renderLegend();
    }

    return (
      <div ref="donut" className={classes.join(' ')}>
        <div className={CLASS_ROOT + "__graphic-container"}>
          <svg className={CLASS_ROOT + "__graphic"}
            viewBox={"0 0 " + BASE_SIZE + " " + viewBoxHeight}
            preserveAspectRatio="xMidYMid meet">
            <g>
              {activeIndicator}
              {paths}
            </g>
          </svg>
          <div className={CLASS_ROOT + "__active"}>
            <div className={CLASS_ROOT + "__active-value large-number-font"}>
              {value}
              <span className={CLASS_ROOT + "__active-units large-number-font"}>{units}</span>
            </div>
            <div className={CLASS_ROOT + "__active-label"}>{label}</div>
          </div>
          {minLabel}
          {maxLabel}
        </div>
        {legend}
      </div>
    );
  }

});

module.exports = Donut;
