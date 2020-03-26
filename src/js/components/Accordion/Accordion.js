import React, { Children, cloneElement, useState } from 'react';

import { Box } from '../Box';

const activeAsArray = active =>
  typeof active === 'number' ? [active] : active;

const Accordion = ({
  activeIndex,
  animate = true,
  children,
  multiple,
  onActive,
  ...rest
}) => {
  const [activeIndexes, setActiveIndexes] = useState([]);
  const [stateActiveIndex, setStateActiveIndex] = useState();

  // Derived state from props
  // https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
  const derivedActiveIndexes = activeAsArray(activeIndex) || [];
  if (
    (typeof activeIndex !== 'undefined' || activeIndex !== stateActiveIndex) &&
    derivedActiveIndexes.join() !== activeIndexes.join()
  ) {
    setActiveIndexes(derivedActiveIndexes);
    setStateActiveIndex(activeIndex);
  }

  const onPanelChange = index => {
    let nextActiveIndexes = [...(activeIndexes || [])];

    const nextActiveIndex = nextActiveIndexes.indexOf(index);
    if (nextActiveIndex > -1) {
      nextActiveIndexes.splice(nextActiveIndex, 1);
    } else if (multiple) {
      nextActiveIndexes.push(index);
    } else {
      nextActiveIndexes = [index];
    }

    setActiveIndexes(nextActiveIndexes);
    if (onActive) {
      onActive(nextActiveIndexes);
    }
  };

  return (
    <Box role="tablist" {...rest}>
      {Children.toArray(children)
        .filter(child => child)
        .map((child, index) => {
          if (child) {
            return cloneElement(child, {
              active: activeIndexes.indexOf(index) > -1,
              animate,
              onPanelChange: () => onPanelChange(index),
            });
          }
          return child;
        })}
    </Box>
  );
};

let AccordionDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  AccordionDoc = require('./doc').doc(Accordion);
}
const AccordionWrapper = AccordionDoc || Accordion;

export { AccordionWrapper as Accordion };
