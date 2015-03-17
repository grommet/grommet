// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var MenuControl = React.createClass({

  _onClick: function (event) {
    if (! this.props.active) {
      event.stopPropagation();
    }
    this.props.onActivate();
  },

  render: function () {
    var classes = ["menu_control", "control-icon"];
    if (this.props.className) {
      classes.push(this.props.className);
    }
    if (this.props.active) {
      classes.push("control-icon--active");
      classes.push("control-icon--primary");
    }
    if (this.props.primary) {
      classes.push("control-icon--primary");
    }
    return (
      <div className={classes.join(' ')} onClick={this._onClick}>
        <svg viewBox="0 0 48 48" version="1.1">
          <g stroke="none" strokeWidth="1" fill="#000000" fillRule="evenodd">
            <rect x="0" y="0" width="48" height="8" rx="1"></rect>
            <rect x="0" y="20" width="48" height="8" rx="1"></rect>
            <rect x="0" y="40" width="48" height="8" rx="1"></rect>
          </g>
        </svg>
      </div>
    );
  }

});

module.exports = MenuControl;
