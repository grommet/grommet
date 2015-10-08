// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');

var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');

var CLASS_ROOT = "tab";

var Tab = React.createClass({
  displayName: 'Tab',

  propTypes: {
    title: React.PropTypes.string.isRequired,
    active: React.PropTypes.bool,
    id: React.PropTypes.string
  },

  mixins: [KeyboardAccelerators],

  componentDidMount: function componentDidMount() {
    this.startListeningToKeyboard({
      space: this._processSpace
    });
  },

  componentWillUnmount: function componentWillUnmount() {
    this.stopListeningToKeyboard({
      space: this._processSpace
    });
  },

  _processSpace: function _processSpace(event) {
    if (event.target === this.refs.tab.getDOMNode()) {
      this._onClickTab(event);
    }
  },

  _onClickTab: function _onClickTab(event) {
    event.preventDefault();
    this.props.onRequestForActive();
  },

  render: function render() {
    var classes = [CLASS_ROOT];

    if (this.props.active) {
      classes.push(CLASS_ROOT + "--active");
    }

    return React.createElement(
      'li',
      { className: classes.join(' '), id: this.props.id },
      React.createElement(
        'a',
        { ref: 'tab', role: 'tab', href: '#', onClick: this._onClickTab,
          'aria-expanded': this.props.active, 'aria-selected': this.props.active,
          className: CLASS_ROOT + "__link", 'aria-labelledby': this.props.id },
        React.createElement(
          'label',
          { className: CLASS_ROOT + '__label', htmlFor: this.props.id },
          this.props.title
        )
      )
    );
  }

});

module.exports = Tab;