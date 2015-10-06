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
      a11yTitleId: 'host-maintenance-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-host-maintenance';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "host-maintenance");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="host-maintenance"><rect id="_x2E_svg_217_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M23.1,35H14V13h16v10 M15,20h14 M15,25h13.1 M15,30&#xA;&#x9;&#x9;h11"/><rect x="25" y="15" fill="#231F20" width="3" height="3"/><path fill="#231F20" d="M35.3397,26.7645l-1.9941,1.9941l-1.4142-1.4142l1.994-1.994c-1.1101-0.5445-2.4819-0.3465-3.4083,0.5798&#xA;&#x9;&#x9;c-0.9244,0.9244-1.1092,2.2919-0.5776,3.4064l-5.0793,5.079l1.4141,1.4141l5.0795-5.079c1.1144,0.5314,2.4817,0.3466,3.4061-0.5778&#xA;&#x9;&#x9;C35.6861,29.2465,35.8842,27.8746,35.3397,26.7645z"/></g></svg>
    );
  }

});

module.exports = Icon;
