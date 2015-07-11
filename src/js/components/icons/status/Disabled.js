// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IntlMixin = require('../../../mixins/GrommetIntlMixin');

var Disabled = React.createClass({

  mixins: [IntlMixin],

  render: function() {
    var className = 'status-icon status-icon-disabled';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} viewBox="0 0 24 24" role="img" aria-labelledby="title-icon-disabled" version="1.1">
        <title id="title-icon-disabled">{this.getGrommetIntlMessage('Disabled')}</title>
        <g className={"status-icon__base"}>
          <rect role="presentation" x="0" y="0" width="24" height="24" stroke="none"></rect>
        </g>
        <g className={"status-icon__detail"} strokeWidth="2">
          <circle role="presentation" cx="12" cy="12" r="7" fill="none"/>
          <path role="presentation" d="M7.3,7.3 L16.6,16.7" fill="none"></path>
        </g>
      </svg>
    );
  }

});

module.exports = Disabled;
