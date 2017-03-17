// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import SpinningIcon from './icons/Spinning';
import InfiniteScroll from '../utils/InfiniteScroll';
import Selection from '../utils/Selection';
import CSSClassnames from '../utils/CSSClassnames';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import Responsive from '../utils/Responsive';
import Intl from '../utils/Intl';
import { announce } from '../utils/Announcer';

const CLASS_ROOT = CSSClassnames.TABLE;
const SELECTED_CLASS = `${CLASS_ROOT}-row--selected`;
const ACTIVE_CLASS = `${CLASS_ROOT}-row--active`;
// empirical number describing a minimum cell width for a
// table to be presented in column-mode.
const MIN_CELL_WIDTH = 120;

export default class Table extends Component {

  constructor(props, context) {
    super(props, context);

    this._onClick = this._onClick.bind(this);
    this._onResize = this._onResize.bind(this);
    this._layout = this._layout.bind(this);
    this._onResponsive = this._onResponsive.bind(this);
    this._onPreviousRow = this._onPreviousRow.bind(this);
    this._onNextRow = this._onNextRow.bind(this);
    this._onEnter = this._onEnter.bind(this);
    this._fireClick = this._fireClick.bind(this);
    this._announceRow = this._announceRow.bind(this);
    this._onViewPortChange = this._onViewPortChange.bind(this);

    this.state = {
      activeRow: undefined,
      mouseActive: false,
      selected: Selection.normalizeIndexes(props.selected),
      columnMode: false,
      rebuildMirror: props.scrollable,
      small: false
    };
  }

  componentDidMount () {
    const { onMore, selectable, scrollable } = this.props;
    const { columnMode, small } = this.state;
    this._setSelection();
    if (scrollable && !columnMode && !small) {
      this._buildMirror();
      this._alignMirror();
    }
    if (this.props.onMore) {
      this._scroll = InfiniteScroll.startListeningForScroll(
        this.moreRef, onMore
      );
    }
    this._adjustBodyCells();
    setTimeout(this._layout, 50);
    window.addEventListener('resize', this._onResize);

    if (selectable) {
      // only listen for navigation keys if the table row can be selected
      this._keyboardHandlers = {
        left: this._onPreviousRow,
        up: this._onPreviousRow,
        right: this._onNextRow,
        down: this._onNextRow,
        enter: this._onEnter,
        space: this._onEnter
      };
      KeyboardAccelerators.startListeningToKeyboard(
        this, this._keyboardHandlers
      );
    }

    this._responsive = Responsive.start(this._onViewPortChange);
  }

  componentWillReceiveProps (nextProps) {
    if (this._scroll) {
      InfiniteScroll.stopListeningForScroll(this._scroll);
      this._scroll = undefined;
    }
    if (nextProps.selected !== undefined) {
      this.setState({
        selected: Selection.normalizeIndexes(nextProps.selected)
      });
    }

    this.setState({
      rebuildMirror: nextProps.scrollable
    });
  }

  componentDidUpdate (prevProps, prevState) {
    const { onMore, selectable, scrollable } = this.props;
    const { columnMode, rebuildMirror, selected, small } = this.state;
    if (JSON.stringify(selected) !==
      JSON.stringify(prevState.selected)) {
      this._setSelection();
    }
    if (rebuildMirror && !columnMode) {
      this._buildMirror();
      this.setState({rebuildMirror: false});
    }
    if (scrollable && !columnMode && !small) {
      this._alignMirror();
    }
    if (onMore && !this._scroll) {
      this._scroll = InfiniteScroll.startListeningForScroll(
        this.moreRef, onMore
      );
    }
    this._adjustBodyCells();
    this._layout();

    if (selectable) {
      // only listen for navigation keys if the table row can be selected
      this._keyboardHandlers = {
        left: this._onPreviousRow,
        up: this._onPreviousRow,
        right: this._onNextRow,
        down: this._onNextRow,
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
    clearTimeout(this._resizeTimer);
    window.removeEventListener('resize', this._onResize);

    if (selectable) {
      KeyboardAccelerators.stopListeningToKeyboard(
        this, this._keyboardHandlers
      );
    }

    this._responsive.stop();
  }

  _onViewPortChange(small) {
    this.setState({ small, rebuildMirror: true });
  }

  _announceRow (label) {
    const { intl } = this.context;
    const enterSelectMessage = Intl.getMessage(intl, 'Enter Select');
    announce(`${label} ${enterSelectMessage}`);
  }

  _onResponsive () {
    const { columnMode } = this.state;
    if (this.containerRef && this.tableRef) {
      const availableSize = this.containerRef.offsetWidth;
      const numberOfCells = this.tableRef.querySelectorAll('thead th').length;

      if ((numberOfCells * MIN_CELL_WIDTH) > availableSize) {
        if (columnMode === false) {
          this.setState({ columnMode: true });
        }
      } else {
        if (columnMode === true) {
          this.setState({ columnMode: false });
        }
      }
    }
  }

  _container () {
    let containerElement = this.tableRef;
    if (containerElement) {
      let tableBodies = containerElement.getElementsByTagName('TBODY');
      if (tableBodies.length > 0) {
        containerElement = tableBodies[0];
      }
    }
    return containerElement;
  }

  _setSelection () {
    const { selected } = this.state;
    Selection.setClassFromIndexes({
      containerElement: this._container(),
      childSelector: 'tr',
      selectedClass: SELECTED_CLASS,
      selectedIndexes: selected
    });
  }

  _onPreviousRow (event) {
    if (this.tableRef.contains(document.activeElement)) {
      event.preventDefault();
      const { activeRow } = this.state;
      const rows = this.tableRef.querySelectorAll('tbody tr');
      if (rows && rows.length > 0) {
        if (activeRow === undefined) {
          rows[0].classList.add(ACTIVE_CLASS);
          this.setState({ activeRow: 0 }, () => {
            this._announceRow(
              rows[this.state.activeRow].innerText
            );
          });
        } else if (activeRow - 1 >= 0) {
          rows[activeRow].classList.remove(ACTIVE_CLASS);
          rows[activeRow - 1].classList.add(ACTIVE_CLASS);
          this.setState({ activeRow: activeRow - 1 }, () => {
            this._announceRow(
              rows[this.state.activeRow].innerText
            );
          });
        }
      }

      //stop event propagation
      return true;
    }
  }

  _onNextRow (event) {
    if (this.tableRef.contains(document.activeElement)) {
      event.preventDefault();
      const { activeRow } = this.state;
      const rows = this.tableRef.querySelectorAll('tbody tr');
      if (rows && rows.length > 0) {
        if (activeRow === undefined) {
          rows[0].classList.add(ACTIVE_CLASS);
          this.setState({ activeRow: 0 }, () => {
            this._announceRow(
              rows[this.state.activeRow].innerText
            );
          });
        } else if (activeRow + 1 <= rows.length - 1) {
          rows[activeRow].classList.remove(ACTIVE_CLASS);
          rows[activeRow + 1].classList.add(ACTIVE_CLASS);
          this.setState({ activeRow: activeRow + 1 }, () => {
            this._announceRow(
              rows[this.state.activeRow].innerText
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
    const { activeRow } = this.state;
    const { intl } = this.context;
    if (this.tableRef.contains(document.activeElement) &&
      activeRow !== undefined) {
      const rows = this.tableRef.querySelectorAll('tbody tr');
      this._fireClick(rows[activeRow], event.shiftKey);
      rows[activeRow].classList.remove(ACTIVE_CLASS);
      const label = rows[activeRow].innerText;
      const selectedMessage = Intl.getMessage(intl, 'Selected');
      announce(`${label} ${selectedMessage}`);
    }
  }

  _onClick (event) {
    const { onSelect, selectable, selected } = this.props;

    const selection = Selection.onClick(event, {
      containerElement: this._container(),
      childSelector: 'tr',
      selectedClass: SELECTED_CLASS,
      multiSelect: ('multiple' === selectable),
      priorSelectedIndexes: this.state.selected
    });
    // only set the selected state and classes if the caller isn't managing it.
    if (selected === undefined) {
      this.setState({ selected: selection }, this._setSelection);
    }

    if (onSelect) {
      onSelect(selection.length === 1 ? selection[0]  : selection);
    }
  }

  _adjustBodyCells () {
    // adjust table body cells to have link to the header
    // so that in responsive mode it displays the text as content in css.
    // IMPORTANT: non-text header cells, such as icon, are rendered as empty
    // headers.
    if (this.tableRef) {
      let headerCells = this.tableRef.querySelectorAll('thead th');
      if (headerCells.length > 0) {
        const increments = [];
        [].forEach.call(headerCells, (cell) => {
          const colspan = cell.getAttribute('colspan');
          increments.push(colspan ? parseInt(colspan) : 1);
        });

        let rows = this.tableRef.querySelectorAll('tbody tr');

        let incrementCount = 0;
        let headerIndex = 0;
        [].forEach.call(rows, (row) => {
          [].forEach.call(row.cells, (cell) => {
            cell.setAttribute('data-th', (
              headerCells[headerIndex].innerText ||
              headerCells[headerIndex].textContent
            ));
            incrementCount++;
            if (incrementCount === increments[headerIndex]) {
              incrementCount = 0;
              headerIndex++;
            }
          });
        });
      }
    }
  }

  _onResize () {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  }

  _layout () {
    this._alignMirror();
    this._onResponsive();
  }

  _buildMirror () {
    const tableElement = this.tableRef;
    if (tableElement) {
      let cells = tableElement.querySelectorAll('thead tr th');
      let mirrorElement = this.mirrorRef;
      if (mirrorElement) {
        let mirrorRow = mirrorElement.querySelectorAll('thead tr')[0];
        while (mirrorRow.hasChildNodes()) {
          mirrorRow.removeChild(mirrorRow.lastChild);
        }
        for (let i = 0; i < cells.length; i++) {
          mirrorRow.appendChild(cells[i].cloneNode(true));
        }
      }
    }
  }

  _alignMirror () {
    if (this.mirrorRef) {
      const tableElement = this.tableRef;
      const cells = tableElement.querySelectorAll('thead tr th');
      const mirrorElement = this.mirrorRef;
      const mirrorCells = mirrorElement.querySelectorAll('thead tr th');

      let rect = tableElement.getBoundingClientRect();
      mirrorElement.style.width =
        '' + Math.floor(rect.right - rect.left) + 'px';

      let height = 0;
      for (let i = 0; i < cells.length; i++) {
        rect = cells[i].getBoundingClientRect();
        mirrorCells[i].style.width =
          '' + Math.floor(rect.right - rect.left) + 'px';
        mirrorCells[i].style.height =
          '' + Math.floor(rect.bottom - rect.top) + 'px';
        height = Math.max(height, Math.floor(rect.bottom - rect.top));
      }
      mirrorElement.style.height = '' + height + 'px';
    }
  }

  render () {
    const {
      a11yTitle, children, className, onBlur, onFocus, onMore, onMouseDown,
      onMouseUp, responsive, scrollable, selectable, ...props
    } = this.props;
    delete props.onSelect;
    delete props.selected;
    const { activeRow, columnMode, focus, mouseActive, small } = this.state;
    const { intl } = this.context;
    let classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--small`]: responsive && columnMode,
        [`${CLASS_ROOT}--selectable`]: selectable,
        [`${CLASS_ROOT}--scrollable`]: scrollable && !small
      },
      className
    );

    let mirror;
    if (scrollable && !small) {
      mirror = (
        <table ref={ref => this.mirrorRef = ref}
          className={`${CLASS_ROOT}__mirror`}>
          <thead>
            <tr />
          </thead>
        </table>
      );
    }

    let more;
    if (onMore) {
      more = (
        <div ref={ref => this.moreRef = ref} className={`${CLASS_ROOT}__more`}>
          <SpinningIcon />
        </div>
      );
    }

    let selectableProps;
    if (selectable) {
      const multiSelectMessage = selectable === 'multiple' ?
        `(${Intl.getMessage(intl, 'Multi Select')})` : '';
      const tableMessage = a11yTitle || Intl.getMessage(intl, 'Table');
      const navigationHelpMessage = Intl.getMessage(intl, 'Navigation Help');
      selectableProps = {
        'aria-label': (
          `${tableMessage} ${multiSelectMessage} ${navigationHelpMessage}`
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
          if (activeRow) {
            const rows = this.tableRef.querySelectorAll('tbody tr');
            rows[activeRow].classList.remove(ACTIVE_CLASS);
          }
          this.setState({ focus: false, activeRow: undefined });
          if (onBlur) {
            onBlur(event);
          }
        }
      };
    }

    const tableClasses = classnames(
      `${CLASS_ROOT}__table`, {
        [`${CLASS_ROOT}__table--focus`]: focus
      }
    );

    return (
      <div ref={ref => this.containerRef = ref} {...props} className={classes}>
        {mirror}
        <table ref={ref => this.tableRef = ref} {...selectableProps}
          className={tableClasses}>
          {children}
        </table>
        {more}
      </div>
    );
  }
}

Table.contextTypes = {
  intl: PropTypes.object
};

Table.propTypes = {
  a11yTitle: PropTypes.string,
  onMore: PropTypes.func,
  onSelect: PropTypes.func,
  responsive: PropTypes.bool,
  scrollable: PropTypes.bool,
  selectable: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['multiple'])
  ]),
  selected: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ])
};

Table.defaultProps = {
  responsive: true
};
