// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var Header = require('grommet/components/Header');
var Menu = require('grommet/components/Menu');
var CloseIcon = require('grommet/components/icons/Clear');
var IntlMixin = require('grommet/mixins/GrommetIntlMixin');

var TourResource = React.createClass({

  mixins: [IntlMixin],

  propTypes: {
    categoryRoute: React.PropTypes.string.isRequired,
    views: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string,
      name: React.PropTypes.string,
      route: React.PropTypes.string
    })).isRequired
  },

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    var router = this.context.router;
    var params = router.getCurrentParams();
    var view = this.props.views.filter(function (view) {
      return (router.isActive(view.route));
    })[0];
    return {
      uri: params.splat,
      view: view || {label: 'view'},
      query: router.getCurrentQuery()
    };
  },

  componentWillReceiveProps: function () {
    var router = this.context.router;
    var params = router.getCurrentParams();
    this.setState({
      uri: params.splat,
      view: this.props.views.filter(function (view) {
        return (router.isActive(view.route));
      })[0]
    });
  },

  render: function () {
    var close = (
      <Link to={this.props.categoryRoute} query={this.state.query}>
        <CloseIcon />
      </Link>
    );

    var menuOptions = this.props.views.map(function (view) {
      return (
        <Link key={view.label} to={view.route}
          params={{splat: this.state.uri}}
          query={{q: this.state.query}}>
          {this.getGrommetIntlMessage(view.label)}
        </Link>
      );
    }, this);

    return (
      <div>
        <Header large={true} fixed={true}>
          <Menu label={this.getGrommetIntlMessage(this.state.view.label)}>
            {menuOptions}
          </Menu>
          <span></span>
          <Menu>
            {close}
          </Menu>
        </Header>
        <RouteHandler />
      </div>
    );
  }

});

module.exports = TourResource;
