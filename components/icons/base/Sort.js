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
      a11yTitleId: 'sort-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-sort';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "sort");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="sort"><rect id="_x2E_svg_248_" x="0" y="0" fill="none" width="48" height="48"/><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="18" y1="15.5" x2="34" y2="15.5"/><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="18" y1="21.5" x2="32" y2="21.5"/><rect x="12" y="13.5" fill="#231F20" width="4" height="4"/><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="18" y1="27.5" x2="30" y2="27.5"/><rect x="12" y="25.5" fill="#231F20" width="4" height="4"/><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="18" y1="33.5" x2="28" y2="33.5"/><rect x="12" y="31.5" fill="#231F20" width="4" height="4"/><rect x="12" y="19.5" fill="#231F20" width="4" height="4"/></g></svg>
    );
  }

});

module.exports = Icon;
