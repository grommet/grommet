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
      a11yTitleId: 'link-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-link'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "link";
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
        { id: 'link' },
        React.createElement('rect', { id: '_x2E_svg_23_', x: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M16.4792,34.6702l-2.9392-2.9392 c-0.7199-0.7199-0.7199-1.8871,0-2.6071l4.5839-4.5839c0.7199-0.7199,1.8871-0.7199,2.6071,0l2.9392,2.9392 c0.7199,0.7199,0.7199,1.8871,0,2.6071l-4.5839,4.5839C18.3663,35.3901,17.1991,35.3901,16.4792,34.6702z M29.8761,23.8803 l4.5839-4.5839c0.7199-0.7199,0.7199-1.8871,0-2.6071L31.5208,13.75c-0.7199-0.7199-1.8871-0.7199-2.6071,0l-4.5839,4.5839 c-0.7199,0.7199-0.7199,1.8871,0,2.6071l2.9392,2.9392C27.989,24.6002,29.1562,24.6002,29.8761,23.8803z M29,19.2101l-10,10' })
      )
    );
  }

});

module.exports = Icon;