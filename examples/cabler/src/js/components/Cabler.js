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

  _pushState: function () {
    if (this.state.path) {
      window.history.pushState(this.state, this.state.historyLabel, this.state.path);
    }
  },

  _popState: function (event) {
    if (event.state) {
      Actions.set(event.state);
    }
  },

  _onChange: function (data, fromSet) {
    let push;
    if (! fromSet) {
      push = this._pushState;
    }
    this.setState(data, push);
  },

  getInitialState: function () {
    return Store.getInitialState();
  },

  componentDidMount: function () {
    this.listenTo(Store, this._onChange);
    window.onpopstate = this._popState;
    Actions.configureFromLocation(window.location.pathname, window.location.search);
  },

  render: function() {
    var contents;
    if (this.state.nodes.length === 0) {
      contents = <Home data={this.state} />;
    } else {
      contents = <Diagram data={this.state} />;
    }

    return (
      <App centered={false}>
        {contents}
      </App>
    );
  }

});

module.exports = Cabler;
