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
      a11yTitleId: 'document-performance-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-document-performance';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "document-performance");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="document-performance"><rect id="_x2E_svg_218_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M17,21v-8h13.0002L35,17.9999V35H16 M29,14v5h6"/><polyline fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="14,31 19,26 23,30 28,25 &#x9;"/><polygon fill="#231F20" points="25,23 30,28 31,22 &#x9;"/></g></svg>
    );
  }

});

module.exports = Icon;
