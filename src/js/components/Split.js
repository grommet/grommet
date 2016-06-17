// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

const CLASS_ROOT = "split";
const BREAK_WIDTH = 720; //adds the breakpoint of single/multiple split

export default class Split extends Component {

  constructor () {
    super();

    this._onResize = this._onResize.bind(this);
    this._layout = this._layout.bind(this);

    this.state = { responsive: null };
  }

  componentDidMount () {
    window.addEventListener('resize', this._onResize);
    this._layout();
  }

  componentWillReceiveProps (nextProps) {
    // If we change the number of visible children, trigger a resize event
    // so things like Table header can adjust. This will go away once
    // CSS supports per element media queries.
    // The 500ms delay is loosely tied to the CSS animation duration.
    // We want any animations to finish before triggering the resize.
    // TODO: consider using an animation end event instead of a timer.
    if (this._nonNullChildCount(nextProps) !== this._nonNullChildCount(this.props)) {
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(function () {
        var event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
      }, 500);
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._onResize);
  }

  // Support function for componentWillReceiveProps()
  _nonNullChildCount (props) {
    var result = 0;
    React.Children.forEach(props.children, function (child) {
      if (child !== null) result += 1;
    });
    return result;
  }

  _onResize () {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  }

  _setResponsive (responsive) {
    if (this.state.responsive !== responsive) {
      this.setState({responsive: responsive});
      if (this.props.onResponsive) {
        this.props.onResponsive(responsive);
      }
    }
  }

  _layout () {
    var splitElement = this.refs.split;
    if (splitElement) {
      if (splitElement.offsetWidth < BREAK_WIDTH) {
        this._setResponsive('single');
      } else {
        this._setResponsive('multiple');
      }
    }
  }

  render () {
    var classes = [CLASS_ROOT];
    if (this.props.flex) {
      classes.push(CLASS_ROOT + "--flex-" + this.props.flex);
    }
    if (this.props.fixed) {
      classes.push(CLASS_ROOT + "--fixed");
    }
    if (this.props.separator) {
      classes.push(CLASS_ROOT + "--separator");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let children = React.Children.toArray(this.props.children);
    return (
      <div ref="split" className={classes.join(' ')}>
        {children.map((Component, idx) => {
          let hidden = false;
          if ('single' === this.state.responsive) {
            if ('left' === this.props.priority) {
              if (idx !== 0) {
                hidden = true;
              }
            } else {
              // Hide if idx is pointing to the first child
              // and if we've got more than 1 child
              if (idx === 0 && children.length > 1) {
                hidden = true;
              }
            }
          }

          if (hidden) {
            return <span key={idx} style={{display: 'none'}}>{Component}</span>;
          }
          return <span key={idx}>{Component}</span>;
        })}
      </div>
    );
  }
}

Split.propTypes = {
  fixed: PropTypes.bool,
  flex: PropTypes.oneOf(['left', 'right', 'both']),
  priority: PropTypes.oneOf(['left', 'right']),
  separator: PropTypes.bool
};

Split.defaultProps = {
  fixed: true,
  flex: 'both',
  priority: 'right'
};
