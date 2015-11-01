// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');

var CLASS_ROOT = "list-item";

var ListItem = React.createClass({
  displayName: 'ListItem',

  propTypes: {
    annotation: React.PropTypes.node,
    direction: React.PropTypes.oneOf(['row', 'column']),
    image: React.PropTypes.node,
    label: React.PropTypes.node,
    onClick: React.PropTypes.func,
    selected: React.PropTypes.bool
  },

  render: function render() {
    var classes = [CLASS_ROOT];
    if (this.props.onClick) {
      classes.push(CLASS_ROOT + "--selectable");
    }
    if (this.props.selected) {
      classes.push(CLASS_ROOT + "--selected");
    }
    if (this.props.direction) {
      classes.push(CLASS_ROOT + "--" + this.props.direction);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    var image;
    if (this.props.image) {
      image = React.createElement(
        'span',
        { className: CLASS_ROOT + "__image" },
        this.props.image
      );
    }

    return React.createElement(
      'li',
      { className: classes.join(' '), onClick: this.props.onClick },
      image,
      React.createElement(
        'span',
        { className: CLASS_ROOT + "__label" },
        this.props.label
      ),
      React.createElement(
        'span',
        { className: CLASS_ROOT + "__annotation" },
        this.props.annotation
      )
    );
  }

});

module.exports = ListItem;
/*}
<span className={CLASS_ROOT + "__text"}>
{*/ /*}
    </span>
    {*/