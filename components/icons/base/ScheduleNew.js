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
      a11yTitleId: 'schedule-new-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-schedule-new';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "schedule-new");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="schedule-new"><rect id="_x2E_svg_213_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M24.7535,32h-12V16h16v11 M13.7535,20h14&#xA;&#x9;&#x9; M16.7535,16v-3 M25.7535,24h-6 M17.7534,24h-2 M25.7535,28h-6 M17.7534,28h-2 M24.7535,16v-3 M31.7535,28v9 M35.6508,30.2503&#xA;&#x9;&#x9;l-7.7946,4.4993 M35.6502,34.7507l-7.7935-4.5013"/></g></svg>
    );
  }

});

module.exports = Icon;
