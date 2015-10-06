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
      a11yTitleId: 'platform-chrome-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-platform-chrome';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "platform-chrome");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="platform-chrome"><rect id="_x2E_svg_302_" x="0" y="0" fill="none" width="48" height="48"/><path d="M17.9167,22.4657l-3.4346-5.9489c2.199-2.7533,5.584-4.5177,9.3816-4.5177c4.3933,0,8.2344,2.3612,10.3257,5.8832h-9.7922&#xA;&#x9;&#x9;c-0.1759-0.0152-0.3537-0.0234-0.5335-0.0234C21.0071,17.8589,18.5998,19.8195,17.9167,22.4657z M28.1603,19.6169h6.8785&#xA;&#x9;&#x9;c0.533,1.3578,0.8259,2.8362,0.8259,4.3831c0,6.5823-5.2996,11.926-11.8646,11.9991l4.908-8.5009&#xA;&#x9;&#x9;c0.691-0.9933,1.0968-2.1992,1.0968-3.4983C30.0048,22.285,29.2978,20.7321,28.1603,19.6169z M19.504,24&#xA;&#x9;&#x9;c0-2.4039,1.9558-4.3597,4.3597-4.3597S28.2234,21.5961,28.2234,24s-1.9558,4.3597-4.3597,4.3597S19.504,26.4039,19.504,24z&#xA;&#x9;&#x9; M25.5087,29.917l-3.4357,5.9507C16.2946,35.0032,11.8629,30.0193,11.8629,24c0-2.1381,0.5598-4.1451,1.5399-5.8838l4.8995,8.4863&#xA;&#x9;&#x9;c0.9814,2.0887,3.1051,3.5386,5.5615,3.5386C24.4333,30.1411,24.985,30.0628,25.5087,29.917z"/></g></svg>
    );
  }

});

module.exports = Icon;
