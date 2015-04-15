// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_NAME = "icon-changing";

var Changing = React.createClass({

  render: function() {
    var classes = [CLASS_NAME];
    if (this.props.small) {
      classes.push(CLASS_NAME + "--small");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <svg className={classes.join(' ')} viewBox="0 0 24 24" version="1.1" >
        <g stroke="none" strokeWidth="1" fill="#979797" fillRule="evenodd">
          <path d="M 4 12 A 8 8 0 0 1 24 12 A 2 2 0 1 1 20 12 A 6 6 0 1 0 4 12" />
        </g>
      </svg>
    );
  }

});

module.exports = Changing;
