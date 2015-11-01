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
      a11yTitleId: 'document-outlook-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-document-outlook'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "document-outlook";
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
        { id: 'document-outlook' },
        React.createElement('rect', { id: '_x2E_svg_276_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('polyline', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', points: '16.4186,21 16.4186,13 29.4188,13  34.4186,17.9999 34.4186,35 15.4186,35 \t' }),
        React.createElement('polyline', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', points: '28.4186,14 28.4186,19 34.4186,19 \t' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M27.4186,19' }),
        React.createElement('path', { fill: '#231F20', d: 'M14.3379,27.4758v-0.0256c0-2.6643,1.653-4.75,4.094-4.75c2.4272,0,4.0674,2.0601,4.0674,4.7234v0.0266 c0,2.6633-1.6402,4.75-4.0935,4.75C15.9519,32.2002,14.3379,30.1401,14.3379,27.4758z M20.4264,27.4758v-0.0256 c0-1.6668-0.8137-2.9265-2.0206-2.9265c-1.2075,0-1.995,1.2203-1.995,2.8999v0.0266c0,1.6796,0.8009,2.9255,2.0211,2.9255 S20.4264,29.1426,20.4264,27.4758z' })
      )
    );
  }

});

module.exports = Icon;