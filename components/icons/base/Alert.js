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
      a11yTitleId: 'alert-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-alert'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "alert");

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
        { id: 'alert' },
        React.createElement('rect', { id: '_x2E_svg_11_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement(
          'g',
          null,
          React.createElement('path', { fill: '#231F20', d: 'M24,17.1214l8.6309,15.8234H15.3691L24,17.1214 M24,12.9448l-12,22h24L24,12.9448L24,12.9448z' })
        ),
        React.createElement('line', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', x1: '24', y1: '27.9448', x2: '24', y2: '21.9448' }),
        React.createElement('rect', { x: '23', y: '28.9448', fill: '#231F20', width: '2', height: '2' })
      )
    );
  }

});

module.exports = Icon;