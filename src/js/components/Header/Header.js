import React, { useEffect, useState } from 'react';
import { Box } from '../Box';
import { useForwardedRef } from '../../utils';

const Header = React.forwardRef(({ sticky, ...rest }, ref) => {
  const containerRef = useForwardedRef(ref);
  // show header as default then if scroll down showHeader is false
  // else is scroll up showHeader is true.
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [right, setRight] = useState();
  const [left, setLeft] = useState();
  const [scrollUp, setScrollUp] = useState(false);

  useEffect(() => {
    //   // threshold inital value set to 0
    const threshold = 0;
    //   // number of pixels the document is currently scrolled
    let lastScrollY = window.pageYOffset;
    //   // run event listener callback once
    let ticking = false;

    // check if threshold is met which will
    // determine if the user is scrolling up or down
    // use ref here to get height and width

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      if (scrollY === 0) {
        setScrollUp(false);
        ticking = false;
      } else setScrollUp(scrollY < lastScrollY);
      // calcualte left, right, width, height
      setHeight(`${containerRef.current.getBoundingClientRect().height}px`);
      setWidth(`${containerRef.current.getBoundingClientRect().width}px`);
      setLeft(`${containerRef.current.getBoundingClientRect().left}px`);
      setRight(`${containerRef.current.getBoundingClientRect().right}px`);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    console.log(width, height, right, left);

    const onScroll = () => {
      if (!ticking) {
        // perform an animation and requests that the browser
        // calls a specified function to update an animation
        // before the next repaint
        // calculate the new offset after the page gets rendered
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [containerRef, scrollUp]);

  // normal header when you land on page and scroll down
  // when scroll up when you need to show the sticky header
  // back at 0 scroll position switch back to normal header

  const stickyStyles = {
    width: '100%',
    position: 'fixed',
    height: { height },
    zIndex: '1',
    left: { left },
    right: { right },
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      <Box
        align="center"
        as="header"
        direction="row"
        flex={false}
        justify="between"
        gap="medium"
        style={sticky === 'scrollup' && scrollUp ? stickyStyles : undefined}
        {...rest}
        ref={containerRef}
      />
    </>
  );
});
Header.displayName = 'Header';

export { Header };
