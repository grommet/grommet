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
      a11yTitleId: 'help-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-help';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "help");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="help"><rect id="_x2E_svg_18_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M17.9638,18.789&#xA;&#x9;&#x9;c0-3.3312,2.7795-5.9867,6.1213-5.9402c3.176,0.0442,5.9069,2.9082,5.9511,6.0841c0.0381,2.7402-1.8236,4.9472-4.3113,5.6954&#xA;&#x9;&#x9;C24.679,24.9429,24,25.9806,24,27.0729v2.8719"/><circle fill="#231F20" cx="24" cy="33.9448" r="2"/></g></svg>
    );
  }

});

module.exports = Icon;
