// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var App = require('grommet/components/App');
var Home = require('./Home');
var Diagram = require('./Diagram');
var Mock = require('./Mock');

var Cabler = React.createClass({

  _onConfigure: function (configuration) {
    var data = Mock.configure(configuration);
    this.setState({data: data, home: false});
  },

  _onHome: function () {
    this.setState({home: true});
  },

  getInitialState: function () {
    return {home: true};
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
