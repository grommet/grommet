// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_ROOT = "split";

var Split = React.createClass({

  propTypes: {
    bias: React.PropTypes.oneOf(['left', 'right', 'both'])
  },

  getDefaultProps: function () {
    return {bias: 'both'};
  },

  render: function() {
    var classes = [CLASS_ROOT];
    if (this.props.bias) {
      classes.push(CLASS_ROOT + "--" + this.props.bias);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <div className={classes.join(' ')}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Split;
