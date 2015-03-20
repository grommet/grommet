// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');

var CLASS_ROOT = "site-footer";

var SiteFooter = React.createClass({

  render: function() {
    var classes = [CLASS_ROOT];
    return (
      <div className={classes.join(' ')}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = SiteFooter;
