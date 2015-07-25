// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var App = require('grommet/components/App');
var Home = require('./Home');
var Diagram = require('./Diagram');
var Mock = require('./Mock');

var Cabler = React.createClass({

  _pushState: function () {
    var label = 'Cabler';
    var url = window.location.href.split('?')[0];
    var state;
    if (this.state.data) {
      var configuration = this.state.data.configuration;
      url += '?model=' + encodeURIComponent(configuration.model);
      url += '&nodeCount=' + encodeURIComponent(configuration.nodeCount);
      url += '&driveCount=' + encodeURIComponent(configuration.driveCount);
      label = configuration.model;
      state = {configuration: configuration};
    }
    window.history.pushState(state, label, url);
  },

  _popState: function (event) {
    if (event.state) {
      var data = Mock.configure(event.state.configuration);
      this.setState({data: data, home: false});
    }
  },

  _onConfigure: function (configuration) {
    var data = Mock.configure(configuration);
    this.setState({data: data, home: false}, this._pushState);
  },

  _onHome: function () {
    this.setState({data: null, home: true}, this._pushState);
  },

  getInitialState: function () {
    var data = null;

    var url = window.location.href;
    var params = url.split('?');
    if (params.length > 1) {
      var configuration = {};
      params[1].split('&').forEach(function (param) {
        var parts = param.split('=');
        configuration[parts[0]] = decodeURIComponent(parts[1]);
      });
      configuration.nodeCount = parseInt(configuration.nodeCount);
      configuration.driveCount = parseInt(configuration.driveCount);
      data = Mock.configure(configuration);
    }

    return {
      data: data,
      home: (null === data)
    };
  },

  componentDidMount: function () {
    window.onpopstate = this._popState;
  },

  render: function() {
    var contents;
    if (this.state.home) {
      contents = <Home onConfigure={this._onConfigure} />;
    } else {
      contents = <Diagram data={this.state.data} onClose={this._onHome} />;
    }

    return (
      <App centered={false}>
        {contents}
      </App>
    );
  }

});

module.exports = Cabler;
