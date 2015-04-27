// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var FormField = React.createClass({

  propTypes: {
    label: React.PropTypes.string,
    htmlFor: React.PropTypes.string,
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
        <label className="form-field__label" htmlFor={this.props.htmlFor}>{this.props.label}</label>
        <span className="form-field__container">
          <span className="form-field__contents">
            {this.props.children}
          </span>
          {error}
          {help}
        </span>
      </div>
    );
  }

});

module.exports = FormField;
