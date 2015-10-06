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
      a11yTitleId: 'update-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-update';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "update");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="update"><rect id="_x2E_svg_93_" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M35,12v8h-8 M21,28h-8v8 M34.2493,19.9978&#xA;&#x9;&#x9;C32.6486,15.9016,28.6631,13,24,13c-6.0751,0-11,4.9249-11,11 M13.7507,28.0022C15.3514,32.0984,19.3369,35,24,35&#xA;&#x9;&#x9;c6.0751,0,11-4.9249,11-11"/></g></svg>
    );
  }

});

module.exports = Icon;
