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
      a11yTitleId: 'cut-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-cut';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "cut");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="cut"><rect id="_x2E_svg_53_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M20,16.5c0,1.933-1.567,3.5-3.5,3.5&#xA;&#x9;&#x9;S13,18.433,13,16.5s1.567-3.5,3.5-3.5S20,14.567,20,16.5z M35,32L19.14,18.78 M20,31.5c0-1.933-1.567-3.5-3.5-3.5&#xA;&#x9;&#x9;S13,29.567,13,31.5s1.567,3.5,3.5,3.5S20,33.433,20,31.5z M35,16L19.14,29.22"/></g></svg>
    );
  }

});

module.exports = Icon;
