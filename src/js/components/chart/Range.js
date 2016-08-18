// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { padding } from './utils';
import DragIcon from '../icons/base/Drag';
import CSSClassnames from '../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.CHART_RANGE;

// Allows selecting a region.
// Click to select one.
// Press and Drag to select multiple.
// Drag edges to adjust.

export default class Range extends Component {

  constructor(props, context) {
    super(props, context);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this.state = {};
  }

  componentWillUnmount () {
    const { mouseDown } = this.state;
    if (mouseDown) {
      window.removeEventListener('mouseup', this._onMouseUp);
    }
  }

  _valueToIndex (value) {
    const { count, vertical } = this.props;
    const rect = this.refs.range.getBoundingClientRect();
    const total = vertical ? rect.height : rect.width;
    return Math.round((value / total) * (count - 1));
  }

  _percentForIndex (index) {
    const { count } = this.props;
    return (100 / (count - 1)) * Math.min(index, count - 1);
  }

  _mouseIndex (event) {
    const { active, count, vertical } = this.props;
    const { mouseDown, mouseDownIndex } = this.state;
    const rect = this.refs.range.getBoundingClientRect();
    const value = (vertical ? (event.clientY - rect.top) :
      (event.clientX - rect.left));
    let index = this._valueToIndex(value);

    // constrain index to keep it within range as needed
    if ('active' === mouseDown && mouseDownIndex >= 0) {
      if (index > mouseDownIndex) {
        // moving right/down
        index = Math.min(mouseDownIndex + count - 1 - active.end, index);
      } else if (index < mouseDownIndex) {
        // moving up/left
        index = Math.max(mouseDownIndex - active.start, index);
      }
    } else if ('start' === mouseDown) {
      index = Math.min(active.end, index);
    } else if ('end' === mouseDown) {
      index = Math.max(active.start, index);
    }

    return index;
  }

  _mouseDown (source) {
    return (event) => {
      event.stopPropagation(); // so start and end don't trigger range
      const index = this._mouseIndex(event);
      this.setState({
        mouseDown: source,
        mouseDownIndex: index
      });
      window.addEventListener('mouseup', this._onMouseUp);
    };
  }

  _onMouseUp (event) {
    window.removeEventListener('mouseup', this._onMouseUp);
    const { active, onActive } = this.props;
    const { mouseDown, mouseDownIndex, moved } = this.state;
    const mouseUpIndex = this._mouseIndex(event);

    this.setState({
      mouseDown: false,
      mouseDownIndex: undefined,
      mouseMoveIndex: undefined,
      moved: false
    });

    if (onActive) {
      let nextActive;

      if ('range' === mouseDown) {
        if (moved) {
          nextActive = {
            start: Math.min(mouseDownIndex, mouseUpIndex),
            end: Math.max(mouseDownIndex, mouseUpIndex)
          };
        }

      } else if ('active' === mouseDown) {
        const delta = mouseUpIndex - mouseDownIndex;
        nextActive = {
          start: active.start + delta,
          end: active.end + delta
        };

      } else if ('start' === mouseDown) {
        nextActive = {
          start: mouseUpIndex,
          end: active.end
        };

      } else if ('end' === mouseDown) {
        nextActive = {
          start: active.start,
          end: mouseUpIndex
        };
      }

      onActive(nextActive);
    }
  }

  _onMouseMove (event) {
    const { mouseMoveIndex } = this.state;
    const index = this._mouseIndex(event);
    if (index !== mouseMoveIndex) {
      this.setState({ mouseMoveIndex: index, moved: true });
    }
  }

  render () {
    const { active, count, onActive, vertical, ...otherProps } = this.props;
    const { mouseDown, mouseDownIndex, mouseMoveIndex } = this.state;

    let classes = [CLASS_ROOT];
    if (vertical) {
      classes.push(`${CLASS_ROOT}--vertical`);
    }
    if (mouseDown) {
      classes.push(`${CLASS_ROOT}--dragging`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let indicator;
    if (active || mouseDown) {

      let start, end;
      if ('range' === mouseDown) {
        start = Math.min(mouseDownIndex, mouseMoveIndex);
        end = Math.max(mouseDownIndex, mouseMoveIndex);
      } else if ('active' === mouseDown && mouseMoveIndex >= 0) {
        const delta = mouseMoveIndex - mouseDownIndex;
        start = active.start + delta;
        end = active.end + delta;
      } else if ('start' === mouseDown && mouseMoveIndex >= 0) {
        start = mouseMoveIndex;
        end = active.end;
      } else if ('end' === mouseDown && mouseMoveIndex >= 0) {
        start = active.start;
        end = mouseMoveIndex;
      } else {
        start = active.start;
        end = active.end;
      }
      // in case the user resizes the window
      start = Math.max(0, Math.min(count - 1, start));
      end = Math.max(0, Math.min(count - 1, end));

      let style;
      if (vertical) {
        style = {
          top: `${this._percentForIndex(start)}%`,
          height: `${this._percentForIndex(end - start)}%`
        };
      } else {
        style = {
          marginLeft: `${this._percentForIndex(start)}%`,
          width: `${this._percentForIndex(end - start)}%`
        };
      }

      indicator = (
        <div {...otherProps} className={`${CLASS_ROOT}__active`} style={style}
          onMouseDown={this._mouseDown('active')}>
          <div className={`${CLASS_ROOT}__active-start`}
            onMouseDown={onActive ? this._mouseDown('start') : undefined}>
            <DragIcon />
          </div>
          <div className={`${CLASS_ROOT}__active-end`}
            onMouseDown={onActive ? this._mouseDown('end') : undefined}>
            <DragIcon />
          </div>
        </div>
      );
    }

    let onMouseMove;
    if (onActive && mouseDown) {
      onMouseMove = this._onMouseMove;
    }

    return (
      <div ref="range" className={classes.join(' ')}
        style={{ padding: padding }}
        onMouseDown={onActive ? this._mouseDown('range') : undefined}
        onMouseMove={onMouseMove}>
        {indicator}
      </div>
    );
  }

};

Range.propTypes = {
  active: PropTypes.shape({
    end: PropTypes.number.isRequired,
    start: PropTypes.number.isRequired
  }),
  count: PropTypes.number.isRequired,
  onActive: PropTypes.func, // (start, end)
  vertical: PropTypes.bool
};
