// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');

var CLASS_ROOT = "tab";

var Tab = React.createClass({

  propTypes: {
    title: React.PropTypes.string.isRequired,
    active: React.PropTypes.bool,
    id: React.PropTypes.string
  },

  mixins: [KeyboardAccelerators],

  componentDidMount: function () {
    this.startListeningToKeyboard({
      space: this._onClickTab
    });
  },

  componentWillUnmount: function () {
    this.stopListeningToKeyboard({
      space: this._onClickTab
    });
  },

  _onClickTab: function (event) {
    console.log(event.target);
    if (event.target === this.refs.tab.getDOMNode()) {
      event.preventDefault();
      this.props.onRequestForActive();
    }
  },

  render: function() {
    var classes = [CLASS_ROOT];

    if (this.props.active) {
      classes.push(CLASS_ROOT + "--active");
    }

    return (
      <li className={classes.join(' ')} id={this.props.id}>
        <a ref="tab" role="tab" href="#" onClick={this._onClickTab}
          aria-expanded={this.props.active} aria-selected={this.props.active}
          className={CLASS_ROOT + "__link"} aria-labelledby={this.props.id}>
          <label className={CLASS_ROOT + '__label'} htmlFor={this.props.id}>
            {this.props.title}
          </label>
        </a>
      </li>
    );
  }

});

module.exports = Tab;
