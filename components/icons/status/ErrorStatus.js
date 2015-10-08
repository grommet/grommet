// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');
var IntlMixin = require('../../../mixins/GrommetIntlMixin');

var ErrorStatus = React.createClass({
  displayName: 'ErrorStatus',

  propTypes: {
    a11yTitle: React.PropTypes.string
  },

  mixins: [IntlMixin],

  render: function render() {
    var className = 'status-icon status-icon-error';
    var a11yTitle = this.getGrommetIntlMessage(this.props.a11yTitle);
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    if (typeof a11yTitle === "undefined") {
      // this.props.a11yTitle emplty string is an acceptable value. Only if undefined
      // should use the default title value.
      a11yTitle = this.getGrommetIntlMessage('Error');
    }
    var errorTitleId = 'error-title';
    return React.createElement(
      'svg',
      { className: className, viewBox: '0 0 24 24', 'aria-labelledby': errorTitleId, role: 'img', version: '1.1' },
      React.createElement(
        'title',
        { id: errorTitleId },
        a11yTitle
      ),
      React.createElement(
        'g',
        { className: "status-icon__base", stroke: 'none' },
        React.createElement('path', { role: 'presentation', d: 'M12,0 L24,12 L12,24 L0,12 Z' })
      ),
      React.createElement(
        'g',
        { className: "status-icon__detail", fill: 'none' },
        React.createElement('path', { role: 'presentation', d: 'M8,8 L16,16', strokeWidth: '2' }),
        React.createElement('path', { role: 'presentation', d: 'M8,16 L16,8', strokeWidth: '2' })
      )
    );
  }

});

module.exports = ErrorStatus;