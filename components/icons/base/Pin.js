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
      a11yTitleId: 'pin-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-pin';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "pin");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="pin"><rect id="_x2E_svg_97_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M24.678,32.9559&#xA;&#x9;&#x9;c1.3143-1.3143,1.9749-3.0209,1.9887-4.7412l0.0757-0.0757l6.1932-6.1932l-6.8813-6.8813l-6.1932,6.1932l-0.0757,0.0757&#xA;&#x9;&#x9;c-1.7203,0.0138-3.4269,0.6744-4.7412,1.9887L24.678,32.9559z"/><line fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" x1="23.9899" y1="13" x2="35" y2="24.0101"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M13,35l6.8122-6.8122L13,35z"/></g></svg>
    );
  }

});

module.exports = Icon;
