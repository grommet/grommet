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
      a11yTitleId: 'power-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-power';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "power");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="power"><rect id="_x2E_svg_104_" x="0" y="0" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M27.6235,15.75&#xA;&#x9;&#x9;c3.7141,1.4494,6.3412,5.0548,6.3412,9.2853C33.9647,30.5431,29.5078,35,24,35s-9.9647-4.4569-9.9647-9.9647&#xA;&#x9;&#x9;c0-4.2305,2.6271-7.8359,6.3412-9.2853 M24,12v10"/></g></svg>
    );
  }

});

module.exports = Icon;
