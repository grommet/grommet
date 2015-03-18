// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');

var CLASS_ROOT = "site-header";

var SiteHeader = React.createClass({

  render: function() {
    var classes = [CLASS_ROOT];
    return (
      <div className={classes.join(' ')}>
        <div className={CLASS_ROOT + "__container"}>
          <div className={CLASS_ROOT + "__title"}>
            {this.props.title}
          </div>
          <div className={CLASS_ROOT + "__nav"}>
            {this.props.nav}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SiteHeader;
