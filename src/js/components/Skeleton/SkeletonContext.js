import React, { useContext } from 'react';

export const SkeletonContext = React.createContext();

export const useSkeleton = () => useContext(SkeletonContext);
