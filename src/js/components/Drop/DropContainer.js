import React, { Component } from 'react';
import { ThemeContext as IconThemeContext } from 'grommet-icons/contexts';

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

export class DropContainer extends Component {
  static defaultProps = {
    align: {
      top: 'top',
      left: 'left',
    },
    stretch: 'width',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // Since the drop background can be different from the current theme context,
    // we update the theme to set the dark background context.
    const { theme: propsTheme } = nextProps;
    const { theme: stateTheme, priorTheme } = prevState;

    const dark = backgroundIsDark(
      propsTheme.global.drop.background,
      propsTheme,
    );

    if (dark === propsTheme.dark && stateTheme) {
      return { theme: undefined, priorTheme: undefined };
    }
    if (
      dark !== propsTheme.dark &&
      (!stateTheme || dark !== stateTheme.dark || propsTheme !== priorTheme)
    ) {
      return {
        theme: {
          ...propsTheme,
          dark,
          icon: dark ? propsTheme.iconThemes.dark : propsTheme.iconThemes.light,
        },
        priorTheme: propsTheme,
      };
    }
    return null;
  }

  state = {};

  dropRef = React.createRef();

  componentDidMount() {
    const { restrictFocus } = this.props;
    this.addScrollListener();
    window.addEventListener('resize', this.onResize);
    document.addEventListener('mousedown', this.onClickDocument);

    this.place(true);

    if (restrictFocus) {
      this.dropRef.current.focus();
    }
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
    this.place(true);
  };

  place = resize => {
    const { align, dropTarget, responsive, stretch, theme } = this.props;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const target = dropTarget;
    const container = this.dropRef.current;
    if (container && target) {
      // clear prior styling
      container.style.left = '';
      container.style.top = '';
      if (resize) {
        container.style.width = '';
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
      // set top position
      let top;
      let maxHeight = resize ? undefined : containerRect.height;
      if (align.top) {
        if (align.top === 'top') {
          ({ top } = targetRect);
        } else {
          top = targetRect.bottom;
        }
        if (resize) {
          maxHeight = Math.min(windowHeight - top);
        }
      } else if (align.bottom) {
        if (align.bottom === 'bottom') {
          top = targetRect.bottom - containerRect.height;
          if (resize) {
            maxHeight = Math.min(targetRect.bottom - top, windowHeight - top);
          }
        } else {
          top = targetRect.top - containerRect.height;
          if (resize) {
            maxHeight = Math.min(targetRect.top - top, windowHeight - top);
          }
        }
      } else {
        top = targetRect.top + targetRect.height / 2 - containerRect.height / 2;
        if (resize) {
          maxHeight = Math.min(windowHeight - top);
        }
      }
      // if we can't fit it all, see if there's more room the other direction
      if (
        resize &&
        (containerRect.height > maxHeight || maxHeight > windowHeight / 10)
      ) {
        // We need more room than we have.
        if (align.top && top > windowHeight / 2) {
          // We put it below, but there's more room above, put it above
          if (align.top === 'bottom') {
            if (responsive) {
              top = Math.max(targetRect.top - containerRect.height, 0);
              maxHeight = targetRect.top - top;
            }
          } else if (responsive) {
            top = Math.max(targetRect.bottom - containerRect.height, 0);
            maxHeight = targetRect.bottom - top;
          }
        } else if (align.bottom && maxHeight < windowHeight / 2) {
          // We put it above but there's more room below, put it below
          if (align.bottom === 'bottom') {
            if (responsive) {
              ({ top } = targetRect);
              maxHeight = windowHeight - top;
            }
          } else if (responsive) {
            top = targetRect.bottom;
            maxHeight = windowHeight - top;
          }
        }
      }
      container.style.left = `${left}px`;
      if (resize && stretch) {
        // offset width by 0.1 to avoid a bug in ie11 that
        // unnecessarily wraps the text if width is the same
        // NOTE: turned off for now
        container.style.width = `${width + 0.1}px`;
      }
      // the (position:absolute + scrollTop)
      // is presenting issues with desktop scroll flickering
      container.style.top = `${top}px`;
      if (resize) {
        // maxHeight = windowHeight - (top || 0);
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

  render() {
    const {
      align: alignProp,
      children,
      onClickOutside,
      onEsc,
      onKeyDown,
      theme: propsTheme,
      ...rest
    } = this.props;
    const { theme: stateTheme } = this.state;
    const theme = stateTheme || propsTheme;

    let content = (
      <StyledDrop
        as={Box}
        elevation={theme.global.drop.shadowSize || 'small'}
        tabIndex="-1"
        ref={this.dropRef}
        alignProp={alignProp}
        theme={theme}
        {...rest}
      >
        {children}
      </StyledDrop>
    );

    if (stateTheme) {
      if (stateTheme.dark !== propsTheme.dark && stateTheme.icon) {
        content = (
          <IconThemeContext.Provider value={stateTheme.icon}>
            {content}
          </IconThemeContext.Provider>
        );
      }
      content = (
        <ThemeContext.Provider value={stateTheme}>
          {content}
        </ThemeContext.Provider>
      );
    }

    return (
      <FocusedContainer>
        <Keyboard onEsc={onEsc} onKeyDown={onKeyDown} target="document">
          {content}
        </Keyboard>
      </FocusedContainer>
    );
  }
}
