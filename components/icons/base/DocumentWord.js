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
      a11yTitleId: 'document-word-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-document-word';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "document-word");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="document-word"><rect id="_x2E_svg_219_" x="0" y="0" fill="none" width="48" height="48"/><polyline fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="17,21 17,13 30.0002,13 35,17.9999 35,35 &#xA;&#x9;&#x9;16,35 &#x9;"/><polyline fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="29,14 29,19 35,19 &#x9;"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M28,19"/><polygon fill="#231F20" points="25.72,23 22.72,32 21.34,32 19,26.54 16.66,32 15.28,32 12.28,23 14.39,23 16.12,28.19 18.34,23 &#xA;&#x9;&#x9;19.66,23 21.88,28.19 23.61,23 &#x9;"/></g></svg>
    );
  }

});

module.exports = Icon;
