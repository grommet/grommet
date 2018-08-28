import React, { Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import { StyledHeading } from './StyledHeading';
import { doc } from './doc';

const styledComponents = {
  div: StyledHeading,
}; // tag -> styled component

class Heading extends Component {
  static defaultProps = {
    level: 1,
    responsive: true,
  };

  render() {
    const {
      color, // munged to avoid styled-components putting it in the DOM
      level,
      ...rest
    } = this.props;

    const tag = `h${level}`;
    let StyledComponent = styledComponents[tag];
    if (!StyledComponent) {
      StyledComponent = StyledHeading.withComponent(tag);
      styledComponents[tag] = StyledComponent;
    }

    // enforce level to be a number
    return (
      <StyledComponent colorValue={color} level={+level} {...rest} />
    );
  }
}

const HeadingWrapper = compose(
  withTheme,
)(
  process.env.NODE_ENV !== 'production' ? doc(Heading) : Heading
);

export { HeadingWrapper as Heading };
