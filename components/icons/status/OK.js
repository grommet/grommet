// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');
var FormattedMessage = require('../../FormattedMessage');

var OK = React.createClass({
  displayName: 'OK',

  propTypes: {
    a11yTitle: React.PropTypes.string
  },

  render: function render() {
    var className = 'status-icon status-icon-ok';
    var a11yTitle = this.props.a11yTitle;
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    if (typeof this.props.a11yTitle === "undefined") {
      // this.props.a11yTitle emplty string is an acceptable value only if undefined
      // should it use the default title value
      a11yTitle = 'OK';
    }
    var okTitleId = 'ok-title';
    return React.createElement(
      'svg',
      { className: className, viewBox: '0 0 24 24', role: 'img', 'aria-labelledby': okTitleId, version: '1.1' },
      React.createElement(
        'title',
        { id: okTitleId },
        React.createElement(FormattedMessage, { id: a11yTitle, defaultMessage: a11yTitle })
      ),
      React.createElement(
        'g',
        { className: "status-icon__base" },
        React.createElement('circle', { role: 'presentation', cx: '12', cy: '12', r: '12', stroke: 'none' })
      ),
      React.createElement(
        'g',
        { className: "status-icon__detail" },
        React.createElement('path', { role: 'presentation', d: 'M10,17.4 L5.3,12.7 L6.7,11.3 L10,14.6 L17.3,7.3 L18.7,8.7 L10,17.4 Z', stroke: 'none' })
      )
    );
  }

});

module.exports = OK;