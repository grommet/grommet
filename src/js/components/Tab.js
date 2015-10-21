// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var CLASS_ROOT = "tab";

var Tab = React.createClass({

  propTypes: {
    title: React.PropTypes.string.isRequired,
    active: React.PropTypes.bool,
    id: React.PropTypes.string
  },

  componentDidMount: function () {
    KeyboardAccelerators.startListeningToKeyboard(this, {
      space: this._processSpace
    });
  },

  componentWillUnmount: function () {
    KeyboardAccelerators.stopListeningToKeyboard(this, {
      space: this._processSpace
    });
  },

  _processSpace: function (event) {
    if (event.target === this.refs.tab) {
      this._onClickTab(event);
    }
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
      <li className={classes.join(' ')} id={this.props.id}>
        <a ref="tab" role="tab" href="#" onClick={this._onClickTab}
          aria-expanded={this.props.active} aria-selected={this.props.active}
          className={CLASS_ROOT + "__link"} aria-labelledby={this.props.id}>
          <label className={CLASS_ROOT + '__label'} htmlFor={this.props.id}>
            {this.props.title}
          </label>
        </a>
      </li>
    );
  }

});

module.exports = Tab;
