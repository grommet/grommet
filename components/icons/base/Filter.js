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
      a11yTitleId: 'filter-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-filter';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "filter");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="filter_1_"><rect id="_x2E_svg_8_" x="0" y="0" fill="none" width="48" height="48"/><polygon id="filter" fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="13.5,14 13.5,14.5 21.5,24.5 &#xA;&#x9;&#x9;21.5,34.5 26.5,32.5 26.5,24.5 34.5,14.5 34.5,14 &#x9;"/></g></svg>
    );
  }

});

module.exports = Icon;
