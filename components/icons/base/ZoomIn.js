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
      a11yTitleId: 'zoom-in-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-zoom-in';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "zoom-in");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="zoom-in"><rect id="_x2E_svg_115_" fill="none" width="48" height="48"/><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="21.5" y1="16.5" x2="21.5" y2="26.5"/><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="26.5" y1="21.5" x2="16.5" y2="21.5"/><circle fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" cx="21.5" cy="21.5" r="9"/><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="34.5" y1="34.5" x2="27.86" y2="27.86"/></g></svg>
    );
  }

});

module.exports = Icon;
