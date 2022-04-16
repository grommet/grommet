import React, { useContext, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { findScrollParent, useForwardedRef } from '../../utils';
import { Box } from '../Box';

const Header = React.forwardRef(({ sticky, ...rest }, ref) => {
  const theme = useContext(ThemeContext);
  const headerRef = useForwardedRef(ref);
  useEffect(() => {
    let scrollTop = 0;
    const updateScrollDir = () => {
      // target is its scroll parent
      const target = findScrollParent(headerRef.current);
      const header = headerRef.current;

      if (target && sticky === 'scrollup') {
        const nextScrollTop =
          target === document ? window.pageYOffset : target.scrollTop;
        if (scrollTop - nextScrollTop <= 0) {
          header.style.top = `-${header.getBoundingClientRect().height}px`;
          header.style.zIndex = '';
        } else if (scrollTop - nextScrollTop > 0) {
          // ensure that header moves with the target
          header.style.position = 'sticky';
          header.style.top = '0px';
          header.style.zIndex = `${theme.header?.sticky?.zIndex}`;
          header.style.transition = 'top 0.6s';
        }
        scrollTop = nextScrollTop;
      }
    };

    if (sticky === 'scrollup') {
      updateScrollDir();
      window.addEventListener('resize', updateScrollDir);
      window.addEventListener('scroll', updateScrollDir, true);
    }
    return () => {
      if (sticky === 'scrollup') {
        window.removeEventListener('resize', updateScrollDir);
        window.removeEventListener('scroll', updateScrollDir, true);
      }
    };
  }, [headerRef, sticky, theme.header?.sticky?.zIndex]);

  return (
    <Box
      align="center"
      as="header"
      direction="row"
      flex={false}
      justify="between"
      gap="medium"
      ref={headerRef}
      {...rest}
    />
  );
});

Header.displayName = 'Header';

export { Header };
