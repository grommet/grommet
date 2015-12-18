// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

const CLASS_ROOT = "split";

class Split extends Component {

  constructor () {
    super();

    this._onResize = this._onResize.bind(this);
    this._layout = this._layout.bind(this);

    this.state = { responsive: null };
  }

  componentDidMount () {
    // figure out the break width
    this._breakWidth = 720; // default
    // CSS stores the break width in a hidden pseudo element
    var splitElement = this.refs.split;
    var after = window.getComputedStyle(splitElement, ':after');
    if (after) {
      this._breakWidth = parseInt(after.getPropertyValue('width'), 10);
    }

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
      if (splitElement.offsetWidth < this._breakWidth) {
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

    var children;
    if ('single' === this.state.responsive) {
      if ('left' === this.props.priority) {
        children = React.Children.toArray(this.props.children)[0];
      } else {
        children = React.Children.toArray(this.props.children).pop();
      }
    } else {
      children = this.props.children;
    }

    return (
      <div ref="split" className={classes.join(' ')}>
        {children}
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

module.exports = Split;
