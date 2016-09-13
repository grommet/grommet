// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import SpinningIcon from './icons/Spinning';
import InfiniteScroll from '../utils/InfiniteScroll';
import Selection from '../utils/Selection';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.LIST;
const LIST_ITEM = CSSClassnames.LIST_ITEM;
const SELECTED_CLASS = `${CLASS_ROOT}-item--selected`;

export default class List extends Component {

  constructor(props, context) {
    super(props, context);

    this._onClick = this._onClick.bind(this);

    this.state = {
      selected: Selection.normalizeIndexes(props.selected)
    };
  }

  componentDidMount () {
    this._setSelection();
    if (this.props.onMore) {
      this._scroll = InfiniteScroll.startListeningForScroll(
        this.moreRef, this.props.onMore
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
    if (JSON.stringify(this.state.selected) !==
      JSON.stringify(prevState.selected)) {
      this._setSelection();
    }
    if (this.props.onMore && !this._scroll) {
      this._scroll = InfiniteScroll.startListeningForScroll(this.moreRef,
        this.props.onMore);
    }
  }

  componentWillUnmount () {
    if (this._scroll) {
      InfiniteScroll.stopListeningForScroll(this._scroll);
    }
  }

  _setSelection () {
    if (this.listRef) {
      Selection.setClassFromIndexes({
        containerElement: this.listRef,
        childSelector: `.${LIST_ITEM}`,
        selectedClass: SELECTED_CLASS,
        selectedIndexes: this.state.selected
      });
    };
  }

  _onClick (event) {
    if (!this.props.selectable) {
      return;
    }

    let selected = Selection.onClick(event, {
      containerElement: this.listRef,
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
    const {
      children,
      className,
      emptyIndicator,
      onMore,
      selectable,
      ...props
    } = this.props;

    const classes = classnames(
      CLASS_ROOT,
      className,
      {
        [`${CLASS_ROOT}--selectable`]: selectable,
        [`${CLASS_ROOT}--moreable`]: onMore
      }
    );

    let empty;
    if (emptyIndicator) {
      empty = (
        <li className={`${CLASS_ROOT}__empty`}>
          {emptyIndicator}
        </li>
      );
    }

    let more;
    if (onMore) {
      more = (
        <li ref={(ref) => this.moreRef = ref} className={`${CLASS_ROOT}__more`}>
          <SpinningIcon />
        </li>
      );
    }

    return (
      <ul
        ref={(ref) => this.listRef = ref}
        className={classes}
        onClick={this._onClick}
        {...props}
      >
        {empty}
        {children}
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

List.defaultProps = {
  role: 'list'
};
