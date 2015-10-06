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
      a11yTitleId: 'shield-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-shield';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "shield");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="shield"><rect id="_x2E_svg_96_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M33,18.4v2.864&#xA;&#x9;&#x9;c0,4.2846-1.8322,8.3646-5.0345,11.2111L24,35.7l-3.9655-3.2249C16.8322,29.6286,15,25.5486,15,21.264V18.4l9-4.4L33,18.4z M24,35&#xA;&#x9;&#x9;V15 M15,24h18"/></g></svg>
    );
  }

});

module.exports = Icon;
