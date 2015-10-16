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
      a11yTitleId: 'sort-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-sort'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "sort");

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
        { id: 'sort' },
        React.createElement('rect', { id: '_x2E_svg_248_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('line', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', x1: '18', y1: '15.5', x2: '34', y2: '15.5' }),
        React.createElement('line', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', x1: '18', y1: '21.5', x2: '32', y2: '21.5' }),
        React.createElement('rect', { x: '12', y: '13.5', fill: '#231F20', width: '4', height: '4' }),
        React.createElement('line', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', x1: '18', y1: '27.5', x2: '30', y2: '27.5' }),
        React.createElement('rect', { x: '12', y: '25.5', fill: '#231F20', width: '4', height: '4' }),
        React.createElement('line', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', x1: '18', y1: '33.5', x2: '28', y2: '33.5' }),
        React.createElement('rect', { x: '12', y: '31.5', fill: '#231F20', width: '4', height: '4' }),
        React.createElement('rect', { x: '12', y: '19.5', fill: '#231F20', width: '4', height: '4' })
      )
    );
  }

});

module.exports = Icon;