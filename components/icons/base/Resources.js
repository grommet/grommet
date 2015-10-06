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
      a11yTitleId: 'resources-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-resources';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "resources");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="resources"><rect id="_x2E_svg_210_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" d="M24,25l-10-5l10-5l10,5&#xA;&#x9;&#x9;L24,25z M19,22.5L14,25l5,2.5l5,2.5l5-2.5l5-2.5l-5-2.5 M19,27.5L14,30l10,5l10-5l-5-2.5"/></g></svg>
    );
  }

});

module.exports = Icon;
