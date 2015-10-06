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
      a11yTitleId: 'test-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-test';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "test");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="test"><rect id="_x2E_svg_107_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M18,13h12 M21,14v6l-7,12v3h10 M24,35h10v-3l-7-12&#xA;&#x9;&#x9;v-6 M30.0417,25.5833C24.0406,22.1458,23.288,28.4375,18,25"/><circle fill="#231F20" cx="26.5" cy="29.5" r="1.5"/><circle fill="#231F20" cx="21.5" cy="30.5" r="1.5"/></g></svg>
    );
  }

});

module.exports = Icon;
