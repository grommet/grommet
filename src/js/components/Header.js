// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Header = React.createClass({

  propTypes: {
    colorIndex: React.PropTypes.string,
    primary: React.PropTypes.bool
  },

  render: function() {
    var classes = ["header"];
    if (this.props.primary) {
      classes.push("header--primary");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    var wrapperClasses = [];
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
