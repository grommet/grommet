import React, {
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled, { ThemeContext } from 'styled-components';

import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { defaultProps } from '../../default-props';
import { useForwardedRef } from '../../utils';
import { Box } from '../Box';
import { CollapsiblePropTypes } from './propTypes';

const AnimatedBox = styled(Box)`
  ${(props) =>
    props.shouldOpen
      ? `visibility: hidden;
      position: absolute;
      pointer-events: none;`
      : // eslint-disable-next-line max-len
        `transition: ${`max-${props.dimension} ${props.speedProp}ms, opacity ${props.speedProp}ms`};
      opacity: ${props.open ? 1 : 0};
      overflow: ${props.animate || !props.open ? 'hidden' : 'visible'};`}
`;

const Collapsible = forwardRef(
  ({ children, direction, open: openArg }, ref) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const [open, setOpen] = useState(openArg);
    const [animate, setAnimate] = useState(false);
    const [speed, setSpeed] = useState(theme.collapsible.minSpeed);
    const dimension = useMemo(
      () => (direction === 'horizontal' ? 'width' : 'height'),
      [direction],
    );
    const containerRef = useForwardedRef(ref);
    const sizeRef = useRef(0);
    const shouldOpen = !open && openArg;
    const shouldClose = open && !openArg;

    // when the caller changes openArg, trigger animation
    useEffect(() => {
      if (openArg !== open) {
        setAnimate(true);
        setOpen(openArg);
      }
    }, [open, openArg]);

    // prepare to open or close
    useLayoutEffect(() => {
      const container = containerRef.current;

      // skip this if animation is in progress
      if (!animate && shouldOpen) {
        const parentPrevPosition = container.parentNode.style.position;
        container.parentNode.style.position = 'relative';
        const { [dimension]: size } = container.getBoundingClientRect();
        container.parentNode.style.position = parentPrevPosition;
        sizeRef.current = size;
      }

      if (shouldOpen) {
        container.style[`max-${dimension}`] = 0;
      } else if (shouldClose) {
        const { [dimension]: size } = container.getBoundingClientRect();
        container.style[`max-${dimension}`] = `${size}px`;
      }
    }, [shouldOpen, shouldClose, containerRef, dimension, animate]);

    useEffect(() => {
      if (shouldOpen || shouldClose) {
        const container = containerRef.current;
        const {
          collapsible: { minSpeed, baseline },
        } = theme;
        const nextSpeed = Math.max(
          (sizeRef.current / baseline) * minSpeed,
          minSpeed,
        );
        setSpeed(nextSpeed);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Change the max to where we want to end up, the transition will
            // animate to get there. We do this in an animation frame to
            // give our starter setting a chance to fully render.
            container.style[`max-${dimension}`] = shouldOpen
              ? `${sizeRef.current}px`
              : 0;
          });
        });
      }
    }, [shouldOpen, shouldClose, containerRef, dimension, theme]);

    useEffect(() => {
      if (animate) {
        const container = containerRef.current;
        const timer = setTimeout(() => {
          setAnimate(false);
          container.removeAttribute('style');
        }, speed);
        return () => clearTimeout(timer);
      }
      return undefined;
      // we need open here to cancel the timer and restart it
    }, [animate, containerRef, speed, open]);

    return (
      <AnimatedBox
        aria-hidden={!open}
        ref={containerRef}
        open={open}
        animate={animate}
        dimension={dimension}
        speedProp={speed}
        // an intermediate state that will render invisible element
        // we need to do this because we can't use scrollHeight/scrollWidth
        // to get size while overflow is hidden.
        // skipped if animation is in progress
        shouldOpen={!animate && shouldOpen}
      >
        {shouldOpen || open || animate ? children : null}
      </AnimatedBox>
    );
  },
);

Collapsible.displayName = 'Collapsible';
Collapsible.propTypes = CollapsiblePropTypes;

export { Collapsible };
