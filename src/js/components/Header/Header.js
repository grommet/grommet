import React, { useContext, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { findScrollParent, useForwardedRef } from '../../utils';
import { Box } from '../Box';

const Header = React.forwardRef(({ sticky, ...rest }, ref) => {
  const theme = useContext(ThemeContext);
  const containerRef = useForwardedRef(ref);
  useEffect(() => {
    let scrollTop = 0;
    const updateScrollDir = () => {
      // target is its scroll parent
      const target = findScrollParent(containerRef.current);
      const container = containerRef.current;

      if (target && sticky === 'scrollup') {
        const nextScrollTop =
          target === document ? window.pageYOffset : target.scrollTop;
        if (scrollTop - nextScrollTop <= 0) {
          container.style.top = `-${
            container.getBoundingClientRect().height
          }px`;
          container.style.zIndex = '';
        } else if (scrollTop - nextScrollTop > 0) {
          // ensure that container moves with the target
          container.style.position = 'sticky';
          container.style.top = '0px';
          container.style.zIndex = `${theme.header?.sticky?.zIndex}`;
          container.style.transition = 'top 0.6s';
        }
        scrollTop = nextScrollTop;
      }
    };

    updateScrollDir();
    window.addEventListener('resize', updateScrollDir);
    window.addEventListener('scroll', updateScrollDir, true);

    return () => {
      window.removeEventListener('resize', updateScrollDir);
      window.removeEventListener('scroll', updateScrollDir, true);
    };
  }, [containerRef, sticky, theme.header?.sticky?.zIndex]);

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
