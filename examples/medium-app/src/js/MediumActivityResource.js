// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Link = require('react-router').Link;
var Rest = require('grommet/utils/Rest');
var Alert = require('grommet/components/index/Alert');
var Header = require('grommet/components/Header');
var CloseIcon = require('grommet/components/icons/Clear');
var Actions = require('grommet/actions/Actions');

var MediumActivityResource = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  _onResponse: function (err, res) {
    if (err && err.timeout > 1000) {
      this.setState({error: 'Timeout', result: {}});
    } else if (res.status === 400) {
      Actions.logout();
    } else if (!res.ok) {
      this.setState({error: res.body || res.text, result: {}});
    } else {
      var result = res.body;
      this.setState({resource: result, error: null});
    }
  },

  _getData: function () {
    Rest.get(this.state.uri).end(this._onResponse);
  },

  getInitialState: function () {
    var router = this.context.router;
    return {
      uri: router.getCurrentParams().splat,
      resource: {},
      query: router.getCurrentQuery()
    };
  },

  componentDidMount: function () {
    this._getData();
  },

  componentWillReceiveProps: function () {
    var router = this.context.router;
    this.setState({uri: router.getCurrentParams().splat}, this._getData);
  },

  render: function () {
    var closer = <Link to="activity" query={this.state.query}><CloseIcon /></Link>;
    var associatedResource = null;
    if (this.state.resource && this.state.resource.attributes) {
      associatedResource =
        this.state.resource.attributes.associatedResourceName;
    }
    return (
      <div>
        <Header large={true}>
          <span></span>
          {closer}
        </Header>
        <Alert resource={this.state.resource}
          associatedResource={associatedResource} />
      </div>
    );
  }

});

module.exports = MediumActivityResource;
