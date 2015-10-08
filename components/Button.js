// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');

var CLASS_ROOT = "button";

var Button = React.createClass({
  displayName: 'Button',

  propTypes: {
    accent: React.PropTypes.bool,
    label: React.PropTypes.string,
    id: React.PropTypes.string,
    onClick: React.PropTypes.func,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
    icon: React.PropTypes.bool,
    type: React.PropTypes.oneOf(['button', 'reset', 'submit', 'icon'])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      type: "button"
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT];
    if (this.props.primary) {
      classes.push(CLASS_ROOT + "--primary");
    }
    if (this.props.secondary) {
      classes.push(CLASS_ROOT + "--secondary");
    }
    if (this.props.accent) {
      classes.push(CLASS_ROOT + "--accent");
    }
    if (!this.props.onClick) {
      classes.push(CLASS_ROOT + "--disabled");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var content = this.props.label;
    var type = this.props.type;
    if (this.props.type === 'icon') {
      classes.push(CLASS_ROOT + "--icon");
      content = this.props.children;
      type = 'button';
    }

    return React.createElement(
      'button',
      { id: this.props.id, type: type, className: classes.join(' '),
        onClick: this.props.onClick },
      content
    );
  }

});

module.exports = Button;