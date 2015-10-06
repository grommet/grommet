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
      a11yTitleId: 'document-user-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-document-user';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "document-user");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="document-user"><rect id="_x2E_svg_235_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M16,19v-6h13.0002L34,17.9999V35H24 M28,14v5h6&#xA;&#x9;&#x9; M16,22c-1.6318,0-2.9545,1.3228-2.9545,2.9545S14.3683,27.9091,16,27.9091s2.9545-1.3228,2.9545-2.9545S17.6318,22,16,22z&#xA;&#x9;&#x9; M21,32.6364C21,30.0256,18.679,28,16.0682,28h-0.2046C13.2528,28,11,30.0256,11,32.6364V35h10V32.6364z"/></g></svg>
    );
  }

});

module.exports = Icon;
