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
      a11yTitleId: 'document-image-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-document-image';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "document-image");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="document-image"><rect id="_x2E_svg_231_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M15,20v-7h13.0002L33,17.9999V35h-5 M27,14v5h6&#xA;&#x9;&#x9; M25,22.9H12V35h13V22.9z"/><polyline fill="#231F20" points="13.25,34 16.0192,30 19.25,34.5 &#x9;"/><polyline fill="#231F20" points="17.5833,33.8889 20.9679,29 24.9167,34.5 &#x9;"/><circle fill="#231F20" cx="16" cy="27" r="2"/></g></svg>
    );
  }

});

module.exports = Icon;
