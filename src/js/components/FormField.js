// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var FormField = React.createClass({

  render: function () {
    return (
      <div className="form-field">
        {this.props.children}
      </div>
    );
  }

});

module.exports = FormField;
