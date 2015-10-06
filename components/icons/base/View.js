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
      a11yTitleId: 'view-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-view';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "view");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="view"><rect id="_x2E_svg_116_" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M35,24c-2.5079,4.8114-5.9464,8-11,8&#xA;&#x9;&#x9;s-8.4921-3.1886-11-8c2.5079-4.8114,5.9464-8,11-8S32.4921,19.1886,35,24z M24,20c-2.2091,0-4,1.7909-4,4s1.7909,4,4,4&#xA;&#x9;&#x9;s4-1.7909,4-4S26.2091,20,24,20z"/></g></svg>
    );
  }

});

module.exports = Icon;
