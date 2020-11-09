import React, {
  forwardRef,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import styled, { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';
import { useForwardedRef } from '../../utils';
import { Box } from '../Box';

const AnimatedBox = styled(Box)`
  ${props =>
    // eslint-disable-next-line max-len
    `transition: ${`max-${props.dimension} ${props.speedProp}ms, opacity ${props.speedProp}ms`};
      opacity: ${props.open ? 1 : 0};
      overflow: ${props.animate || !props.open ? 'hidden' : 'visible'};
      max-${props.dimension}: ${props.open ? 'unset' : 0};
    `}
`;

const Collapsible = forwardRef(
  ({ children, direction, open: openArg }, ref) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const [open, setOpen] = useState(openArg);
    const [animate, setAnimate] = useState(false);
    const [size, setSize] = useState();
    const [speed, setSpeed] = useState(theme.collapsible.minSpeed);
    const dimension = useMemo(
      () => (direction === 'horizontal' ? 'width' : 'height'),
      [direction],
    );
    const containerRef = useForwardedRef(ref);

    // when the caller changes openArg, trigger animation
    useEffect(() => {
      if (openArg !== open) {
        setAnimate(true);
        setOpen(openArg);
      }
    }, [open, openArg]);

    // When we animate, start a timer to clear out the animation when it
    // has finished.
    useEffect(() => {
      if (animate) {
        const timer = setTimeout(() => {
          setAnimate(false);
          setSize(undefined);
          const container = containerRef.current;
          container.removeAttribute('style');
        }, speed);
        return () => clearTimeout(timer);
      }
      return undefined;
    }, [animate, containerRef, speed]);

    useEffect(() => {
      if (animate) {
        const {
          collapsible: { minSpeed, baseline },
        } = theme;
        const container = containerRef.current;
        // get the desired size by unsetting the max temporarily
        container.style[`max-${dimension}`] = 'unset';
        const rect = container.getBoundingClientRect();
        container.removeAttribute('style');
        const nextSize = rect[dimension];
        // start with the max set to the size we are starting from
        container.style[`max-${dimension}`] = open ? 0 : `${nextSize}px`;
        setSize(nextSize);
        const nextSpeed = Math.max((nextSize / baseline) * minSpeed, minSpeed);
        setSpeed(nextSpeed);
      }
    }, [animate, containerRef, dimension, open, theme]);

    useLayoutEffect(() => {
      if (animate && size) {
        const container = containerRef.current;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Change the max to where we want to end up, the transition will
            // animate to get there. We do this in an animation frame to
            // give our starter setting a chance to fully render.
            container.style[`max-${dimension}`] = open ? `${size}px` : 0;
          });
        });
      }
    }, [animate, containerRef, dimension, open, size]);

    return (
      <AnimatedBox
        aria-hidden={!open}
        ref={containerRef}
        open={open}
        animate={animate}
        dimension={dimension}
        speedProp={speed}
      >
        {open || animate ? children : null}
      </AnimatedBox>
    );
  },
);

Collapsible.displayName = 'Collapsible';

let CollapsibleDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  CollapsibleDoc = require('./doc').doc(Collapsible);
}
const CollapsibleWrapper = CollapsibleDoc || Collapsible;

export { CollapsibleWrapper as Collapsible };
