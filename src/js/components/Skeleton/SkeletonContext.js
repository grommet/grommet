import React, { useContext } from 'react';

export const SkeletonContext = React.createContext({
  depth: 0,
});

export const useSkeleton = () => useContext(SkeletonContext);
