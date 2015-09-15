// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IntlMixin = require('../../mixins/GrommetIntlMixin');
var KeyboardAccelerators = require('../../mixins/KeyboardAccelerators');

var Clear = React.createClass({

  propTypes: {
    a11yTitle: React.PropTypes.string,
    onClick: React.PropTypes.func
  },

  mixins: [IntlMixin, KeyboardAccelerators],

  componentDidMount: function () {
    if (this.props.onClick) {
      this.startListeningToKeyboard({
        enter: this._handleKeyboardEvent,
        space: this._handleKeyboardEvent
      });
    }
  },

  componentWillUnmount: function () {
    if (this.props.onClick) {
      this.stopListeningToKeyboard({
        enter: this._handleKeyboardEvent,
        space: this._handleKeyboardEvent
      });
    }
  },

  _handleKeyboardEvent: function () {
    if (document.activeElement === this.getDOMNode()) {
      this.props.onClick();
    }
  },

  render: function() {
    var className = 'control-icon control-icon-clear';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(this.props.a11yTitle);
    if (typeof this.props.a11yTitle === "undefined") {
      // this.props.a11yTitle emplty string is an acceptable value. Only if undefined
      // should use the default title value.
      a11yTitle = this.getGrommetIntlMessage('Clear');
    }

    return (
      <svg className={className} viewBox="0 0 48 48" tabIndex="0"
        version="1.1" role="img" aria-labelledby="clear-title" onClick={this.props.onClick}>
        <title id="clear-title">{a11yTitle}</title>
        <g fill="none">
          <line strokeWidth="2" x1="14" y1="14" x2="34" y2="34"/>
          <line strokeWidth="2" x1="14" y1="34" x2="34" y2="14"/>
        </g>
      </svg>
    );
  }

});

module.exports = Clear;
