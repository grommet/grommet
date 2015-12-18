// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { FormattedTime } from 'react-intl';
import ListItem from './ListItem';
import SpinningIcon from './icons/Spinning';
import InfiniteScroll from '../utils/InfiniteScroll';

const CLASS_ROOT = "list";

class List extends Component {

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
      var uid;
      var image;
      var primary;
      var secondary;
      var selected;
      var onClick;

      this.props.schema.forEach(function (scheme) {
        if (scheme.image) {
          image = this._renderValue(item, scheme);
        } else if (scheme.primary) {
          primary = this._renderValue(item, scheme);
        } else if (scheme.secondary) {
          secondary = this._renderValue(item, scheme);
        }
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
        <ListItem key={uid} image={image} label={primary}
          annotation={secondary} selected={selected}
          direction={this.props.itemDirection} onClick={onClick} />
      );
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
  schema: PropTypes.arrayOf(PropTypes.shape({
    attribute: PropTypes.string,
    default: PropTypes.node,
    image: PropTypes.bool,
    label: PropTypes.string,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    timestamp: PropTypes.bool,
    uid: PropTypes.bool
  })).isRequired,
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

module.exports = List;
