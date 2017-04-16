import PropTypes from 'prop-types';
// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import classnames from 'classnames';
import SpinningIcon from './icons/Spinning';
import InfiniteScroll from '../utils/InfiniteScroll';
import Selection from '../utils/Selection';
import CSSClassnames from '../utils/CSSClassnames';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import Intl from '../utils/Intl';
import { announce } from '../utils/Announcer';

const CLASS_ROOT = CSSClassnames.LIST;
const LIST_ITEM = CSSClassnames.LIST_ITEM;
const SELECTED_CLASS = `${CLASS_ROOT}-item--selected`;
const ACTIVE_CLASS = `${CLASS_ROOT}-item--active`;

export default class List extends Component {

  constructor(props, context) {
    super(props, context);

    this._onClick = this._onClick.bind(this);
    this._fireClick = this._fireClick.bind(this);
    this._announceItem = this._announceItem.bind(this);
    this._onPreviousItem = this._onPreviousItem.bind(this);
    this._onNextItem = this._onNextItem.bind(this);
    this._onEnter = this._onEnter.bind(this);

    this.state = {
      activeItem: undefined,
      mouseActive: false,
      selected: Selection.normalizeIndexes(props.selected)
    };
  }

  componentDidMount () {
    const { onMore, selectable } = this.props;
    this._setSelection();
    if (onMore) {
      this._scroll = InfiniteScroll.startListeningForScroll(
        this.moreRef, onMore
      );
    }
    if (selectable) {
      // only listen for navigation keys if the list row can be selected
      this._keyboardHandlers = {
        left: this._onPreviousItem,
        up: this._onPreviousItem,
        right: this._onNextItem,
        down: this._onNextItem,
        enter: this._onEnter,
        space: this._onEnter
      };
      KeyboardAccelerators.startListeningToKeyboard(
        this, this._keyboardHandlers
      );
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this._scroll) {
      InfiniteScroll.stopListeningForScroll(this._scroll);
      this._scroll = undefined;
    }
    if (nextProps.hasOwnProperty('selected')) {
      this.setState({
        selected: Selection.normalizeIndexes(nextProps.selected)
      });
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const { onMore, selectable } = this.props;
    const { selected } = this.state;
    if (JSON.stringify(selected) !==
      JSON.stringify(prevState.selected)) {
      this._setSelection();
    }
    if (onMore && !this._scroll) {
      this._scroll = InfiniteScroll.startListeningForScroll(this.moreRef,
        onMore);
    }
    if (selectable) {
      // only listen for navigation keys if the list row can be selected
      this._keyboardHandlers = {
        left: this._onPreviousItem,
        up: this._onPreviousItem,
        right: this._onNextItem,
        down: this._onNextItem,
        enter: this._onEnter,
        space: this._onEnter
      };
      KeyboardAccelerators.startListeningToKeyboard(
        this, this._keyboardHandlers
      );
    }
  }

  componentWillUnmount () {
    const { selectable } = this.props;
    if (this._scroll) {
      InfiniteScroll.stopListeningForScroll(this._scroll);
    }
    if (selectable) {
      KeyboardAccelerators.stopListeningToKeyboard(
        this, this._keyboardHandlers
      );
    }
  }

  _announceItem (label) {
    const { intl } = this.context;
    const enterSelectMessage = Intl.getMessage(intl, 'Enter Select');
    announce(`${label} ${enterSelectMessage}`);
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

  _onPreviousItem (event) {
    if (this.listRef.contains(document.activeElement)) {
      event.preventDefault();
      const { activeItem } = this.state;
      const rows = this.listRef.querySelectorAll('ul li');
      if (rows && rows.length > 0) {
        if (activeItem === undefined) {
          rows[0].classList.add(ACTIVE_CLASS);
          this.setState({ activeItem: 0 }, () => {
            this._announceItem(
              rows[this.state.activeItem].innerText
            );
          });
        } else if (activeItem - 1 >= 0) {
          rows[activeItem].classList.remove(ACTIVE_CLASS);
          rows[activeItem - 1].classList.add(ACTIVE_CLASS);
          this.setState({ activeItem: activeItem - 1 }, () => {
            this._announceItem(
              rows[this.state.activeItem].innerText
            );
          });
        }
      }

      //stop event propagation
      return true;
    }
  }

  _onNextItem (event) {
    if (this.listRef.contains(document.activeElement)) {
      event.preventDefault();
      const { activeItem } = this.state;
      const rows = this.listRef.querySelectorAll('ul li');
      if (rows && rows.length > 0) {
        if (activeItem === undefined) {
          rows[0].classList.add(ACTIVE_CLASS);
          this.setState({ activeItem: 0 }, () => {
            this._announceItem(
              rows[this.state.activeItem].innerText
            );
          });
        } else if (activeItem + 1 <= rows.length - 1) {
          rows[activeItem].classList.remove(ACTIVE_CLASS);
          rows[activeItem + 1].classList.add(ACTIVE_CLASS);
          this.setState({ activeItem: activeItem + 1 }, () => {
            this._announceItem(
              rows[this.state.activeItem].innerText
            );
          });
        }
      }

      //stop event propagation
      return true;
    }
  }

  _fireClick (element, shiftKey) {
    let event;
    try {
      event = new MouseEvent('click', {
        'bubbles': true,
        'cancelable': true,
        'shiftKey': shiftKey
      });
    } catch (e) {
      // IE11 workaround.
      event = document.createEvent('Event');
      event.initEvent('click', true, true);
    }
    // We use dispatchEvent to have the browser fill out the event fully.
    element.dispatchEvent(event);
  }

  _onEnter (event) {
    const { activeItem } = this.state;
    const { intl } = this.context;
    if (this.listRef.contains(document.activeElement) &&
      activeItem !== undefined) {
      const rows = this.listRef.querySelectorAll('ul li');
      this._fireClick(rows[activeItem], event.shiftKey);
      rows[activeItem].classList.remove(ACTIVE_CLASS);
      const label = rows[activeItem].innerText;
      const selectedMessage = Intl.getMessage(intl, 'Selected');
      announce(`${label} ${selectedMessage}`);
    }
  }

  _onClick (event) {
    const { onSelect, selectable, selected } = this.props;
    if (!this.props.selectable) {
      return;
    }

    let selection = Selection.onClick(event, {
      containerElement: this.listRef,
      childSelector: `.${LIST_ITEM}`,
      selectedClass: SELECTED_CLASS,
      multiSelect: ('multiple' === selectable),
      priorSelectedIndexes: this.state.selected
    });

    // only set the selected state and classes if the caller isn't managing it.
    if (selected === undefined) {
      this.setState({ selected: selection }, this._setSelection);
    }

    if (onSelect) {
      onSelect(selection.length === 1 ? selection[0] : selection);
    }
  }

  render () {
    const {
      a11yTitle, children, className, emptyIndicator, onBlur, onFocus, onMore,
      onMouseDown, onMouseUp, selectable, ...props
    } = this.props;
    const { activeItem, focus, mouseActive } = this.state;
    const { intl } = this.context;

    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--focus`]: focus,
        [`${CLASS_ROOT}--selectable`]: selectable,
        [`${CLASS_ROOT}--moreable`]: onMore
      },
      className
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

    let selectableProps;
    if (selectable) {
      const multiSelectMessage = selectable === 'multiple' ?
        `(${Intl.getMessage(intl, 'Multi Select')})` : '';
      const listMessage = a11yTitle || Intl.getMessage(intl, 'List');
      const navigationHelpMessage = Intl.getMessage(intl, 'Navigation Help');
      selectableProps = {
        'aria-label': (
          `${listMessage} ${multiSelectMessage} ${navigationHelpMessage}`
        ),
        tabIndex: '0',
        onClick: this._onClick,
        onMouseDown: (event) => {
          this.setState({ mouseActive: true });
          if (onMouseDown) {
            onMouseDown(event);
          }
        },
        onMouseUp: (event) => {
          this.setState({ mouseActive: false });
          if (onMouseUp) {
            onMouseUp(event);
          }
        },
        onFocus: (event) => {
          if (mouseActive === false) {
            this.setState({ focus: true });
          }
          if (onFocus) {
            onFocus(event);
          }
        },
        onBlur: (event) => {
          if (activeItem) {
            const rows = this.listRef.querySelectorAll('ul li');
            rows[activeItem].classList.remove(ACTIVE_CLASS);
          }
          this.setState({ focus: false, activeItem: undefined });
          if (onBlur) {
            onBlur(event);
          }
        }
      };
    }

    return (
      <ul {...props} ref={(ref) => this.listRef = ref} className={classes}
        {...selectableProps}>
        {empty}
        {children}
        {more}
      </ul>
    );
  }
}

List.contextTypes = {
  intl: PropTypes.object
};

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
