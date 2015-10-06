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
      a11yTitleId: 'cycle-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-cycle';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "cycle");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="cycle"><rect id="_x2E_svg_52_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M26.9508,29.7125l-2.2097,3.9209l3.8266,2.2642&#xA;&#x9;&#x9; M17.518,23.4374l-2.2088-3.9215L11.482,21.779"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M27.6134,18.4261l4.4187,0.0263l0.0257-4.5277"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M26.0138,33.5&#xA;&#x9;&#x9;c4.4091-0.9351,7.7173-4.8501,7.7173-9.5378c0-0.729-0.08-1.4393-0.2317-2.1226"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M14.8579,20.5153&#xA;&#x9;&#x9;c-0.4051,1.0716-0.6268,2.2334-0.6268,3.4469c0,4.3751,2.8817,8.0772,6.8506,9.3117"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M31.2979,17.5179&#xA;&#x9;&#x9;c-1.7867-2.027-4.4024-3.3057-7.3168-3.3057c-2.4341,0-4.6598,0.8919-6.3682,2.3668"/></g></svg>
    );
  }

});

module.exports = Icon;
