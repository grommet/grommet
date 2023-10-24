import React, { useContext } from 'react';
export var SkeletonContext = /*#__PURE__*/React.createContext();
export var useSkeleton = function useSkeleton() {
  return useContext(SkeletonContext);
};