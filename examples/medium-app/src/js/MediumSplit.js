// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Split = require('grommet/components/Split');
var Layer = require('grommet/components/Layer');
var MediumMain = require('./MediumMain');

var MediumSplit = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      responsive: null,
      showMain: true,
      reShowMain: true
    };
  },

  componentWillReceiveProps: function () {
    if ('single' === this.state.responsive) {
      var routes = this.context.router.getCurrentRoutes();
      if (this.state.currentRoute !== routes[routes.length - 1].name) {
        this.setState({showMain: false});
      }
    }
  },

  _onOpenMain: function () {
    this.setState({showMain: true});
    if ('multiple' === this.state.responsive) {
      this.setState({reShowMain: true});
    } else {
      var routes = this.context.router.getCurrentRoutes();
      this.setState({currentRoute: routes[routes.length - 1].name});
    }
  },

  _onCloseMain: function () {
    this.setState({showMain: false});
    if ('multiple' === this.state.responsive) {
      this.setState({reShowMain: false});
    } else {
      this.setState({currentRoute: null});
    }
  },

  _onResponsive: function (responsive) {
    this.setState({responsive: responsive});
    if ('multiple' === responsive && this.state.reShowMain) {
      this.setState({showMain: true, currentRoute: null});
    }
    if ('single' === responsive) {
      this.setState({showMain: false});
    }
  },

  render: function() {
    var pane1;
    var pane2;
    var main;

    if ('single' === this.state.responsive) {
      if (this.state.showMain) {
        main = (
          <Layer align="left" flush={true} onClose={this._onCloseMain}>
            <MediumMain primary={false} onClose={this._onCloseMain} />
          </Layer>
        );
      }
      pane1 = <RouteHandler onMain={this._onOpenMain} />;
    } else {
      if (! this.state.showMain) {
        pane1 = <RouteHandler onMain={this._onOpenMain} />;
      } else {
        pane1 = <MediumMain onClose={this._onCloseMain} />;
        pane2 = <RouteHandler />;
      }
    }

    return (
      <div>
        <Split flex="right" onResponsive={this._onResponsive}>
          {pane1}
          {pane2}
        </Split>
        {main}
      </div>
    );
  }

});

module.exports = MediumSplit;
