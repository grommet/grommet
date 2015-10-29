// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');

var Label = React.createClass({

  propTypes: {
    icon: React.PropTypes.node,
    text: React.PropTypes.string
  },

  render: function() {
    var icon = null;
    var text = null;
    if (this.props.icon) {
      icon = (<span className="label__icon control-icon">{this.props.icon}</span>);
    }
    if (this.props.text) {
      text = (<span className="label__text">{this.props.text}</span>);
    }
    return (
      <div className="label">
        {icon}
        {text}
      </div>
    );
  }

});

module.exports = Label;
