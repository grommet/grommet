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
      a11yTitleId: 'gallery-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-gallery';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "gallery");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="gallery"><rect id="_x2E_svg_243_" x="0" y="0" fill="none" width="48" height="48"/><circle fill="#231F20" cx="18" cy="18" r="2"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M31,30H13V13h18V30z M31,27l-5.01-6L22,26l-3-3&#xA;&#x9;&#x9;l-6,7 M17,31v3h18V17h-4"/></g></svg>
    );
  }

});

module.exports = Icon;
