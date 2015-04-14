// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Form = React.createClass({

  propTypes: {
    className: React.PropTypes.string,
    onSubmit: React.PropTypes.func
  },

  render: function () {
    var classes = ["form"];
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <form className={classes.join(' ')} onSubmit={this.props.onSubmit}>
        {this.props.children}
      </form>
    );

    /*
        <div className={"form__header"}>
          <div className={"form__title"}>
            <span className={"form__title-action"}>
              {this.props.action}
            </span>
            <span className={"form__title-resource"}>
              {this.props.resource}
            </span>
          </div>
        </div>
    */
    /*
        <div className={"form__footer"}>
          {this.props.buttons}
        </div>
    */
  }

});

module.exports = Form;
