// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var ResourceStore = require('../stores/ResourceStore');
var NavStore = require('../../stores/NavStore');
var Router = require('../../utils/Router');
var ResourceActions = require('../actions/ResourceActions');
var ResourceHeader = require('../components/ResourceHeader');
var ResourceActivity = require('../components/ResourceActivity');
var ResourceMap = require('../components/ResourceMap');

var CLASS_ROOT = 'resource';

var Resource = React.createClass({

  _onChange: function() {
    this.setState(ResourceStore.getAll());
  },

  _onNavChange: function() {
    var uri = Router.param('splat');
    if (uri && uri !== this.state.uri) {
      // delay to avoid nested dispatches
      var category = this.props.category;
      clearTimeout(this._navTimer);
      this._navTimer = setTimeout(function () {
        ResourceActions.get(uri, category);
      }, 10);
    }
  },

  getInitialState: function() {
    return ResourceStore.getAll();
  },

  componentDidMount: function() {
    ResourceStore.addChangeListener(this._onChange);
    NavStore.addChangeListener(this._onNavChange);
    // get data
    var uri = Router.param('splat');
    ResourceActions.get(uri, this.props.category);
  },

  componentWillUnmount: function() {
    ResourceStore.removeChangeListener(this._onChange);
    NavStore.removeChangeListener(this._onNavChange);
    clearTimeout(this._navTimer);
  },

  render: function() {
    var classes = [CLASS_ROOT];
    var response = this.state.response;
    if (! response) {
      classes.push(CLASS_ROOT + "--loading");
    }

    return (
      <div key={this.state.uri} className={classes.join(' ')}>
        <ResourceHeader className={CLASS_ROOT + "__header"}
          resource={this.state.response}
          actions={this.props.actions} />
        <div className={CLASS_ROOT + "__content"}>
          <ResourceActivity category={this.props.category} uri={this.state.uri} />
          <div className={CLASS_ROOT + "__attributes"}>
            <Object data={this.state.response} />
          </div>
          <h3>Map</h3>
          <ResourceMap uri={this.state.uri} />
        </div>
      </div>
    );
  }

});

module.exports = Resource;
