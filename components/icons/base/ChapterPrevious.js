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
      a11yTitleId: 'chapter-previous-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-chapter-previous';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "chapter-previous");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="chapter-previous"><rect id="_x2E_svg_265_" x="0" y="0" fill="none" width="48" height="48"/><polygon fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" points="12.9838,24 26,14 26,19.7143 34,14 34,34 &#xA;&#x9;&#x9;26,28.2857 26,34 &#x9;"/><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="12" y1="14" x2="12" y2="34"/></g></svg>
    );
  }

});

module.exports = Icon;
