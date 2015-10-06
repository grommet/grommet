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
      a11yTitleId: 'schedule-clone-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-schedule-clone';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "schedule-clone");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="schedule-clone"><rect id="_x2E_svg_212_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M29.0004,32h-16V16h16V32z M19.0004,32v4h16V20h-5&#xA;&#x9;&#x9; M14.0004,20h14 M17.0004,16v-3 M26.0004,24h-6 M18.0003,24h-2 M26.0004,28h-6 M18.0003,28h-2 M25.0004,16v-3 M29.0004,24h6"/></g></svg>
    );
  }

});

module.exports = Icon;
