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
      a11yTitleId: 'risk-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-risk';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "risk");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="risk"><rect id="_x2E_svg_182_" y="0" fill="none" width="48" height="48"/><rect x="23.5" y="20.9792" fill="#231F20" width="3" height="3"/><rect x="29.5" y="20.9792" fill="#231F20" width="3" height="3"/><rect x="29.5" y="14.9792" fill="#231F20" width="3" height="3"/><rect x="23.5" y="14.9792" fill="#231F20" width="3" height="3"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M34.5,25.9792h-13v-13h13V25.9792z M20.5,21.9792&#xA;&#x9;&#x9;h-8v13h13v-8"/><rect x="20.5" y="29.9792" fill="#231F20" width="3" height="3"/><rect x="14.5" y="23.9792" fill="#231F20" width="3" height="3"/></g></svg>
    );
  }

});

module.exports = Icon;
