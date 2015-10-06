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
      a11yTitleId: 'bundle-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-bundle';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "bundle");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="bundle"><rect id="_x2E_svg_141_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" d="M29,15h6v10h-5h-1H19h-6V15&#xA;&#x9;&#x9;h6 M13,25v4h6 M29,29h6v-4 M13,29v4h6 M35,29v4h-6 M29,14H19v20h10V14z"/></g></svg>
    );
  }

});

module.exports = Icon;
