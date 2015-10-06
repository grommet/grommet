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
      a11yTitleId: 'book-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-book';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "book");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="book"><rect id="_x2E_svg_240_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M33,35H16.5c-1.3807,0-2.5-1.1193-2.5-2.5v0&#xA;&#x9;&#x9;c0-1.3807,1.1193-2.5,2.5-2.5H32V13H16.5c-1.3807,0-2.5,1.1193-2.5,2.5V16v17 M31.5,30c-1.3807,0-2.5,1.1193-2.5,2.5v0&#xA;&#x9;&#x9;c0,1.3807,1.1193,2.5,2.5,2.5 M21,13v10l3-2l3,2v-9"/></g></svg>
    );
  }

});

module.exports = Icon;
