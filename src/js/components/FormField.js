// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var FormField = React.createClass({

  propTypes: {
    error: React.PropTypes.string,
    help: React.PropTypes.string
  },

  render: function () {
    var classes = ["form-field"];
    var error = null;
    if (this.props.error) {
      classes.push("form-field--error");
      error = <span className="form-field__error">{this.props.error}</span>;
    }
    var help = null;
    if (this.props.help) {
      help = <span className="form-field__help">{this.props.help}</span>;
    }
    return (
      <div className={classes.join(' ')}>
        {this.props.children}
        {error}
        {help}
      </div>
    );
  }

});

module.exports = FormField;
