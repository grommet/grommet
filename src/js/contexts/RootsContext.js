import React, { useContext, useMemo, useRef } from 'react';

// When toggling aria-hidden values, we only want to affect elements
// in the DOM that come from Grommet, so we track those elements in this
// context value. We also only want `trapFocus` to apply to the most recently
// opened Drop/Layer. See FocusedContainer.js
export const RootsContext = React.createContext(undefined);

export const useRoots = () => {
  // If FocusedContainer is within Grommet React tree, there will be a value
  // from RootsContext. If not, set up a default value that can be passed
  // to drops that might open from within a drop.
  const defaultRoots = useRef([]);
  const defaultValue = useMemo(() => ({ roots: defaultRoots }), []);
  const existingRoots = useContext(RootsContext);

  return {
    contextValue: existingRoots || defaultValue,
    hasRoots: existingRoots?.roots !== undefined,
  };
};
