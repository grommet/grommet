// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_NAME = "icon-spinning";

var Spinning = React.createClass({

  render: function() {
    var classes = [CLASS_NAME];
    if (this.props.small) {
      classes.push(CLASS_NAME + "--small");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <svg className={classes.join(' ')} viewBox="0 0 48 48" version="1.1" >
        <circle stroke="#ddd" strokeWidth="4" strokeDasharray="24px 8px" fill="none" cx="24" cy="24" r="20"></circle>
        <circle stroke="#333" strokeWidth="4" strokeDasharray="24px 104px" fill="none" cx="24" cy="24" r="20"></circle>
      </svg>
    );
  }

});

module.exports = Spinning;
