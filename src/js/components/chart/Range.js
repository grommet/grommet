// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../../utils/CSSClassnames';
import DragIcon from '../icons/base/Drag';
import { padding } from './utils';

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
    const { mouseDownSource } = this.state;
    if (mouseDownSource) {
      window.removeEventListener('mouseup', this._onMouseUp);
    }
  }

  _mouseIndex (event, source) {
    const { active, count, vertical } = this.props;
    const { mouseDownIndex } = this.state;
    const rect = this._rangeRef.getBoundingClientRect();
    const value = (vertical ? (event.clientY - rect.top) :
      (event.clientX - rect.left));
    // convert value to index
    const total = vertical ? rect.height : rect.width;
    let index = Math.round((value / total) * (count - 1));

    // constrain index to keep it within range as needed
    if ('active' === source && mouseDownIndex >= 0) {
      if (index > mouseDownIndex) {
        // moving right/down
        index = Math.min(mouseDownIndex + count - 1 - active.end, index);
      } else if (index < mouseDownIndex) {
        // moving up/left
        index = Math.max(mouseDownIndex - active.start, index);
      }
    } else if ('start' === source) {
      index = Math.min(active.end, index);
    } else if ('end' === source) {
      index = Math.max(active.start, index);
    }

    return index;
  }

  _mouseDown (source) {
    return (event) => {
      event.stopPropagation(); // so start and end don't trigger range
      const index = this._mouseIndex(event, source);
      this.setState({
        mouseDownSource: source,
        mouseDownIndex: index
      });
      window.addEventListener('mouseup', this._onMouseUp);
    };
  }

  _onMouseUp (event) {
    window.removeEventListener('mouseup', this._onMouseUp);
    const { active, onActive, count } = this.props;
    const { mouseDownSource, mouseDownIndex, moved } = this.state;
    let mouseUpIndex = this._mouseIndex(event, mouseDownSource);

    if (mouseUpIndex < 0) {
      mouseUpIndex = 0;
    } else if (mouseUpIndex > count) {
      mouseUpIndex = count;
    }

    this.setState({
      mouseDownSource: false,
      mouseDownIndex: undefined,
      mouseMoveIndex: undefined,
      moved: false
    });

    if (onActive) {
      let nextActive;

      if ('range' === mouseDownSource) {
        if (moved) {
          nextActive = {
            start: Math.min(mouseDownIndex, mouseUpIndex),
            end: Math.max(mouseDownIndex, mouseUpIndex)
          };
        }

      } else if ('active' === mouseDownSource) {
        const delta = mouseUpIndex - mouseDownIndex;
        nextActive = {
          start: active.start + delta,
          end: active.end + delta
        };

      } else if ('start' === mouseDownSource) {
        nextActive = {
          start: Math.min(mouseUpIndex, active.end),
          end: active.end
        };

      } else if ('end' === mouseDownSource) {
        nextActive = {
          start: active.start,
          end: Math.max(mouseUpIndex, active.start)
        };
      }

      onActive(nextActive);
    }
  }

  _onMouseMove (event) {
    const { mouseDownSource, mouseMoveIndex } = this.state;
    const index = this._mouseIndex(event, mouseDownSource);
    if (index !== mouseMoveIndex) {
      this.setState({ mouseMoveIndex: index, moved: true });
    }
  }

  render () {
    const {
      active, className, count, onActive, vertical, ...props
    } = this.props;
    const { mouseDownSource, mouseDownIndex, mouseMoveIndex } = this.state;

    const classes = classnames(
      CLASS_ROOT, {
        [`${CLASS_ROOT}--vertical`]: vertical,
        [`${CLASS_ROOT}--dragging`]: mouseDownSource
      },
      className
    );

    let layers;
    if (active || mouseDownSource) {

      let start, end;
      if ('range' === mouseDownSource) {
        start = Math.min(mouseDownIndex, mouseMoveIndex);
        end = Math.max(mouseDownIndex, mouseMoveIndex);
      } else if ('active' === mouseDownSource && mouseMoveIndex >= 0) {
        const delta = mouseMoveIndex - mouseDownIndex;
        start = active.start + delta;
        end = active.end + delta;
      } else if ('start' === mouseDownSource && mouseMoveIndex >= 0) {
        start = Math.min(mouseMoveIndex, active.end);
        end = active.end;
      } else if ('end' === mouseDownSource && mouseMoveIndex >= 0) {
        start = active.start;
        end = Math.max(mouseMoveIndex, active.start);
      } else {
        start = active.start;
        end = active.end;
      }
      // in case the user resizes the window
      start = Math.max(0, Math.min(count - 1, start));
      end = Math.max(0, Math.min(count - 1, end));
      // calculate flex basis
      const beforePercent =
        Math.max(0, (100 / (count - 1)) * Math.min(start, count - 1));
      const beforeOffset = beforePercent * (padding * 2) / 100;
      const beforeBasis = `calc(${beforePercent}% - ${beforeOffset}px)`;
      const afterPercent =
        Math.min(100, (100 / (count - 1)) * Math.max(count - 1 - end, 0));
      const afterOffset = afterPercent * (padding * 2) / 100;
      const afterBasis = `calc(${afterPercent}% - ${afterOffset}px)`;

      // We need a class when on the edge so we can keep the control visible.
      const startClasses = [`${CLASS_ROOT}__start`];
      if (beforePercent < 5) {
        startClasses.push(`${CLASS_ROOT}__start--edge`);
      }
      const beforeClasses = [`${CLASS_ROOT}__before`];
      if (beforePercent > 95) {
        beforeClasses.push(`${CLASS_ROOT}__before--end`);
      }
      const endClasses = [`${CLASS_ROOT}__end`];
      if (afterPercent < 5) {
        endClasses.push(`${CLASS_ROOT}__end--edge`);
      }

      layers = [
        <div key='before' className={beforeClasses.join(' ')}
          style={{ flexBasis: beforeBasis }}>
          <div className={startClasses.join(' ')}
            onMouseDown={onActive ? this._mouseDown('start') : undefined}>
            <DragIcon />
          </div>
        </div>,
        <div key='active' {...props} className={`${CLASS_ROOT}__active`}
          onMouseDown={this._mouseDown('active')} />,
        <div key='after' className={`${CLASS_ROOT}__after`}
          style={{ flexBasis: afterBasis }}>
          <div className={endClasses.join(' ')}
            onMouseDown={onActive ? this._mouseDown('end') : undefined}>
            <DragIcon />
          </div>
        </div>
      ];
    }

    let onMouseMove;
    if (onActive && mouseDownSource) {
      onMouseMove = this._onMouseMove;
    }

    return (
      <div ref={ref => this._rangeRef = ref} className={classes}
        onMouseMove={onMouseMove}
        onMouseDown={onActive ? this._mouseDown('range') : undefined}>
        {layers}
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
