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
      a11yTitleId: 'user-settings-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-user-settings';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "user-settings");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="user-settings"><rect id="_x2E_svg_129_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M32,33c-1.6545,0-3-1.3458-3-3s1.3455-3,3-3&#xA;&#x9;&#x9;s3,1.3458,3,3S33.6545,33,32,33z M38,30l-3,0.0001 M34.1212,32.1214l2.1214,2.1212 M32,36l-0.0001-3 M27.7573,34.2426&#xA;&#x9;&#x9;l2.1212-2.1214 M26,30h3 M29.8787,27.8787l-2.1213-2.1213 M32,27v-3 M34.1213,27.8787l2.1213-2.1213 M21,13c-2.7614,0-5,2.2386-5,5&#xA;&#x9;&#x9;s2.2386,5,5,5s5-2.2386,5-5S23.7614,13,21,13z M26.0002,24.7548C24.6306,23.6568,22.892,23,21,23h0c-4.4183,0-8,3.5817-8,8v4h12.4"/></g></svg>
    );
  }

});

module.exports = Icon;
