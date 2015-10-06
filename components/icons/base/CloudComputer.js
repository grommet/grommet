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
      a11yTitleId: 'cloud-computer-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-cloud-computer';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "cloud-computer");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="cloud-computer"><rect id="_x2E_svg_157_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M19,19v-1.1c0-2.2091,1.7909-3.9,4-3.9h4&#xA;&#x9;&#x9;c2.2091,0,4,1.6909,4,3.9v1c2.7729,0,5,2.2469,5,5.0198S33.7729,29.05,31,29.05 M25,19h-7.9792&#xA;&#x9;&#x9;C14.2479,19,12.1,21.2125,12.1,23.9854S14.2271,29,17,29 M28,25h-8v7h8V25z M24,32v4 M21,36h6"/></g></svg>
    );
  }

});

module.exports = Icon;
