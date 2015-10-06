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
      a11yTitleId: 'schedule-play-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-schedule-play';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "schedule-play");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="schedule-play"><rect id="_x2E_svg_214_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M24.5,32h-11V16h16v9 M14.5,20h14 M17.5,16v-3&#xA;&#x9;&#x9; M26.5,24h-6 M18.5,24h-2 M24.5,28h-4 M18.5,28h-2 M25.5,16v-3 M30,25c-3.0376,0-5.5,2.4624-5.5,5.5S26.9624,36,30,36&#xA;&#x9;&#x9;s5.5-2.4624,5.5-5.5S33.0376,25,30,25z"/><path fill="#231F20" d="M28.5,27.5c0.0521,0.0469,0,6,0,6l5-3L28.5,27.5z"/></g></svg>
    );
  }

});

module.exports = Icon;
