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
      a11yTitleId: 'test-desktop-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-test-desktop';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "test-desktop");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="test-desktop"><rect id="_x2E_svg_108_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M30.2174,13H35v18H13V13h5 M28,31h-8v4h8V31z&#xA;&#x9;&#x9; M17,35h14 M20,13h8 M22,14v3.7727l-5,8.1818V27h7 M24,27h7v-1.0455l-5-8.1818V14 M28.4526,21.5795&#xA;&#x9;&#x9;c-4.2577-2.3438-4.7917,1.946-8.5436-0.3977"/></g></svg>
    );
  }

});

module.exports = Icon;
