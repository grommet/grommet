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
      a11yTitleId: 'contact-us-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-contact-us';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "contact-us");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="contact-us"><rect id="_x2E_svg_31_" x="0" y="0" fill="none" width="48" height="48"/><polygon fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="34.5,30.5 26.0001,30.5 17.5,34.5 &#xA;&#x9;&#x9;17.5,30.5 13.5,30.5 13.5,13.5 34.5,13.5 &#x9;"/><rect x="17.5" y="20.5" fill="#231F20" width="3" height="3"/><rect x="22.5" y="20.5" fill="#231F20" width="3" height="3"/><rect x="27.5" y="20.5" fill="#231F20" width="3" height="3"/></g></svg>
    );
  }

});

module.exports = Icon;
