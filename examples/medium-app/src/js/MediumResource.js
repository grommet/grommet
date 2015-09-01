// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var Header = require('grommet/components/Header');
var Menu = require('grommet/components/Menu');
var CloseIcon = require('grommet/components/icons/Clear');
var IntlMixin = require('grommet/mixins/GrommetIntlMixin');

var MediumResource = React.createClass({

  propTypes: {
    categoryRoute: React.PropTypes.string.isRequired,
    views: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string,
      name: React.PropTypes.string,
      route: React.PropTypes.string
    }))
  },

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  mixins: [IntlMixin],

  getInitialState: function () {
    return this._stateFromProps(this.props);
  },

  componentWillReceiveProps: function (newProps) {
    this.setState(this._stateFromProps(newProps));
  },

  _stateFromProps: function (props) {
    var router = this.context.router;
    var params = router.getCurrentParams();

    var view;
    if (props.views) {
      view = props.views.filter(function (view) {
        return (router.isActive(view.route));
      })[0];
    }

    return {
      uri: params.splat,
      view: view,
      query: router.getCurrentQuery()
    };
  },

  render: function () {
    var close = (
      <Link to={this.props.categoryRoute} query={this.state.query}>
        <CloseIcon />
      </Link>
    );

    var menu;
    if (this.props.views) {
      var menuOptions = this.props.views.map(function (view) {
        return (
          <Link key={view.label} to={view.route}
            params={{splat: this.state.uri}}
            query={{q: this.state.query}}>
            {this.getGrommetIntlMessage(view.label)}
          </Link>
        );
      }, this);

      menu = (
        <Menu label={this.getGrommetIntlMessage(this.state.view.label)} large={true}>
          {menuOptions}
        </Menu>
      );
    }

    return (
      <div>
        <Header large={true} justify="between" fixed={true}>
          {menu}
          <Menu>
            {close}
          </Menu>
        </Header>
        <RouteHandler />
      </div>
    );
  }

});

module.exports = MediumResource;
