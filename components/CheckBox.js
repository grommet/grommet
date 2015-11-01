// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');

var CLASS_ROOT = "check-box";

var CheckBox = React.createClass({
  displayName: 'CheckBox',

  propTypes: {
    checked: React.PropTypes.bool,
    defaultChecked: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.node.isRequired,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    ariaDescribedby: React.PropTypes.string,
    toggle: React.PropTypes.bool
  },

  render: function render() {
    var classes = [CLASS_ROOT];
    var labelId = 'checkbox-label';
    var hidden;
    if (this.props.toggle) {
      classes.push(CLASS_ROOT + "--toggle");
    }
    if (this.props.disabled) {
      classes.push(CLASS_ROOT + "--disabled");
      if (this.props.checked) {
        hidden = React.createElement('input', { name: this.props.name, type: 'hidden', value: 'true' });
      }
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return React.createElement(
      'label',
      { className: classes.join(' '),
        'aria-describedby': this.props.ariaDescribedby,
        'aria-lebelledby': labelId },
      React.createElement('input', { tabIndex: '0', className: CLASS_ROOT + "__input",
        id: this.props.id, name: this.props.name, type: 'checkbox',
        disabled: this.props.disabled,
        checked: this.props.checked,
        defaultChecked: this.props.defaultChecked,
        onChange: this.props.onChange }),
      React.createElement(
        'span',
        { className: CLASS_ROOT + "__control" },
        React.createElement(
          'svg',
          { className: CLASS_ROOT + "__control-check", viewBox: '0 0 24 24',
            preserveAspectRatio: 'xMidYMid meet' },
          React.createElement('path', { fill: 'none', d: 'M6,11.3 L10.3,16 L18,6.2' })
        )
      ),
      hidden,
      React.createElement(
        'span',
        { role: 'label', id: labelId, tabIndex: '-1', className: CLASS_ROOT + "__label" },
        this.props.label
      )
    );
  }

});

module.exports = CheckBox;