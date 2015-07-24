// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var MAX_DEVICES_PER_RACK = 12;

var Mock = {

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
        colorIndex: "graph-" + options.colorIndex,
        index: options.cableIndex,
        ids: ids
      });

      priorEnclosure = enclosure;
      index += 1;
      options.cableIndex += 1;
    }
  },

  configure: function (configuration) {
    // simulate for now

    // racks
    var data = {
      racks: [],
      cables: []
    };

    let numRacks = Math.ceil((configuration.driveCount + configuration.nodeCount) / MAX_DEVICES_PER_RACK);
    console.log('!!! Mock', configuration.driveCount + configuration.nodeCount, MAX_DEVICES_PER_RACK, (configuration.driveCount + configuration.nodeCount) / MAX_DEVICES_PER_RACK, numRacks);
    for (let i = 0; i < numRacks; i += 1) {
      data.racks.push({name: 'R' + i, contents: []});
    }

    // nodes
    let nodes = [];
    for (let i = 0; i < configuration.nodeCount; i += 1) {
      let name = 'N' + i;
      let idPrefix = data.racks[0].name + ':' + name;

      let node = {
        type: 'node',
        name: name,
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

      data.racks[0].contents.unshift(node);
      nodes.push(node);
    }

    // drive enclosures
    var enclosures = [];
    var rackIndex = 0;
    for (let i = 0; i < configuration.driveCount; i += 1) {
      let rack = data.racks[rackIndex];
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
    var enclosuresPerNode = Math.ceil(enclosures.length / nodes.length);

    nodes.forEach(function (node, nodeIndex) {

      let nodeEnclosures = enclosures.slice(enclosuresPerNode * nodeIndex,
        enclosuresPerNode * (nodeIndex + 1));

      let runEnclosures = [];
      for (let i = 0; i < nodeEnclosures.length; i = i + 2) {
        runEnclosures.push(nodeEnclosures[i]);
      }

      this._cableRun({
        cables: data.cables,
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
        cables: data.cables,
        nodePortId: node.slots[1].ports[1].id,
        enclosures: runEnclosures,
        enclosureSlot: 0,
        inPort: 1,
        outPort: 0,
        colorIndex: colorIndex,
        cableIndex: cableIndex
      });

      runEnclosures = [];
      for (let i = 1; i < nodeEnclosures.length; i = i + 2) {
        runEnclosures.push(nodeEnclosures[i]);
      }

      this._cableRun({
        cables: data.cables,
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
        cables: data.cables,
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

    return data;
  }

};

module.exports = Mock;
