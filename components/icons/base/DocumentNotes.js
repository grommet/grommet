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
      a11yTitleId: 'document-notes-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-document-notes';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "document-notes");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="document-notes"><rect id="_x2E_svg_278_" x="0" y="0" fill="none" width="48" height="48"/><polyline fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="16.5,21 16.5,13 29.5002,13 34.5,17.9999 &#xA;&#x9;&#x9;34.5,35 15.5,35 &#x9;"/><polyline fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="28.5,14 28.5,19 34.5,19 &#x9;"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M27.5,19"/><path fill="#231F20" d="M14.5017,22.9497h1.8258l4.217,5.5416v-5.5416h1.9542v9h-1.6843l-4.358-5.7212v5.7212h-1.9547V22.9497z"/></g></svg>
    );
  }

});

module.exports = Icon;
