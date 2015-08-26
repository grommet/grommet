// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_ROOT = "radio-button";

var RadioButton = React.createClass({

  propTypes: {
    checked: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    defaultChecked: React.PropTypes.bool,
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    value: React.PropTypes.string
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.disabled) {
      classes.push(CLASS_ROOT + "--disabled");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <label className={classes.join(' ')}>
        <input className={CLASS_ROOT + "__input"}
          id={this.props.id} name={this.props.name} type="radio"
          disabled={this.props.disabled}
          checked={this.props.checked}
          defaultChecked={this.props.defaultChecked}
          value={this.props.value}
          onChange={this.props.onChange} />
        <span className={CLASS_ROOT + "__control"}></span>
        <span className={CLASS_ROOT + "__label"}>
          {this.props.label}
        </span>
      </label>
    );
  }

});

module.exports = RadioButton;
