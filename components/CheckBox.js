// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CheckBox = React.createClass({

  propTypes: {
    checked: React.PropTypes.bool,
    defaultChecked: React.PropTypes.bool,
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func
  },

  render: function () {
    var classes = ["check-box"];
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <span className={classes.join(' ')}>
        <input className="check-box__input"
          id={this.props.id} name={this.props.name} type="checkbox"
          checked={this.props.checked}
          defaultChecked={this.props.defaultChecked}
          onChange={this.props.onChange} />
        <label className="check-box__label checkbox" htmlFor={this.props.id}>
          {this.props.label}
        </label>
      </span>
    );
  }

});

module.exports = CheckBox;
