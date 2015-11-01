// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');
var FormattedMessage = require('../../../components/FormattedMessage');

var CLASS_ROOT = "control-icon";

var Icon = React.createClass({
  displayName: 'Icon',

  propTypes: {
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string,
    colorIndex: React.PropTypes.string,
    large: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      a11yTitleId: 'payment-google-wallet-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-payment-google-wallet'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "payment-google-wallet";
    var a11yTitle = React.createElement(FormattedMessage, { id: titleLabel, defaultMessage: titleLabel });

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
        { id: 'payment-google-wallet' },
        React.createElement('rect', { id: '_x2E_svg_293_', x: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { id: 'path34', d: 'M19.174,22.6586c-1.3677-1.8839-3.2645-3.5355-5.4194-4.6839c-0.3226-0.1806-0.6968-0.271-1.071-0.271 c-0.8387,0-1.6,0.4516-2,1.2c-0.5935,1.0968-0.1677,2.4774,0.929,3.0581c3.3161,1.7806,5.4581,5.1613,5.7161,9.0839v-0.0129 c-0.0387-0.4387,0.0387-0.8645,0.2323-1.2645c0.0258-0.0516,0.0645-0.1161,0.1032-0.1806 c1.0323-1.7032,1.5871-3.6645,1.5871-5.6774C19.2515,23.4844,19.2127,23.0715,19.174,22.6586' }),
        React.createElement('path', { id: 'path36', d: 'M32.3095,18.4006c-0.4-1.7548-0.9935-3.4581-1.7677-5.0839c-0.4129-0.8645-1.3032-1.4323-2.2581-1.4323 c-0.3742,0-0.7355,0.0774-1.071,0.2452c-1.2516,0.5935-1.7806,2.0903-1.1871,3.329c1.2645,2.6839,1.8968,5.5097,1.8968,8.4516 s-0.6323,5.7677-1.871,8.4c-0.0129,0.0387-0.2323,0.5032-0.2323,1.0452c0,0.1548,0.0129,0.3742,0.0645,0.5806 c0.1677,0.7097,0.6194,1.3548,1.3677,1.7032c0.3355,0.1548,0.6968,0.2452,1.071,0.2452c0.9161,0,1.7548-0.5032,2.1935-1.3032 c0.5032-0.9419,1.0065-2.1677,1.4452-3.7548c0.1419-0.4774,0.2581-0.929,0.3613-1.4065c0.4-1.7935,0.6194-3.6258,0.6194-5.5097 C32.9289,22.0522,32.7095,20.1812,32.3095,18.4006' }),
        React.createElement('path', { id: 'path38', d: 'M21.7418,15.7812c-0.0387-0.0774-0.0903-0.1419-0.1419-0.2065c-0.1677-0.2194-0.3613-0.4-0.5935-0.5419 c-0.3742-0.2452-0.8258-0.3871-1.2903-0.3871c-0.3871,0-0.5806,0.0516-0.8516,0.1548c-0.2839,0.1161-0.5806,0.271-0.8516,0.5548 c-0.271,0.2839-0.4258,0.5677-0.5419,0.8774c-0.2323,0.6065-0.1935,1.3935,0.1935,2.0387c0.8258,1.329,1.3161,2.8516,1.4968,4.4129 c0.0516,0.4129,0.0774,0.8387,0.0774,1.2516c0,2.0129-0.5419,3.9742-1.5871,5.6774c-0.0387,0.0645-0.0645,0.1161-0.1032,0.1806 c-0.2065,0.4-0.271,0.8516-0.2323,1.2774c0.0645,0.7226,0.4645,1.4065,1.1355,1.8194c0.1677,0.1032,0.3613,0.1806,0.5419,0.2452 c0.2194,0.0645,0.4516,0.1032,0.6839,0.1032c0.8387,0,1.6-0.4258,2.0387-1.1484c1.3161-2.1548,2.0774-4.6065,2.2452-7.1226 c0.0258-0.3355,0.0387-0.6839,0.0387-1.0194C24.0127,21.0328,23.2256,18.2199,21.7418,15.7812' }),
        React.createElement('path', { id: 'path40', d: 'M26.0386,32.3102c1.2516-2.6323,1.8839-5.4581,1.8839-8.4c0-1.0065-0.0645-1.7419-0.1161-2.2194 c-1.6387-2.6194-4.0129-4.9677-6.8-6.671c0,0,0.0645,0.0387,0.0645,0.0516c0.1935,0.1419,0.3484,0.2839,0.529,0.5032 c0.0387,0.0516,0.1032,0.129,0.1419,0.2065c1.4839,2.4516,2.2581,5.2516,2.2581,8.129c0,0.3484-0.0129,0.6839-0.0387,1.0194 c1.1871,2.2581,1.8323,4.8258,1.8323,7.5226c0,0.2194,0,0.5548,0,0.8129c0.0129-0.2839,0.0774-0.5806,0.1806-0.8387 C26.0127,32.3877,26.0256,32.349,26.0386,32.3102' })
      )
    );
  }

});

module.exports = Icon;