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
      a11yTitleId: 'history-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-history';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "history");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="history"><rect id="_x2E_svg_171_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M27.9813,29.0812L24,25v-7 M13,13v7h7 M13,24&#xA;&#x9;&#x9;c0,6.0751,4.9249,11,11,11s11-4.9249,11-11s-4.9249-11-11-11c-4.4373,0-8.261,2.6274-10.0001,6.4113"/></g></svg>
    );
  }

});

module.exports = Icon;
