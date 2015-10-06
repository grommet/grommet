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
      a11yTitleId: 'document-txt-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-document-txt';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "document-txt");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="document-txt"><rect id="_x2E_svg_274_" x="0" y="0" fill="none" width="48" height="48"/><polyline fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="16.4186,21 16.4186,13 29.4188,13 &#xA;&#x9;&#x9;34.4186,17.9999 34.4186,35 15.4186,35 &#x9;"/><polyline fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="28.4186,14 28.4186,19 34.4186,19 &#x9;"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M27.4186,19"/><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="17.4186" y1="25" x2="11.4186" y2="25"/><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="14.4186" y1="24" x2="14.4186" y2="32"/><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="31.4186" y1="25" x2="25.4186" y2="25"/><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="28.4186" y1="24" x2="28.4186" y2="32"/><polygon fill="#231F20" points="22.8214,32.0002 17.8171,24 19.9926,24 25,32 &#x9;"/><polygon fill="#231F20" points="19.8202,32.0002 24.8245,24 22.6454,24 17.638,32 &#x9;"/></g></svg>
    );
  }

});

module.exports = Icon;
