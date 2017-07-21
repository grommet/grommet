// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Intl from '../../utils/Intl';
import CSSClassnames from '../../utils/CSSClassnames';
import KeyboardAccelerators from '../../utils/KeyboardAccelerators';
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
    this._onRangeMove = this._onRangeMove.bind(this);
    this._onDragFinish = this._onDragFinish.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);

    this.state = {
      mouseActive: false,
      focus: false
    };
  }

  _getRangePosition (event, source) {
    const { active, count, vertical } = this.props;
    const { dragStartIndex } = this.state;
    const rect = this._rangeRef.getBoundingClientRect();
    // handle touch events
    let position = event;
    if (event.changedTouches && event.changedTouches.length > 0) {
      position = event.changedTouches[0];
    }
    const value = (vertical ? (position.clientY - rect.top) :
      (position.clientX - rect.left));
    // convert value to index
    const total = vertical ? rect.height : rect.width;
    let index = Math.round((value / total) * (count - 1));

    // constrain index to keep it within range as needed
    if ('active' === source && dragStartIndex >= 0) {
      if (index > dragStartIndex) {
        // moving right/down
        index = Math.min(dragStartIndex + count - 1 - active.end, index);
      } else if (index < dragStartIndex) {
        // moving up/left
        index = Math.max(dragStartIndex - active.start, index);
      }
    } else if ('start' === source) {
      index = Math.min(active.end, index);
    } else if ('end' === source) {
      index = Math.max(active.start, index);
    }

    return index;
  }

  _onDragStart (source) {
    return (event) => {
      event.stopPropagation(); // so start and end don't trigger range
      const index = this._getRangePosition(event, source);
      this.setState({
        dragSource: source,
        dragStartIndex: index,
        mouseActive: true
      });
    };
  }

  _onDragFinish (event) {
    const { active, onActive, count } = this.props;
    const { dragSource, dragStartIndex, moved } = this.state;
    if (moved) {
      let dragEndIndex = this._getRangePosition(event, dragSource);

      if (dragEndIndex < 0) {
        dragEndIndex = 0;
      } else if (dragEndIndex > count) {
        dragEndIndex = count;
      }

      this.setState({
        dragSource: false,
        dragStartIndex: undefined,
        dragEndIndex: undefined,
        mouseActive: false,
        moved: false
      });

      if (onActive) {
        let nextActive;

        if ('range' === dragSource) {
          nextActive = {
            start: Math.min(dragStartIndex, dragEndIndex),
            end: Math.max(dragStartIndex, dragEndIndex)
          };
        } else if ('active' === dragSource) {
          const delta = dragEndIndex - dragStartIndex;
          nextActive = {
            start: active.start + delta,
            end: active.end + delta
          };

        } else if ('start' === dragSource) {
          nextActive = {
            start: Math.min(dragEndIndex, active.end),
            end: active.end
          };

        } else if ('end' === dragSource) {
          nextActive = {
            start: active.start,
            end: Math.max(dragEndIndex, active.start)
          };
        }

        onActive(nextActive);
      }
    }
  }

  _onRangeMove (event) {
    const { dragSource, dragEndIndex } = this.state;
    const index = this._getRangePosition(event, dragSource);
    if (index !== dragEndIndex) {
      this.setState({ dragEndIndex: index, moved: true });
    }
  }

  _onRangeReduce(source) {
    const { active, onActive } = this.props;
    if (onActive) {
      let nextActive;
      if ('start' === source) {
        nextActive = {
          start: Math.min(active.start - 1, active.end),
          end: active.end
        };
      } else {
        nextActive = {
          start: active.start,
          end: Math.max(active.end - 1, active.start)
        };
      }
      onActive(nextActive);
    }
  }

  _onRangeIncrease(source) {
    const { active, onActive } = this.props;
    if (onActive) {
      let nextActive;
      if ('start' === source) {
        nextActive = {
          start: Math.min(active.start + 1, active.end),
          end: active.end
        };
      } else {
        nextActive = {
          start: active.start,
          end: Math.max(active.end + 1, active.start)
        };
      }
      onActive(nextActive);
    }
  }

  _onFocus (source) {
    return (event) => {
      const { onFocus } = this.props;
      const { mouseActive } = this.state;
      if (mouseActive === false) {
        this.setState({ focus: true });
      }
      this._keyboardHandlers = {
        left: this._onRangeReduce.bind(this, source),
        up: this._onRangeReduce.bind(this, source),
        right: this._onRangeIncrease.bind(this, source),
        down: this._onRangeIncrease.bind(this, source)
      };
      KeyboardAccelerators.startListeningToKeyboard(
        this, this._keyboardHandlers
      );
      if (onFocus) {
        onFocus(event);
      }
    };
  }

  _onBlur (event) {
    const { onBlur } = this.props;
    KeyboardAccelerators.stopListeningToKeyboard(
      this, this._keyboardHandlers
    );
    this.setState({ focus: false });
    if (onBlur) {
      onBlur(event);
    }
  }

  render () {
    const {
      active, className, count, onActive, vertical, ...props
    } = this.props;
    const {
      focus, dragSource, dragStartIndex, dragEndIndex
    } = this.state;
    const { intl } = this.context;

    const classes = classnames(
      CLASS_ROOT, {
        [`${CLASS_ROOT}--vertical`]: vertical,
        [`${CLASS_ROOT}--dragging`]: dragSource
      },
      className
    );

    let layers;
    if (active || dragSource) {

      let start, end;
      if ('range' === dragSource) {
        start = Math.min(dragStartIndex, dragEndIndex);
        end = Math.max(dragStartIndex, dragEndIndex);
      } else if ('active' === dragSource && dragEndIndex >= 0) {
        const delta = dragEndIndex - dragStartIndex;
        start = active.start + delta;
        end = active.end + delta;
      } else if ('start' === dragSource && dragEndIndex >= 0) {
        start = Math.min(dragEndIndex, active.end);
        end = active.end;
      } else if ('end' === dragSource && dragEndIndex >= 0) {
        start = active.start;
        end = Math.max(dragEndIndex, active.start);
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
      if (focus && this.rangeStartRef.contains(document.activeElement)) {
        startClasses.push(`${CLASS_ROOT}__start--focus`);
      }
      if (beforePercent < 5) {
        startClasses.push(`${CLASS_ROOT}__start--edge`);
      }
      const beforeClasses = [`${CLASS_ROOT}__before`];
      if (beforePercent > 95) {
        beforeClasses.push(`${CLASS_ROOT}__before--end`);
      }
      const endClasses = [`${CLASS_ROOT}__end`];
      if (focus && this.rangeEndRef.contains(document.activeElement)) {
        endClasses.push(`${CLASS_ROOT}__end--focus`);
      }
      if (afterPercent < 5) {
        endClasses.push(`${CLASS_ROOT}__end--edge`);
      }

      const navigationHelp = Intl.getMessage(intl, 'Navigation Help');
      const rangeStartMessage = Intl.getMessage(intl, 'Range Start');
      const rangeEndMessage = Intl.getMessage(intl, 'Range End');

      layers = [
        <div key='before' className={beforeClasses.join(' ')}
          style={{ flexBasis: beforeBasis }}>
          <div 
            ref={ref => this.rangeStartRef = ref}
            className={startClasses.join(' ')}
            tabIndex='0'
            role='slider'
            aria-label={`${rangeStartMessage} (${navigationHelp})`}
            aria-valuemin='0'
            aria-valuemax={count}
            aria-valuenow={start}
            aria-orientation={vertical ? 'vertical' : 'horizontal'}
            onMouseDown={this._onDragStart('start')}
            onTouchStart={this._onDragStart('start')}
            onMouseUp={this._onDragFinish}
            onTouchEnd={this._onDragFinish}
            onFocus={this._onFocus('start')}
            onBlur={this._onBlur}>
            <DragIcon />
          </div>
        </div>,
        <div key='active' {...props} className={`${CLASS_ROOT}__active`}
          onMouseDown={this._onDragStart('active')}
          onTouchStart={this._onDragStart('active')}
          onMouseUp={this._onDragFinish}
          onTouchEnd={this._onDragFinish} />,
        <div key='after' className={`${CLASS_ROOT}__after`}
          style={{ flexBasis: afterBasis }}>
          <div
            ref={ref => this.rangeEndRef = ref}
            className={endClasses.join(' ')}
            tabIndex='0'
            aria-label={`${rangeEndMessage} (${navigationHelp})`}
            aria-valuemin='0'
            aria-valuemax={count}
            aria-valuenow={end}
            aria-orientation={vertical ? 'vertical' : 'horizontal'}
            role='slider'
            onMouseDown={this._onDragStart('end')}
            onTouchStart={this._onDragStart('end')}
            onMouseUp={this._onDragFinish}
            onTouchEnd={this._onDragFinish}
            onFocus={this._onFocus('end')}
            onBlur={this._onBlur}>
            <DragIcon />
          </div>
        </div>
      ];
    }

    let onRangeMove;
    if (onActive && dragSource) {
      onRangeMove = this._onRangeMove;
    }

    return (
      <div ref={ref => this._rangeRef = ref} className={classes}
        onMouseMove={onRangeMove}
        onTouchMove={onRangeMove}
        onMouseDown={this._onDragStart('range')}
        onTouchStart={this._onDragStart('range')}
        onMouseUp={this._onDragFinish}
        onTouchEnd={this._onDragFinish}>
        {layers}
      </div>
    );
  }

}

Range.propTypes = {
  active: PropTypes.shape({
    end: PropTypes.number.isRequired,
    start: PropTypes.number.isRequired
  }),
  count: PropTypes.number.isRequired,
  onActive: PropTypes.func, // (start, end)
  vertical: PropTypes.bool
};

Range.contextTypes = {
  intl: PropTypes.object
};
