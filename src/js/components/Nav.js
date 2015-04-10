// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Nav = React.createClass({

  propTypes: {
    right: React.PropTypes.bool,
    vertical: React.PropTypes.bool,
    accent: React.PropTypes.bool,
    accentIndex: React.PropTypes.number
  },

  render: function() {
    var classes = ["nav"];
    if (this.props.vertical) {
      classes.push("nav--vertical");
      classes.push("layout--fixed");
    }
    if (this.props.right) {
      classes.push("nav--right");
    }
    if (this.props.accent) {
      classes.push("nav--accent");
    }
    if (this.props.fontPalm) { // TODO: remove?
      classes.push("nav--font-palm");
    }
    if (this.props.accentIndex) {
      classes.push("accent-text-" + this.props.accentIndex);
    }

    return (
      <div className={classes.join(' ')}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = Nav;
