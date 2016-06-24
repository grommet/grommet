// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import SpinningIcon from './icons/Spinning';
import InfiniteScroll from '../utils/InfiniteScroll';
import Selection from '../utils/Selection';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.LIST;
const LIST_ITEM = CSSClassnames.LIST_ITEM;
const SELECTED_CLASS = CLASS_ROOT + "-item--selected";

export default class List extends Component {

  constructor(props) {
    super(props);

    this._onClick = this._onClick.bind(this);

    this.state = {
      selected: Selection.normalizeIndexes(props.selected)
    };
  }

  componentDidMount () {
    this._setSelection();
    if (this.props.onMore) {
      this._scroll = InfiniteScroll.startListeningForScroll(
        this.refs.more, this.props.onMore
      );
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
    if (JSON.stringify(this.state.selected) !== JSON.stringify(prevState.selected)) {
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
      childSelector: `.${LIST_ITEM}`,
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
      childSelector: `.${LIST_ITEM}`,
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

  render () {
    var classes = [CLASS_ROOT];
    if (this.props.selectable) {
      classes.push(CLASS_ROOT + "--selectable");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let empty;
    if (this.props.emptyIndicator) {
      empty = (
        <li className={CLASS_ROOT + "__empty"}>
          {this.props.emptyIndicator}
        </li>
      );
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
        {this.props.children}
        {more}
      </ul>
    );
  }
}

List.propTypes = {
  emptyIndicator: PropTypes.node,
  onMore: PropTypes.func,
  onSelect: PropTypes.func,
  selectable: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['multiple'])
  ]),
  selected: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ])
};
