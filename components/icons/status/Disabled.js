// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');
var FormattedMessage = require('../../FormattedMessage');

var Disabled = React.createClass({
  displayName: 'Disabled',

  propTypes: {
    a11yTitle: React.PropTypes.string
  },

  render: function render() {
    var className = 'status-icon status-icon-disabled';
    var a11yTitle = this.props.a11yTitle;
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    if (typeof this.props.a11yTitle === "undefined") {
      // this.props.a11yTitle emplty string is an acceptable value. Only if undefined
      // should use the default title value.
      a11yTitle = 'Disabled';
    }
    var disabledTitleId = 'disabled-title';
    return React.createElement(
      'svg',
      { className: className, viewBox: '0 0 24 24', role: 'img', 'aria-labelledby': disabledTitleId, version: '1.1' },
      React.createElement(
        'title',
        { id: disabledTitleId },
        React.createElement(FormattedMessage, { id: a11yTitle, defaultMessage: a11yTitle })
      ),
      React.createElement(
        'g',
        { className: "status-icon__base" },
        React.createElement('path', { role: 'presentation', stroke: 'none', d: 'M21,24 L3,24 C1.3,24 0,22.7 0,21 L0,3 C0,1.3 1.3,0 3,0 L21,0 C22.7,0 24,1.3 24,3 L24,21 C24,22.7 22.7,24 21,24 L21,24 Z' })
      ),
      React.createElement(
        'g',
        { className: "status-icon__detail", strokeWidth: '2' },
        React.createElement('path', { d: 'M6,12 L18,12' })
      )
    );
  }

});

module.exports = Disabled;