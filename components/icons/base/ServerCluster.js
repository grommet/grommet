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
      a11yTitleId: 'server-cluster-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-server-cluster';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "server-cluster");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="server-cluster"><rect id="_x2E_svg_174_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M35,20.34H13v-7h22V20.34z M35,20.34H13v7h22V20.34&#xA;&#x9;&#x9;z M35,27.34H13v7h22V27.34z"/><rect x="25" y="15.34" fill="#231F20" width="2" height="3"/><rect x="28" y="15.34" fill="#231F20" width="2" height="3"/><rect x="31" y="15.34" fill="#231F20" width="2" height="3"/><rect x="25" y="22.34" fill="#231F20" width="2" height="3"/><rect x="28" y="22.34" fill="#231F20" width="2" height="3"/><rect x="31" y="22.34" fill="#231F20" width="2" height="3"/><rect x="25" y="29.34" fill="#231F20" width="2" height="3"/><rect x="28" y="29.34" fill="#231F20" width="2" height="3"/><rect x="31" y="29.34" fill="#231F20" width="2" height="3"/></g></svg>
    );
  }

});

module.exports = Icon;
