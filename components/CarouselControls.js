// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');
var Box = require('./Box');

var CLASS_ROOT = "carousel-controls";

var CarouselControls = React.createClass({
  displayName: 'CarouselControls',

  propTypes: {
    count: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func,
    selected: React.PropTypes.number
  },

  _onClick: function _onClick(index) {
    if (this.props.onChange) {
      this.props.onChange(index);
    }
  },

  render: function render() {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var controls = [];
    for (var index = 1; index <= this.props.count; index++) {
      var controlClasses = [CLASS_ROOT + "__control"];
      if (index === this.props.selected) {
        controlClasses.push(CLASS_ROOT + "__control--active");
      }
      controls.push(React.createElement(
        'svg',
        { key: index, className: controlClasses.join(' '), version: '1.1',
          viewBox: '0 0 24 24', width: '24px', height: '24px',
          onClick: this._onClick.bind(this, index) },
        React.createElement('circle', { cx: 12, cy: 12, r: 6 })
      ));
    }

    return React.createElement(
      Box,
      { className: classes.join(' '), direction: 'row', justify: 'center', responsive: false },
      controls
    );
  }

});

module.exports = CarouselControls;