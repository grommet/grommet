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
      a11yTitleId: 'location-pin-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-location-pin';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "location-pin");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="location-pin"><rect id="_x2E_svg_186_" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M33,21.9792c0,6.75-9,13-9,13s-9-6.25-9-13&#xA;&#x9;&#x9;c0-4.9706,4.0294-9,9-9S33,17.0086,33,21.9792z M24,18.9792c-1.6569,0-3,1.3431-3,3c0,1.6569,1.3431,3,3,3s3-1.3431,3-3&#xA;&#x9;&#x9;C27,20.3223,25.6569,18.9792,24,18.9792z"/></g></svg>
    );
  }

});

module.exports = Icon;
