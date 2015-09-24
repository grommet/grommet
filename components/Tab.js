// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_ROOT = "tab";

var Tab = React.createClass({

  propTypes: {
    title: React.PropTypes.string.isRequired,
    active: React.PropTypes.bool,
    id: React.PropTypes.number.isRequired
  },

  render: function() {
    var classes = [CLASS_ROOT];
    if (this.props.active) {
      classes.push(CLASS_ROOT + "--active");
    }
    return (
      <li role="tab" tabIndex="0" className={classes.join(' ')}
        id={this.props.id} onClick={this.props.onRequestForActive}
        aria-expanded={this.props.active} aria-selected={this.props.active}>
        <label className={CLASS_ROOT + '__label'} htmlFor={this.props.id}>
          {this.props.title}
        </label>
      </li>
    );
  }

});

module.exports = Tab;
