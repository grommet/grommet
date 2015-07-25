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
    onChange: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired
  },

  _onSelect: function (index) {
    this.props.cables.forEach(function (cable, cableIndex) {
      cable.highlight = (cableIndex === index);
    });
    this.props.onChange();
  },

  _onToggle: function (cable) {
    cable.highlight = ! cable.highlight;
    this.props.onChange();
  },

  render: function() {
    var selection = [];
    var cables = this.props.cables.map(function (cable, index) {
      if (cable.highlight) {
        selection.push(index);
      }
      return (
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
