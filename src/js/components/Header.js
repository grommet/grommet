// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Header = React.createClass({

  propTypes: {
    centerColumn: React.PropTypes.bool,
    primary: React.PropTypes.bool
  },

  render: function() {
    var classes = ["header"];
    var contentClasses = ["header__content"];

    if (this.props.centerColumn) {
      classes.push("center-column");
      contentClasses.push("center-column__content");
    }
    if (this.props.primary) {
      classes.push("header--primary");
    }

    return (
      <div className={classes.join(' ')}>
        <div className="header__wrapper">
          <div className={contentClasses.join(' ')}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Header;
