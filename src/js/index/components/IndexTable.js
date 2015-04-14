// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IndexRouter = require('../utils/IndexRouter');
var IndexAttribute = require('../components/IndexAttribute');
var StatusIcon = require('../../components/icons/Status');
var Link = require('../../components/Link');

var CLASS_ROOT = "index-table";

function buildHeaderCells(attributes) {
  var headerCells = attributes.map(function (attribute) {
    var classes = [];
    var content = attribute.label;
    if ('status' === attribute.name) {
      classes.push(CLASS_ROOT + "__cell--icon");
      content = (
        <StatusIcon className={CLASS_ROOT + "__header-icon"} value={'label'} />
      );
    }
    return (
      <th key={attribute.name} className={classes.join(' ')}>{content}</th>
    );
  });
  return headerCells;
}

function buildRows(attributes, members, query) {
  var rows = members.map(function (member) {
    var href = IndexRouter.resourceHref(member.category, member.uri, query);
    var cells = attributes.map(function (attribute) {
      var classes = [];
      if ('status' === attribute.name) {
        classes.push(CLASS_ROOT + "__cell--icon");
      } else if ('_activity' === attribute.name) {
        classes.push(CLASS_ROOT + "__cell--activity");
      }
      var content;
      if (! attribute.hasLink) {
        content = (
          <Link href={href}>
            <IndexAttribute member={member} attribute={attribute} />
          </Link>
        );
      } else {
        content = (<IndexAttribute member={member} attribute={attribute} />);
      }

      return (
        <td key={attribute.name} className={classes.join(' ')}>
          {content}
        </td>
      );
    });
    return (
      <tr key={member.uri}>{cells}</tr>
    );
  });
  return rows;
}

var IndexTable = React.createClass({

  _onResize: function () {
    this.componentDidUpdate();
  },

  componentDidMount: function() {
    window.addEventListener("resize", this._onResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener("resize", this._onResize);
  },

  componentDidUpdate: function() {
    // align fixed header width to its container
    var headerMirrorContainerElement = this.refs.headerMirrorContainer.getDOMNode();
    var headerMirrorTableElement = this.refs.headerMirrorTable.getDOMNode();
    var rect = headerMirrorContainerElement.getBoundingClientRect();
    headerMirrorTableElement.style.width = '' + Math.floor(rect.right - rect.left) + 'px';
    // align header mirror to actual header
    var cells = this.refs.headerRow.getDOMNode().children;
    var mirrorCells = this.refs.headerRowMirror.getDOMNode().children;
    for (var i = 0; i < cells.length; i++) {
      rect = cells[i].getBoundingClientRect();
      mirrorCells[i].style.width = '' + Math.floor(rect.right - rect.left) + 'px';
    }
  },

  render: function() {

    var index = this.props.index;
    var result = index.result;

    var visibleAttribute = index.attributes.filter(function (attribute) {
      return attribute.visible;
    });
    var query = {};
    if (index.params.search.fullText) {
      query.search = index.params.search.fullText;
    }
    var headerCells = buildHeaderCells(visibleAttribute);
    var headerMirrorCells = buildHeaderCells(visibleAttribute);
    var rows = buildRows(visibleAttribute, result.members, query);

    return (
      <div className={CLASS_ROOT}>
        <div ref="headerMirrorContainer"
          className={CLASS_ROOT + "__header-mirror-container"}>
          <table ref="headerMirrorTable"
            className={CLASS_ROOT + "__header-mirror-table table table--cosy"}>
            <thead className={CLASS_ROOT + "__header-mirror-header"}>
              <tr ref="headerRowMirror">
                {headerMirrorCells}
              </tr>
            </thead>
          </table>
        </div>
        <table className={CLASS_ROOT + "__table table table--cosy"}>
          <thead className={CLASS_ROOT + "__header"}>
            <tr ref="headerRow">
              {headerCells}
            </tr>
          </thead>
          <tbody className={CLASS_ROOT + "__body"}>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }

});

module.exports = IndexTable;
