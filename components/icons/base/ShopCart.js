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
      a11yTitleId: 'shop-cart-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-shop-cart';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "shop-cart");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="shop-cart"><rect id="_x2E_svg_45_" x="0" y="0" fill="none" width="48" height="48"/><circle fill="#231F20" cx="20.9988" cy="33" r="2"/><circle fill="#231F20" cx="30.9988" cy="33" r="2"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M16.9988,16h17.625l-2.625,9h-13l-3-12h-4&#xA;&#x9;&#x9; M18.9988,25l1,4h13"/></g></svg>
    );
  }

});

module.exports = Icon;
