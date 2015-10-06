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
      a11yTitleId: 'carrot-down-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-carrot-down';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "carrot-down");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="carrot-down"><rect id="_x2E_svg_7_" x="0" y="0" fill="none" width="48" height="48"/><polygon id="drop-carrot" fill="#231F20" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="16.8571,19 &#xA;&#x9;&#x9;31.1428,19 24,29 &#x9;"/></g></svg>
    );
  }

});

module.exports = Icon;
