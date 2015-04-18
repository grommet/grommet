// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var React = require('react');

var BASE_WIDTH = 192;
var BASE_HEIGHT = 24;
var MID_HEIGHT = BASE_HEIGHT / 2;

// TODO: multi-value meter

var Meter = React.createClass({

  propTypes: {
    max: React.PropTypes.number,
    min: React.PropTypes.number,
    threshold: React.PropTypes.number,
    units: React.PropTypes.string,
    value: React.PropTypes.number
  },

  getDefaultProps: function () {
    return {
      max: 100,
      min: 0
    };
  },

  render: function() {
    var classes = ["meter"];
    if (this.props.className) {
      classes.push(this.props.className);
    }
    var scale = BASE_WIDTH / (this.props.max - this.props.min);
    var distance = scale * (this.props.value - this.props.min);
    var commands = "M0," + MID_HEIGHT + " L" + distance + "," + MID_HEIGHT;

    var threshold = null;
    if (this.props.threshold) {
      distance = scale * (this.props.threshold - this.props.min);
      threshold = (
        <path className="meter__threshold"
          d={"M" + distance + ",0 L" + distance + "," + BASE_HEIGHT} />
      );
    }
    return (
      <div className={classes.join(' ')}>
        <svg className="meter__graphic"
          viewBox={"0 0 " + BASE_WIDTH + " " + BASE_HEIGHT}
          preserveAspectRatio="xMidYMid meet">
          <g>
            <path className="meter__value" d={commands} />
            {threshold}
          </g>
        </svg>
        <span className="meter__label">
          <span className="meter__label-value">{this.props.value}</span>
          <span className="meter__label-units">{this.props.units}</span>
        </span>
      </div>
    );
  }

});

module.exports = Meter;
