import React from 'react';

import { Text } from '../Text';

const CellContent = ({ datum, property, render, primary }) => {
  let content = render ? render(datum) : datum[property];
  if (typeof content === 'string' || typeof content === 'number') {
    if (primary) {
      content = <strong>{content}</strong>;
    }
    content = <Text>{content}</Text>;
  }
  return content;
};

export default CellContent;
