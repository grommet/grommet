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
      a11yTitleId: 'troubleshooting-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-troubleshooting'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "troubleshooting";
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
        { id: 'troubleshooting' },
        React.createElement('rect', { id: '_x2E_svg_109_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M15.5,22.59c-1.76-0.78-3-2.54-3-4.59 s1.24-3.81,3-4.59V14v4h4v-4v-0.59c1.76,0.78,3,2.54,3,4.59s-1.24,3.81-3,4.59V23v10c0,1.1-0.9,2-2,2c-0.55,0-1.05-0.22-1.41-0.59 c-0.37-0.36-0.59-0.86-0.59-1.41V23V22.59z M32.5,15c0-1.1046-0.8954-2-2-2l0,0c-1.1046,0-2,0.8954-2,2v9h4V15z M25.5,24h10 M30.5,24v6H28l1.5,5h2l1.5-5h-1.5' })
      )
    );
  }

});

module.exports = Icon;