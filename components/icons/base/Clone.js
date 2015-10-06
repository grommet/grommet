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
      a11yTitleId: 'clone-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-clone';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "clone");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="clone"><rect id="_x2E_svg_156_" x="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M19.0833,19.0455H35v15.9167H19.0833V19.0455z&#xA;&#x9;&#x9; M29,16.0455v-3h-3 M13,26.0455v3h3 M13,24.0455v-6 M16,13.0455h-3v3 M18,13.0455h6"/></g></svg>
    );
  }

});

module.exports = Icon;
