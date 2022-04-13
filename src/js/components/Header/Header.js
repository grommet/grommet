import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { findScrollParent, useForwardedRef } from '../../utils';
import { Box } from '../Box';

const Header = React.forwardRef(({ sticky, ...rest }, ref) => {
  const theme = useContext(ThemeContext);
  const [stickyStyles, setStickyStyles] = useState();
  const containerRef = useForwardedRef(ref);
  useEffect(() => {
    // threshold inital value set to 0
    let threshold = 0;
    // number of pixels the document is currently scrolled
    const updateBounds = () => {
      // target is its scroll parent
      const target = findScrollParent(containerRef.current);
      // affects StyledLayer
      // needs to affect the header
      const layer = containerRef.current;

      if (layer && target) {
        // Get the new Value
        const newValue = target.scrollTop;
        if (threshold - newValue <= 0) {
          layer.style.left = '';
          layer.style.top = '';
          layer.style.bottom = '';
          layer.style.width = '';
        } else if (threshold - newValue > 0) {
          const targetRect = target.getBoundingClientRect();
          console.log(targetRect);
          // ensure that layer moves with the target
          layer.style.position = 'sticky';
          layer.style.top = `${targetRect.top}px`;
        }
        // Update threshold
        threshold = newValue;
      }
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);
    window.addEventListener('scroll', updateBounds, true);

    return () => {
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('scroll', updateBounds, true);
    };
  }, [containerRef]);

  useEffect(() => {
    // threshold inital value set to 0
    const threshold = 0;
    // number of pixels the document is currently scrolled
    let lastScrollY = window.pageYOffset;
    // run our event listener callback once in each requestAnimationFrame
    let runEventListener = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;
      if (Math.abs(scrollY - lastScrollY) < threshold) {
        runEventListener = false;
        return;
      }
      if (scrollY === 0) {
        runEventListener = false;
      }
      setStickyStyles({
        width: `${containerRef.current.getBoundingClientRect().width}px`,
        height: `${containerRef.current.getBoundingClientRect().height}px`,
        left: `${containerRef.current.getBoundingClientRect().left}px`,
        right: `${containerRef.current.getBoundingClientRect().right}px`,
        zIndex: `${theme.header?.sticky?.zIndex}`,
        position: 'sticky',
        transition: 'top 0.6s',
        top:
          scrollY < lastScrollY
            ? '0'
            : `-${containerRef.current.getBoundingClientRect().height}px`,
      });
      lastScrollY = scrollY > 0 ? scrollY : 0;
      runEventListener = false;
    };

    const onScroll = () => {
      if (!runEventListener) {
        // calculate the new offset after the page gets rendered
        window.requestAnimationFrame(updateScrollDir);
        runEventListener = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [containerRef, stickyStyles, theme.header?.sticky?.zIndex]);

  if (sticky === 'scrollup') {
    return (
      <Box
        align="center"
        as="header"
        direction="row"
        height={stickyStyles && stickyStyles.height}
        width={stickyStyles && stickyStyles.width}
        flex={false}
        justify="between"
        gap="medium"
        style={stickyStyles}
        ref={containerRef}
        {...rest}
      />
    );
  }
  return (
    <Box
      align="center"
      as="header"
      direction="row"
      flex={false}
      justify="between"
      gap="medium"
      ref={containerRef}
      {...rest}
    />
  );
});

Header.displayName = 'Header';

export { Header };
