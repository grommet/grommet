import React, { forwardRef, useState } from 'react';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';

import { StyledHeading } from './StyledHeading';
import { HeadingPropTypes } from './propTypes';
import { useForwardedRef } from '../../utils';

const Heading = forwardRef(
  (
    { color, fill, level, overflowWrap: overflowWrapProp, weight, ...rest },

    ref, // munged to avoid styled-components putting it in the DOM
  ) => {
    const headingRef = useForwardedRef(ref);
    const [overflowWrap, setOverflowWrap] = useState(
      overflowWrapProp || 'break-word',
    );

    // handle overflowWrap of heading
    useLayoutEffect(() => {
      const updateOverflowWrap = () => {
        let wrap;
        if (!overflowWrapProp && headingRef.current) {
          wrap =
            headingRef.current.scrollWidth > headingRef.current.offsetWidth
              ? 'anywhere'
              : 'break-word';
          setOverflowWrap(wrap);
        }
      };

      window.addEventListener('resize', updateOverflowWrap);
      updateOverflowWrap();
      return () => window.removeEventListener('resize', updateOverflowWrap);
    }, [headingRef, overflowWrapProp]);

    return (
      // enforce level to be a number
      <StyledHeading
        as={`h${level}`}
        colorProp={color}
        fillProp={fill}
        level={+level}
        overflowWrap={overflowWrap}
        weight={weight}
        {...rest}
        ref={headingRef}
      />
    );
  },
);

Heading.displayName = 'Heading';
Heading.defaultProps = {
  level: 1,
  responsive: true,
};
Heading.propTypes = HeadingPropTypes;

export { Heading };
