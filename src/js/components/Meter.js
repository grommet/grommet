// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Meter = React.createClass({

  render: function() {
    var distance = 200 / this.props.total * this.props.value;
    var commands = "M0,10 L" + distance + ",10";
    return (
      <div className={'meter'}>
        <svg className="meter__graphic" viewBox="0 0 200 20"
          preserveAspectRatio="xMidYMid meet">
          <g>
            <path d={commands} />
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
