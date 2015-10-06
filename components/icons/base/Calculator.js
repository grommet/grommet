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
      a11yTitleId: 'calculator-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-calculator';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "calculator");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="calculator"><rect id="_x2E_svg_58_" x="0" y="0" fill="none" width="48" height="48"/><rect x="14.5" y="13" fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" width="19" height="22"/><rect x="17.5" y="24" fill="#231F20" width="3" height="3"/><rect x="22.5" y="24" fill="#231F20" width="3" height="3"/><rect x="27.5" y="24" fill="#231F20" width="3" height="3"/><rect x="17.5" y="29" fill="#231F20" width="3" height="3"/><rect x="22.5" y="29" fill="#231F20" width="3" height="3"/><rect x="27.5" y="29" fill="#231F20" width="3" height="3"/><rect x="18.5" y="17" fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" width="11" height="4"/></g></svg>
    );
  }

});

module.exports = Icon;
