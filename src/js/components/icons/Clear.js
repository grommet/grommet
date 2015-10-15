// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IntlMixin = require('../../mixins/GrommetIntlMixin');
var KeyboardAccelerators = require('../../utils/KeyboardAccelerators');

var Clear = React.createClass({

  propTypes: {
    onClick: React.PropTypes.func,
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string,
    a11yRole: React.PropTypes.string
  },

  mixins: [IntlMixin, KeyboardAccelerators],

  getDefaultProps: function () {
    return {
      a11yRole: 'button',
      a11yTitleId: 'clear-title'
    };
  },

  componentDidMount: function () {
    if (this.props.onClick) {
      KeyboardAccelerators.startListeningToKeyboard(this, {
        enter: this._handleKeyboardEvent,
        space: this._handleKeyboardEvent
      });
    }
  },

  componentWillUnmount: function () {
    if (this.props.onClick) {
      KeyboardAccelerators.stopListeningToKeyboard(this, {
        enter: this._handleKeyboardEvent,
        space: this._handleKeyboardEvent
      });
    }
  },

  _handleKeyboardEvent: function (e) {
    if (document.activeElement === this.getDOMNode()) {
      e.preventDefault();
      e.stopPropagation();
      this.props.onClick();
    }
  },

  _handleClick: function (e) {
    if (this.props.onClick) {
      e.preventDefault();
      e.stopPropagation();
      this.props.onClick();
    }
  },

  render: function() {
    var className = 'control-icon control-icon-clear';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : 'Clear');

    return (
      <a href="#" onClick={this._handleClick} role={this.props.a11yRole}
        aria-labelledby={this.props.a11yTitleId}>
        <title id={this.props.a11yTitleId}>{a11yTitle}</title>
        <svg className={className} viewBox="0 0 48 48"
          version="1.1" >
            <g fill="none">
              <line strokeWidth="2" x1="14" y1="14" x2="34" y2="34"/>
              <line strokeWidth="2" x1="14" y1="34" x2="34" y2="14"/>
            </g>
        </svg>
      </a>
    );
  }

});

module.exports = Clear;
