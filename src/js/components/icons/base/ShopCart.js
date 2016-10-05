import React from 'react';
import Cart from './Cart';

export default (props) => {
  console.warn(
    'ShopCart has been renamed to Cart.' +
    ' Plese update your import statement.'
  );
  return <Cart {...props} />;
};
