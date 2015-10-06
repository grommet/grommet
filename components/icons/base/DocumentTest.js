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
      a11yTitleId: 'document-test-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-document-test';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "document-test");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="document-test"><rect id="_x2E_svg_272_" y="0" fill="none" width="48" height="48"/><polyline fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="16,18 16,13 29.0002,13 34,17.9999 34,35 &#xA;&#x9;&#x9;29,35 &#x9;"/><polyline fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="28,14 28,19 34,19 &#x9;"/><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="15" y1="21" x2="23" y2="21"/><polyline fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="17,22 17,25.7727 12,33.9545 12,35 19,35 &#xA;&#x9;&#x9;&#x9;"/><polyline fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="19,35 26,35 26,33.9545 21,25.7727 21,22 &#xA;&#x9;&#x9;&#x9;"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M23.4527,29.5795&#xA;&#x9;&#x9;c-4.2577-2.3438-4.7917,1.946-8.5436-0.3977"/></g></svg>
    );
  }

});

module.exports = Icon;
