// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');
var IntlMixin = require('../../mixins/GrommetIntlMixin');
var KeyboardAccelerators = require('../../mixins/KeyboardAccelerators');

var Clear = React.createClass({
  displayName: 'Clear',

  propTypes: {
    onClick: React.PropTypes.func,
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string,
    a11yRole: React.PropTypes.string
  },

  mixins: [IntlMixin, KeyboardAccelerators],

  getDefaultProps: function getDefaultProps() {
    return {
      a11yRole: 'button',
      a11yTitleId: 'clear-title'
    };
  },

  componentDidMount: function componentDidMount() {
    if (this.props.onClick) {
      this.startListeningToKeyboard({
        enter: this._handleKeyboardEvent,
        space: this._handleKeyboardEvent
      });
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    if (this.props.onClick) {
      this.stopListeningToKeyboard({
        enter: this._handleKeyboardEvent,
        space: this._handleKeyboardEvent
      });
    }
  },

  _handleKeyboardEvent: function _handleKeyboardEvent(e) {
    if (document.activeElement === this.getDOMNode()) {
      e.preventDefault();
      e.stopPropagation();
      this.props.onClick();
    }
  },

  _handleClick: function _handleClick(e) {
    if (this.props.onClick) {
      e.preventDefault();
      e.stopPropagation();
      this.props.onClick();
    }
  },

  render: function render() {
    var className = 'control-icon control-icon-clear';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : 'Clear');

    return React.createElement(
      'a',
      { href: '#', onClick: this._handleClick, role: this.props.a11yRole,
        'aria-labelledby': this.props.a11yTitleId },
      React.createElement(
        'title',
        { id: this.props.a11yTitleId },
        a11yTitle
      ),
      React.createElement(
        'svg',
        { className: className, viewBox: '0 0 48 48',
          version: '1.1' },
        React.createElement(
          'g',
          { fill: 'none' },
          React.createElement('line', { strokeWidth: '2', x1: '14', y1: '14', x2: '34', y2: '34' }),
          React.createElement('line', { strokeWidth: '2', x1: '14', y1: '34', x2: '34', y2: '14' })
        )
      )
    );
  }

});

module.exports = Clear;