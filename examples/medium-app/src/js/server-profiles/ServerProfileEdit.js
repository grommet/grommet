// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Rest = require('grommet/utils/Rest');
var ServerProfileForm = require('./ServerProfileForm');

var ServerProfileEdit = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    var router = this.context.router;
    return {
      uri: router.getCurrentParams().splat,
      serverProfile: {},
      updating: false
    };
  },

  componentDidMount: function () {
    this._getData();
  },

  componentWillReceiveProps: function () {
    var router = this.context.router;
    var uri = router.getCurrentParams().splat;
    if (uri !== this.state.uri) {
      this.setState({uri: uri}, this._getData);
    }
  },

  _onTaskResponse: function (err, res) {
    if (err) {
      throw err;
    }

    if (res.ok) {
      var task = res.body;
      this.context.router.transitionTo('server profile overview',
        {splat: task.attributes.associatedResourceUri});
    }
  },

  _onUpdateResponse: function (err, res) {
    if (err) {
      throw err;
    }

    if (res.ok) {
      Rest.get(res.body.taskUri).end(this._onTaskResponse);
    }
  },

  _onSubmit: function (serverProfile) {
    this.setState({updating: true});
    // POST it to the back end and make sure it passes initial muster.
    Rest.put(serverProfile.uri, serverProfile)
      .end(this._onUpdateResponse);
  },

  _onGetResponse: function (err, res) {
    if (err) {
      throw err;
    }

    if (res.ok) {
      this.setState({serverProfile: res.body});
    }
  },

  _getData: function () {
    Rest.get(this.state.uri).end(this._onGetResponse);
  },

  render: function () {
    var message;
    if (this.state.updating) {
      message = 'Updating';
    }

    return (
      <ServerProfileForm serverProfile={this.state.serverProfile}
        onSubmit={this._onSubmit} buttonLabel="OK"
        processingMessage={message} />
    );
  }
});

module.exports = ServerProfileEdit;
