import React, { useState, Children } from 'react';

import { Box } from '../Box';

import { AccordionContext } from './AccordionContext';

const activeAsArray = active =>
  typeof active === 'number' ? [active] : active;

function Accordion({
  onActive,
  multiple,
  animate,
  children,
  messages,
  activeIndex,
  ...restProps
}) {
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

  // eslint-disable-next-line no-param-reassign
  delete restProps.onActive;

  return (
    <Box role="tablist" {...restProps}>
      {Children.toArray(children).map((panel, index) => (
        <AccordionContext.Provider
          key={`accordion-panel_${index + 0}`}
          value={{
            active: activeIndexes.indexOf(index) > -1,
            animate,
            messages,
            onPanelChange: () => onPanelChange(index),
          }}
        >
          {panel}
        </AccordionContext.Provider>
      ))}
    </Box>
  );
}

Accordion.defaultProps = {
  animate: true,
  messages: {
    tabContents: 'Tab Contents',
  },
};

let AccordionDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  AccordionDoc = require('./doc').doc(Accordion);
}
const AccordionWrapper = AccordionDoc || Accordion;

export { AccordionWrapper as Accordion };
