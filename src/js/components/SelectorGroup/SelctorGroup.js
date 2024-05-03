import React, { forwardRef, useMemo } from 'react';

export const SelectorGroupContext = React.createContext({});

const SelectorGroup = forwardRef(({ children, multiple }) => {
  const contextValue = useMemo(
    () => ({
      multiple,
    }),
    [multiple],
  );

  // is this ok to put group here
  // TODO pass defaultValue, onSelect, value

  return (
    <SelectorGroupContext.Provider value={contextValue} role="group">
      {children}
    </SelectorGroupContext.Provider>
  );
});

SelectorGroup.displayName = 'SelectorGroup';
// SelectorGroup.propTypes = SelectorGroupPropTypes;

export { SelectorGroup };
