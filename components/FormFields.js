// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');

var FormFields = React.createClass({
  displayName: 'FormFields',

  render: function render() {
    var classes = ["form-fields"];
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return React.createElement(
      'div',
      { className: classes.join(' ') },
      this.props.children
    );
  }

});

module.exports = FormFields;