// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { findDOMNode, render, unmountComponentAtNode } from 'react-dom';
import { findScrollParents } from './DOM';

import { baseStyle } from './styles';

/*
 * Drop is a utility for rendering components like drop down menus layered above
 * their initiating controls.
 */

const VERTICAL_ALIGN_OPTIONS = ['top', 'bottom'];
const HORIZONTAL_ALIGN_OPTIONS = ['right', 'left'];

const DropContainer = styled.div`
  ${baseStyle}

  position: fixed;
  z-index: 20;
  border-radius: ${props => props.theme.global.drop.border.radius};
  overflow: auto;
  background-color: ${props => (
    props.background ? (
      props.theme.global.colors[props.background]
    ) : (
      props.theme.global.drop.backgroundColor
    )
  )};
`;

const normalizeOptions = (options) => {
  let opts = { ...options };
  // normalize for older interface that just had align content
  if (options.top || options.bottom || options.left || options.right) {
    opts = { align: { ...options } };
  }
  // validate align
  if (options && options.align && options.align.top &&
    VERTICAL_ALIGN_OPTIONS.indexOf(options.align.top) === -1) {
    console.warn(`Warning: Invalid align.top value '${options.align.top}'
      supplied to Drop,
      expected one of [${VERTICAL_ALIGN_OPTIONS.join(',')}]`);
  }
  if (options.align && options.align.bottom &&
    VERTICAL_ALIGN_OPTIONS.indexOf(options.align.bottom) === -1) {
    console.warn(`Warning: Invalid align.bottom value '${options.align.bottom}'
      supplied to Drop,
      expected one of [${VERTICAL_ALIGN_OPTIONS.join(',')}]`);
  }
  if (options.align && options.align.left &&
    HORIZONTAL_ALIGN_OPTIONS.indexOf(options.align.left) === -1) {
    console.warn(`Warning: Invalid align.left value '${options.align.left}'
      supplied to Drop,
      expected one of [${HORIZONTAL_ALIGN_OPTIONS.join(',')}]`);
  }
  if (options.align && options.align.right &&
    HORIZONTAL_ALIGN_OPTIONS.indexOf(options.align.right) === -1) {
    console.warn(`Warning: Invalid align.right value '${options.align.right}'
      supplied to Drop,
      expected one of [${HORIZONTAL_ALIGN_OPTIONS.join(',')}]`);
  }
  opts.align = { ...opts.align } || {};
  if (!options.align.top && !options.align.bottom) {
    opts.align.top = 'top';
  }
  if (!options.align.left && !options.align.right) {
    opts.align.left = 'left';
  }
  opts.responsive = options.responsive !== false ? true : options.responsive;
  return opts;
};

// Drop options:
//
// align: See dropAlignPropType
// className: PropTypes.string
// background: PropTypes.string
//    Background color
// context: PropTypes.object
//    React context to pass through
// focusControl: PropTypes.bool
//    Whether to focus inside the dropped content when added
// responsive: PropTypes.bool
//    Whether to dynamically re-place when resized
//

export default class Drop {
  constructor(control, content, opts) {
    const options = normalizeOptions(opts);
    const { focusControl } = options;

    // bind functions to instance
    this.render = this.render.bind(this);
    this.remove = this.remove.bind(this);
    this.place = this.place.bind(this);
    this.onResize = this.onResize.bind(this);
    this.control = control;

    // setup DOM
    const container = document.createElement('div');
    // prepend in body to avoid browser scroll issues
    document.body.insertBefore(container, document.body.firstChild);

    render(
      <DropContainer
        ref={(ref) => {
          this.dropContainerRef = ref;
        }}
        theme={options.theme}
        background={options.background}
      >
        {content}
      </DropContainer>,
      container
    );

    const scrollParents = findScrollParents(control);

    // initialize state
    this.state = {
      container,
      control,
      initialFocusNeeded: focusControl,
      options,
      scrollParents,
    };

    this.listen();

    // position content
    this.place();
  }

  listen() {
    const { scrollParents } = this.state;
    scrollParents.forEach(scrollParent => scrollParent.addEventListener('scroll', this.place));
    // we intentionally skipped debounce as we believe resizing
    // will not be a common action. Also the UI looks better if the Drop
    // doesn’t lag to align with the control component.
    window.addEventListener('resize', this.onResize);
  }

  onResize() {
    const { scrollParents } = this.state;
    // we need to update scroll parents as Responsive options may change
    // the parent for the target element
    scrollParents.forEach(scrollParent => scrollParent.removeEventListener('scroll', this.place));

    const nextScrollParents = findScrollParents(this.control);

    nextScrollParents.forEach(scrollParent => scrollParent.addEventListener('scroll', this.place));

    this.state.scrollParents = nextScrollParents;

    this.place();
  }

  place() {
    const {
      control, options: { align, responsive },
    } = this.state;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const container = findDOMNode(this.dropContainerRef);
    // clear prior styling
    container.style.left = '';
    container.style.width = '';
    container.style.top = '';
    container.style.maxHeight = '';

    // get bounds
    const controlRect = control.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // determine width
    const width = Math.min(
      Math.max(controlRect.width, containerRect.width),
      windowWidth
    );

    // set left position
    let left;
    if (align.left) {
      if (align.left === 'left') {
        left = controlRect.left;
      } else if (align.left === 'right') {
        left = controlRect.left - width;
      }
    } else if (align.right) {
      if (align.right === 'left') {
        left = controlRect.left - width;
      } else if (align.right === 'right') {
        left = (controlRect.left + controlRect.width) - width;
      }
    }

    if ((left + width) > windowWidth) {
      left -= ((left + width) - windowWidth);
    } else if (left < 0) {
      left = 0;
    }

    // set top position
    let top;
    let maxHeight;
    if (align.top) {
      if (align.top === 'top') {
        top = controlRect.top;
        maxHeight = Math.min(windowHeight - controlRect.top, windowHeight);
      } else {
        top = controlRect.bottom;
        maxHeight = Math.min(
          windowHeight - controlRect.bottom,
          windowHeight - controlRect.height
        );
      }
    } else if (align.bottom) {
      if (align.bottom === 'bottom') {
        top = controlRect.bottom - containerRect.height;
        maxHeight = Math.max(controlRect.bottom, 0);
      } else {
        top = controlRect.top - containerRect.height;
        maxHeight = Math.max(controlRect.top, 0);
      }
    }

    // if we can't fit it all, see if there's more room the other direction
    if (containerRect.height > maxHeight) {
      // We need more room than we have.
      if (align.top && top > (windowHeight / 2)) {
        // We put it below, but there's more room above, put it above
        if (align.top === 'bottom') {
          if (responsive) {
            top = Math.max(controlRect.top - containerRect.height, 0);
          }
          maxHeight = controlRect.top;
        } else {
          if (responsive) {
            top = Math.max(controlRect.bottom - containerRect.height, 0);
          }
          maxHeight = controlRect.bottom;
        }
      } else if (align.bottom && maxHeight < (windowHeight / 2)) {
        // We put it above but there's more room below, put it below
        if (align.bottom === 'bottom') {
          if (responsive) {
            top = controlRect.top;
          }
          maxHeight = Math.min(windowHeight - top, windowHeight);
        } else {
          if (responsive) {
            top = controlRect.bottom;
          }
          maxHeight = Math.min(
            windowHeight - top,
            windowHeight - controlRect.height
          );
        }
      }
    }

    container.style.left = `${left}px`;
    // offset width by 0.1 to avoid a bug in ie11 that 
    // unnecessarily wraps the text if width is the same
    container.style.width = `${width + 0.1}px`;
    // the (position:absolute + scrollTop) 
    // is presenting issues with desktop scroll flickering
    container.style.top = `${top}px`;
    container.style.maxHeight = `${windowHeight - (top)}px`;

    // if (initialFocusNeeded) {
    //   // Now that we've placed it, focus on it
    //   this.focus();
    // }
  }

  // focus() {
  //   const { container } = this.state;
  //   this.state.originalFocusedElement = document.activeElement;
  //   if (!container.contains(document.activeElement)) {
  //     const anchor = container.querySelector(`${CLASS_ROOT}__anchor`);
  //     if (anchor) {
  //       anchor.focus();
  //       anchor.scrollIntoView();
  //     }
  //   }
  //   delete this.state.initialFocusNeeded;
  // }

  render(content) {
    const { container, options: { background, theme } } = this.state;
    // const originalScrollPosition = container.scrollTop;
    // TODO: handle focus control better
    render(
      <DropContainer
        ref={(ref) => {
          this.dropContainerRef = ref;
        }}
        theme={theme}
        background={background}
      >
        {content}
      </DropContainer>,
      container,
      () => {
        // this.place();
        // // reset container to its original scroll position
        // container.scrollTop = originalScrollPosition;
      }
    );
  }

  remove() {
    const { container, originalFocusedElement, scrollParents } = this.state;
    scrollParents.forEach(scrollParent => scrollParent.removeEventListener('scroll', this.place));
    window.removeEventListener('resize', this.onResize);

    // need because of this
    // https://github.com/facebook/react/issues/6232
    setTimeout(() => {
      unmountComponentAtNode(container);
      document.body.removeChild(container);
    }, 0);

    if (originalFocusedElement) {
      originalFocusedElement.focus();
    }

    this.state = undefined;
  }
}

// How callers can validate a property for drop alignment which will be
// passed to add().
export const dropAlignPropType = PropTypes.shape({
  top: PropTypes.oneOf(VERTICAL_ALIGN_OPTIONS),
  bottom: PropTypes.oneOf(VERTICAL_ALIGN_OPTIONS),
  left: PropTypes.oneOf(HORIZONTAL_ALIGN_OPTIONS),
  right: PropTypes.oneOf(HORIZONTAL_ALIGN_OPTIONS),
});
