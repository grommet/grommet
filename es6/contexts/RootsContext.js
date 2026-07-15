import React, { useContext, useMemo, useRef } from 'react';

// When toggling aria-hidden values, we only want to affect elements
// in the DOM that come from Grommet, so we track those elements in this
// context value. We also only want `trapFocus` to apply to the most recently
// opened Drop/Layer. See FocusedContainer.js
export var RootsContext = /*#__PURE__*/React.createContext(undefined);
export var useRoots = function useRoots() {
  // If FocusedContainer is within Grommet React tree, there will be a value
  // from RootsContext. If not, set up a default value that can be passed
  // to drops that might open from within a drop.
  var defaultRoots = useRef([]);
  var defaultValue = useMemo(function () {
    return {
      roots: defaultRoots
    };
  }, []);
  var existingRoots = useContext(RootsContext);
  return {
    contextValue: existingRoots || defaultValue,
    hasRoots: (existingRoots == null ? void 0 : existingRoots.roots) !== undefined
  };
};