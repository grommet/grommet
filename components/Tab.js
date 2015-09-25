// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_ROOT = "tab";

var Tab = React.createClass({

  propTypes: {
    title: React.PropTypes.string.isRequired,
    active: React.PropTypes.bool,
    id: React.PropTypes.string
  },

  _onClickTab: function (event) {
    event.preventDefault();
    this.props.onRequestForActive();
  },

  render: function() {
    var classes = [CLASS_ROOT];

    if (this.props.active) {
      classes.push(CLASS_ROOT + "--active");
    }

    return (
      <li role="tab" className={classes.join(' ')} id={this.props.id}
        aria-expanded={this.props.active} aria-selected={this.props.active}>
        <a href="#" className={CLASS_ROOT + "__link"} aria-labelledby={this.props.id}
          onClick={this._onClickTab}>
          <label className={CLASS_ROOT + '__label'} htmlFor={this.props.id}>
            {this.props.title}
          </label>
        </a>
      </li>
    );
  }

});

module.exports = Tab;
