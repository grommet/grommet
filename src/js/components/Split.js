// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes, Children } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import Box from './Box';

const CLASS_ROOT = CSSClassnames.SPLIT;
const BREAK_WIDTH = 720; //adds the breakpoint of single/multiple split

export default class Split extends Component {

  constructor(props, context) {
    super(props, context);

    this._onResize = this._onResize.bind(this);
    this._layout = this._layout.bind(this);

    this.state = { responsive: undefined };
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
    if (this._nonNullChildCount(nextProps) !==
      this._nonNullChildCount(this.props)) {
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
    let result = 0;
    React.Children.forEach(props.children, function (child) {
      if (child) result += 1;
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
    const splitElement = this.splitRef;
    if (splitElement) {
      if (splitElement.offsetWidth < BREAK_WIDTH &&
        this.props.showOnResponsive === 'priority') {
        this._setResponsive('single');
      } else {
        this._setResponsive('multiple');
      }
    }
  }

  render () {
    const {
      children, className, fixed, priority, separator
    } = this.props;
    let { flex } = this.props;
    const { responsive } = this.state;
    const classes = classnames(
      CLASS_ROOT,
      className, {
        [`${CLASS_ROOT}--flex-${this.props.flex}`]: flex,
        [`${CLASS_ROOT}--fixed`]: fixed,
        [`${CLASS_ROOT}--separator`]: separator
      }
    );

    let elements = Children.toArray(children).filter(
      (element) => element
    );

    elements = elements.map((element, index) => {
      let hasFlex = true;
      let className = '';
      // When we only have room to show one child, hide the appropriate one
      if ('single' === responsive &&
        (('left' === priority && index > 0) ||
        ('right' === priority && index === 0 &&
          elements.length > 1))) {
        className += `${CLASS_ROOT}--hidden`;
        flex = 'both';
      } else if (elements.length > 1 && ((flex === 'right' && index === 0) ||
        (flex === 'left' && index === elements.length - 1))) {
        hasFlex = false;
      } else {
        className = `${CLASS_ROOT}--full`;
      }
      return (
        <Box key={`element_${index}`} className={className} flex={hasFlex}>
          {element}
        </Box>
      );
    });

    return (
      <div ref={ref => this.splitRef = ref} className={classes}>
        {elements}
      </div>
    );
  }
}

Split.propTypes = {
  fixed: PropTypes.bool,
  flex: PropTypes.oneOf(['left', 'right', 'both']),
  onResponsive: PropTypes.func,
  priority: PropTypes.oneOf(['left', 'right']),
  separator: PropTypes.bool,
  showOnResponsive: PropTypes.oneOf(['priority', 'both'])
};

Split.defaultProps = {
  fixed: true,
  flex: 'both',
  priority: 'right',
  showOnResponsive: 'priority'
};
