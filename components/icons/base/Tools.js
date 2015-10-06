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
      a11yTitleId: 'tools-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-tools';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "tools");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="tools"><rect id="_x2E_svg_123_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M15.9091,34.1L13,31.1637l10.9091-11.0112&#xA;&#x9;&#x9;l2.9091,2.9363L15.9091,34.1z M23.1591,19.3954l5.1136,5.1615l-0.7273,2.2022l2.9091,2.9363L37,23.0888l-2.9091-2.9363&#xA;&#x9;&#x9;l-2.1818,0.7341l-4.3636-4.4045c0,0-4.9455-5.2854-10.0727-0.1101C17.4727,16.3719,20.9773,17.1932,23.1591,19.3954z"/></g></svg>
    );
  }

});

module.exports = Icon;
