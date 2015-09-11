// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Menu = require('grommet/components/Menu');
var CloseIcon = require('grommet/components/icons/Clear');
var Link = require('react-router').Link;
var Rest = require('grommet/utils/Rest');
var ServerProfileForm = require('./ServerProfileForm');

var ServerProfileAdd = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      serverProfile: {
        category: 'server-profiles',
        name: '',
        description: '',
        serverHardware: {},
        affinity: 'Device bay',
        firmware: '',
        connections: [],
        manageLocalStorage: false,
        logicalDrive: 'None',
        logicalDriveBootable: false,
        logicalDriveInitialize: false,
        manageSanStorage: false,
        hostOsType: 'Windows 2012',
        volumes: [],
        manageBootOrder: false
      },
      adding: false
    };
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

  _onAddResponse: function (err, res) {
    if (err) {
      throw err;
    }

    if (res.ok) {
      Rest.get(res.body.taskUri).end(this._onTaskResponse);
    }
  },

  _onSubmit: function (serverProfile) {
    this.setState({adding: true});
    // POST it to the back end and make sure it passes initial muster.
    Rest.post('/rest/server-profiles', serverProfile)
      .end(this._onAddResponse);
  },

  render: function () {
    var message;
    if (this.state.adding) {
      message = 'Adding';
    }

    return (
      <Article>
        <Header fixed={true} large={true} justify="between" pad={{horizontal: 'medium'}}>
          <Title>Add Server Profile</Title>
          <Menu>
            <Link to="server profiles"><CloseIcon /></Link>
          </Menu>
        </Header>

        <ServerProfileForm serverProfile={this.state.serverProfile}
          onSubmit={this._onSubmit} buttonLabel="Add"
          processingMessage={message} />

      </Article>
    );
  }
});

module.exports = ServerProfileAdd;
