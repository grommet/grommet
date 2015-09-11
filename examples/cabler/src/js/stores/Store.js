// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var Reflux = require('reflux');
var Actions = require('../actions/Actions');

var APP_TITLE = 'Cabling guidance';
var MAX_DEVICES_PER_RACK = 12;

var Store = Reflux.createStore({

  getInitialState: function () {
    return this._data;
  },

  _data: {
    title: APP_TITLE,
    // configuration options
    configurationOptions: {
      models: ['7200', '7400'],
      maxNodes: 4,
      maxDrives: 20
    },
    // active configuration
    configuration: {
      model: '7200',
      numNodes: 2,
      numDrives: 12
    },
    // browser location for push state
    location: {
      label: APP_TITLE,
      path: '/'
    }
  },

  init: function () {
    this.listenTo(Actions.configureFromLocation, this._onConfigureFromLocation);
    this.listenTo(Actions.configure, this._onConfigure);
    this.listenTo(Actions.set, this._onSet);
    this.listenTo(Actions.clearConfiguration, this._onClearConfiguration);
    this.listenTo(Actions.toggleNodeHighlight, this._onToggleNodeHighlight);
    this.listenTo(Actions.clearAllNodeHighlights, this._onClearAllNodeHighlights);
    this.listenTo(Actions.toggleDataPathHighlight, this._onToggleDataPathHighlight);
    this.listenTo(Actions.clearAllDataPathHighlights, this._onClearAllDataPathHighlights);
    this.listenTo(Actions.toggleNodeDataPathHighlight, this._onToggleNodeDataPathHighlight);
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
        index: options.cableIndex,
        dataPath: options.dataPath,
        colorIndex: options.dataPath.colorIndex,
        ids: ids
      });

      priorEnclosure = enclosure;
      index += 1;
      options.cableIndex += 1;
    }
  },

  _buildDataPaths: function (configuration, topologyData) {
    topologyData.dataPaths = [
      {
        name: 'DP-1',
        colorIndex: "graph-1",
        highlight: false
      },
      {
        name: 'DP-2',
        colorIndex: "graph-2",
        highlight: false
      }
    ];
  },

  _buildRacks: function (configuration, topologyData) {
    topologyData.racks = [];
    let numRacks = Math.ceil((configuration.numDrives + configuration.numNodes) /
      MAX_DEVICES_PER_RACK);
    for (let i = 0; i < numRacks; i += 1) {
      topologyData.racks.push({name: 'R' + i, contents: []});
    }
  },

  _buildNodes: function (configuration, topologyData) {
    topologyData.nodes = [];
    for (let i = 0; i < configuration.numNodes; i += 1) {
      let name = 'N' + i;
      let idPrefix = topologyData.racks[0].name + ':' + name;

      let node = {
        type: 'node',
        name: name,
        highlight: false,
        slots: [
          {
            type: 'slot',
            name: 'S0',
            dataPath: topologyData.dataPaths[0],
            ports: [
              {type: 'port', name: 'P1', id: idPrefix + ':S0:P1'},
              {type: 'port', name: 'P2', id: idPrefix + ':S0:P2'}
            ]
          },
          {
            type: 'slot',
            name: 'S1',
            dataPath: topologyData.dataPaths[1],
            ports: [
              {type: 'port', name: 'P1', id: idPrefix + ':S1:P1'},
              {type: 'port', name: 'P2', id: idPrefix + ':S1:P2'}
            ]
          }
        ]
      };

      topologyData.racks[0].contents.unshift(node);
      topologyData.nodes.push(node);
    }
  },

  _buildEnclosures: function (configuration, topologyData) {
    topologyData.enclosures = [];
    var rackIndex = 0;
    for (let i = 0; i < configuration.numDrives; i += 1) {
      let rack = topologyData.racks[rackIndex];
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
      topologyData.enclosures.push(device);
    }
  },

  _buildCables: function (configuration, topologyData) {
    topologyData.cables = [];
    var enclosuresPerNode =
      Math.ceil(topologyData.enclosures.length / topologyData.nodes.length);
    var cableIndex = 1;
    topologyData.nodes.forEach(function (node, nodeIndex) {

      let nodeEnclosures = topologyData.enclosures.
        slice(enclosuresPerNode * nodeIndex,
          enclosuresPerNode * (nodeIndex + 1));

      let runEnclosures = [[], []];
      for (let i = 0; i < nodeEnclosures.length; i = i + 2) {
        runEnclosures[0].push(nodeEnclosures[i]);
        runEnclosures[1].push(nodeEnclosures[i+1]);
      }

      topologyData.dataPaths.forEach(function (dataPath, index) {
        // up
        this._cableRun({
          cables: topologyData.cables,
          node: node,
          dataPath: dataPath,
          nodePortId: node.slots[index].ports[0].id,
          enclosures: runEnclosures[index],
          enclosureSlot: 1,
          inPort: 0,
          outPort: 1,
          cableIndex: cableIndex
        });
        cableIndex += runEnclosures[index].length;
        // down
        runEnclosures[index].reverse();
        this._cableRun({
          cables: topologyData.cables,
          node: node,
          dataPath: dataPath,
          nodePortId: node.slots[index].ports[1].id,
          enclosures: runEnclosures[index],
          enclosureSlot: 0,
          inPort: 1,
          outPort: 0,
          cableIndex: cableIndex
        });
        cableIndex += runEnclosures[index].length;
      }, this);
    }, this);
  },

  _onConfigure: function (configuration) {
    // simulate for now

    this._data.configuration = configuration;
    var topologyData = this._data.topologyData || {};

    this._buildDataPaths(configuration, topologyData);
    this._buildRacks(configuration, topologyData);
    this._buildNodes(configuration, topologyData);
    this._buildEnclosures(configuration, topologyData);
    this._buildCables(configuration, topologyData);
    this._buildLinks(topologyData);

    this._data.topologyData = topologyData;

    // HTML5 push state data
    this._data.location.path = '/' + encodeURIComponent(configuration.model) + '?' +
      'numNodes=' + encodeURIComponent(configuration.numNodes) +
      '&numDrives=' + encodeURIComponent(configuration.numDrives);
    this._data.location.label = configuration.model;

    this.trigger(this._data);
  },

  _buildLinks: function (topologyData) {
    let links = topologyData.cables;
    if (topologyData.nodes.filter(function (node) {
      return node.highlight;
    }).length > 0) {
      // filter out unhighlighted node cables
      links = links.filter(function (cable) {
        return cable.node.highlight;
      });
    }
    if (topologyData.dataPaths.filter(function (dataPath) {
      return dataPath.highlight;
    }).length > 0) {
      // filter out unhighlighted node cables
      links = links.filter(function (cable) {
        return cable.dataPath.highlight;
      });
    }
    if (topologyData.cables.filter(function (cable) {
      return cable.highlight;
    }).length > 0) {
      // filter out unhighlighted cables
      links = links.filter(function (cable) {
        return cable.highlight;
      });
    }
    topologyData.links = links;
  },

  _onSet: function (state) {
    this._data = state;
    this._buildLinks(this._data.topologyData);
    this.trigger(this._data);
  },

  _onClearConfiguration: function () {
    this._data.location = {
      label: APP_TITLE,
      path: '/'
    };
    delete this._data.topologyData;
    this.trigger(this._data);
  },

  _onToggleNodeHighlight: function (node) {
    node.highlight = ! node.highlight;
    this._buildLinks(this._data.topologyData);
    this.trigger(this._data);
  },

  _onClearAllNodeHighlights: function () {
    this._data.topologyData.nodes.forEach(function (node) {
      node.highlight = false;
    });
    this._buildLinks(this._data.topologyData);
    this.trigger(this._data);
  },

  _onToggleDataPathHighlight: function (dataPath) {
    dataPath.highlight = ! dataPath.highlight;
    this._buildLinks(this._data.topologyData);
    this.trigger(this._data);
  },

  _onClearAllDataPathHighlights: function () {
    this._data.topologyData.dataPaths.forEach(function (dataPath) {
      dataPath.highlight = false;
    });
    this._buildLinks(this._data.topologyData);
    this.trigger(this._data);
  },

  _onToggleNodeDataPathHighlight: function (node, dataPath) {
    if (! node.highlight || ! dataPath.highlight) {
      node.highlight = true;
      dataPath.highlight = true;
    } else {
      node.highlight = false;
      dataPath.highlight = false;
    }
    this._data.topologyData.cables.forEach(function (cable) {
      cable.highlight = false;
    });
    this._buildLinks(this._data.topologyData);
    this.trigger(this._data);
  },

  _onToggleCableHighlight: function (cable) {
    cable.highlight = ! cable.highlight;
    this._data.topologyData.nodes.forEach(function (node) {
      node.highlight = false;
    });
    this._data.topologyData.dataPaths.forEach(function (dataPath) {
      dataPath.highlight = false;
    });
    this._buildLinks(this._data.topologyData);
    this.trigger(this._data);
  },

  _onClearAllHighlights: function () {
    this._data.topologyData.nodes.forEach(function (node) {
      node.highlight = false;
    });
    this._data.topologyData.dataPaths.forEach(function (dataPath) {
      dataPath.highlight = false;
    });
    this._data.topologyData.cables.forEach(function (cable) {
      cable.highlight = false;
    });
    this._buildLinks(this._data.topologyData);
    this.trigger(this._data);
  }
});

module.exports = Store;
