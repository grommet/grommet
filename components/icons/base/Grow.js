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
      a11yTitleId: 'grow-title'
    };
  },

  render: function() {
    var className = 'control-icon control-icon-grow';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    var a11yTitle = this.getGrommetIntlMessage(
      typeof this.props.a11yTitle !== "undefined" ?
        this.props.a11yTitle : "grow");

    return (
      <svg version="1.1" viewBox="0 0 48 48" width="48px" height="48px" className={className} aria-labelledby={this.props.a11yTitleId}><title id={this.props.a11yTitleId}>{a11yTitle}</title><g id="grow"><rect id="_x2E_svg_189_" fill="none" width="48" height="48"/><path fill="none" stroke="#231F20" strokeWidth="2" strokeMiterlimit="10" d="M24,17.9792v10 M25.4286,14.2037&#xA;&#x9;&#x9;c-1.4154,1.2132-1.7745,2.9887-1.0978,4.4919c1.7537,0.58,3.8251,0.2722,5.2405-0.941c1.4154-1.2132,1.7745-2.9887,1.0978-4.4919&#xA;&#x9;&#x9;C28.9154,12.6828,26.8441,12.9905,25.4286,14.2037z M17.3308,17.2627c-0.6766,1.5032-0.3176,3.2787,1.0978,4.4919&#xA;&#x9;&#x9;c1.4154,1.2132,3.4868,1.521,5.2405,0.941c0.6766-1.5032,0.3176-3.2787-1.0978-4.4919&#xA;&#x9;&#x9;C21.1559,16.9905,19.0846,16.6828,17.3308,17.2627z M29,27.9792H19l1,7h8L29,27.9792z M16,27.9792h16"/></g></svg>
    );
  }

});

module.exports = Icon;
