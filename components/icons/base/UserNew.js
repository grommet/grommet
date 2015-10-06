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
      a11yTitleId: 'user-new-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-user-new';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "user-new");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="user-new"><rect id="_x2E_svg_131_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M25.9688,18c0,2.7614-2.2386,5-5,5s-5-2.2386-5-5&#xA;&#x9;&#x9;s2.2386-5,5-5S25.9688,15.2386,25.9688,18z M25.969,24.7548C24.5994,23.6568,22.8608,23,20.9688,23h0c-4.4183,0-8,3.5817-8,8v4h12&#xA;&#x9;&#x9; M31.9688,24v12 M37.1652,27.0005l-10.3928,5.9991 M37.1644,33.0009l-10.3913-6.0018"/></g></svg>
    );
  }

});

module.exports = Icon;
