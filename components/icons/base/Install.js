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
      a11yTitleId: 'install-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-install';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "install");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="install"><rect id="_x2E_svg_121_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M24,22.1v13 M16,25.1v5.125l8,4.875l8-4.875V25.1&#xA;&#x9;&#x9; M16,17.225l8,4.9375L32,17.1 M16,17.2172l-4.9375,4.9297L19,27.1l5-5h0.0625L29,27.1l8-4.9375L32,17.1l-7.9375-3.9167L16,17.2172z&#xA;&#x9;&#x9;"/></g></svg>
    );
  }

});

module.exports = Icon;
