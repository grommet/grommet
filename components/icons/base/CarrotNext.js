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
      a11yTitleId: 'carrot-next-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-carrot-next';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "carrot-next");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="carrot-next"><rect id="_x2E_svg_254_" fill="none" width="48" height="48"/><polygon fill="#231F20" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="19,16.8571 19,31.1429 29,24 &#x9;"/></g></svg>
    );
  }

});

module.exports = Icon;
