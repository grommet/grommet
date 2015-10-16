// (C) Copyright 2014-2015 Hewlett-Packard Development Company

'use strict';

var React = require('react');
var IntlMixin = require('../../../mixins/GrommetIntlMixin');

var CLASS_ROOT = "control-icon";

var Icon = React.createClass({
  displayName: 'Icon',

  propTypes: {
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string,
    colorIndex: React.PropTypes.string,
    large: React.PropTypes.bool
  },

  mixins: [IntlMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      a11yTitleId: 'payment-paypal-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-payment-paypal'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "payment-paypal");

    return React.createElement(
      'svg',
      { version: '1.1', viewBox: '0 0 48 48', width: '48px', height: '48px', className: classes.join(' '), 'aria-labelledby': this.props.a11yTitleId },
      React.createElement(
        'title',
        { id: this.props.a11yTitleId },
        a11yTitle
      ),
      React.createElement(
        'g',
        { id: 'payment-paypal' },
        React.createElement('rect', { id: '_x2E_svg_294_', x: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { d: 'M30.2812,14.477c-0.978-1.1147-2.7457-1.5925-5.0072-1.5925h-6.5635c-0.4627,0-0.8559,0.3365-0.9283,0.7928 l-2.7329,17.3326c-0.0543,0.3418,0.2103,0.6514,0.5567,0.6514h4.052l1.0177-6.4548l-0.0315,0.2021 c0.0724-0.4563,0.4627-0.7928,0.9248-0.7928h1.9255c3.7827,0,6.7446-1.5364,7.6098-5.981 c0.0257-0.1314,0.0479-0.2594,0.0672-0.3844C31.4292,16.6076,31.1698,15.4894,30.2812,14.477 M32.0516,19.1303L32.0516,19.1303 c-0.0199,0.1256-0.0415,0.253-0.0672,0.3844c-0.8652,4.444-3.8271,5.981-7.6098,5.981h-1.9261 c-0.4621,0-0.8523,0.3365-0.9242,0.7928l-0.9861,6.2521l-0.2798,1.7736c-0.0473,0.2991,0.184,0.5702,0.4866,0.5702h3.4158 c0.4043,0,0.7484-0.2944,0.8115-0.6934l0.0333-0.1741l0.6438-4.0801l0.0415-0.2255c0.0631-0.399,0.4072-0.6934,0.8115-0.6934 h0.5112c3.3089,0,5.8998-1.3442,6.657-5.2321c0.3161-1.6247,0.1525-2.9812-0.6835-3.934 C32.7334,19.5632,32.4185,19.3249,32.0516,19.1303' })
      )
    );
  }

});

module.exports = Icon;