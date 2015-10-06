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
      a11yTitleId: 'java-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-java';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "java");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="java"><rect id="_x2E_svg_113_" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M22,35L22,35c-4.4183,0-8-3.5817-8-8v-6h16v6&#xA;&#x9;&#x9;C30,31.4183,26.4183,35,22,35z M33,23c-1.6569,0-3,1.3431-3,3s1.3431,3,3,3c1.6569,0,3-1.3431,3-3S34.6568,23,33,23z M19,18v-4&#xA;&#x9;&#x9; M22,18v-6 M25,18v-4"/></g></svg>
    );
  }

});

module.exports = Icon;
