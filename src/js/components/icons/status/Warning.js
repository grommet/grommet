// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IntlMixin = require('../../../mixins/GrommetIntlMixin');
var uuid = require('node-uuid');

var Warning = React.createClass({

  propTypes: {
    a11yTitle: React.PropTypes.string
  },

  mixins: [IntlMixin],
  render: function() {
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
    var warningTitleId = 'warning-title-' + uuid.v1();
    return (
      <svg className={className} viewBox="0 0 27 24" role="img" aria-labelledby={warningTitleId} version="1.1">
        <title id={warningTitleId}>{a11yTitle}</title>
        <g className={"status-icon__base"}>
          <path role="presentation" d="M12,0 L0,22 L24,22 L12,0 L12,0 Z" stroke="none"></path>
        </g>
        <g className={"status-icon__detail"} strokeWidth="2" transform="translate(11.000000, 8.000000)">
          <path role="presentation" d="M1,0 L1,6" fill="none"></path>
          <path role="presentation" d="M1,8 L1,10" fill="none"></path>
        </g>
      </svg>
    );
  }

});

module.exports = Warning;
