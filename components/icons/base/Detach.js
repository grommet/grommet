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
      a11yTitleId: 'detach-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-detach';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "detach");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="detach"><rect id="_x2E_svg_172_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M28,18l-5,5 M25.83,25.83l6.18-6.19&#xA;&#x9;&#x9;c1.55-1.54,1.55-4.05,0-5.6l-0.05-0.05c-1.55-1.55-4.06-1.55-5.6,0l-6.19,6.18 M21,25l-2.46,2.46c-0.77,0.77-0.77,2.03,0,2.8&#xA;&#x9;&#x9;l0.03,0.03c0.77,0.77,2.03,0.77,2.8,0l2.46-2.46 M28.66,28.66l5-5 M18.17,22.17l-2.49,2.49c-2.32,2.32-2.32,6.08,0,8.4l0.09,0.08&#xA;&#x9;&#x9;c2.32,2.32,6.08,2.32,8.4,0l2.49-2.48 M16,16l4.17,4.17L23,23l2.83,2.83l2.83,2.83L32,32"/></g></svg>
    );
  }

});

module.exports = Icon;
