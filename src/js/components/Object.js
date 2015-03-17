// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var _ = require('lodash');
var React = require('react');

function renderObject (obj) {
  var attrs = [];
  _.forOwn(obj, function (value, name) {
    var classes = ['object__attribute list-item'];
    if (null === value) {
      value = 'null';
      classes.push('object__attribute--unset');
    }
    else if (Array.isArray(value)) {
      var items = value.map(function (item, index) {
        var itemContent = item;
        if ('object' === typeof(item)) {
          itemContent = renderObject(item);
        }
        return (
          <li key={'i_' + index} className="list-item">{itemContent}</li>
        );
      });
      value = (
        <ol className="list-inline">{items}</ol>
      );
      classes.push('object__attribute--array');
    }
    else if ('object' === typeof value) {
      value = renderObject(value);
      classes.push('object__attribute--container');
    } else {
      value = value.toString();
    }
    attrs.push(
      <li key={'n_' + name} className={classes.join(' ')}>
        <span className={"object__attribute-name"}>{name}</span>
        <div className={"object__attribute-value"}>{value}</div>
      </li>
    );
  });

  return(
    <ul className={"list-block list-block--tiny"}>{attrs}</ul>
  );
}

var Object = React.createClass({

  render: function() {
    return (
      <div className={"object"}>
        {renderObject(this.props.data)}
      </div>
    );
  }

});

module.exports = Object;
