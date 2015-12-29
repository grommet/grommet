// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { FormattedTime } from 'react-intl';
import SpinningIcon from './icons/Spinning';
import InfiniteScroll from '../utils/InfiniteScroll';

const CLASS_ROOT = "list";

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

class ListItem extends Component {

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
    let classes = [CLASS_ROOT + "-item"];
    if (this.props.selected) {
      classes.push(CLASS_ROOT + "-item--selected");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let contents;
    if (this.props.renderItem) {

      contents = this.props.renderItem(this.props.item);

    } else {

      if (this.props.direction) {
        classes.push(CLASS_ROOT + "-item--" + this.props.direction);
      }

      let item = this.props.item;
      let image;
      let label;
      let annotation;

      this.props.schema.forEach(function (scheme) {
        if (scheme.image) {
          image = (
            <span className={CLASS_ROOT + "-item__image"}>
              {this._renderValue(item, scheme)}
            </span>
          );
        } else if (scheme.primary) {
          label = (
            <span className={CLASS_ROOT + "-item__label"}>
              {this._renderValue(item, scheme)}
            </span>
          );
        } else if (scheme.secondary) {
          annotation = (
            <span className={CLASS_ROOT + "-item__annotation"}>
              {this._renderValue(item, scheme)}
            </span>
          );
        }
      }, this);

      contents = [
        image,
        <span className={CLASS_ROOT + "-item__label"}>{label}</span>,
        <span className={CLASS_ROOT + "-item__annotation"}>{annotation}</span>
      ];
    }

    if (this.props.onClick) {
      classes.push(CLASS_ROOT + "-item--selectable");
    }

    return (
      <li className={classes.join(' ')} onClick={this.props.onClick}>
        {contents}
      </li>
    );
  }
}

ListItem.propTypes = {
  direction: PropTypes.oneOf(['row', 'column']),
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  renderItem: PropTypes.func,
  schema: SchemaPropType,
  selected: PropTypes.bool
};

export default class List extends Component {

  constructor() {
    super();

    this._onClickItem = this._onClickItem.bind(this);
  }

  componentDidMount () {
    if (this.props.onMore) {
      this._scroll = InfiniteScroll.startListeningForScroll(this.refs.more, this.props.onMore);
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this._scroll) {
      InfiniteScroll.stopListeningForScroll(this._scroll);
      this._scroll = null;
    }
  }

  componentDidUpdate () {
    if (this.props.onMore && !this._scroll) {
      this._scroll = InfiniteScroll.startListeningForScroll(this.refs.more, this.props.onMore);
    }
  }

  componentWillUnmount () {
    if (this._scroll) {
      InfiniteScroll.stopListeningForScroll(this._scroll);
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
      <ListItem key={uid} item={item} schema={this.props.schema}
        direction={this.props.itemDirection}
        selected={selected} onClick={onClick} />
    );
  }

  render () {
    var classes = [CLASS_ROOT];
    if (true || this.props.fill) {
      classes.push(CLASS_ROOT + "--fill");
    }
    if (true || this.props.flush) {
      classes.push(CLASS_ROOT + "--flush");
    }
    if (this.props.size) {
      classes.push(CLASS_ROOT + "--" + this.props.size);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var items = this.props.data.map(function (item) {
      return this._renderItem(item);
    }, this);

    var more;
    if (this.props.onMore) {
      classes.push(CLASS_ROOT + "--moreable");
      more = (
        <li ref="more" className={CLASS_ROOT + "__more"}>
          <SpinningIcon />
        </li>
      );
    }

    var empty;
    if (this.props.data.length === 0) {
      empty = (
        <li className={CLASS_ROOT + "__empty"}>
          {this.props.emptyIndicator}
        </li>
      );
    }

    return (
      <ul className={classes.join(' ')}>
        {empty}
        {items}
        {more}
      </ul>
    );
  }

}

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyIndicator: PropTypes.node,
  itemDirection: PropTypes.oneOf(['row', 'column']),
  large: PropTypes.bool,
  onMore: PropTypes.func,
  onSelect: PropTypes.func,
  renderItem: PropTypes.func,
  schema: SchemaPropType,
  selected: PropTypes.oneOfType([
    PropTypes.string, // uid
    PropTypes.arrayOf(PropTypes.string)
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  small: PropTypes.bool
};

List.defaultProps = {
  small: false,
  itemDirection: 'row'
};
