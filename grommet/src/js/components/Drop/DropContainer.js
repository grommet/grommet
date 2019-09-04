import React, { Component } from 'react';

import { defaultProps } from '../../default-props';
import { ThemeContext } from '../../contexts';
import { FocusedContainer } from '../FocusedContainer';
import {
  backgroundIsDark,
  findScrollParents,
  findVisibleParent,
  parseMetricToNum,
} from '../../utils';
import { Box } from '../Box';
import { Keyboard } from '../Keyboard';

import { StyledDrop } from './StyledDrop';

// using react synthetic event to be able to stop propagation that
// would otherwise close the layer on ESC.
const preventLayerClose = event => {
  const key = event.keyCode ? event.keyCode : event.which;

  if (key === 27) {
    event.stopPropagation();
  }
};

class DropContainer extends Component {
  static contextType = ThemeContext;

  static defaultProps = {
    align: {
      top: 'top',
      left: 'left',
    },
    overflow: 'auto',
    stretch: 'width',
  };

  dropRef = React.createRef();

  componentDidMount() {
    const { restrictFocus } = this.props;
    this.addScrollListener();
    window.addEventListener('resize', this.onResize);
    document.addEventListener('mousedown', this.onClickDocument);

    this.place(false);

    if (restrictFocus) {
      this.dropRef.current.focus();
    }
  }

  componentDidUpdate() {
    this.place(true);
  }

  componentWillUnmount() {
    this.removeScrollListener();
    window.removeEventListener('resize', this.onResize);
    document.removeEventListener('mousedown', this.onClickDocument);
  }

  addScrollListener = () => {
    const { dropTarget } = this.props;
    this.scrollParents = findScrollParents(dropTarget);
    this.scrollParents.forEach(scrollParent =>
      scrollParent.addEventListener('scroll', this.place),
    );
  };

  removeScrollListener = () => {
    this.scrollParents.forEach(scrollParent =>
      scrollParent.removeEventListener('scroll', this.place),
    );
  };

  onClickDocument = event => {
    const { dropTarget, onClickOutside } = this.props;
    const dropTargetNode = dropTarget;
    const dropNode = this.dropRef.current;
    if (
      onClickOutside &&
      dropNode && // need this for ie11
      !dropTargetNode.contains(event.target) &&
      !dropNode.contains(event.target)
    ) {
      onClickOutside();
    }
  };

  onResize = () => {
    this.removeScrollListener();
    this.addScrollListener();
    this.place(false);
  };

  // We try to preserve the maxHeight as changing it causes any scroll position
  // to be lost. We set the maxHeight on mount and if the window is resized.
  place = preserveHeight => {
    const { align, dropTarget, responsive, stretch, theme } = this.props;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const target = dropTarget;
    const container = this.dropRef.current;
    if (container && target) {
      // clear prior styling
      container.style.left = '';
      container.style.top = '';
      container.style.bottom = '';
      container.style.width = '';
      if (!preserveHeight) {
        container.style.maxHeight = '';
      }
      // get bounds
      const targetRect = findVisibleParent(target).getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      // determine width
      const width = Math.min(
        stretch
          ? Math.max(targetRect.width, containerRect.width)
          : containerRect.width,
        windowWidth,
      );
      // set left position
      let left;
      if (align.left) {
        if (align.left === 'left') {
          ({ left } = targetRect);
        } else if (align.left === 'right') {
          left = targetRect.left + targetRect.width;
        }
      } else if (align.right) {
        if (align.right === 'left') {
          left = targetRect.left - width;
        } else if (align.right === 'right') {
          left = targetRect.left + targetRect.width - width;
        }
      } else {
        left = targetRect.left + targetRect.width / 2 - width / 2;
      }
      if (left + width > windowWidth) {
        left -= left + width - windowWidth;
      } else if (left < 0) {
        left = 0;
      }
      // set top or bottom position
      let top;
      let bottom;
      let maxHeight = containerRect.height;
      if (align.top) {
        if (align.top === 'top') {
          ({ top } = targetRect);
        } else {
          top = targetRect.bottom;
        }

        // Calculate visible area underneath the control w.r.t window height
        const percentVisibleAreaBelow =
          100 - (targetRect.bottom / windowHeight) * 100;

        // Check whether it is within 20% from bottom of the window or visible area to flip the control
        // DropContainer doesn't fit well within visible area when percentVisibleAreaBelow value<=20%
        // There is enough space from DropContainer to bottom of the window when percentVisibleAreaBelow>20%.

        if (windowHeight === top || percentVisibleAreaBelow <= 20) {
          // We need more room than we have.
          // We put it below, but there's more room above, put it above
          top = '';
          if (align.top === 'bottom') {
            bottom = targetRect.top;
          } else {
            ({ bottom } = targetRect);
          }
          maxHeight = bottom;
          container.style.maxHeight = `${maxHeight}px`;
        } else if (top > 0) {
          maxHeight = windowHeight - top;
          container.style.maxHeight = `${maxHeight}px`;
        } else {
          maxHeight = windowHeight - top;
        }
      } else if (align.bottom) {
        if (align.bottom === 'bottom') {
          ({ bottom } = targetRect);
        } else {
          bottom = targetRect.top;
        }
        maxHeight = bottom;
        container.style.maxHeight = `${maxHeight}px`;
      } else {
        // center
        top = targetRect.top + targetRect.height / 2 - containerRect.height / 2;
        maxHeight = windowHeight - top;
      }
      // if we can't fit it all, or we're rather close,
      // see if there's more room the other direction
      if (
        responsive &&
        (containerRect.height > maxHeight || maxHeight < windowHeight / 10)
      ) {
        // We need more room than we have.
        if (align.top && top > windowHeight / 2) {
          // We put it below, but there's more room above, put it above
          top = '';
          if (align.top === 'bottom') {
            // top = Math.max(targetRect.top - containerRect.height, 0);
            // maxHeight = targetRect.top - top;
            bottom = targetRect.top;
          } else {
            // top = Math.max(targetRect.bottom - containerRect.height, 0);
            // maxHeight = targetRect.bottom - top;
            ({ bottom } = targetRect);
          }
          maxHeight = bottom;
        } else if (align.bottom && maxHeight < windowHeight / 2) {
          // We put it above but there's more room below, put it below
          bottom = '';
          if (align.bottom === 'bottom') {
            ({ top } = targetRect);
          } else {
            top = targetRect.bottom;
          }
          maxHeight = windowHeight - top;
        }
      }
      container.style.left = `${left}px`;
      if (stretch) {
        // offset width by 0.1 to avoid a bug in ie11 that
        // unnecessarily wraps the text if width is the same
        // NOTE: turned off for now
        container.style.width = `${width + 0.1}px`;
      }
      // the (position:absolute + scrollTop)
      // is presenting issues with desktop scroll flickering
      if (top !== '') {
        container.style.top = `${top}px`;
      }
      if (bottom !== '') {
        container.style.bottom = `${windowHeight - bottom}px`;
      }
      if (!preserveHeight) {
        if (theme.drop && theme.drop.maxHeight) {
          maxHeight = Math.min(
            maxHeight,
            parseMetricToNum(theme.drop.maxHeight),
          );
        }
        container.style.maxHeight = `${maxHeight}px`;
      }
    }
  };

  onEsc = event => {
    const { onEsc } = this.props;
    event.stopPropagation();
    if (onEsc) {
      onEsc(event);
    }
  };

  /**
   * prevents mouse events from propagating upward to elements behind the drop.
   * this prevents a nested drop from closing its parent when the user clicks
   * inside it, since a 'nested' drop is technically an unrelated sibling in the
   * DOM due to React portals.
   */
  preventClickBubbling = event => {
    event.stopPropagation();
    /**
     * the React event system actually listens to all events at the top level
     * and then handles its own bubbling / capturing virtually. This means that
     * even if we call stopPropagation, it only affects the React synthetic
     * event, and the native event still bubbles upward.
     * Any code that uses native events (like the close listener in this class)
     * will still get the bubbled event, unless we also call
     * event.nativeEvent.stopImmediatePropagation, which bridges the gap from
     * React synthetic event to native DOM event.
     */
    event.nativeEvent.stopImmediatePropagation();
  };

  render() {
    const {
      align: alignProp,
      children,
      elevation,
      onClickOutside,
      onEsc,
      onKeyDown,
      plain,
      theme: propsTheme,
      ...rest
    } = this.props;
    const theme = this.context || propsTheme;

    let content = (
      <StyledDrop
        as={Box}
        plain={plain}
        elevation={
          !plain
            ? elevation || theme.global.drop.shadowSize || 'small'
            : undefined
        }
        tabIndex="-1"
        ref={this.dropRef}
        alignProp={alignProp}
        onMouseDown={this.preventClickBubbling}
        {...rest}
      >
        {children}
      </StyledDrop>
    );

    if (theme.global.drop.background) {
      const dark = backgroundIsDark(theme.global.drop.background, theme);
      if (dark !== theme.dark) {
        content = (
          <ThemeContext.Provider value={{ ...theme, dark }}>
            {content}
          </ThemeContext.Provider>
        );
      }
    }

    return (
      <FocusedContainer onKeyDown={onEsc && preventLayerClose}>
        <Keyboard
          onEsc={onEsc && this.onEsc}
          onKeyDown={onKeyDown}
          target="document"
        >
          {content}
        </Keyboard>
      </FocusedContainer>
    );
  }
}

Object.setPrototypeOf(DropContainer.defaultProps, defaultProps);

export { DropContainer };
