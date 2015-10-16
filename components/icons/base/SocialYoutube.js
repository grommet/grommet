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
      a11yTitleId: 'social-youtube-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-social-youtube'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "social-youtube");

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
        { id: 'social-youtube' },
        React.createElement('rect', { id: '_x2E_svg_310_', x: '0', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement(
          'g',
          { id: 'Lozenge' },
          React.createElement(
            'g',
            null,
            React.createElement('path', { d: 'M37.7189,17.8016c0,0-0.2735-1.9302-1.1131-2.7803c-1.0648-1.1155-2.2574-1.1204-2.8043-1.1853 c-3.9191-0.2839-9.7963-0.2839-9.7963-0.2839h-0.0128c0,0-5.8766,0-9.7955,0.2839c-0.5474,0.0649-1.74,0.0698-2.8048,1.1853 c-0.8396,0.8501-1.1127,2.7803-1.1127,2.7803s-0.2806,2.2646-0.2806,4.531v2.124c0,2.2661,0.2806,4.531,0.2806,4.531 s0.2731,1.9302,1.1127,2.7803c1.0648,1.1145,2.4637,1.0798,3.087,1.1965c2.2398,0.2139,9.5197,0.2815,9.5197,0.2815 s5.8837-0.0095,9.8027-0.2927c0.5469-0.0645,1.7395-0.0708,2.8043-1.1853c0.8396-0.8501,1.1131-2.7803,1.1131-2.7803 s0.2798-2.2649,0.2798-4.531v-2.124C37.9987,20.0662,37.7189,17.8016,37.7189,17.8016z M20.8907,27.2564l-0.0009-8.3179l8,4.1733 L20.8907,27.2564z' })
          )
        )
      )
    );
  }

});

module.exports = Icon;