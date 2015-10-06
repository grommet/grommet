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
      a11yTitleId: 'database-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-database';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "database");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="database"><rect id="_x2E_svg_50_" x="0" y="0" fill="none" width="48" height="48"/><rect x="13" y="13.5" fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" width="22" height="7"/><rect x="13" y="20.5" fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" width="22" height="7"/><rect x="13" y="27.5" fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" width="22" height="7"/><rect x="15" y="15.5" fill="#231F20" width="3" height="3"/><rect x="15" y="22.5" fill="#231F20" width="3" height="3"/><rect x="15" y="29.5" fill="#231F20" width="3" height="3"/></g></svg>
    );
  }

});

module.exports = Icon;
