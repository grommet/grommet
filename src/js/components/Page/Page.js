import React, { useContext } from 'react';
import { Box } from '../Box';
// import { PageContext } from './PageContext';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';

const PageContext = createContext({});

const pageTheme = {
  wide: {
    align: 'center',
    width: {
      min: '336px', // 336 + 24 (margin) + 24 (margin) = 384 (e.g. 'medium')
      max: 'xxlarge', // 1536
    },
  },
  narrow: {
    align: 'center',
    width: {
      min: '336px', // 336 + 24 (margin) + 24 (margin) = 384 (e.g. 'medium')
      max: 'large', // 768
    },
  },
  full: {
    align: 'start',
    width: {
      min: '336px', // 336 + 24 (margin) + 24 (margin) = 384 (e.g. 'medium')
      max: '100%',
    },
  },
  pad: {
    xsmall: { horizontal: 'medium', vertical: 'medium' },
    small: { horizontal: 'large', vertical: 'medium' },
    medium: { horizontal: 'medium', vertical: 'medium' },
    large: { horizontal: 'large', vertical: 'medium' },
    xlarge: { horizontal: 'large', vertical: 'medium' },
  },
};

const Page = ({ kind, ...rest }) => {
  const size = useContext(ResponsiveContext);
  return (
    <PageContext.Provider
      value={{
        alignSelf: pageTheme[kind].align,
        fill: 'horizontal',
        margin: { horizontal: 'auto' },
        width: pageTheme[kind].width,
        pad: pageTheme.pad[size],
      }}
    >
      <Box
        overflow="horizontal"
        width={{ min: pageTheme[kind].width.min }}
        {...rest}
      />
    </PageContext.Provider>
  );
};

Page.displayName = 'Page';
// Page.propTypes = PaginationPropTypes;

export { Page };
