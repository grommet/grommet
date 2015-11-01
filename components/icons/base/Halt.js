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
      a11yTitleId: 'halt-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-halt'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "halt";
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
        { id: 'halt' },
        React.createElement('rect', { id: '_x2E_svg_245_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M30,26v-6c0-1.1046,0.8954-2,2-2h0 c1.1046,0,2,0.8954,2,2v8v1c0,3.866-3.134,7-7,7h-6c-3.866,0-7-3.134-7-7v-6h1c1.6569,0,3,1.3431,3,3v4 M30,25v-8 c0-1.1046-0.8954-2-2-2h0c-1.1046,0-2,0.8954-2,2v8 M26,22v-8c0-1.1046-0.8954-2-2-2h0c-1.1046,0-2,0.8954-2,2v8 M22,25v-8 c0-1.1046-0.8954-2-2-2h0c-1.1046,0-2,0.8954-2,2v8.9' })
      )
    );
  }

});

module.exports = Icon;