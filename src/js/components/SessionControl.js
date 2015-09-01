// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var ReactLayeredComponent = require('../mixins/ReactLayeredComponent');
var SessionStore = require('../stores/SessionStore');
var Session = require('../components/Session');
var Gravatar = require('react-gravatar');

var SessionControl = React.createClass({

  mixins: [ReactLayeredComponent],

  getInitialState: function() {
    return {active: false, session: SessionStore.getAll()};
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({session: SessionStore.getAll()});
  },

  _onClick: function() {
    this.setState({active: !this.state.active});
  },

  renderLayer: function() {
    if (! this.state.active) {
      return <span />;
    } else {
      return (
        <Session onRequestClose={this._onClick} />
      );
    }
  },

  render: function() {
    return (
      <div className={'session-control'} onClick={this._onClick}>
        <Gravatar email={this.state.session.email || ''} size={48} />
      </div>
    );
  }

});

module.exports = SessionControl;
