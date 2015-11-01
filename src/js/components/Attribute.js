// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');

var CLASS_ROOT = "attribute";

var Attribute = React.createClass({

  propTypes: {
    label: React.PropTypes.string
  },

  render: function () {
    var classes = [CLASS_ROOT];
    return (
      <div className={classes.join(' ')}>
        <label className={CLASS_ROOT + "__label"}>
          {this.props.label}
        </label>
        <span className={CLASS_ROOT + "__contents"}>
          {this.props.children}
        </span>
      </div>
    );
  }

});

module.exports = Attribute;
