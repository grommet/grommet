import * as React from 'react';

export type ResponsiveValue = 'wide' | 'narrow';

declare const ResponsiveContext: React.Context<ResponsiveValue>;

export { ResponsiveContext };
