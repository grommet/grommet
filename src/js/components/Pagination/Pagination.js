import React, { forwardRef, useContext } from 'react';

import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';

import { List } from './StyledPagination';

const Pagination = forwardRef(
  ({ leftIcon, rightIcon, pages, currentPage, onClick, ...rest }, ref) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const { pagination } = theme;

    if (pages < 2) return null;

    const handleClick = ({ currentTarget }) =>
      onClick(currentTarget.dataset.page);

    const startPage = currentPage < 3 ? 0 : currentPage - 3;
    const endPage = currentPage < 3 ? currentPage + 5 : currentPage + 3;

    return (
      <Box direction="row" margin={{ vertical: 'large' }} ref={ref} {...rest}>
        <Box
          direction="row"
          round={pagination.round}
          border={pagination.border}
        >
          <List
            background={pagination.icon.bgColor}
            direction="row"
            justify="center"
            round={{ size: pagination.round, corner: 'left' }}
          >
            {currentPage === 1 ? null : (
              <Button data-page={currentPage - 1} onClick={handleClick}>
                <Box pad={pagination.icon.pad}>{leftIcon}</Box>
              </Button>
            )}
          </List>
          {[...Array(pages)]
            .map((a, i) => i)
            .slice(startPage, endPage)
            .map(pageNo => (
              <List
                background={pagination.background}
                justify="center"
                key={pageNo || '0'}
                className={`${currentPage === pageNo + 1 ? 'active' : ''}`}
              >
                <Button data-page={pageNo + 1} onClick={handleClick}>
                  <Box pad={pagination.pad}>{pageNo + 1}</Box>
                </Button>
              </List>
            ))}
          <List
            direction="row"
            background={pagination.icon.bgColor}
            justify="center"
            round={{ size: pagination.round, corner: 'right' }}
          >
            {currentPage === pages ? null : (
              <Button data-page={currentPage + 1} onClick={handleClick}>
                <Box pad={pagination.icon.pad}>{rightIcon}</Box>
              </Button>
            )}
          </List>
        </Box>
      </Box>
    );
  },
);

Pagination.displayName = 'Pagination';

export { Pagination };
