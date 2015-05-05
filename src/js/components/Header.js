// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_ROOT = "header";

var Header = React.createClass({

  propTypes: {
    colorIndex: React.PropTypes.string,
    fixed: React.PropTypes.bool,
    flush: React.PropTypes.bool,
    large: React.PropTypes.bool,
    primary: React.PropTypes.bool,
    small: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {flush: true, large: false, primary: false, small: false};
  },

  render: function() {
    var classes = [CLASS_ROOT];
    if (this.props.primary) {
      classes.push(CLASS_ROOT + "--primary");
    }
    if (this.props.fixed) {
      classes.push(CLASS_ROOT + "--fixed");
    }
    if (this.props.flush) {
      classes.push(CLASS_ROOT + "--flush");
    }
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.small) {
      classes.push(CLASS_ROOT + "--small");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    var wrapperClasses = [CLASS_ROOT + "__wrapper"];
    if (this.props.colorIndex) {
      wrapperClasses.push("background-color-index-" + this.props.colorIndex);
    }

    return (
      <div className={classes.join(' ')}>
        <div className={wrapperClasses.join(' ')}>
          <div className={CLASS_ROOT + "__content"}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Header;
