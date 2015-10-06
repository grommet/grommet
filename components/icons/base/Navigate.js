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
      a11yTitleId: 'navigate-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-navigate';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "navigate");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="navigate"><rect id="_x2E_svg_144_" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M26,35.9467h-4v-20l2-2l2,2V35.9467z M22,16.9467&#xA;&#x9;&#x9;h-7l-3,2.9996l3,3.0004h7V16.9467z M26,25.9467h7l3-2.9996l-3-3.0004h-7V25.9467z"/></g></svg>
    );
  }

});

module.exports = Icon;
