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
      a11yTitleId: 'social-twitter-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-social-twitter'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "social-twitter";
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
        { id: 'social-twitter' },
        React.createElement('rect', { id: '_x2E_svg_307_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { d: 'M36,16.5565c-0.8831,0.3923-1.8319,0.6563-2.828,0.7755c1.0164-0.6093,1.7974-1.5744,2.1648-2.7242 c-0.9512,0.5646-2.0053,0.974-3.1265,1.1953c-0.8982-0.9575-2.1779-1.5551-3.5941-1.5551c-2.7195,0-4.924,2.2045-4.924,4.924 c0,0.386,0.0434,0.7617,0.1275,1.1216c-4.0922-0.2048-7.7206-2.1652-10.1488-5.1445c-0.424,0.7272-0.6666,1.5731-0.6666,2.4761 c0,1.7075,0.8689,3.2151,2.1904,4.0981c-0.8072-0.0262-1.5666-0.2474-2.2304-0.6155c-0.0004,0.02-0.0007,0.0407-0.0007,0.0613 c0,2.3858,1.6975,4.3759,3.9499,4.8281c-0.4129,0.1131-0.8482,0.173-1.297,0.173c-0.3174,0-0.6256-0.031-0.9265-0.0889 c0.6266,1.9564,2.4451,3.3805,4.5996,3.4205c-1.6854,1.3201-3.8082,2.1073-6.1151,2.1073c-0.3978,0-0.7897-0.0234-1.1747-0.0683 c2.179,1.396,4.7671,2.2115,7.5479,2.2115c9.0568,0,14.0094-7.5028,14.0094-14.0094c0-0.213-0.0049-0.4254-0.0145-0.6363 C34.5052,18.4115,35.3399,17.5443,36,16.5565z' })
      )
    );
  }

});

module.exports = Icon;