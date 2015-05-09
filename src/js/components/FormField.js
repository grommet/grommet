// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_ROOT = "form-field";

var FormField = React.createClass({

  propTypes: {
    error: React.PropTypes.string,
    help: React.PropTypes.node,
    htmlFor: React.PropTypes.string,
    label: React.PropTypes.string,
    required: React.PropTypes.bool
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.required) {
      classes.push(CLASS_ROOT + "--required");
    }
    if (this.props.htmlFor) {
      classes.push(CLASS_ROOT + "--text");
    }

    var error = null;
    if (this.props.error) {
      classes.push(CLASS_ROOT + "--error");
      error = <span className={CLASS_ROOT + "__error"}>{this.props.error}</span>;
    }
    var help = null;
    if (this.props.help) {
      help = <span className={CLASS_ROOT + "__help"}>{this.props.help}</span>;
    }

    return (
      <div className={classes.join(' ')}>
        <label className={CLASS_ROOT + "__label"} htmlFor={this.props.htmlFor}>
          {this.props.label}
        </label>
        <span className={CLASS_ROOT + "__container"}>
          <span className={CLASS_ROOT + "__contents"}>
            {this.props.children}
          </span>
          {help}
          {error}
        </span>
      </div>
    );
  }

});

module.exports = FormField;
