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
      a11yTitleId: 'tesxt-wrap-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-tesxt-wrap'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "tesxt-wrap");

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
        { id: 'tesxt-wrap' },
        React.createElement('rect', { id: '_x2E_svg_195_', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M29,23h7 M29,19h7 M29,15h7 M29,27h7 M12,31h24 M12,35h24' }),
        React.createElement('rect', { x: '13', y: '14.9', fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', width: '13', height: '12.1' }),
        React.createElement('polyline', { fill: '#231F20', points: '14.25,26 17.0192,22 20.25,26.5 \t' }),
        React.createElement('polyline', { fill: '#231F20', points: '18.5833,25.8889 21.968,21 25.9167,26.5 \t' }),
        React.createElement('circle', { fill: '#231F20', cx: '17', cy: '19', r: '2' })
      )
    );
  }

});

module.exports = Icon;