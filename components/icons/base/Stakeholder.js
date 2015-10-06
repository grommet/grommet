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
      a11yTitleId: 'stakeholder-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-stakeholder';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "stakeholder");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="stakeholder"><rect id="_x2E_svg_155_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M26.5,16l6-2.9545L38.5,16v7.0909l-6,2.9545&#xA;&#x9;&#x9;l-6-2.9545V16z M26.5,16l6,2.9545L38.5,16 M32.5,19.0455v7 M18.5,24.0455c0,0,0.04,0,0.02,0c-3.23,0.03-6.02,2.66-6.02,5.89v2.11h3&#xA;&#x9;&#x9; M14.5,32.0455h10v-2.11c0-3.23-2.76-5.86-5.98-5.89c-0.02,0-0.02,0-0.02,0 M18.5,16.0455c-2.2091,0-4,1.7909-4,4s1.7909,4,4,4&#xA;&#x9;&#x9;s4-1.7909,4-4S20.7091,16.0455,18.5,16.0455z"/></g></svg>
    );
  }

});

module.exports = Icon;
