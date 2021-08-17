import React from 'react'; // When toggling aria-hidden values, we only want to affect elements
// in the DOM that come from Grommet, so we track those elements in this
// context value. See FocusedContainer.js

export var RootsContext = /*#__PURE__*/React.createContext([]);