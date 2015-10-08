// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');
var IntlMixin = require('../../../mixins/GrommetIntlMixin');

var Warning = React.createClass({
  displayName: 'Warning',

  propTypes: {
    a11yTitle: React.PropTypes.string
  },

  mixins: [IntlMixin],
  render: function render() {
    var className = 'status-icon status-icon-warning';
    var a11yTitle = this.getGrommetIntlMessage(this.props.a11yTitle);
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    if (typeof this.props.a11yTitle === "undefined") {
      // this.props.a11yTitle emplty string is an acceptable value. Only if undefined
      // should use the default title value.
      a11yTitle = this.getGrommetIntlMessage('Warning');
    }
    var warningTitleId = 'warning-title';
    return React.createElement(
      'svg',
      { className: className, viewBox: '0 0 27 24', role: 'img', 'aria-labelledby': warningTitleId, version: '1.1' },
      React.createElement(
        'title',
        { id: warningTitleId },
        a11yTitle
      ),
      React.createElement(
        'g',
        { className: "status-icon__base" },
        React.createElement('path', { role: 'presentation', d: 'M12,0 L0,22 L24,22 L12,0 L12,0 Z', stroke: 'none' })
      ),
      React.createElement(
        'g',
        { className: "status-icon__detail", strokeWidth: '2', transform: 'translate(11.000000, 8.000000)' },
        React.createElement('path', { role: 'presentation', d: 'M1,0 L1,6', fill: 'none' }),
        React.createElement('path', { role: 'presentation', d: 'M1,8 L1,10', fill: 'none' })
      )
    );
  }

});

module.exports = Warning;