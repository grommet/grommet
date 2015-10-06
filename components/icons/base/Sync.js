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
      a11yTitleId: 'sync-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-sync';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "sync");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="sync"><rect id="_x2E_svg_191_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M27.9996,13l4,4l-4,4 M30.9996,17h-11&#xA;&#x9;&#x9;c-3.866,0-7,3.134-7,7v3 M19.9996,27l-4,4l4,4 M16.9996,31h11c3.866,0,7-3.134,7-7v-3"/></g></svg>
    );
  }

});

module.exports = Icon;
