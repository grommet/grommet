// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');
var Header = require('grommet/components/Header');
var Menu = require('grommet/components/Menu');
var Anchor = require('grommet/components/Anchor');
var CloseIcon = require('grommet/components/icons/Clear');
var Table = require('grommet/components/Table');

var Cables = React.createClass({

  propTypes: {
    cables: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onClose: React.PropTypes.func.isRequired
  },

  _onSelect: function (index) {
    // TODO
  },

  render: function() {
    var cables = this.props.cables.map(function (cable) {
      return (
        <tr key={cable.index}>
          <td>{cable.index}</td>
          <td>1</td>
          <td>?</td>
          <td>{cable.ids[0]}</td>
          <td>{cable.ids[1]}</td>
        </tr>
      );
    });

    return (
      <Article>
        <Header pad={{horizontal: "medium"}} justify="between" fixed={true}>
          Cables
          <Menu inline={true} direction="row" align="center">
            <Anchor href="" onClick={this.props.onClose}><CloseIcon /></Anchor>
          </Menu>
        </Header>
        <Table selectable={true} onSelect={this._onSelect}>
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
