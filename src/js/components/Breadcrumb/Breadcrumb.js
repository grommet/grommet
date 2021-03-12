import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';
import { Button } from '../Button';
import { List } from '../List';
import {
  StyledBreadcrumb,
  StyledBreadcrumbItem,
  StyledBreadcrumbText,
} from './StyledBreadcrumb';

const Breadcrumb = ({ data, icon: breadcrumbIcon, onValueSelect, ...rest }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const handleClick = item => {
    if (item && typeof item === 'object') {
      onValueSelect(item.id);
    } else {
      onValueSelect(item);
    }
  }

  const Icon = breadcrumbIcon || theme.breadcrumb.icons.separator;

  return (
    <StyledBreadcrumb>
      <List data={data} {...rest}>
        {(item, index) => (
          <StyledBreadcrumbItem key={index} {...theme.breadcrumb.item}>
            <Button
              onClick={
                index !== data.length - 1 ?
                  () => handleClick(item) :
                  undefined
              }
            >
              <StyledBreadcrumbText
                last={data.length > 1 && index === data.length - 1}
                {...theme.breadcrumb.content}
              >
                {item && typeof item === 'object' ? item.label : item}
              </StyledBreadcrumbText>
              {index < data.length - 1 && (
                <Icon {...theme.breadcrumb.icon} />
              )}
            </Button>
          </StyledBreadcrumbItem>
        )}
      </List>
    </StyledBreadcrumb>
  );
}

Breadcrumb.displayName = 'Breadcrumb';

let BreadcrumbDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  BreadcrumbDoc = require('./doc').doc(Breadcrumb);
}
const BreadcrumbWrapper = BreadcrumbDoc || Breadcrumb;

export { BreadcrumbWrapper as Breadcrumb };