// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IntlMixin = require('../../../mixins/GrommetIntlMixin');

var OK = React.createClass({

  mixins: [IntlMixin],

  render: function() {
    var className = 'status-icon status-icon-ok';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 24 24"
        role="img" aria-labelledby="title" version="1.1">
        <title id="title">{this.getGrommetIntlMessage('OK')}</title>
        <g className={"status-icon__base"}>
          <circle cx="12" cy="12" r="12" stroke="none"/>
        </g>
        <g className={"status-icon__detail"}>
          <path d="M10,17.4 L5.3,12.7 L6.7,11.3 L10,14.6 L17.3,7.3 L18.7,8.7 L10,17.4 Z" stroke="none"></path>
        </g>
      </svg>
    );
  }

});

module.exports = OK;
