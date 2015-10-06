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
      a11yTitleId: 'document-threat-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-document-threat';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "document-threat");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="document-threat"><rect id="_x2E_svg_234_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M16,16v-3h13.0002L34,17.9999V35h-9 M28,14v5h6&#xA;&#x9;&#x9; M16,24.72c-2,0.7933-3.2083,2.7067-3.2083,4.9467C12.7917,32.6133,15.3033,35,18.25,35s5.25-2.3867,5.25-5.3333&#xA;&#x9;&#x9;c0-2.24-1.5-4.1533-3.5-4.9467v-0.3867V23h-4v1.3333V24.72z M25,19.6c0,0.8284-0.6716,1.5-1.5,1.5h-0.3333&#xA;&#x9;&#x9;c-0.8284,0-1.5-0.6716-1.5-1.5v0c0-0.8284-0.6716-1.5-1.5-1.5H19.5c-0.8284,0-1.5,0.6716-1.5,1.5v2.5"/></g></svg>
    );
  }

});

module.exports = Icon;
