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
      a11yTitleId: 'announcement-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-announcement';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "announcement");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="announcement"><rect id="_x2E_svg_59_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M19,28c-2.7614,0-5-2.2386-5-5s2.2386-5,5-5h5v10&#xA;&#x9;&#x9;H19z M32,23v-8.7c0,0-4,3.7-8,3.7 M24,28c4,0,8,3.6,8,3.6V23 M33,26c1.6569,0,3-1.3431,3-3s-1.3431-3-3-3 M24,28h-4v7h4V28z"/></g></svg>
    );
  }

});

module.exports = Icon;
