import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import FocusedContainer from '../FocusedContainer';
import { findScrollParents, findVisibleParent } from '../../utils';
import { Keyboard } from '../Keyboard';

import StyledDrop from './StyledDrop';

class DropContainer extends Component {
  static defaultProps = {
    centered: true,
  }

  componentDidMount() {
    const { restrictFocus } = this.props;
    this.addScrollListener();
    window.addEventListener('resize', this.onResize);
    document.addEventListener('click', this.onClickDocument);

    this.place();

    if (restrictFocus) {
      findDOMNode(this.dropRef).focus();
    }
  }

  componentWillUnmount() {
    this.removeScrollListener();
    window.removeEventListener('resize', this.onResize);
    document.removeEventListener('click', this.onClickDocument);
  }

  addScrollListener = () => {
    const { dropTarget } = this.props;
    this.scrollParents = findScrollParents(findDOMNode(dropTarget));
    this.scrollParents.forEach(scrollParent => scrollParent.addEventListener('scroll', this.place));
  }

  removeScrollListener = () => {
    this.scrollParents.forEach(
      scrollParent => scrollParent.removeEventListener('scroll', this.place)
    );
  }

  onClickDocument = (event) => {
    const { onClickOutside } = this.props;
    if (!findDOMNode(this.dropRef).contains(event.target)) {
      if (onClickOutside) {
        onClickOutside();
      }
    }
  }

  onResize = () => {
    this.removeScrollListener();
    this.addScrollListener();
    this.place();
  }

  place = () => {
    const { align, dropTarget, responsive } = this.props;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const target = findDOMNode(dropTarget);
    const container = findDOMNode(this.dropRef);
    if (container && target) {
      // clear prior styling
      container.style.left = '';
      container.style.width = '';
      container.style.top = '';
      container.style.maxHeight = '';

      // get bounds
      const targetRect = findVisibleParent(target).getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // determine width
      const width = Math.min(
        Math.max(targetRect.width, containerRect.width),
        windowWidth
      );

      // set left position
      let left;
      if (align.left) {
        if (align.left === 'left') {
          left = targetRect.left;
        } else if (align.left === 'right') {
          left = targetRect.left - width;
        }
      } else if (align.right) {
        if (align.right === 'left') {
          left = targetRect.left - width;
        } else if (align.right === 'right') {
          left = (targetRect.left + targetRect.width) - width;
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
          top = targetRect.top;
          maxHeight = Math.min(windowHeight - targetRect.top, windowHeight);
        } else {
          top = targetRect.bottom;
          maxHeight = Math.min(
            windowHeight - targetRect.bottom,
            windowHeight - targetRect.height
          );
        }
      } else if (align.bottom) {
        if (align.bottom === 'bottom') {
          top = targetRect.bottom - containerRect.height;
          maxHeight = Math.max(targetRect.bottom, 0);
        } else {
          top = targetRect.top - containerRect.height;
          maxHeight = Math.max(targetRect.top, 0);
        }
      }

      // if we can't fit it all, see if there's more room the other direction
      if (containerRect.height > maxHeight) {
        // We need more room than we have.
        if (align.top && top > (windowHeight / 2)) {
          // We put it below, but there's more room above, put it above
          if (align.top === 'bottom') {
            if (responsive) {
              top = Math.max(targetRect.top - containerRect.height, 0);
            }
            maxHeight = targetRect.top;
          } else {
            if (responsive) {
              top = Math.max(targetRect.bottom - containerRect.height, 0);
            }
            maxHeight = targetRect.bottom;
          }
        } else if (align.bottom && maxHeight < (windowHeight / 2)) {
          // We put it above but there's more room below, put it below
          if (align.bottom === 'bottom') {
            if (responsive) {
              top = targetRect.top;
            }
            maxHeight = Math.min(windowHeight - top, windowHeight);
          } else {
            if (responsive) {
              top = targetRect.bottom;
            }
            maxHeight = Math.min(
              windowHeight - top,
              windowHeight - targetRect.height
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
      container.style.maxHeight = `${windowHeight - (top || 0)}px`;
    }
  }

  render() {
    const {
      children,
      onClickOutside,
      onEsc,
      onKeyDown,
      theme,
      ...rest
    } = this.props;

    return (
      <FocusedContainer>
        <Keyboard onEsc={onEsc} onKeyDown={onKeyDown}>
          <StyledDrop
            tabIndex='-1'
            ref={(ref) => {
              this.dropRef = ref;
            }}
            theme={theme}
            {...rest}
          >
            {children}
          </StyledDrop>
        </Keyboard>
      </FocusedContainer>
    );
  }
}

export default DropContainer;
