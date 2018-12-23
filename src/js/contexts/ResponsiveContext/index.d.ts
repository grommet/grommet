import * as React from 'react';

export type ResponsiveValue = 'small' | 'medium' | 'large';

declare const ResponsiveContext: React.Context<ResponsiveValue>;

export { ResponsiveContext };
