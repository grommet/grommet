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
      a11yTitleId: 'alarm-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-alarm';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "alarm");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="alarm"><rect id="_x2E_svg_151_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M33,24c0,4.9706-4.0294,9-9,9s-9-4.0294-9-9&#xA;&#x9;&#x9;s4.0294-9,9-9S33,19.0294,33,24z M18,30l-4,4 M30,30l4,4 M21.46,15.37C20.71,13.96,19.22,13,17.5,13c-2.49,0-4.5,2.01-4.5,4.5&#xA;&#x9;&#x9;c0,1.72,0.96,3.21,2.37,3.96 M32.63,21.46C34.04,20.71,35,19.22,35,17.5c0-2.49-2.01-4.5-4.5-4.5c-1.72,0-3.21,0.96-3.96,2.37&#xA;&#x9;&#x9; M24,19v5l3,3"/></g></svg>
    );
  }

});

module.exports = Icon;
