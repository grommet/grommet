// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Link = require('react-router').Link;
var Rest = require('grommet/utils/Rest');
var Alert = require('grommet/components/index/Alert');
var Article = require('grommet/components/Article');
var Header = require('grommet/components/Header');
var Menu = require('grommet/components/Menu');
var CloseIcon = require('grommet/components/icons/Clear');
var Actions = require('grommet/actions/Actions');

var MediumActivityResource = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
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
    let router = this.context.router;
    let uri = router.getCurrentParams().splat;
    if (uri !== this.state.uri) {
      this.setState({uri: uri}, this._getData);
    }
  },

  _onResponse: function (err, res) {
    if (err && err.timeout > 1000) {
      this.setState({error: 'Timeout', result: {}});
    } else if (res.status === 400) {
      Actions.logout();
    } else if (!res.ok) {
      this.setState({error: res.body || res.text, result: {}});
    } else {
      let result = res.body;

      // setup link to resource
      // require Routes lazily to avoid a circular dependency
      let Routes = require('./Routes');
      let router = this.context.router;
      let path = Routes.resourcePath(router,
        result.attributes.associatedResourceCategory,
        result.attributes.associatedResourceUri, 'overview');

      this.setState({resource: result, associatedResourcePath: path, error: null});
    }
  },

  _getData: function () {
    Rest.get(this.state.uri).end(this._onResponse);
  },

  render: function () {
    var closer = <Link to="activity" query={this.state.query}><CloseIcon /></Link>;
    var associatedResource = null;
    if (this.state.resource && this.state.resource.attributes) {
      associatedResource = (
        <Link to={this.state.associatedResourcePath}>
          {this.state.resource.attributes.associatedResourceName}
        </Link>
      );
    }

    return (
      <Article>
        <Header large={true} justify="between" fixed={true}>
          <Menu label="Actions">
            <a>Assign</a>
            <a>Clear</a>
          </Menu>
          <Menu>
            {closer}
          </Menu>
        </Header>
        <Alert resource={this.state.resource}
          associatedResource={associatedResource} />
      </Article>
    );
  }

});

module.exports = MediumActivityResource;
