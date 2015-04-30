// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Header = React.createClass({

  propTypes: {
    colorIndex: React.PropTypes.string,
    flush: React.PropTypes.bool,
    large: React.PropTypes.bool,
    primary: React.PropTypes.bool,
    small: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {flush: true, large: false, primary: false, small: false};
  },

  render: function() {
    var classes = ["header"];
    if (this.props.primary) {
      classes.push("header--primary");
    }
    if (this.props.flush) {
      classes.push("header--flush");
    }
    if (this.props.large) {
      classes.push("header--large");
    }
    if (this.props.small) {
      classes.push("header--small");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    var wrapperClasses = ["header__wrapper"];
    if (this.props.colorIndex) {
      wrapperClasses.push("background-color-index-" + this.props.colorIndex);
    }

    return (
      <div className={classes.join(' ')}>
        <div className={wrapperClasses.join(' ')}>
          <div className="header__content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Header;
