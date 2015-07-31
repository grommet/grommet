// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var Reflux = require('reflux');
var Actions = require('../actions/Actions');

var APP_TITLE = 'HP 3Par Storage Cabling';
var MAX_DEVICES_PER_RACK = 12;

var Store = Reflux.createStore({

  _data: {
    title: APP_TITLE,
    historyLabel: APP_TITLE,
    path: '/',
    models: ['7200', '7400'],
    configuration: {
      model: '7200',
      maxNodes: 4,
      maxDrives: 20,
      numNodes: 2,
      numDrives: 12
    },
    racks: [],
    cables: [],
    nodes: []
  },

  init: function () {
    this.listenTo(Actions.configureFromLocation, this._onConfigureFromLocation);
    this.listenTo(Actions.configure, this._onConfigure);
    this.listenTo(Actions.set, this._onSet);
    this.listenTo(Actions.clearConfiguration, this._onClearConfiguration);
    this.listenTo(Actions.toggleNodeHighlight, this._onToggleNodeHighlight);
    this.listenTo(Actions.clearAllNodeHighlights, this._onClearAllNodeHighlights);
    this.listenTo(Actions.toggleCableHighlight, this._onToggleCableHighlight);
    this.listenTo(Actions.clearAllHighlights, this._onClearAllHighlights);
  },

  _onConfigureFromLocation: function (path, search) {
    var configuration = {};
    configuration.model = path.split('/')[1] || '7200';
    if (search) {
      search.split('?')[1].split('&').forEach(function (param) {
        var parts = param.split('=');
        configuration[parts[0]] = parseInt(decodeURIComponent(parts[1]));
      });
      this._onConfigure(configuration);
    }
  },

  _cableRun: function (options) {
    let index = 0;
    let priorEnclosure = null;

    while (index < options.enclosures.length) {

      let enclosure = options.enclosures[index];
      let ids = [];
      if (! priorEnclosure) {
        ids.push(options.nodePortId);
      } else {
        ids.push(priorEnclosure.slots[options.enclosureSlot].ports[options.outPort].id);
      }
      ids.push(enclosure.slots[options.enclosureSlot].ports[options.inPort].id);

      options.cables.push({
        node: options.node,
        colorIndex: "graph-" + options.colorIndex,
        index: options.cableIndex,
        ids: ids
      });

      priorEnclosure = enclosure;
      index += 1;
      options.cableIndex += 1;
    }
  },

  _onConfigure: function (configuration) {
    // simulate for now
    configuration.maxNodes = 4;
    configuration.maxDrives = 20;

    // racks
    this._data.configuration = configuration;
    this._data.racks = [];
    this._data.cables = [];
    this._data.nodes = [];

    let numRacks = Math.ceil((configuration.numDrives + configuration.numNodes) /
       MAX_DEVICES_PER_RACK);
    for (let i = 0; i < numRacks; i += 1) {
      this._data.racks.push({name: 'R' + i, contents: []});
    }

    // nodes
    for (let i = 0; i < configuration.numNodes; i += 1) {
      let name = 'N' + i;
      let idPrefix = this._data.racks[0].name + ':' + name;

      let node = {
        type: 'node',
        name: name,
        highlight: false,
        slots: [
          {
            type: 'slot',
            name: 'S0',
            ports: [
              {type: 'port', name: 'P1', id: idPrefix + ':S0:P1'},
              {type: 'port', name: 'P2', id: idPrefix + ':S0:P2'}
            ]
          },
          {
            type: 'slot',
            name: 'S1',
            ports: [
              {type: 'port', name: 'P1', id: idPrefix + ':S1:P1'},
              {type: 'port', name: 'P2', id: idPrefix + ':S1:P2'}
            ]
          }
        ]
      };

      this._data.racks[0].contents.unshift(node);
      this._data.nodes.push(node);
    }

    // drive enclosures
    var enclosures = [];
    var rackIndex = 0;
    for (let i = 0; i < configuration.numDrives; i += 1) {
      let rack = this._data.racks[rackIndex];
      let name = 'E' + i;
      let idPrefix = rack.name + ':' + name;

      let device = {
        type: 'enclosure',
        name: name,
        slots: [
          {
            type: 'slot',
            name: 'S0',
            ports: [
              {type: 'port', name: 'P1', id: idPrefix + ':S0:DP1'},
              {type: 'port', name: 'P2', id: idPrefix + ':S0:DP2'}
            ]
          },
          {
            type: 'slot',
            name: 'S1',
            ports: [
              {type: 'porty', name: 'P1', id: idPrefix + ':S1:DP1'},
              {type: 'port', name: 'P2', id: idPrefix + ':S1:DP2'}
            ]
          }
        ]
      };

      rack.contents.unshift(device);
      if (rack.contents.length >= MAX_DEVICES_PER_RACK) {
        rackIndex += 1;
      }
      enclosures.push(device);
    }

    // cables
    var cableIndex = 1;
    var colorIndex = 1;
    var enclosuresPerNode = Math.ceil(enclosures.length / this._data.nodes.length);

    this._data.nodes.forEach(function (node, nodeIndex) {

      let nodeEnclosures = enclosures.slice(enclosuresPerNode * nodeIndex,
        enclosuresPerNode * (nodeIndex + 1));

      let runEnclosures = [];
      for (let i = 0; i < nodeEnclosures.length; i = i + 2) {
        runEnclosures.push(nodeEnclosures[i]);
      }

      this._cableRun({
        cables: this._data.cables,
        node: node,
        nodePortId: node.slots[0].ports[0].id,
        enclosures: runEnclosures,
        enclosureSlot: 1,
        inPort: 0,
        outPort: 1,
        colorIndex: colorIndex,
        cableIndex: cableIndex
      });

      cableIndex += runEnclosures.length;
      colorIndex += 1;
      runEnclosures.reverse();

      this._cableRun({
        cables: this._data.cables,
        node: node,
        nodePortId: node.slots[1].ports[1].id,
        enclosures: runEnclosures,
        enclosureSlot: 0,
        inPort: 1,
        outPort: 0,
        colorIndex: colorIndex,
        cableIndex: cableIndex
      });

      cableIndex += runEnclosures.length;
      colorIndex += 1;
      runEnclosures = [];
      for (let i = 1; i < nodeEnclosures.length; i = i + 2) {
        runEnclosures.push(nodeEnclosures[i]);
      }

      this._cableRun({
        cables: this._data.cables,
        node: node,
        nodePortId: node.slots[1].ports[0].id,
        enclosures: runEnclosures,
        enclosureSlot: 1,
        inPort: 1,
        outPort: 0,
        colorIndex: colorIndex,
        cableIndex: cableIndex
      });

      cableIndex += runEnclosures.length;
      colorIndex += 1;
      runEnclosures.reverse();

      this._cableRun({
        cables: this._data.cables,
        node: node,
        nodePortId: node.slots[0].ports[1].id,
        enclosures: runEnclosures,
        enclosureSlot: 0,
        inPort: 0,
        outPort: 1,
        colorIndex: colorIndex,
        cableIndex: cableIndex
      });

      cableIndex += runEnclosures.length;
      colorIndex += 1;
    }, this);

    // HTML5 push state data
    this._data.path = '/' + encodeURIComponent(configuration.model) + '?' +
      'numNodes=' + encodeURIComponent(configuration.numNodes) +
      '&numDrives=' + encodeURIComponent(configuration.numDrives);
    this._data.historyLabel = configuration.model;

    this.trigger(this._data);
  },

  _onSet: function (state) {
    this._data = state;
    this.trigger(this._data, true);
  },

  _onClearConfiguration: function () {
    this._data.historyLabel = APP_TITLE;
    this._data.path = '/';
    this._data.racks = [];
    this._data.cables = [];
    this._data.nodes = [];
    this.trigger(this._data);
  },

  _onToggleNodeHighlight: function (node) {
    node.highlight = ! node.highlight;
    this.trigger(this._data);
  },

  _onClearNodeHighlight: function () {
    this._data.nodes.forEach(function (node) {
      node.highlight = false;
    });
    this.trigger(this._data);
  },

  _onToggleCableHighlight: function (cable) {
    cable.highlight = ! cable.highlight;
    this.trigger(this._data);
  },

  _onClearAllHighlights: function () {
    this._data.nodes.forEach(function (node) {
      node.highlight = false;
    });
    this._data.cables.forEach(function (cable) {
      cable.highlight = false;
    });
    this.trigger(this._data);
  },

  getInitialState: function () {
    return this._data;
  }
});

module.exports = Store;
