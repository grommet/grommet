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
      a11yTitleId: 'srive-cage-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-srive-cage';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "srive-cage");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="srive-cage"><rect id="_x2E_svg_205_" x="0" y="0" fill="none" width="48" height="48"/><rect x="30" y="16" fill="#231F20" width="2" height="2"/><rect x="30" y="22" fill="#231F20" width="2" height="2"/><rect x="30" y="28" fill="#231F20" width="2" height="2"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M35,32H13V14h22V32z M14,20h20 M16,17h13 M14,26h20&#xA;&#x9;&#x9; M16,23h13 M16,29h13 M13,14v21 M35,14v21"/></g></svg>
    );
  }

});

module.exports = Icon;
