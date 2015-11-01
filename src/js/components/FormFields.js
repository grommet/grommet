// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');

var FormFields = React.createClass({

  render: function () {
    var classes = ["form-fields"];
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <div className={classes.join(' ')}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = FormFields;
