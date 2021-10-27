import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { NewCarouselChildPropTypes } from './propTypes';

// Slide Left = Previous or Backward
const slideRightPrevious = keyframes`
  0% {
    transform: translateX(0%);
    visibility: visible;
  }
  99% {visibility: visible}
  100% {transform: translateX(100%)}
`;

const slideRightCurrent = keyframes`
  0% {
    transform: translateX(-100%);
    visibility: visible;
  }
  99% {visibility: visible}
  100% {transform: translateX(0%)}
`;

// Slide Left = Next or Forward
const slideLeftPrevious = keyframes`
  0% {
    transform: translateX(0%);
    visibility: visible;
  }
  99% {visibility: visible}
  100% {transform: translateX(-100%)}
`;

const slideLeftCurrent = keyframes`
  0% {
    transform: translateX(100%);
    visibility: visible;
  }
  99% {visibility: visible}
  100% {transform: translateX(0%)}
`;

const StyledCarouselChild = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  visibility: ${(props) => props.visibility};
  animation: ${(props) =>
    props.animation
      ? css`
          ${props.animation} 0.6s
        `
      : `none`};
`;

const handleAnimation =
  ({ setAnimation, setVisibility }) =>
  (animation, visibility) => {
    setAnimation(animation);
    const timer = setTimeout(() => {
      setVisibility(visibility);
    }, 100);
    return () => clearTimeout(timer);
  };

const NewCarouselChild = ({
  children,
  index,
  current,
  previous,
  direction,
}) => {
  const [animation, setAnimation] = useState(undefined);
  const [visibility, setVisibility] = useState(
    current === index ? 'visible' : 'hidden',
  );

  const onAnimation = handleAnimation({
    setAnimation,
    setVisibility,
  });

  useEffect(() => {
    // Previous is only undefined on mount. This tells the component:
    // On mount, do not render the first slide with an animation.
    if (previous === undefined) return;
    if (index !== current && index !== previous) setAnimation(undefined);

    if (index === current) {
      if (direction === 'next') onAnimation(slideLeftCurrent, 'visible');
      else onAnimation(slideRightCurrent, 'visible');
    } else if (index === previous) {
      if (direction === 'next') onAnimation(slideLeftPrevious, 'hidden');
      else onAnimation(slideRightPrevious, 'hidden');
    }
  }, [onAnimation, direction, index, current, previous]);
  return (
    <StyledCarouselChild visibility={visibility} animation={animation}>
      {children}
    </StyledCarouselChild>
  );
};

NewCarouselChild.propTypes = NewCarouselChildPropTypes;

export { NewCarouselChild };
