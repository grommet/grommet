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
          <path role="presentation" stroke="none" d="M21,24 L3,24 C1.3,24 0,22.7 0,21 L0,3 C0,1.3 1.3,0 3,0 L21,0 C22.7,0 24,1.3 24,3 L24,21 C24,22.7 22.7,24 21,24 L21,24 Z"></path>
        </g>
        <g className={"status-icon__detail"} strokeWidth="2">
          <path d="M6,12 L18,12"></path>
        </g>
      </svg>
    );
  }

});

module.exports = Disabled;
