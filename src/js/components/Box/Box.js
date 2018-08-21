import React, { Children, Component } from 'react';
import { compose } from 'recompose';
import { ThemeContext as IconThemeContext } from 'grommet-icons';

import { ThemeContext } from '../../contexts';
import { backgroundIsDark } from '../../utils';
import { withForwardRef, withTheme } from '../hocs';

import StyledBox, { StyledBoxGap } from './StyledBox';

import doc from './doc';

const styledComponents = {
  div: StyledBox,
}; // tag -> styled component

class Box extends Component {
  static defaultProps = {
    direction: 'column',
    margin: 'none',
    pad: 'none',
    responsive: true,
    tag: 'div',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // Since Box can change the background color for its contents,
    // we update the theme to indicate whether the current context is `dark`
    // and what icon theme to use.
    const { background, theme: propsTheme } = nextProps;
    const { theme: stateTheme, priorTheme } = prevState;

    let dark = propsTheme.dark;
    if (background) {
      dark = backgroundIsDark(background, propsTheme);
    }

    if (dark === propsTheme.dark && stateTheme) {
      return { theme: undefined, priorTheme: undefined };
    }
    if (dark !== propsTheme.dark &&
      (!stateTheme || dark !== stateTheme.dark || propsTheme !== priorTheme)) {
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

  state = {}

  render() {
    const {
      a11yTitle,
      children,
      direction,
      elevation, // munged to avoid styled-components putting it in the DOM
      fill, // munged to avoid styled-components putting it in the DOM
      forwardRef,
      gap,
      overflow, // munged to avoid styled-components putting it in the DOM
      responsive,
      tag,
      theme: propsTheme,
      wrap, // munged to avoid styled-components putting it in the DOM
      ...rest
    } = this.props;
    const { theme: stateTheme } = this.state;
    const theme = stateTheme || propsTheme;

    let StyledComponent = styledComponents[tag];
    if (!StyledComponent) {
      StyledComponent = StyledBox.withComponent(tag);
      styledComponents[tag] = StyledComponent;
    }

    let contents = children;
    if (gap) {
      contents = [];
      let firstIndex;
      Children.forEach(children, (child, index) => {
        if (child) {
          if (firstIndex === undefined) {
            firstIndex = index;
          } else {
            contents.push((
              <StyledBoxGap
                key={index}
                gap={gap}
                directionProp={direction}
                responsive={responsive}
                theme={theme}
              />
            ));
          }
        }
        contents.push(child);
      });
    }

    let content = (
      <StyledComponent
        aria-label={a11yTitle}
        innerRef={forwardRef}
        directionProp={direction}
        elevationProp={elevation}
        fillProp={fill}
        overflowProp={overflow}
        wrapProp={wrap}
        responsive={responsive}
        theme={theme}
        {...rest}
      >
        {contents}
      </StyledComponent>
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

    return content;
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Box);
}

export default compose(
  withTheme,
  withForwardRef, // needed for RangeSelector
)(Box);
