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
      a11yTitleId: 'halt-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-halt';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "halt");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="halt"><rect id="_x2E_svg_245_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M30,26v-6c0-1.1046,0.8954-2,2-2h0&#xA;&#x9;&#x9;c1.1046,0,2,0.8954,2,2v8v1c0,3.866-3.134,7-7,7h-6c-3.866,0-7-3.134-7-7v-6h1c1.6569,0,3,1.3431,3,3v4 M30,25v-8&#xA;&#x9;&#x9;c0-1.1046-0.8954-2-2-2h0c-1.1046,0-2,0.8954-2,2v8 M26,22v-8c0-1.1046-0.8954-2-2-2h0c-1.1046,0-2,0.8954-2,2v8 M22,25v-8&#xA;&#x9;&#x9;c0-1.1046-0.8954-2-2-2h0c-1.1046,0-2,0.8954-2,2v8.9"/></g></svg>
    );
  }

});

module.exports = Icon;
