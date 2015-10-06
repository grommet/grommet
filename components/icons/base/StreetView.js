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
      a11yTitleId: 'street-view-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-street-view';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "street-view");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="street-view"><rect id="_x2E_svg_136_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M28,17c0,2.2091-1.7909,4-4,4s-4-1.7909-4-4&#xA;&#x9;&#x9;s1.7909-4,4-4S28,14.7909,28,17z M24,21c0,0,0.04,0,0.02,0C20.79,21.03,18,23.66,18,26.89V29h3v6h6v-6h3v-2.11&#xA;&#x9;&#x9;c0-3.23-2.76-5.86-5.98-5.89C24,21,24,21,24,21 M16,35h16"/></g></svg>
    );
  }

});

module.exports = Icon;
