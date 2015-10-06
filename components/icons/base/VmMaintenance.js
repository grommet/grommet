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
      a11yTitleId: 'vm-maintenance-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-vm-maintenance';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "vm-maintenance");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="vm-maintenance"><rect id="_x2E_svg_176_" fill="none" width="48" height="48"/><path fill="#231F20" d="M34.6937,26.2495l-2.0349,2.0349l-1.4431-1.4432l2.0348-2.0348c-1.1328-0.5556-2.5327-0.3536-3.478,0.5917&#xA;&#x9;&#x9;c-0.9433,0.9433-1.1319,2.3387-0.5894,3.476L24,34.0569l1.443,1.443l5.1833-5.1829c1.1372,0.5422,2.5324,0.3536,3.4757-0.5896&#xA;&#x9;&#x9;C35.0472,28.7822,35.2493,27.3824,34.6937,26.2495z"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M26,25.5H16v-10h10V25.5z M29,23.5v-4H19v10h6&#xA;&#x9;&#x9; M22,22.5H12v10h10V22.5z"/></g></svg>
    );
  }

});

module.exports = Icon;
