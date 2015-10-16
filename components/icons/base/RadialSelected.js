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
      a11yTitleId: 'radial-selected-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-radial-selected'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "radial-selected");

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
        { id: 'radial-selected' },
        React.createElement('rect', { id: '_x2E_svg_35_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('circle', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', cx: '24', cy: '24', r: '11' }),
        React.createElement('path', { fill: '#231F20', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M24,28c-2.2055,0-4-1.7945-4-4s1.7945-4,4-4 s4,1.7945,4,4S26.2055,28,24,28z' })
      )
    );
  }

});

module.exports = Icon;