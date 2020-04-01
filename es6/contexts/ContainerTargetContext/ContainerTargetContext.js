import React from 'react';
export var ContainerTargetContext = React.createContext(typeof document === 'object' ? document.body : undefined);