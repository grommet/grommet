// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');
var Header = require('grommet/components/Header');
var Menu = require('grommet/components/Menu');
var Anchor = require('grommet/components/Anchor');
var CloseIcon = require('grommet/components/icons/Clear');
var Table = require('grommet/components/Table');
var Legend = require('grommet/components/Legend');
var Actions = require('../actions/Actions');

var Cables = React.createClass({

  propTypes: {
    cables: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onClose: React.PropTypes.func.isRequired
  },

  _onToggle: function (cable) {
    Actions.toggleCableHighlight(cable);
  },

  _onToggleNodeDataPath: function (node, dataPath) {
    Actions.toggleNodeDataPathHighlight(node, dataPath);
  },

  render: function() {
    var selection = [];
    var cables = [];
    var dataPath;
    var node;
    this.props.cables.forEach(function (cable) {
      if (cable.dataPath !== dataPath || cable.node !== node) {
        if (cable.dataPath.highlight && cable.node.highlight) {
          selection.push(cables.length);
        }
        let series = [{
          label: cable.node.name + ' ' + cable.dataPath.name,
          colorIndex: cable.dataPath.colorIndex
        }];
        cables.push(
          <tr key={cable.node.name + cable.dataPath.name}
            onClick={this._onToggleNodeDataPath.bind(this, cable.node, cable.dataPath)}>
            <td colSpan="5">
              <Legend series={series} />
            </td>
          </tr>
        );
        dataPath = cable.dataPath;
        node = cable.node;
      }
      if (cable.highlight) {
        selection.push(cables.length);
      }
      cables.push(
        <tr key={cable.index} onClick={this._onToggle.bind(this, cable)}>
          <td>{cable.index}</td>
          <td>1</td>
          <td>?</td>
          <td>{cable.ids[0]}</td>
          <td>{cable.ids[1]}</td>
        </tr>
      );
    }, this);

    return (
      <Article>
        <Header pad={{horizontal: "medium"}} justify="between" fixed={true}>
          Cables
          <Menu inline={true} direction="row" align="center" responsive={false}>
            <Anchor href="" onClick={this.props.onClose}><CloseIcon /></Anchor>
          </Menu>
        </Header>
        <Table selectable={true} selection={selection}>
          <thead>
            <tr>
              <th>#</th>
              <th>(m)</th>
              <th>Id</th>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            {cables}
          </tbody>
        </Table>
      </Article>
    );
  }

});

module.exports = Cables;
