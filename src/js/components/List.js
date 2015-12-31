// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { FormattedTime } from 'react-intl';
import isEqual from 'lodash/lang/isEqual';
import SpinningIcon from './icons/Spinning';
import InfiniteScroll from '../utils/InfiniteScroll';
import Selection from '../utils/Selection';
import ListItem from './ListItem';

const CLASS_ROOT = "list";
const SELECTED_CLASS = CLASS_ROOT + "-item--selected";

// SchemaPropType is deprecated
const SchemaPropType = PropTypes.arrayOf(PropTypes.shape({
  attribute: PropTypes.string,
  default: PropTypes.node,
  image: PropTypes.bool,
  label: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  timestamp: PropTypes.bool,
  uid: PropTypes.bool
}));

// SchemaListItem is deprecated, use ListItem child components inside a List instead
class SchemaListItem extends Component {

  _renderValue (item, scheme) {
    var result;
    var value = item[scheme.attribute] || scheme.default;
    if (scheme.image) {
      if (typeof value === 'string') {
        result = <img src={value} alt={scheme.label || 'image'} />;
      } else {
        result = value;
      }
    } else if (scheme.timestamp) {
      result = (
        <FormattedTime value={value}
          day="numeric"
          month="narrow"
          hour="2-digit"
          minute="2-digit"
          second="2-digit" />
      );
    } else {
      result = value;
    }
    return result;
  }

  render () {
    let item = this.props.item;
    let classes = [];
    if (this.props.direction) {
      classes.push(CLASS_ROOT + "-item--" + this.props.direction);
    }

    let image;
    let label;
    let annotation;

    this.props.schema.forEach(function (scheme) {
      if (scheme.image) {
        image = (
          <span key="image" className={CLASS_ROOT + "-item__image"}>
            {this._renderValue(item, scheme)}
          </span>
        );
      } else if (scheme.primary) {
        label = (
          <span key="label" className={CLASS_ROOT + "-item__label"}>
            {this._renderValue(item, scheme)}
          </span>
        );
      } else if (scheme.secondary) {
        annotation = (
          <span key="annotation" className={CLASS_ROOT + "-item__annotation"}>
            {this._renderValue(item, scheme)}
          </span>
        );
      }
    }, this);

    if (this.props.onClick) {
      classes.push(CLASS_ROOT + "-item--selectable");
    }

    return (
      <ListItem className={classes.join(' ')} direction={this.props.direction}
        selected={this.props.selected} onClick={this.props.onClick}>
        {image}
        {label}
        {annotation}
      </ListItem>
    );
  }
}

SchemaListItem.propTypes = {
  direction: PropTypes.oneOf(['row', 'column']),
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  schema: SchemaPropType,
  selected: PropTypes.bool
};

export default class List extends Component {

  constructor(props) {
    super(props);

    this._onClick = this._onClick.bind(this);
    this._onClickItem = this._onClickItem.bind(this);

    this.state = {
      selected: Selection.normalizeIndexes(props.selected)
    };
  }

  componentDidMount () {
    this._setSelection();
    if (this.props.onMore) {
      this._scroll = InfiniteScroll.startListeningForScroll(this.refs.more, this.props.onMore);
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this._scroll) {
      InfiniteScroll.stopListeningForScroll(this._scroll);
      this._scroll = null;
    }
    if (nextProps.hasOwnProperty('selected')) {
      this.setState({
        selected: Selection.normalizeIndexes(nextProps.selected)
      });
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (! isEqual(this.state.selected, prevState.selected)) {
      this._setSelection();
    }
    if (this.props.onMore && !this._scroll) {
      this._scroll = InfiniteScroll.startListeningForScroll(this.refs.more, this.props.onMore);
    }
  }

  componentWillUnmount () {
    if (this._scroll) {
      InfiniteScroll.stopListeningForScroll(this._scroll);
    }
  }

  _setSelection () {
    Selection.setClassFromIndexes({
      containerElement: this.refs.list,
      childSelector: '.list-item',
      selectedClass: SELECTED_CLASS,
      selectedIndexes: this.state.selected
    });
  }

  _onClick (event) {
    if (!this.props.selectable) {
      return;
    }

    let selected = Selection.onClick(event, {
      containerElement: this.refs.list,
      childSelector: '.list-item',
      selectedClass: SELECTED_CLASS,
      multiSelect: ('multiple' === this.props.selectable),
      priorSelectedIndexes: this.state.selected
    });
    // only set the selected state and classes if the caller isn't managing it.
    if (! this.props.selected) {
      this.setState({ selected: selected }, this._setSelection);
    }

    if (this.props.onSelect) {
      // notify caller that the selection has changed
      if (selected.length === 1) {
        selected = selected[0];
      }
      this.props.onSelect(selected);
    }
  }

  _onClickItem (item) {
    if (this.props.onSelect) {
      this.props.onSelect(item);
    }
  }

  _renderItem (item) {
    let uid;
    let selected;
    let onClick;

    this.props.schema.forEach(function (scheme) {
      if (scheme.uid) {
        uid = item[scheme.attribute];
        if (uid === this.props.selected) {
          selected = true;
        }
      }
    }, this);

    if (this.props.onSelect) {
      onClick = this._onClickItem.bind(this, item);
    }

    return (
      <SchemaListItem key={uid} item={item} schema={this.props.schema}
        direction={this.props.itemDirection}
        selected={selected} onClick={onClick} />
    );
  }

  render () {
    var classes = [CLASS_ROOT];
    if (this.props.size) {
      classes.push(CLASS_ROOT + "--" + this.props.size);
    }
    if (this.props.selectable) {
      classes.push(CLASS_ROOT + "--selectable");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let children;
    let empty;
    if (this.props.data && this.props.schema) {
      // Deprecated, will be removed soon.
      children = this.props.data.map(function (item) {
        return this._renderItem(item);
      }, this);
      if (this.props.data.length === 0) {
        empty = (
          <li className={CLASS_ROOT + "__empty"}>
            {this.props.emptyIndicator}
          </li>
        );
      }
    } else {
      children = this.props.children;
      empty = this.props.emptyIndicator;
    }

    var more;
    if (this.props.onMore) {
      classes.push(CLASS_ROOT + "--moreable");
      more = (
        <li ref="more" className={CLASS_ROOT + "__more"}>
          <SpinningIcon />
        </li>
      );
    }

    return (
      <ul ref="list" className={classes.join(' ')} onClick={this._onClick}>
        {empty}
        {children}
        {more}
      </ul>
    );
  }
}

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object), // deprecated, use child components
  emptyIndicator: PropTypes.node,
  itemDirection: PropTypes.oneOf(['row', 'column']), // deprecated, use child components
  onMore: PropTypes.func,
  onSelect: PropTypes.func,
  schema: SchemaPropType, // deprecated, use child components
  selectable: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['multiple'])
  ]),
  selected: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']) // deprecated, use child components
};

List.defaultProps = {
  itemDirection: 'row' // deprecated, use child components
};
