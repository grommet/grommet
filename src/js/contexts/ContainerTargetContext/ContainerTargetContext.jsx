import React from 'react';

export const ContainerTargetContext = React.createContext(
  typeof document === 'object' ? document.body : undefined,
);
