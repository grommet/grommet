// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var ReactLayeredComponent = require('../mixins/ReactLayeredComponent');

var Form = React.createClass({

  mixins: [ReactLayeredComponent],

  render: function () {
    return (<span></span>);
  },

  renderLayer: function() {
    return (
      <div className={"form"}>
        <form className={"form__container"} onSubmit={this.props.onSubmit}>
          <div className={"form__header gamma"}>
            <div className={"form__title"}>
              <span className={"form__title-action"}>
                {this.props.action}
              </span>
              <span className={"form__title-resource"}>
                {this.props.resource}
              </span>
            </div>
          </div>
          <div className={"form__content layout--center box"}>
            {this.props.children}
          </div>
          <div className={"form__footer gamma"}>
            {this.props.buttons}
          </div>
        </form>
      </div>
    );
  }

});

module.exports = Form;
