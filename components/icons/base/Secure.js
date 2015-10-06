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
      a11yTitleId: 'secure-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-secure';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "secure");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="secure"><rect id="_x2E_svg_68_" x="0" y="0" fill="none" width="48" height="48"/><path fill="#231F20" d="M26,27c0-1.1046-0.8954-2-2-2s-2,0.8954-2,2c0,0.7384,0.4047,1.3761,1,1.7226V31h2v-2.2774&#xA;&#x9;&#x9;C25.5953,28.3761,26,27.7384,26,27z"/><circle fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" cx="24" cy="28" r="7"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M19,23v-5c0-2.7614,2.2386-5,5-5h0&#xA;&#x9;&#x9;c2.7614,0,5,2.2386,5,5v5"/></g></svg>
    );
  }

});

module.exports = Icon;
