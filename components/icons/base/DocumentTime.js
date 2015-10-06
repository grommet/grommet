// (C) Copyright 2014-2015 Hewlett-Packard Development Company

var React = require('react');
var IntlMixin = require('../../../mixins/GrommetIntlMixin');

var Icon = React.createClass({

  propTypes: {
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string
  },

  mixins: [IntlMixin],

  getDefaultProps: function () {
    return {
      a11yTitleId: 'document-time-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-document-time';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "document-time");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="document-time"><rect id="_x2E_svg_233_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M16,18v-5h13.0002L34,17.9999V35h-7 M28,14v5h6&#xA;&#x9;&#x9; M19,21c-3.866,0-7,3.134-7,7s3.134,7,7,7s7-3.134,7-7S22.866,21,19,21z M19,24v4l3,3"/></g></svg>
    );
  }

});

module.exports = Icon;
