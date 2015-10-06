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
      a11yTitleId: 'impact-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-impact';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "impact");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="impact"><rect id="_x2E_svg_154_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M25.025,22.0455v12v-22l10,5v12l-10,5V22.0455z&#xA;&#x9;&#x9; M35.025,17.0455l-10,5 M21.025,34.0455v-22 M21.025,23.0455l-7-7 M21.025,23.0455h-8 M21.025,23.0455l-7,7"/></g></svg>
    );
  }

});

module.exports = Icon;
