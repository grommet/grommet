// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Header = React.createClass({

  propTypes: {
    primary: React.PropTypes.bool
  },

  render: function() {
    var classes = ["header"];
    if (this.props.primary) {
      classes.push("header--primary");
    }

    return (
      <div className={classes.join(' ')}>
        <div className="header__wrapper">
          <div className="header__content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Header;
