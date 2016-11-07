import React from 'react';
import Basket from './Basket';

export default (props) => {
  console.warn(
    'ShopBasket has been renamed to Basket.' +
    ' Plese update your import statement.'
  );
  return <Basket {...props} />;
};
