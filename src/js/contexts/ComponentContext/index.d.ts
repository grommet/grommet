import * as React from 'react';

export type ComponentValue = string;

declare const ComponentContext: React.Context<ComponentValue>;

export { ComponentContext };
