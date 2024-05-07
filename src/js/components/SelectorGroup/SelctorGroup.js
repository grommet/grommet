import React, { forwardRef, useMemo } from 'react';

export const SelectorGroupContext = React.createContext({});

const SelectorGroup = forwardRef(({ children, multiple }) => {
  const contextValue = useMemo(
    () => ({
      multiple,
    }),
    [multiple],
  );

  // is this ok to put group here??
  // TODO pass defaultValue, onSelect, value

  // how can we help with accessibility we would have to put a div inside
  // what if we put a role group here and not on grid 

  return (
    <SelectorGroupContext.Provider value={contextValue}>
      {children}
    </SelectorGroupContext.Provider>
  );
});

SelectorGroup.displayName = 'SelectorGroup';
// SelectorGroup.propTypes = SelectorGroupPropTypes;

export { SelectorGroup };
