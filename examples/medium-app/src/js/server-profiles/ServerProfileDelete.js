// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Rest = require('grommet/utils/Rest');
var Form = require('grommet/components/Form');
var Footer = require('grommet/components/Footer');
var Menu = require('grommet/components/Menu');
var BusyIcon = require('grommet/components/icons/Spinning');

var ServerProfileDelete = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    var router = this.context.router;
    return {
      uri: router.getCurrentParams().splat,
      serverProfile: {},
      deleting: false
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

  _onDeleteResponse: function (err, res) {
    if (err) {
      throw err;
    }

    if (res.ok) {
      Rest.get(res.body.taskUri).end(this._onTaskResponse);
    }
  },

  _onSubmit: function (event) {
    event.preventDefault();
    this.setState({deleting: true});
    // DELETE it on the back end and make sure it passes initial muster.
    Rest.del(this.state.uri).end(this._onDeleteResponse);
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
    var actions = null;
    if (this.state.deleting) {
      actions = <span><BusyIcon /> {"Deleting"}</span>;
    } else {
      actions = (
        <input type="submit" className="primary"
          value="Delete" onClick={this._onSubmit} />
      );
    }

    return (
      <Form>
        <Footer>
          <span></span>
          <Menu direction="left">
            {actions}
          </Menu>
        </Footer>
      </Form>
    );
  }
});

module.exports = ServerProfileDelete;
