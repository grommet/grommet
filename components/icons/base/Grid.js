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
      a11yTitleId: 'grid-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-grid';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "grid");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="grid"><rect id="_x2E_svg_201_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M20.5,20.5h-7v-7h7V20.5z M27.5,13.5h-7v7h7V13.5z&#xA;&#x9;&#x9; M34.5,13.5h-7v7h7V13.5z M20.5,20.5h-7v7h7V20.5z M27.5,20.5h-7v7h7V20.5z M34.5,20.5h-7v7h7V20.5z M20.5,27.5h-7v7h7V27.5z&#xA;&#x9;&#x9; M27.5,27.5h-7v7h7V27.5z M34.5,27.5h-7v7h7V27.5z"/></g></svg>
    );
  }

});

module.exports = Icon;
