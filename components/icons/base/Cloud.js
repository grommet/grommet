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
      a11yTitleId: 'cloud-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-cloud';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "cloud");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="cloud"><rect id="_x2E_svg_63_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M19.1,20v-1c0-2.2091,1.7909-4,4-4h3&#xA;&#x9;&#x9;c2.2091,0,4,1.7909,4,4v1c2.7729,0,5,2.2219,5,4.9948S32.8521,30,30.0792,30H23.4 M24.7,20h-6.5792&#xA;&#x9;&#x9;C15.3479,20,13.1,22.2375,13.1,25.0104S15.3271,30,18.1,30v1.1c0,2.2091,1.7909,4,4,4h3c2.2091,0,4-1.7909,4-4V31"/></g></svg>
    );
  }

});

module.exports = Icon;
