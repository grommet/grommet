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
      a11yTitleId: 'compare-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-compare';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "compare");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="compare"><rect id="_x2E_svg_161_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M17.9688,31h-6V21h6V31z M35.9688,21h-6v10h6V21z"/><g><polygon fill="#231F20" points="26.9688,21 22.9688,17 22.9688,25 &#x9;&#x9;"/><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="19.9688" y1="21" x2="23.9688" y2="21"/></g><g><polygon fill="#231F20" points="20.9688,31 24.9688,35 24.9688,27 &#x9;&#x9;"/><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="27.9688" y1="31" x2="23.9688" y2="31"/></g></g></svg>
    );
  }

});

module.exports = Icon;
