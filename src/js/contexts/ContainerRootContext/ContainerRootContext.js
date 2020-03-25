import React from 'react';

export const ContainerRootContext = React.createContext(
  typeof document === 'object' ? document.body : undefined,
);
