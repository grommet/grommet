// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Split = require('grommet/components/Split');
var Layer = require('grommet/components/Layer');
var TourMain = require('./TourMain');

var TourSplit = React.createClass({

  _onOpenMain: function () {
    this.setState({showMain: true});
    if ('multiple' === this.state.responsive) {
      this.setState({reShowMain: true});
    }
  },

  _onCloseMain: function () {
    this.setState({showMain: false});
    if ('multiple' === this.state.responsive) {
      this.setState({reShowMain: false});
    }
  },

  _onResponsive: function (responsive) {
    this.setState({responsive: responsive});
    if ('multiple' === responsive && this.state.reShowMain) {
      this.setState({showMain: true});
    }
    if ('single' === responsive) {
      this.setState({showMain: false});
    }
  },

  getInitialState: function () {
    return {responsive: null, showMain: true, reShowMain: true};
  },

  render: function() {
    var pane1;
    var pane2;
    var main;

    if ('single' === this.state.responsive) {
      if (this.state.showMain) {
        main = (
          <Layer align="left" flush={true} onClose={this._onCloseMain}>
            <TourMain primary={false} onClose={this._onCloseMain} />
          </Layer>
        );
      }
      pane1 = <RouteHandler onMain={this._onOpenMain} />;
    } else {
      if (! this.state.showMain) {
        pane1 = <RouteHandler onMain={this._onOpenMain} />;
      } else {
        pane1 = <TourMain onClose={this._onCloseMain} />;
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

module.exports = TourSplit;
