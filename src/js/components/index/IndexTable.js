// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Table = require('../Table');
var IndexAttribute = require('./IndexAttribute');
var StatusIcon = require('../icons/Status');

var CLASS_ROOT = 'index-table';

var IndexTable = React.createClass({

  propTypes: {
    options: React.PropTypes.shape({
      attributes: React.PropTypes.arrayOf(React.PropTypes.shape({
        attribute: React.PropTypes.string,
        label: React.PropTypes.string,
        index: React.PropTypes.number,
        timestamp: React.PropTypes.bool
      }))
    }),
    result: React.PropTypes.shape({
      total: React.PropTypes.number,
      unfilteredTotal: React.PropTypes.number,
      start: React.PropTypes.number,
      count: React.PropTypes.number,
      items: React.PropTypes.arrayOf(React.PropTypes.object),
      error: React.PropTypes.string
    }),
    selection: React.PropTypes.oneOfType([
      React.PropTypes.string, // uri
      React.PropTypes.arrayOf(React.PropTypes.string)
    ]),
    onSelect: React.PropTypes.func
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var attributes = this.props.options.attributes;

    var headerCells = attributes.map(function (attribute) {
      var classes = [];
      var content = attribute.label;
      if ('status' === attribute.attribute) {
        classes.push(CLASS_ROOT + "__cell--icon");
        content = (
          <StatusIcon className={CLASS_ROOT + "__header-icon"} value={'label'} small={true} />
        );
      }
      return (
        <th key={attribute.attribute} className={classes.join(' ')}>{content}</th>
      );
    });

    var rows = null;
    if (this.props.result.items) {
      rows = this.props.result.items.map(function (item) {
        var cells = attributes.map(function (attribute) {
          return (
            <td key={attribute.attribute}>
              <IndexAttribute item={item} attribute={attribute} />
            </td>
          );
        }, this);
        return (<tr key={item.uri}>{cells}</tr>);
      }, this);
    }

    return (
      <Table className={classes.join(' ')}>
        <thead className={CLASS_ROOT + "__header"}>
          <tr>
            {headerCells}
          </tr>
        </thead>
        <tbody className={CLASS_ROOT + "__body"}>
          {rows}
        </tbody>
      </Table>
    );
  }

});

module.exports = IndexTable;
