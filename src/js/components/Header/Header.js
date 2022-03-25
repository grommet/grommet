import React, { useEffect, useState } from 'react';
import { Box } from '../Box';
import { useForwardedRef } from '../../utils';

const Header = React.forwardRef(({ sticky, ...rest }, ref) => {
  const containerRef = useForwardedRef(ref);
  const [stickyStyles, setStickyStyles] = useState();
  const [scrollUp, setScrollUp] = useState(false);

  useEffect(() => {
    // threshold inital value set to 0
    const threshold = 0;
    // number of pixels the document is currently scrolled
    let lastScrollY = window.pageYOffset;
    // run event listener callback once
    let runEventListener = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        runEventListener = false;
        return;
      }
      if (scrollY === 0) {
        setScrollUp(false);
        runEventListener = false;
      } else setScrollUp(scrollY < lastScrollY);
      setStickyStyles({
        width: `${containerRef.current.getBoundingClientRect().width}px`,
        height: `${containerRef.current.getBoundingClientRect().height}px`,
        left: `${containerRef.current.getBoundingClientRect().left}px`,
        right: `${containerRef.current.getBoundingClientRect().right}px`,
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
  }, [containerRef, scrollUp]);

  const stickyStyle = {
    position: 'fixed',
    zIndex: '1',
    top: '0',
    left: stickyStyles && stickyStyles.left,
    right: stickyStyles && stickyStyles.right,
  };

  return (
    <>
      {sticky === 'scrollup' && scrollUp && (
        <Box
          height={stickyStyles && stickyStyles.height}
          width={stickyStyles && stickyStyles.width}
        />
      )}
      <Box
        align="center"
        as="header"
        direction="row"
        height={stickyStyles && stickyStyles.height}
        width={stickyStyles && stickyStyles.width}
        flex={false}
        justify="between"
        gap="medium"
        style={sticky === 'scrollup' && scrollUp ? stickyStyle : undefined}
        {...rest}
        ref={containerRef}
      />
    </>
  );
});
Header.displayName = 'Header';

export { Header };
