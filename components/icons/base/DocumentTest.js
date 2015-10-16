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
      a11yTitleId: 'document-test-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-document-test'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "document-test");

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
        { id: 'document-test' },
        React.createElement('rect', { id: '_x2E_svg_272_', y: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('polyline', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', points: '16,18 16,13 29.0002,13 34,17.9999 34,35  29,35 \t' }),
        React.createElement('polyline', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', points: '28,14 28,19 34,19 \t' }),
        React.createElement('line', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', x1: '15', y1: '21', x2: '23', y2: '21' }),
        React.createElement('polyline', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', points: '17,22 17,25.7727 12,33.9545 12,35 19,35  ' }),
        React.createElement('polyline', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', points: '19,35 26,35 26,33.9545 21,25.7727 21,22  ' }),
        React.createElement('path', { fill: 'none', stroke: '#231F20', strokeWidth: '2', strokeMiterlimit: '10', d: 'M23.4527,29.5795 c-4.2577-2.3438-4.7917,1.946-8.5436-0.3977' })
      )
    );
  }

});

module.exports = Icon;