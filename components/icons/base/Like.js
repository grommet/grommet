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
      a11yTitleId: 'like-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-like';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "like");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="like"><rect id="_x2E_svg_77_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M19,35h-6V23h6V35z M19,35h13&#xA;&#x9;&#x9;c1.6569,0,3-1.3431,3-3V22h-7v-6c0-1.6569-1.2431-3-2.9-3H23v7.1c0,1.6569-1.3431,2.9-3,2.9h-1"/></g></svg>
    );
  }

});

module.exports = Icon;
