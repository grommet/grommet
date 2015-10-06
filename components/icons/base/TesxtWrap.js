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
      a11yTitleId: 'tesxt-wrap-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-tesxt-wrap';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "tesxt-wrap");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="tesxt-wrap"><rect id="_x2E_svg_195_" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M29,23h7 M29,19h7 M29,15h7 M29,27h7 M12,31h24&#xA;&#x9;&#x9; M12,35h24"/><rect x="13" y="14.9" fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" width="13" height="12.1"/><polyline fill="#231F20" points="14.25,26 17.0192,22 20.25,26.5 &#x9;"/><polyline fill="#231F20" points="18.5833,25.8889 21.968,21 25.9167,26.5 &#x9;"/><circle fill="#231F20" cx="17" cy="19" r="2"/></g></svg>
    );
  }

});

module.exports = Icon;
