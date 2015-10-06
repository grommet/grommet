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
      a11yTitleId: 'drag-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-drag';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "drag");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="drag"><rect id="_x2E_svg_6_" x="0" y="0" fill="none" width="48" height="48"/><path fill="#231F20" d="M22,18h-4v-4h4V18z M30,14h-4v4h4V14z M22,22h-4v4h4V22z M30,22h-4v4h4V22z M22,30h-4v4h4V30z M30,30h-4v4&#xA;&#x9;&#x9;h4V30z"/></g></svg>
    );
  }

});

module.exports = Icon;
