// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Reflux = require('reflux');
var App = require('grommet/components/App');
var Actions = require('../actions/Actions');
var Store = require('../stores/Store');
var Home = require('./Home');
var Diagram = require('./Diagram');

var Cabler = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function () {
    return Store.getInitialState();
  },

  componentDidMount: function () {
    this.listenTo(Store, this._onChange);
    window.onpopstate = this._popState;
    this._noPush = true;
    Actions.configureFromLocation(window.location.pathname, window.location.search);
  },

  _pushState: function () {
    if (this.state.location) {
      window.history.pushState(this.state, this.state.location.label, this.state.location.path);
    }
  },

  _popState: function (event) {
    this._noPush = true;
    if (event.state) {
      Actions.set(event.state);
    } else {
      //Actions.clearConfiguration();
    }
  },

  _onChange: function (data) {
    let push;
    if (! this._noPush) {
      push = this._pushState;
    } else {
      this._noPush = false;
    }
    this.replaceState(data, push);
  },

  render: function() {
    var contents;
    if (this.state.topologyData) {
      contents = <Diagram data={this.state} />;
    } else {
      contents = <Home data={this.state} />;
    }

    return (
      <App centered={false}>
        {contents}
      </App>
    );
  }

});

module.exports = Cabler;
