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
      a11yTitleId: 'alert-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-alert';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "alert");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="alert"><rect id="_x2E_svg_11_" x="0" y="0" fill="none" width="48" height="48"/><g><path fill="#231F20" d="M24,17.1214l8.6309,15.8234H15.3691L24,17.1214 M24,12.9448l-12,22h24L24,12.9448L24,12.9448z"/></g><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="24" y1="27.9448" x2="24" y2="21.9448"/><rect x="23" y="28.9448" fill="#231F20" width="2" height="2"/></g></svg>
    );
  }

});

module.exports = Icon;
