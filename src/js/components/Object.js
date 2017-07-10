// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.OBJECT;
const LIST_ITEM = CSSClassnames.LIST_ITEM;

export default class GrommetObject extends Component {

  _renderArray (array) {
    return array.map(function (item, index) {
      var itemContent = item;
      if ('object' === typeof(item)) {
        itemContent = this._renderObject(item);
      }
      return (
        <li key={'i_' + index} className={LIST_ITEM}>{itemContent}</li>
      );
    }, this);
  }

  _renderObject (obj) {
    var attrs = [];
    for (var name in obj) {
      if (obj.hasOwnProperty(name)) {
        var value = obj[name];
        var classes = [CLASS_ROOT + "__attribute"];
        if (null === value) {
          value = 'null';
          classes.push(CLASS_ROOT + "__attribute--unset");
        } else if (Array.isArray(value)) {
          var items = this._renderArray(value);
          value = (
            <ol>{items}</ol>
          );
          classes.push(CLASS_ROOT + "__attribute--array");
        } else if ('object' === typeof value) {
          value = this._renderObject(value);
          classes.push(CLASS_ROOT + "__attribute--container");
        } else {
          value = value.toString();
        }
        attrs.push(
          <li key={'n_' + name} className={classes.join(' ')}>
            <span className={CLASS_ROOT + "__attribute-name"}>{name}</span>
            <span className={CLASS_ROOT + "__attribute-value"}>{value}</span>
          </li>
        );
      }
    }

    return (
      <ul>{attrs}</ul>
    );
  }

  render () {
    return (
      <div className={CLASS_ROOT}>
        <div className={CLASS_ROOT + "__container"}>
          {this._renderObject(this.props.data)}
        </div>
      </div>
    );
  }

}

GrommetObject.propTypes = {
  data: PropTypes.object
};
