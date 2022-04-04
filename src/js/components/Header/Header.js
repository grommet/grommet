import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { useForwardedRef } from '../../utils';
import { Box } from '../Box';

const Header = React.forwardRef(({ sticky, background, ...rest }, ref) => {
  const theme = useContext(ThemeContext);
  const containerRef = useForwardedRef(ref);
  const [stickyStyles, setStickyStyles] = useState();

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
        setStickyStyles(undefined);
      }
      setStickyStyles({
        width: `${containerRef.current.getBoundingClientRect().width}px`,
        height: `${containerRef.current.getBoundingClientRect().height}px`,
        left: `${containerRef.current.getBoundingClientRect().left}px`,
        right: `${containerRef.current.getBoundingClientRect().right}px`,
        zIndex: `${theme.header?.sticky?.zIndex}`,
        position: 'fixed',
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

  console.log(stickyStyles);

  return (
    <>
      {sticky === 'scrollup' && (
        // This Box is needed to push down content
        // so the content is not cut off by the Sticky Header
        <Box
          height={stickyStyles?.height}
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
        style={sticky === 'scrollup' ? stickyStyles : undefined}
        ref={containerRef}
        background={background}
        {...rest}
      />
    </>
  );
});
Header.displayName = 'Header';

export { Header };
