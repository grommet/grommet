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
      a11yTitleId: 'advanced-search-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-advanced-search';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "advanced-search");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="advanced-search"><rect id="_x2E_svg_19_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M29,22.4448c0,4.1421-3.3579,7.5-7.5,7.5&#xA;&#x9;&#x9;s-7.5-3.3579-7.5-7.5s3.3579-7.5,7.5-7.5S29,18.3027,29,22.4448z M33,11.9448v6 M30,14.9448h6 M27,27.9448l6,6"/></g></svg>
    );
  }

});

module.exports = Icon;
