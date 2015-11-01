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
      a11yTitleId: 'platform-internet-explorer-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-platform-internet-explorer'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "platform-internet-explorer";
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
        { id: 'platform-internet-explorer', transform: 'translate(-314.39464,-274.3971)' },
        React.createElement('rect', { id: '_x2E_svg_298_', x: '314.3947', y: '274.3971', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { id: 'svg', d: 'M348.6691,299.3958c0-1.8973-0.4905-3.6797-1.3507-5.2286 c3.6665-8.2982-3.9288-7.0827-4.3517-7c-1.6091,0.3148-3.0978,0.8204-4.471,1.4612c-0.2025-0.0114-0.4062-0.0176-0.6115-0.0176 c-5.1248,0-9.4146,3.5745-10.5126,8.3664c2.7011-3.0303,4.5915-4.253,5.7235-4.7423c-0.1807,0.1614-0.3576,0.3247-0.5316,0.4892 c-0.0579,0.0547-0.1137,0.1101-0.1708,0.1652c-0.1147,0.1104-0.2292,0.2208-0.341,0.3323 c-0.0665,0.0663-0.1313,0.1332-0.1968,0.1999c-0.0992,0.101-0.1982,0.2018-0.295,0.3034 c-0.0688,0.0721-0.1358,0.1445-0.2034,0.2167c-0.0905,0.0968-0.1804,0.1938-0.2686,0.291c-0.0685,0.0756-0.136,0.1512-0.2033,0.227 c-0.0836,0.0941-0.1665,0.1883-0.2482,0.2827c-0.0678,0.0783-0.135,0.1566-0.2014,0.2349c-0.0775,0.0915-0.154,0.183-0.2297,0.2744 c-0.067,0.081-0.1337,0.1618-0.1992,0.2426c-0.0709,0.0874-0.1402,0.1747-0.2094,0.262c-0.0671,0.0845-0.1342,0.1689-0.1997,0.2534 c-0.0624,0.0804-0.123,0.1605-0.184,0.2406c-0.0689,0.0906-0.1383,0.1811-0.2054,0.2712c-0.048,0.0645-0.0941,0.1284-0.1411,0.1927 c-0.4261,0.5815-0.8155,1.1517-1.1671,1.6995c-0.0009,0.0013-0.0018,0.0027-0.0026,0.004 c-0.0926,0.1443-0.1819,0.2864-0.2695,0.4272c-0.0047,0.0076-0.0096,0.0153-0.0143,0.023 c-0.0877,0.1414-0.1723,0.2804-0.2548,0.418c-0.0029,0.0048-0.0059,0.0097-0.0089,0.0145 c-0.2218,0.3702-0.4276,0.7271-0.6129,1.0629c-0.9713,1.7603-1.4442,2.9902-1.4647,3.0632 c-3.0673,10.966,6.5059,6.3351,7.8417,5.6439c1.4384,0.7106,3.0577,1.1106,4.7707,1.1106c4.6895,0,8.6794-2.9934,10.1646-7.1736 h-5.6668c-0.8385,1.4166-2.4528,2.3761-4.3074,2.3761c-2.7172,0-4.9199-2.0587-4.9199-4.5984h15.4256 C348.6388,300.33,348.6691,299.8665,348.6691,299.3958L348.6691,299.3958z M346.6544,288.7827 c0.9287,0.6268,1.6736,1.6112,0.3944,4.9265c-1.227-1.9732-3.0729-3.5211-5.267-4.3719 C342.7799,288.8553,345.2516,287.8358,346.6544,288.7827z M326.9172,309.0483c-0.7564-0.7758-0.8902-2.6652,0.779-6.1082 c0.8424,2.422,2.5234,4.4515,4.6962,5.7395C331.3119,309.2743,328.4431,310.6134,326.9172,309.0483z M333.1309,297.8357 c0.0862-2.4684,2.2344-4.4447,4.8738-4.4447c2.6393,0,4.7876,1.9763,4.8738,4.4447H333.1309L333.1309,297.8357z' })
      )
    );
  }

});

module.exports = Icon;